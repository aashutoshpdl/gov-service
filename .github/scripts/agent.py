import os
import json
import subprocess
from google import genai
from google.genai import types

# Initialize Gemini Client
api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY environment variable is missing.")

client = genai.Client(api_key=api_key)

issue_num = os.environ.get("ISSUE_NUMBER", "1")
issue_title = os.environ.get("ISSUE_TITLE", "New Feature Request")
issue_body = os.environ.get("ISSUE_BODY", "")
repo = os.environ.get("REPO", "")
model_name = os.environ.get("GEMINI_MODEL", "gemini-3.8-flash")

print(f"Processing Issue #{issue_num}: {issue_title} using model {model_name}")

# ---------------------------------------------------------------------------
# PHASE 1: MANAGER AGENT
# Selects the best language, tech stack, and project architecture.
# ---------------------------------------------------------------------------
print("🧠 Manager Agent: Determining optimal architecture and tech stack...")

manager_system_instruction = """
You are an elite Chief Technology Officer & Technical Product Manager.
Analyze the user's issue request. The user may give vague or multi-faceted requirements.
Your job is to:
1. Choose the optimal programming language and framework for the task:
   - Web application: Next.js, React/Vite, or clean static HTML/CSS/JS (deployable to GitHub Pages).
   - Mobile app: Android/Flutter (capable of generating an APK in build).
   - Systems / High performance / CLI: Rust, Go, or C++.
   - Machine Learning / Data / Automation: Python.
   - Cross-platform desktop: Electron, Tauri, or platform native.
2. Formulate a complete project structure, identifying all source files, configs (e.g., Cargo.toml, package.json, requirements.txt, pubspec.yaml), and a standardized `build.sh` script if compilation or packaging is needed.
3. If an executable/APK/bundle is created, ensure `build.sh` places final artifacts into a `./dist` folder.

Output strictly valid JSON with this schema:
{
  "project_type": "<web | mobile | cli | data | desktop>",
  "stack_chosen": "<e.g., Rust CLI / React Web / Flutter Mobile / Python>",
  "summary": "<2-3 sentence executive summary of the plan>",
  "plan_steps": ["step 1", "step 2", "step 3"]
}
"""

manager_prompt = f"Issue Title: {issue_title}\nIssue Description:\n{issue_body}"

manager_res = client.models.generate_content(
    model=model_name,
    contents=manager_prompt,
    config=types.GenerateContentConfig(
        system_instruction=manager_system_instruction,
        response_mime_type="application/json"
    )
)

plan = json.loads(manager_res.text)

# Post Manager's architectural decision to the issue
plan_bullets = "\n".join([f"- {s}" for s in plan.get("plan_steps", [])])
comment_body = (
    f"### 🏛️ Manager Agent Plan\n\n"
    f"**Selected Stack:** `{plan.get('stack_chosen', 'Auto-selected')}` ({plan.get('project_type', 'General')})\n\n"
    f"**Architecture Summary:**\n{plan.get('summary', '')}\n\n"
    f"**Roadmap:**\n{plan_bullets}\n\n"
    f"🔨 *Developer Agent has begun generating full code and build scripts...*"
)

subprocess.run(["gh", "issue", "comment", str(issue_num), "--body", comment_body], check=False)

# ---------------------------------------------------------------------------
# PHASE 2: DEVELOPER AGENT
# Generates complete, functional, multi-file code for the chosen stack.
# ---------------------------------------------------------------------------
print("💻 Developer Agent: Writing source code and build pipelines...")

branch_name = f"feature/issue-{issue_num}"
subprocess.run(["git", "checkout", "-b", branch_name], check=False)

dev_system_instruction = """
You are a Staff Software Engineer capable of writing production-grade code in any programming language (Rust, Python, Go, TypeScript, Java/Kotlin, Flutter, C++, Web, etc.).

Generate ALL necessary files for the proposed project:
1. All application source code.
2. Standard package manager and configuration files (e.g., Cargo.toml, package.json, requirements.txt, Dockerfile, etc.).
3. A `build.sh` executable shell script that installs needed dependencies, compiles/tests the project, and places distributable outputs (binaries, APKs, or static web bundles) into a `./dist` directory.
4. An updated README.md documenting usage and installation.

Output MUST be strictly valid JSON mapping relative file paths to their complete string contents:
{
  "src/main.rs": "...",
  "Cargo.toml": "...",
  "build.sh": "#!/usr/bin/env bash\\n...",
  "README.md": "..."
}
"""

dev_prompt = f"""
Build this project based on the client requirements and manager architecture:
Title: {issue_title}
Requirements: {issue_body}
Stack: {plan.get('stack_chosen')}
Plan: {plan.get('summary')}
"""

dev_res = client.models.generate_content(
    model=model_name,
    contents=dev_prompt,
    config=types.GenerateContentConfig(
        system_instruction=dev_system_instruction,
        response_mime_type="application/json"
    )
)

code_files = json.loads(dev_res.text)

# Write out all files
for file_path, content in code_files.items():
    # Sanitize and ensure parent directory exists
    clean_path = os.path.normpath(file_path.lstrip("/"))
    os.makedirs(os.path.dirname(clean_path), exist_ok=True) if os.path.dirname(clean_path) else None
    
    with open(clean_path, "w", encoding="utf-8") as f:
        f.write(content)
    
    if clean_path.endswith(".sh"):
        os.chmod(clean_path, 0o755)

# ---------------------------------------------------------------------------
# PHASE 3: COMMIT & OPEN PULL REQUEST
# ---------------------------------------------------------------------------
print("🚀 Committing changes and creating Pull Request...")

subprocess.run(["git", "config", "user.name", "Gemini Developer Agent"], check=False)
subprocess.run(["git", "config", "user.email", "agent@github.actions"], check=False)
subprocess.run(["git", "add", "."], check=False)

commit_msg = f"feat: {issue_title} (closes #{issue_num})\n\nStack: {plan.get('stack_chosen')}"
subprocess.run(["git", "commit", "-m", commit_msg], check=False)
subprocess.run(["git", "push", "origin", branch_name], check=False)

pr_body = f"""
## 🤖 Automated Solution for #{issue_num}

### 🛠️ Architecture & Stack
* **Language & Framework:** `{plan.get('stack_chosen')}`
* **Category:** `{plan.get('project_type')}`

### 📝 Summary
{plan.get('summary')}

### 📦 Key Files Added:
{', '.join([f'`{k}`' for k in list(code_files.keys())[:10]])}

---
*Once merged into `main`, GitHub Actions will automatically trigger the universal build pipeline to publish live web previews (GitHub Pages) or downloadable release binaries/APKs.*

Closes #{issue_num}
"""

subprocess.run([
    "gh", "pr", "create",
    "--title", f"Feature: {issue_title}",
    "--body", pr_body,
    "--head", branch_name,
    "--base", "main"
], check=False)

print("✅ Pull Request successfully created!")

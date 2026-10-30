import os
import sys
import json
import subprocess
from google import genai
from google.genai import types

# Force unbuffered output so logs appear in real-time on GitHub Actions
sys.stdout.reconfigure(line_buffering=True)

api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY environment variable is missing.")

gh_token = os.environ.get("GH_TOKEN", "")
repo = os.environ.get("REPO", "")
issue_num = os.environ.get("ISSUE_NUMBER", "1")
issue_title = os.environ.get("ISSUE_TITLE", "New Feature Request")
issue_body = os.environ.get("ISSUE_BODY", "")
model_name = os.environ.get("GEMINI_MODEL", "gemini-3.8-flash")

# Configure Git authenticated remote so git push never hangs for credentials
if gh_token and repo:
    subprocess.run(
        ["git", "remote", "set-url", "origin", f"https://x-access-token:{gh_token}@github.com/{repo}.git"],
        check=False
    )

# Configure Gemini client
client = genai.Client(api_key=api_key)

print(f"🚀 Processing Issue #{issue_num}: {issue_title} using model {model_name}")

# ---------------------------------------------------------------------------
# PHASE 1: MANAGER AGENT
# Selects the best language, tech stack, and project architecture.
# ---------------------------------------------------------------------------
print("🧠 Manager Agent: Determining optimal architecture and tech stack...")

manager_system_instruction = """
You are an elite Chief Technology Officer & Technical Product Manager.
Analyze the user's issue request.
1. Choose the optimal programming language and framework:
   - Web application: Clean, high-performance static web app or React SPA using CDN or direct bundle (directly deployable to GitHub Pages without heavy multi-minute builds).
   - Mobile: Flutter / Android APK.
   - Systems / CLI: Rust or Go.
   - Data / Automation: Python.
2. Outline the essential files needed for a complete, functional solution.
3. Keep the file footprint modular and focused (2-5 key files) so code generation is rapid and reliable.

Output strictly valid JSON with this schema:
{
  "project_type": "<web | mobile | cli | data | desktop>",
  "stack_chosen": "<e.g., React SPA (CDN) / HTML5 / Rust / Python>",
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
    f"🔨 *Developer Agent is now generating complete, functional code...*"
)

subprocess.run(["gh", "issue", "comment", str(issue_num), "--repo", repo, "--body", comment_body], check=False)

# ---------------------------------------------------------------------------
# PHASE 2: DEVELOPER AGENT
# Generates complete, functional, multi-file code for the chosen stack.
# ---------------------------------------------------------------------------
print("💻 Developer Agent: Writing source code and build pipelines...")

branch_name = f"feature/issue-{issue_num}"
subprocess.run(["git", "checkout", "-B", branch_name], check=False)

dev_system_instruction = """
You are a Staff Software Engineer. Write clean, complete, working production code.

Guidelines:
1. Provide the complete code for the application. Do not leave placeholders, TODOs, or truncated snippets.
2. If this is a Web application, make it self-contained with index.html, styles.css, app.js (or inline scripts) so it is instantly viewable on GitHub Pages. Follow any design system CDN requirements specified in the prompt.
3. Always include a `build.sh` script (e.g. copying web files to ./dist or compiling binaries).
4. Output MUST be strictly valid JSON mapping relative file paths to their full string contents:
{
  "index.html": "<!DOCTYPE html>...",
  "styles.css": "...",
  "app.js": "...",
  "build.sh": "#!/usr/bin/env bash\\nmkdir -p dist && cp index.html styles.css app.js dist/\\n",
  "README.md": "# Project documentation..."
}
"""

dev_prompt = f"""
Build this project based on the client requirements and manager architecture:
Title: {issue_title}
Requirements: {issue_body}
Stack: {plan.get('stack_chosen')}
Plan: {plan.get('summary')}
"""

print("⏳ Calling Gemini Developer Agent (generating complete source files)...")
dev_res = client.models.generate_content(
    model=model_name,
    contents=dev_prompt,
    config=types.GenerateContentConfig(
        system_instruction=dev_system_instruction,
        response_mime_type="application/json"
    )
)

print("📦 Decoding and writing generated files...")
code_files = json.loads(dev_res.text)

for file_path, content in code_files.items():
    clean_path = os.path.normpath(file_path.lstrip("/"))
    if os.path.dirname(clean_path):
        os.makedirs(os.path.dirname(clean_path), exist_ok=True)
    
    with open(clean_path, "w", encoding="utf-8") as f:
        f.write(content)
    
    if clean_path.endswith(".sh"):
        os.chmod(clean_path, 0o755)
    print(f"  ✓ Created: {clean_path}")

# ---------------------------------------------------------------------------
# PHASE 3: COMMIT & OPEN PULL REQUEST
# ---------------------------------------------------------------------------
print("🚀 Committing changes and creating Pull Request...")

subprocess.run(["git", "config", "user.name", "Gemini Developer Agent"], check=False)
subprocess.run(["git", "config", "user.email", "agent@github.actions"], check=False)
subprocess.run(["git", "add", "."], check=False)

commit_msg = f"feat: {issue_title} (closes #{issue_num})\n\nStack: {plan.get('stack_chosen')}"
subprocess.run(["git", "commit", "-m", commit_msg], check=False)

print(f"⬆️ Pushing branch {branch_name} to origin...")
push_res = subprocess.run(["git", "push", "-u", "origin", branch_name, "--force"], check=False)

pr_body = f"""
## 🤖 Automated Solution for #{issue_num}

### 🛠️ Architecture & Stack
* **Language & Framework:** `{plan.get('stack_chosen')}`
* **Category:** `{plan.get('project_type')}`

### 📝 Summary
{plan.get('summary')}

### 📦 Key Files Added:
{', '.join([f'`{k}`' for k in list(code_files.keys())])}

---
*Once merged into `main`, GitHub Actions will automatically trigger the universal build pipeline to publish live web previews (GitHub Pages) or downloadable release binaries/APKs.*

Closes #{issue_num}
"""

print("📬 Creating GitHub Pull Request...")
pr_create_res = subprocess.run([
    "gh", "pr", "create",
    "--repo", repo,
    "--title", f"Feature: {issue_title}",
    "--body", pr_body,
    "--head", branch_name,
    "--base", "main"
], capture_output=True, text=True, check=False)

pr_url = pr_create_res.stdout.strip()
print(f"PR output: {pr_url}")

# Post completion notification directly on the issue
completion_comment = f"✅ **Developer Agent has completed the implementation!**\n\nPull Request is ready for your review: {pr_url}\n\nMerge it into `main` to trigger the live preview."
subprocess.run(["gh", "issue", "comment", str(issue_num), "--repo", repo, "--body", completion_comment], check=False)

print("🎉 Everything finished successfully!")

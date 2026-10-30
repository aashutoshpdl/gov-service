# स्थानीय वडा सिफारिस तथा नागरिक प्रमाणीकरण पोर्टल
## Digital Ward Sifaris & Citizen Verification Portal (Government of Nepal)

An authentic, production-grade Web Application adhering strictly to the **Nepal Government Design System** (#003893 Prussian Blue, #DC143C Crimson, and Mukta Devanagari typography). This portal empowers citizens across Nepal's 753 local bodies to apply for common ward recommendations (सिफारिस), track real-time approval stages, and generate print-ready verified certificates with QR verification.

---

### 🏛️ Features

1. **Official Government Design System & Identity:**
   - **Color Palette:** Prussian Blue (`#003893`), Crimson (`#DC143C`), Gold (`#D4AF37`), with fully semantic surfaces.
   - **Typography:** Mukta Google Font with comprehensive Devanagari & Latin glyph support.
   - **Bilingual Interface:** Instant seamless switching between नेपाली (Devanagari) and English.
   - **Dark / Light Theme:** Native theme toggling respecting accessibility and contrast.

2. **Ward Service Catalog (सिफारिस सेवा सूची):**
   - **नाता प्रमाणित सिफारिस** (Relationship Verification Certificate)
   - **अविवाहित प्रमाणपत्र सिफारिस** (Unmarried Legal Status Recommendation)
   - **चारकिल्ला प्रमाणित सिफारिस** (Property Boundary & Cadastral Certification)
   - **विद्युत मिटर जडान सिफारिस** (Electricity Meter Installation Sifaris)
   - **विपन्न नागरिक स्वास्थ्य उपचार सिफारिस** (Indigent Citizen Free Medical Subsidy Sifaris)
   - Detailed checklist of required documents, statutory fees, and turnaround times for each service.

3. **Multi-step Sifaris Application Wizard:**
   - **Step 1: Citizen Details** (Citizenship Number, Issuing District, Full Name in Nepali & English, Tole, Ward No).
   - **Step 2: Service-specific Inputs** (Dynamic family relation table with addition/deletion, or Land Plot / Kitta and directional boundaries).
   - **Step 3: Document Uploads** (Citizenship scan, Lalpurja / Tax clearance, and PP size photos).
   - **Step 4: Statutory Fee Breakdown & Declaration** (Calculation of government fees and submission generating a real tracking token e.g., `WRD-2083-0492`).

4. **Real-time Status Tracking & Workflow Stages:**
   - Interactive tracking with instant lookup by token.
   - Visual 5-stage progress timeline:
     1. `निवेदन दर्ता भएको` (Submitted)
     2. `कागजात प्रमाणीकरण` (Documents Verified)
     3. `वडा सचिव समीक्षा` (Ward Secretary Review)
     4. `वडा अध्यक्ष हस्ताक्षर` (Ward Chairperson Signature)
     5. `स्वीकृत र सिफारिस जारी` (Approved & Digitally Issued)
   - Demo tokens included for testing:
     - `WRD-2083-0492` (Approved with printable certificate)
     - `WRD-2083-0118` (In Secretary Review)
     - `WRD-2083-9901` (In Document Verification)

5. **Pixel-Perfect Printable Official Sifaris Letter:**
   - Exact Nepal municipal ward letterhead format featuring Coat of Arms, reference number, date in BS and AD, and official watermark.
   - Dynamic client-side QR Code verification linking the certificate token.
   - Official simulated ward round seal stamp and digital countersignature stamps.
   - Dedicated `@media print` CSS stylesheet for 1-click clean A4 paper printing without screen elements.

---

### 🚀 Quick Start / Deployment

Run the build script:
```bash
chmod +x build.sh
./build.sh
```

To view locally, simply open `index.html` in any modern web browser or serve via Python / HTTP server:
```bash
python3 -m http.server 8000
```
Visit `http://localhost:8000` to interact with the portal.

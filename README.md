# DPDP Act 2023 Compliance Engine & Privacy Shield Wireframe

[![Deploy Frontend to GitHub Pages](https://github.com/Sidhanth-Mandal/Privacy-Agent-Wireframe/actions/workflows/deploy.yml/badge.svg)](https://github.com/Sidhanth-Mandal/Privacy-Agent-Wireframe/actions/workflows/deploy.yml)
[![Live Demo on GitHub Pages](https://img.shields.io/badge/Demo-GitHub%20Pages-brightgreen?logo=github)](https://sidhanth-mandal.github.io/Privacy-Agent-Wireframe/)

An interactive, high-fidelity wireframe and prototype for an automated statutory privacy compliance engine built for the **Uttar Pradesh Comprehensive Socio-Economic, Caste & Family Welfare Survey (UP-SECS)** under the **Digital Personal Data Protection (DPDP) Act, 2023** and **DPDP Rules, 2025**.

---

## 🌐 Live Interactive Demo

🚀 **Experience the live wireframe on GitHub Pages:**  
👉 **[https://sidhanth-mandal.github.io/Privacy-Agent-Wireframe/](https://sidhanth-mandal.github.io/Privacy-Agent-Wireframe/)**

---

## 🧭 Application Walkthrough (5-Step Privacy Pipeline)

1. **Step 1: Connect Database & Discover Schema**
   - Connects to the primary PostgreSQL survey data platform over TLS 1.3.
   - Inspects catalog schemas (`survey_households`, `survey_members`, `survey_assets`) covering 173 technical attributes.
   - Live discovery animation and real-time SQL execution log modal.

2. **Step 2: Upload Documents & Survey Charter Ingestion**
   - Ingests official Gazette notifications and mission charters.
   - Active survey charter: [`SURVEY_MISSION_CHARTER_AND_POLICY_MANDATE.md`](./SURVEY_MISSION_CHARTER_AND_POLICY_MANDATE.md).
   - Natural language purpose extraction across 6 welfare statutory boundaries.

3. **Step 3: Survey Charter NLP Findings & Connection Health**
   - Displays parsed mission motto, constitutional competencies (Article 162, Aadhaar Act Sec 7).
   - Identifies preliminary compliance deficits in survey charter governance.

4. **Step 4: Statutory Audit & Compliance Results**
   - Complete 173-attribute statutory evaluation against DPDP Sections 6(1), 7, 8(3), 8(7), 8(8), 9(1), and Schedule 2.
   - Flagged non-compliant attributes (e.g. maternal health history, biometric marks, religious caste identifiers).
   - Interactive Attribute Detail Drawer displaying granular legal reasoning, section citations, and risk severity.

5. **Step 5: Remediation Complete & Audit Trail**
   - Automatic execution of DDL remediation scripts.
   - Generates sanitized production schemas (`survey_households_compliant_v1`).
   - Downloadable DPDP Statutory Compliance Certificate.

---

## 📄 Accompanying Demo Documents

This repository includes foundational technical and legal specifications:
* [**`SURVEY_MISSION_CHARTER_AND_POLICY_MANDATE.md`**](./SURVEY_MISSION_CHARTER_AND_POLICY_MANDATE.md) — Official Gazette extraordinary notification, mission motto, statutory backing, and purpose bounds.
* [**`DATABASE_ARCHITECTURE_AND_DATA_DICTIONARY_REPORT.md`**](./DATABASE_ARCHITECTURE_AND_DATA_DICTIONARY_REPORT.md) — Enterprise database architecture specification, ERD, and comprehensive data dictionary for 173 schema attributes.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite
- **Styling:** Tailwind CSS + PostCSS
- **Icons:** Lucide React
- **Effects:** Canvas Confetti
- **CI/CD:** GitHub Actions -> GitHub Pages

---

## 💻 Local Development Setup

To run the static wireframe locally:

```bash
# 1. Clone repository
git clone https://github.com/Sidhanth-Mandal/Privacy-Agent-Wireframe.git
cd Privacy-Agent-Wireframe/Frontend

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

To build production bundle:
```bash
npm run build
```

---

## ⚙️ CI/CD & GitHub Pages Configuration

Every push to `main` (or `master`) triggers `.github/workflows/deploy.yml` which:
1. Installs dependencies via `npm ci`
2. Builds the static React bundle using Vite
3. Publishes `./Frontend/dist` directly to GitHub Pages

### Initial GitHub Pages Setup (One-Time):
1. In your GitHub repository, navigate to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
3. Once pushed, the workflow automatically provisions and updates your site at:
   `https://<username>.github.io/<repository-name>/`

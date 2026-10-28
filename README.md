<div align="center">

  <img src="https://raw.githubusercontent.com/Donvero/ZAInnovate-Web/main/public/brand/zainnovate-banner.svg" alt="ZAInnovate Technologies Logo" width="100%" onerror="this.style.display='none'"/>

  # 🛡️ SAMS: Smart Audit Management System
  ### Predictive Governance & Supply Chain Irregularity Interception for the South African Public Sector

  <p align="center">
    <strong>Proprietary Flagship R&D of ZAInnovate Technologies (Pty) Ltd</strong><br>
    <em>100% Black Youth-Owned National Technology Studio • East London, South Africa • Reg: 2025/572318/07 • B-BBEE Level 1</em><br>
    <strong>"Engineering South Africa's Digital Backbone"</strong>
  </p>

  <p align="center">
    <a href="https://github.com/Donvero/ZAInnovate-SAMS/actions"><img src="https://img.shields.io/badge/Build-Passing-10B981?style=for-the-badge&logo=github-actions&logoColor=white" alt="Build Status"/></a>
    <a href="#compliance"><img src="https://img.shields.io/badge/Compliance-MFMA%20%7C%20PFMA%20%7C%20AGSA-0E1B2E?style=for-the-badge&labelColor=FFC20E&color=0E1B2E" alt="Compliance"/></a>
    <a href="#sovereign"><img src="https://img.shields.io/badge/Sovereignty-South%20Africa%20POPIA-1E3557?style=for-the-badge&logo=shield&logoColor=FFC20E" alt="Sovereignty"/></a>
    <a href="#b-bbee"><img src="https://img.shields.io/badge/B--BBEE-Level%201%20Contributor-FFC20E?style=for-the-badge&labelColor=0E1B2E&color=FFC20E" alt="B-BBEE Level 1"/></a>
  </p>

  <p align="center">
    <a href="#key-features">Key Features</a> •
    <a href="#system-architecture">Architecture</a> •
    <a href="#statutory-rulebook">Compliance Alignment</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#enterprise-roadmap">Roadmap</a>
  </p>
</div>

---

## 📌 Executive Summary

Every fiscal cycle, South African municipalities, provincial departments, and state entities incur tens of billions of Rands in **irregular, fruitless, and wasteful expenditure**, leading to adverse and qualified findings from the **Auditor-General of South Africa (AGSA)**.

**SAMS (Smart Audit Management System)** shifts public governance from **retrospective post-mortem investigation** to **proactive real-time interception**. 

Built with sovereign AI and high-precision pattern recognition, SAMS monitors supply chain management (SCM) requisitions, purchase orders, tender awards, and contract modifications at the moment of entry. It identifies statutory anomalies—such as split orders bypassing quotation thresholds, hidden conflicts of interest, and unapproved sole-source deviations—empowering Accounting Officers to rectify non-compliance before vouchers disburse and become formal audit findings.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        SAMS PREDICTIVE AUDIT RADAR PIPELINE                           │
├─────────────────────────┬────────────────────────────┬─────────────────────────────────┤
│    DATA INGESTION       │     PREDICTIVE RADAR       │       AO INTERVENTION           │
│  • Sebata / Munsoft     │   • Split-Tender Cluster   │  • Certificate of Debt Shield   │
│  • SAP / Oracle SCM     │   • CIPC Directorship Link │  • Real-time Early Alerts       │
│  • National CSD Feeds   │   • Persal State Emp Check │  • Pre-audit Dossier Export     │
│  • SARS Compliance PIN  │   • S116(3) Variation Gate │  • AGSA Clean Audit Readiness   │
└─────────────────────────┴────────────────────────────┴─────────────────────────────────┘
```

---

## ✨ Flagship Capabilities & Features

### 1. Split-Tender Threshold Detection (DBSCAN Clustering)
- Detects deliberate fragmentation of procurement orders designed to stay under the statutory **R200,000 competitive quotation threshold** or **R1,000,000 tender requirement**.
- Cross-temporal rolling window analysis (24h, 72h, 30d) across shared cost centers, ledger categories, and vendor relationships.

### 2. State Employee & Prohibited Award Radar (SCM Reg 44)
- Direct cryptographic validation against the **State Persal Payroll System** and **CIPC Company Registry**.
- Flags tenders or purchase orders where directors, shareholders, or close family members are employed by organs of state.

### 3. Contract Expansion & Variation Sentry (MFMA Section 116(3))
- Automated gatekeeper tracking contract variations.
- Instantly halts amendments exceeding **15% (goods and general services)** or **20% (construction and civil infrastructure)** without prior council or treasury sanction.

### 4. Sole-Source & Deviation Anomaly Engine
- Scrutinizes single-source deviations and emergency procurement invocations against National Treasury SCM Instruction Notes and Treasury Regulation 16A6.4.

### 5. Automated AGSA Clean Audit Readiness Scorecard
- Computes real-time **Material Irregularity (MI)** exposure risk and produces instantaneous audit evidence packs adhering to AGSA formats.

---

## 🏛️ Statutory Compliance Mapping

| Legislation | Statutory Section | SAMS Safeguard Mechanism |
| :--- | :--- | :--- |
| **MFMA (Act 56 of 2003)** | Section 116(3) | Automatic ceiling enforcement on contract amendments and extensions. |
| **PFMA (Act 1 of 1999)** | Section 38(1)(a)(iii) | Enforces internal controls that prevent irregular expenditure before disbursement. |
| **Municipal SCM Regulations** | Regulation 44 | Direct blocker on awards to persons in service of the state. |
| **Public Audit Act** | Material Irregularity (MI) | Shields Accounting Officers against personal liability and Certificates of Debt. |
| **POPIA (Act 4 of 2013)** | Personal Data Protection | Pseudonymized Persal ID hashing and sovereign on-prem / local-cloud residency. |

---

## 🏗️ Architecture & Data Model

SAMS operates on an enterprise-grade modular architecture:

```
src/
├── app/
│   ├── api/
│   │   └── health/route.ts        # Sovereign telemetry & system health check
│   ├── globals.css                # ZAInnovate Navy (#0E1B2E) & Gold (#FFC20E) styling
│   ├── layout.tsx                 # Root layout with public sector compliance header
│   └── page.tsx                   # Executive Predictive Dashboard
├── components/
│   └── dashboard/
│       ├── AlertsTable.tsx        # Real-time SCM anomaly radar & statutory filter
│       ├── RiskChart.tsx          # 6-month predictive interception & category breakdown
│       └── StatsCard.tsx          # Metric cards with trend analysis & currency indicators
├── lib/
│   └── db.ts                      # Prisma client singleton with connection pooling
└── prisma/
    └── schema.prisma              # Data models: User, Department, Tender, SCMEntry, RiskFlag, Alert
```

---

## 💻 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, React Server Components)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/) (Strict type-checking)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with ZAInnovate sovereign color tokens
- **Database & ORM**: PostgreSQL 16 + [Prisma ORM](https://www.prisma.io/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Visual Analytics**: Interactive responsive SVG & Chart components
- **Security & Identity**: [NextAuth.js](https://next-auth.js.org/) with government SSO & MFA

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or 20+
- PostgreSQL instance running locally or on a private sovereign network
- npm or pnpm

### 1. Clone the repository
```bash
git clone https://github.com/Donvero/ZAInnovate-SAMS.git
cd ZAInnovate-SAMS
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
```bash
cp .env.example .env
```
Update `DATABASE_URL` with your local PostgreSQL connection string.

### 4. Run database migrations
```bash
npx prisma generate
npx prisma db push
```

### 5. Launch development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗺️ Product Roadmap

- [x] Predictive SCM early warning engine scaffolding
- [x] MFMA Section 116(3) contract variation monitor
- [x] Persal & CIPC conflict-of-interest cross-referencing logic
- [ ] Direct bi-directional ETL connectors for Munsoft and Sebata EMS
- [ ] Multilingual voice briefing for Accounting Officers (isiXhosa, Zulu, Afrikaans, English)
- [ ] National Treasury Transversal Contract benchmarking vector database

---

## 🏢 Corporate Governance

**ZAInnovate Technologies (Pty) Ltd**  
- **Registration**: 2025/572318/07  
- **B-BBEE Status**: Level 1 Contributor (100% Black Youth Owned)  
- **Headquarters**: East London, Eastern Cape, South Africa  
- **Mission**: *"Engineering South Africa's Digital Backbone"*  
- **Email**: `procurement@zainnovate.co.za` | `contact@zainnovate.co.za`  

---

<div align="center">
  <sub>SAMS is proprietary software engineered by ZAInnovate Technologies (Pty) Ltd. Designed for South African National, Provincial, and Municipal Organs of State.</sub>
</div>

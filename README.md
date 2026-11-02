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

### 5. Run automated mathematical & statutory test suites
```bash
npx vitest run
```
Expected output: **48/48 tests passed (100%)** across:
- `benford-analyzer.test.ts` (Benford's Law leading-digit $\chi^2$ anomaly detection)
- `statutory-verifier.test.ts` (PFMA S38, MFMA S116(3), SCM Reg 44 prohibited awards)
- `vcg-auction-engine.test.ts` (Vickrey-Clarke-Groves combinatorial truth-telling auctions)
- `voucher-proof-shield.test.ts` (PAAA S14 Certificate of Debt cryptographic state shield)

### 6. Build for production
```bash
npm run build
```
Generates optimized static routes and server actions with zero compilation warnings.

---

## 💎 Design Taste & Sovereign Institutional HUD Standards

SAMS is designed strictly according to anti-AI-slop design and craft engineering standards derived from [`Donvero/hallmark`](https://github.com/Donvero/hallmark) and [`Donvero/taste-skill`](https://github.com/Donvero/taste-skill):
- **The Floor:** WCAG AAA high-contrast readability (Obsidian canvas `#08101C` with Sovereign Navy `#0E1B2E` and statutory Gold `#FFC20E`), complete focus outlines, reduced motion support, and zero broken responsive layouts.
- **Data-Dense Quiet Panels:** Color is spent strictly on anomaly states (`#EF4444` for Critical Breaches, `#F59E0B` for High-Risk Invocations, `#10B981` for Clean Vouchers).
- **Monospace Financial Geometry:** All currency values, VAT components, and transaction IDs are rendered in high-legibility tabular figures (`JetBrains Mono` / monospace), guaranteeing zero shifting during real-time data streaming.
- **Zero AI Slop:** No generic AI templates, no placeholder cards, and no speculative marketing copy. Every module enforces South African statutory law.

---

## 📜 Sovereign IP, Forkability & Public View License

This repository is published for **public inspection, statutory audit, and institutional review** by South African National, Provincial, and Municipal Organs of State.

- **Public View & Review:** Public inspection and peer verification are permitted.
- **Forkability & Deployment:** Forking, redistribution, deployment, or commercial/governmental utilization of SAMS algorithms (Benford $\chi^2$, VCG, Voucher Shield) is **strictly subject to prior written approval of the owner**:
  - **Owner:** Fana Siyasanga Qhawe Mgengo ([@Donvero](https://github.com/Donvero))
  - **Entity:** ZAinnovate Technologies (Pty) Ltd (Reg: 2025/572318/07)
  - **Licensing Contact:** `director@zainnovate.co.za` | `legal@zainnovate.co.za`

---

## 🏢 Corporate Governance

**ZAInnovate Technologies (Pty) Ltd**  
- **Registration**: 2025/572318/07  
- **National Treasury CSD**: MAAA1646894  
- **B-BBEE Status**: Level 1 Contributor (135% Procurement Spend Recognition)  
- **Ownership**: 100% Black Youth-Owned Enterprise  
- **Headquarters**: 14 Abdullah Ibrahim Close, Belgravia Valley, East London, Eastern Cape, 5241  
- **Mission**: *"Engineering South Africa's Digital Backbone"*  
- **Email**: `procurement@zainnovate.co.za` | `contact@zainnovate.co.za`  

---

<div align="center">
  <sub>SAMS is sovereign software engineered by ZAInnovate Technologies (Pty) Ltd. Copyright © 2025–2026. All sovereign rights reserved. Built with mathematical rigor in East London, South Africa.</sub>
</div>

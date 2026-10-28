# Contributing to SAMS (Smart Audit Management System)

Thank you for your interest in contributing to **SAMS**, engineered by **ZAInnovate Technologies (Pty) Ltd** — a 100% Black Youth-Owned National Technology Studio based in East London, Eastern Cape, South Africa.

Our mission is *"Engineering South Africa's Digital Backbone"*. To preserve sovereign integrity, institutional reliability, and strict adherence to South African public finance statutes, all contributors are expected to uphold these guidelines.

---

## 1. Code of Conduct & Ethical Commitments

As an enterprise public sector platform handling statutory governance and anti-corruption auditing tooling:
1. **Zero Tolerance for Backdoors or Obfuscated Logic**: All logic altering compliance scoring or audit flagging must be 100% transparent and deterministic.
2. **POPIA Adherence**: Never commit mock data featuring authentic South African Identity Numbers (RSA ID), banking details, or real vendor tax PINs. Always utilize synthetic test data generators.
3. **Respect & Professionalism**: We cultivate an inclusive, high-performance environment supporting youth innovation across South Africa and the African continent.

---

## 2. Development Workflow

### 2.1 Branch Conventions
- Feature branches: `feat/issue-number-short-description`
- Bug fixes: `fix/issue-number-short-description`
- Compliance rule updates: `compliance/mfma-sec-116-rule-update`
- Documentation: `docs/architecture-revision`

### 2.2 Commit Message Standards
We follow conventional commit specifications:
- `feat(radar): add split-tender temporal clustering scanner`
- `fix(scm): resolve CSD tax pin validation status handling`
- `perf(prisma): optimize multi-tenant municipal query index`
- `docs(arch): update AGSA material irregularity workflow diagram`

### 2.3 Pull Request Lifecycle
1. Fork and clone the repository.
2. Create your branch from `main`.
3. Ensure TypeScript strict checking passes without warnings: `npm run lint`.
4. Validate schema migrations if touching `prisma/schema.prisma`.
5. Submit your PR detailing:
   - Summary of change
   - Statutory compliance impact (e.g. MFMA/PFMA impact)
   - Test plan & synthetic data verification
   - Security considerations

---

## 3. Contact & Security Reporting

For responsible vulnerability disclosures regarding public sector security vulnerabilities:
- **Email**: `security@zainnovate.co.za`
- **Location**: ZAInnovate Technologies, East London, Eastern Cape, South Africa
- **Reg**: 2025/572318/07 | B-BBEE Level 1 Contributor

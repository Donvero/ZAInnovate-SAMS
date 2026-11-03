# SAMS

Smart Audit Management System for procurement risk and public-sector governance.

SAMS evaluates supply-chain events against explicit statutory and organisational rules, records risk indicators, and assembles evidence for human review. It is intended for South African departments, municipalities, and public entities that need earlier intervention and a defensible audit trail.

## Current scope

- Next.js App Router, TypeScript, Prisma, and PostgreSQL.
- Rule-based statutory verification.
- Voucher and procurement anomaly analysis.
- Risk flags, audit records, and evidence-oriented workflows.
- Tests for statutory verification, Benford analysis, VCG analysis, and voucher proof checks.

## Development

```bash
npm ci
npm run dev
npm test
npm run build
```

Configure the database before exercising persistence. Keep strict TypeScript enabled and use synthetic data for identity numbers, tax identifiers, banking details, and vendor records.

## Governance rules

- Make every compliance rule explicit, versioned, and testable.
- Keep inputs, rule versions, scores, overrides, and evidence linked.
- Never hide, delete, or silently rewrite an audit decision.
- Surface uncertainty and route material findings to a human reviewer.
- Protect personal information under POPIA and minimise access by role.
- Treat automated output as decision support, not an unreviewable verdict.

## License

See `LICENSE`.

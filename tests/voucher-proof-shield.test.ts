import { describe, it, expect } from "vitest";
import { createHash } from "crypto";
import {
  VoucherProofShield,
  ExpenditureVoucher,
  ProofNode,
  VoucherImmunityCertificate,
} from "@/lib/engine/voucher-proof-shield";

describe("VoucherProofShield", () => {
  const futureExpiry = new Date(Date.now() + 180 * 24 * 3600 * 1000); // 180 days in future
  const pastExpiry = new Date(Date.now() - 30 * 24 * 3600 * 1000); // 30 days in past

  const validVoucher: ExpenditureVoucher = {
    voucherId: "VCH-2026-90412",
    orderNumber: "PO-BCM-2026-00441",
    payeeVendorId: "VND-ZA-99120",
    payeeName: "Khulisa Engineering & Construction (Pty) Ltd",
    grossAmountZAR: 1450000.0,
    voteNumber: "VOTE-INFRA-4401",
    departmentCode: "ENG-METRO",
    cidbGradeRequired: "5CE",
    vendorCidbGrade: "6CE", // Grade 6 >= 5
    taxCompliancePin: "9A12B884C0",
    taxPinExpiryDate: futureExpiry,
    csdSupplierNumber: "MAAA0049182",
    csdVerified: true,
    hasMandatorySBD4: true,
    hasMandatorySBD6_1: true,
    hasSection37_2Agreement: true,
    isSingleSourceDeviation: false,
  };

  describe("5-Rule Statutory Proof Tree Verification", () => {
    it("should issue AUTHORIZED_IMMUNE certificate when 100% of statutory rules pass", () => {
      const certificate: VoucherImmunityCertificate = VoucherProofShield.verifyAndImmunize(validVoucher);

      expect(certificate.voucherId).toBe(validVoucher.voucherId);
      expect(certificate.totalVoucherValueZAR).toBe(1450000.0);
      expect(certificate.accountingOfficerAction).toBe("AUTHORIZED_IMMUNE");
      expect(certificate.summaryVerdict).toContain("VERIFIED STATUTORY IMMUNITY");
      expect(certificate.legalIndemnityStatement).toContain("insulating the Accounting Officer against personal surcharge");

      // Verify all 5 proof nodes passed
      expect(certificate.proofTree).toHaveLength(5);
      expect(certificate.proofTree.every((node) => node.passed)).toBe(true);
      expect(certificate.proofTree.every((node) => node.personalLiabilityRisk === "ZERO")).toBe(true);

      const ruleCodes = certificate.proofTree.map((n) => n.ruleCode);
      expect(ruleCodes).toEqual([
        "SARS_TCS_01",
        "CSD_REG_02",
        "SBD4_DEC_03",
        "MFMA_DEV_04",
        "CIDB_VAL_05",
      ]);
    });

    it("should HARD-BLOCK payment and flag CRITICAL personal liability if SARS Tax PIN is expired", () => {
      const expiredTaxVoucher: ExpenditureVoucher = {
        ...validVoucher,
        taxPinExpiryDate: pastExpiry,
      };

      const cert = VoucherProofShield.verifyAndImmunize(expiredTaxVoucher);
      expect(cert.accountingOfficerAction).toBe("REJECTED_BLOCKED");
      expect(cert.summaryVerdict).toContain("PAYMENT HARD-BLOCKED");

      const taxNode = cert.proofTree.find((n) => n.ruleCode === "SARS_TCS_01");
      expect(taxNode).toBeDefined();
      expect(taxNode?.passed).toBe(false);
      expect(taxNode?.personalLiabilityRisk).toBe("CRITICAL");
      expect(taxNode?.failureReason).toContain("Tax Compliance PIN is expired");
    });

    it("should HARD-BLOCK payment if SARS Tax PIN is blank or whitespace", () => {
      const blankTaxVoucher: ExpenditureVoucher = {
        ...validVoucher,
        taxCompliancePin: "   ",
      };

      const cert = VoucherProofShield.verifyAndImmunize(blankTaxVoucher);
      expect(cert.accountingOfficerAction).toBe("REJECTED_BLOCKED");
      const taxNode = cert.proofTree.find((n) => n.ruleCode === "SARS_TCS_01");
      expect(taxNode?.passed).toBe(false);
    });

    it("should HARD-BLOCK payment if CSD supplier number does not start with MAAA", () => {
      const invalidCsdVoucher: ExpenditureVoucher = {
        ...validVoucher,
        csdSupplierNumber: "SUPPLIER123", // Non-compliant CSD number
      };

      const cert = VoucherProofShield.verifyAndImmunize(invalidCsdVoucher);
      expect(cert.accountingOfficerAction).toBe("REJECTED_BLOCKED");
      const csdNode = cert.proofTree.find((n) => n.ruleCode === "CSD_REG_02");
      expect(csdNode?.passed).toBe(false);
      expect(csdNode?.failureReason).toContain("Vendor CSD registration invalid or unverified");
    });

    it("should HARD-BLOCK payment if CSD status is unverified", () => {
      const unverifiedCsdVoucher: ExpenditureVoucher = {
        ...validVoucher,
        csdVerified: false,
      };

      const cert = VoucherProofShield.verifyAndImmunize(unverifiedCsdVoucher);
      expect(cert.accountingOfficerAction).toBe("REJECTED_BLOCKED");
      const csdNode = cert.proofTree.find((n) => n.ruleCode === "CSD_REG_02");
      expect(csdNode?.passed).toBe(false);
    });

    it("should HARD-BLOCK payment when SBD 4 Declaration of Interest is missing", () => {
      const missingSbd4Voucher: ExpenditureVoucher = {
        ...validVoucher,
        hasMandatorySBD4: false,
      };

      const cert = VoucherProofShield.verifyAndImmunize(missingSbd4Voucher);
      expect(cert.accountingOfficerAction).toBe("REJECTED_BLOCKED");
      const sbdNode = cert.proofTree.find((n) => n.ruleCode === "SBD4_DEC_03");
      expect(sbdNode?.passed).toBe(false);
      expect(sbdNode?.failureReason).toContain("Missing statutory SBD 4");
    });

    it("should HARD-BLOCK unratified single-source deviations under MFMA SCM Reg 36", () => {
      const unapprovedDeviation: ExpenditureVoucher = {
        ...validVoucher,
        isSingleSourceDeviation: true,
        singleSourceApprovedByCouncil: false,
      };

      const cert = VoucherProofShield.verifyAndImmunize(unapprovedDeviation);
      expect(cert.accountingOfficerAction).toBe("REJECTED_BLOCKED");
      const devNode = cert.proofTree.find((n) => n.ruleCode === "MFMA_DEV_04");
      expect(devNode?.passed).toBe(false);
      expect(devNode?.failureReason).toContain("Unapproved sole-source deviation");
    });

    it("should AUTHORIZE single-source deviations that are formally ratified by council", () => {
      const approvedDeviation: ExpenditureVoucher = {
        ...validVoucher,
        isSingleSourceDeviation: true,
        singleSourceApprovedByCouncil: true,
      };

      const cert = VoucherProofShield.verifyAndImmunize(approvedDeviation);
      expect(cert.accountingOfficerAction).toBe("AUTHORIZED_IMMUNE");
      const devNode = cert.proofTree.find((n) => n.ruleCode === "MFMA_DEV_04");
      expect(devNode?.passed).toBe(true);
    });

    it("should HARD-BLOCK payment if vendor CIDB grade is insufficient for project grade", () => {
      const deficientCidb: ExpenditureVoucher = {
        ...validVoucher,
        cidbGradeRequired: "7CE",
        vendorCidbGrade: "4CE", // Grade 4 < Grade 7
      };

      const cert = VoucherProofShield.verifyAndImmunize(deficientCidb);
      expect(cert.accountingOfficerAction).toBe("REJECTED_BLOCKED");
      const cidbNode = cert.proofTree.find((n) => n.ruleCode === "CIDB_VAL_05");
      expect(cidbNode?.passed).toBe(false);
      expect(cidbNode?.failureReason).toContain("Vendor CIDB grading insufficient");
    });

    it("should evaluate 4 rules when CIDB grade is not required (non-infrastructure services)", () => {
      const professionalServicesVoucher: ExpenditureVoucher = {
        ...validVoucher,
        cidbGradeRequired: undefined,
        vendorCidbGrade: undefined,
      };

      const cert = VoucherProofShield.verifyAndImmunize(professionalServicesVoucher);
      expect(cert.proofTree).toHaveLength(4);
      expect(cert.accountingOfficerAction).toBe("AUTHORIZED_IMMUNE");
    });
  });

  describe("Cryptographic SHA-256 Proof Generation & Tamper Detection", () => {
    it("should generate 64-character hex cryptographic proof hash and Merkle root", () => {
      const cert = VoucherProofShield.verifyAndImmunize(validVoucher);

      // Verify SHA-256 64-char lowercase hex
      expect(cert.cryptographicProofHash).toMatch(/^[a-f0-9]{64}$/);
      expect(cert.merkleRoot).toMatch(/^[a-f0-9]{64}$/);

      // Verify Merkle chaining: Merkle Root = SHA-256(proofHash + orderNumber)
      const expectedMerkleRoot = createHash("sha256")
        .update(cert.cryptographicProofHash + validVoucher.orderNumber)
        .digest("hex");
      expect(cert.merkleRoot).toBe(expectedMerkleRoot);
    });

    it("should produce a different Merkle root if the order number or proof hash is tampered with", () => {
      const cert = VoucherProofShield.verifyAndImmunize(validVoucher);

      // Tampered order number
      const tamperedRoot = createHash("sha256")
        .update(cert.cryptographicProofHash + "PO-TAMPERED-999")
        .digest("hex");

      expect(cert.merkleRoot).not.toBe(tamperedRoot);
    });

    it("should produce different cryptographic proof hashes for distinct vouchers", () => {
      const voucher1 = { ...validVoucher, voucherId: "VCH-001", grossAmountZAR: 100000 };
      const voucher2 = { ...validVoucher, voucherId: "VCH-002", grossAmountZAR: 200000 };

      const cert1 = VoucherProofShield.verifyAndImmunize(voucher1);
      const cert2 = VoucherProofShield.verifyAndImmunize(voucher2);

      expect(cert1.cryptographicProofHash).not.toBe(cert2.cryptographicProofHash);
      expect(cert1.merkleRoot).not.toBe(cert2.merkleRoot);
    });
  });
});

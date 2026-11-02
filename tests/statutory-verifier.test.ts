import { describe, it, expect } from "vitest";
import {
  StatutoryRegulatorySolver,
  PurchaseOrder,
  SplitTenderAnomaly,
  PreferencePointEvaluation,
} from "@/lib/engine/statutory-verifier";

describe("StatutoryRegulatorySolver", () => {
  describe("detectSplitTenders (MFMA SCM Reg 12(1)(c) & PFMA S38)", () => {
    const baseDate = new Date("2026-03-01T08:00:00Z");

    it("should flag consecutive purchase orders under R200,000 aggregating to >= R200,000 within 30 days as CRITICAL", () => {
      const orders: PurchaseOrder[] = [
        {
          orderId: "PO-2026-001",
          vendorId: "VND-4412",
          vendorName: "Apex Civils (Pty) Ltd",
          amountZAR: 195000,
          issueDate: new Date("2026-03-02T10:00:00Z"),
          category: "ROAD_SURFACING",
          description: "Bitumen patch repair Segment A",
          departmentId: "DEPT-INFRA",
        },
        {
          orderId: "PO-2026-002",
          vendorId: "VND-4412",
          vendorName: "Apex Civils (Pty) Ltd",
          amountZAR: 198000,
          issueDate: new Date("2026-03-12T14:00:00Z"),
          category: "ROAD_SURFACING",
          description: "Bitumen patch repair Segment B",
          departmentId: "DEPT-INFRA",
        },
        {
          orderId: "PO-2026-003",
          vendorId: "VND-4412",
          vendorName: "Apex Civils (Pty) Ltd",
          amountZAR: 180000,
          issueDate: new Date("2026-03-20T09:30:00Z"),
          category: "ROAD_SURFACING",
          description: "Bitumen patch repair Segment C",
          departmentId: "DEPT-INFRA",
        },
      ];

      const anomalies: SplitTenderAnomaly[] = StatutoryRegulatorySolver.detectSplitTenders(orders);

      expect(anomalies).toHaveLength(1);
      const anomaly = anomalies[0];
      expect(anomaly.vendorId).toBe("VND-4412");
      expect(anomaly.vendorName).toBe("Apex Civils (Pty) Ltd");
      expect(anomaly.orderCount).toBe(3);
      expect(anomaly.totalAggregatedZAR).toBe(573000);
      expect(anomaly.severity).toBe("CRITICAL");
      expect(anomaly.statutoryViolation).toContain("PFMA S38(1)(a)(iii)");
      expect(anomaly.statutoryViolation).toContain("MFMA SCM Reg 12(1)(c)");
      expect(anomaly.recommendedAction).toContain("Internal Audit");
      expect(anomaly.orders).toHaveLength(3);
    });

    it("should NOT flag orders that are spaced beyond the 30-day time window", () => {
      const orders: PurchaseOrder[] = [
        {
          orderId: "PO-JAN-01",
          vendorId: "VND-8890",
          vendorName: "Eastern Cape IT Supplies",
          amountZAR: 150000,
          issueDate: new Date("2026-01-05T08:00:00Z"),
          category: "HARDWARE_MAINTENANCE",
          description: "Server RAM upgrades",
          departmentId: "DEPT-ICT",
        },
        {
          orderId: "PO-MAR-01",
          vendorId: "VND-8890",
          vendorName: "Eastern Cape IT Supplies",
          amountZAR: 160000,
          issueDate: new Date("2026-03-15T08:00:00Z"), // 69 days later
          category: "HARDWARE_MAINTENANCE",
          description: "SSD Storage additions",
          departmentId: "DEPT-ICT",
        },
      ];

      const anomalies = StatutoryRegulatorySolver.detectSplitTenders(orders, 30);
      expect(anomalies).toHaveLength(0);
    });

    it("should NOT flag orders when an individual order already exceeds R200,000", () => {
      // If an order is >= R200k, it goes through formal competitive bidding and is not split to evade threshold
      const orders: PurchaseOrder[] = [
        {
          orderId: "PO-LG-01",
          vendorId: "VND-7711",
          vendorName: "Kalo Heavy Plant",
          amountZAR: 250000,
          issueDate: new Date("2026-03-05T08:00:00Z"),
          category: "PLANT_HIRE",
          description: "Excavator monthly rental",
          departmentId: "DEPT-INFRA",
        },
        {
          orderId: "PO-LG-02",
          vendorId: "VND-7711",
          vendorName: "Kalo Heavy Plant",
          amountZAR: 180000,
          issueDate: new Date("2026-03-15T08:00:00Z"),
          category: "PLANT_HIRE",
          description: "Grader rental",
          departmentId: "DEPT-INFRA",
        },
      ];

      const anomalies = StatutoryRegulatorySolver.detectSplitTenders(orders);
      expect(anomalies).toHaveLength(0);
    });

    it("should NOT flag orders when aggregated total is below R200,000", () => {
      const orders: PurchaseOrder[] = [
        {
          orderId: "PO-SM-01",
          vendorId: "VND-2211",
          vendorName: "Quick Print Co",
          amountZAR: 45000,
          issueDate: new Date("2026-03-01T08:00:00Z"),
          category: "PRINTING",
          description: "Annual reports printing",
          departmentId: "DEPT-COMM",
        },
        {
          orderId: "PO-SM-02",
          vendorId: "VND-2211",
          vendorName: "Quick Print Co",
          amountZAR: 55000,
          issueDate: new Date("2026-03-10T08:00:00Z"),
          category: "PRINTING",
          description: "Council flyers printing",
          departmentId: "DEPT-COMM",
        },
      ];

      const anomalies = StatutoryRegulatorySolver.detectSplitTenders(orders);
      expect(anomalies).toHaveLength(0);
    });

    it("should keep distinct vendor and category groups separate", () => {
      const orders: PurchaseOrder[] = [
        {
          orderId: "PO-V1-01",
          vendorId: "VND-100",
          vendorName: "Vendor One",
          amountZAR: 120000,
          issueDate: new Date("2026-03-01T08:00:00Z"),
          category: "CAT-A",
          description: "Item A1",
          departmentId: "DEPT-A",
        },
        {
          orderId: "PO-V2-01",
          vendorId: "VND-200",
          vendorName: "Vendor Two",
          amountZAR: 120000,
          issueDate: new Date("2026-03-02T08:00:00Z"),
          category: "CAT-A",
          description: "Item A2",
          departmentId: "DEPT-A",
        },
      ];

      const anomalies = StatutoryRegulatorySolver.detectSplitTenders(orders);
      expect(anomalies).toHaveLength(0);
    });
  });

  describe("calculatePreferencePoints (PPPFA 2022 Regulations)", () => {
    describe("80/20 Preference Point System", () => {
      it("should award maximum 80 price points to the lowest responsive bidder", () => {
        const evaluation: PreferencePointEvaluation = StatutoryRegulatorySolver.calculatePreferencePoints(
          "Alpha Suppliers",
          1000000,
          1000000,
          20,
          "80_20"
        );

        expect(evaluation.system).toBe("80_20");
        expect(evaluation.pricePoints).toBe(80);
        expect(evaluation.preferencePoints).toBe(20);
        expect(evaluation.totalPoints).toBe(100);
      });

      it("should accurately scale price points for higher bids using Ps = 80 * (1 - (Pt - Pmin)/Pmin)", () => {
        // Pt = 1,100,000, Pmin = 1,000,000 -> variance = 0.10 -> Ps = 80 * (1 - 0.10) = 72
        const evaluation = StatutoryRegulatorySolver.calculatePreferencePoints(
          "Beta Traders",
          1100000,
          1000000,
          18,
          "80_20"
        );

        expect(evaluation.pricePoints).toBe(72);
        expect(evaluation.preferencePoints).toBe(18);
        expect(evaluation.totalPoints).toBe(90);
      });

      it("should cap specific goals points at 20 and clamp lower bound to 0", () => {
        const overClaimed = StatutoryRegulatorySolver.calculatePreferencePoints(
          "Gamma Corp",
          1000000,
          1000000,
          35, // Over 20
          "80_20"
        );
        expect(overClaimed.preferencePoints).toBe(20);
        expect(overClaimed.totalPoints).toBe(100);

        const negativeGoals = StatutoryRegulatorySolver.calculatePreferencePoints(
          "Gamma Corp",
          1000000,
          1000000,
          -5,
          "80_20"
        );
        expect(negativeGoals.preferencePoints).toBe(0);
        expect(negativeGoals.totalPoints).toBe(80);
      });

      it("should clamp price points to 0 when bid is double or more than lowest bid", () => {
        // Pt = 2,500,000, Pmin = 1,000,000 -> variance = 1.5 -> raw = 80 * (1 - 1.5) = -40 -> clamped to 0
        const extremeBid = StatutoryRegulatorySolver.calculatePreferencePoints(
          "Outlier Holdings",
          2500000,
          1000000,
          20,
          "80_20"
        );
        expect(extremeBid.pricePoints).toBe(0);
        expect(extremeBid.totalPoints).toBe(20);
      });
    });

    describe("90/10 Preference Point System", () => {
      it("should award maximum 90 price points to the lowest responsive bidder", () => {
        const evaluation = StatutoryRegulatorySolver.calculatePreferencePoints(
          "Consortium One",
          50000000,
          50000000,
          10,
          "90_10"
        );

        expect(evaluation.system).toBe("90_10");
        expect(evaluation.pricePoints).toBe(90);
        expect(evaluation.preferencePoints).toBe(10);
        expect(evaluation.totalPoints).toBe(100);
      });

      it("should accurately scale price points in 90/10 system with 10% maximum goals", () => {
        // Pt = 55,000,000, Pmin = 50,000,000 -> variance = 0.10 -> Ps = 90 * (1 - 0.10) = 81
        const evaluation = StatutoryRegulatorySolver.calculatePreferencePoints(
          "Consortium Two",
          55000000,
          50000000,
          8,
          "90_10"
        );

        expect(evaluation.pricePoints).toBe(81);
        expect(evaluation.preferencePoints).toBe(8);
        expect(evaluation.totalPoints).toBe(89);
      });

      it("should cap specific goals points at 10 in 90/10 system", () => {
        const overClaimed = StatutoryRegulatorySolver.calculatePreferencePoints(
          "Bidder Three",
          50000000,
          50000000,
          15,
          "90_10"
        );
        expect(overClaimed.preferencePoints).toBe(10);
        expect(overClaimed.totalPoints).toBe(100);
      });
    });
  });

  describe("verifyContractVariation (MFMA Section 116(3))", () => {
    describe("Goods and Services (Statutory Threshold: 15%)", () => {
      it("should pass compliance when variation is within 15%", () => {
        const result = StatutoryRegulatorySolver.verifyContractVariation(
          1000000,
          150000, // 15.00%
          false
        );

        expect(result.variationPercentage).toBe(15);
        expect(result.thresholdPercentage).toBe(15);
        expect(result.isCompliant).toBe(true);
        expect(result.requiresCouncilPublicParticipation).toBe(false);
        expect(result.statutoryRef).toContain("MFMA Section 116(3)");
      });

      it("should fail compliance and require public participation when variation exceeds 15%", () => {
        const result = StatutoryRegulatorySolver.verifyContractVariation(
          1000000,
          150100, // 15.01%
          false
        );

        expect(result.variationPercentage).toBe(15.01);
        expect(result.thresholdPercentage).toBe(15);
        expect(result.isCompliant).toBe(false);
        expect(result.requiresCouncilPublicParticipation).toBe(true);
      });
    });

    describe("Infrastructure and Construction (Statutory Threshold: 20%)", () => {
      it("should pass compliance when variation is within 20%", () => {
        const result = StatutoryRegulatorySolver.verifyContractVariation(
          10000000,
          1800000, // 18.00%
          true
        );

        expect(result.variationPercentage).toBe(18);
        expect(result.thresholdPercentage).toBe(20);
        expect(result.isCompliant).toBe(true);
        expect(result.requiresCouncilPublicParticipation).toBe(false);
      });

      it("should pass compliance at the exact 20% statutory boundary", () => {
        const result = StatutoryRegulatorySolver.verifyContractVariation(
          10000000,
          2000000, // 20.00%
          true
        );

        expect(result.variationPercentage).toBe(20);
        expect(result.isCompliant).toBe(true);
        expect(result.requiresCouncilPublicParticipation).toBe(false);
      });

      it("should fail compliance and trigger council public participation when variation exceeds 20%", () => {
        const result = StatutoryRegulatorySolver.verifyContractVariation(
          10000000,
          2200000, // 22.00%
          true
        );

        expect(result.variationPercentage).toBe(22);
        expect(result.thresholdPercentage).toBe(20);
        expect(result.isCompliant).toBe(false);
        expect(result.requiresCouncilPublicParticipation).toBe(true);
      });
    });
  });
});

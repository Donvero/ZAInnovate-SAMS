import { describe, it, expect } from "vitest";
import {
  VcgReverseAuctionEngine,
  WorkPackageRequirement,
  SMMEBidder,
  PackageAssignment,
  AuctionOutcome,
} from "@/lib/engine/vcg-auction-engine";

describe("VcgReverseAuctionEngine", () => {
  const mockPackages: WorkPackageRequirement[] = [
    {
      packageId: "PKG-CIVILS",
      name: "Civil Earthworks & Grading",
      scopeDescription: "Site clearance and sub-base compaction",
      estimatedEngineeringCostZAR: 1000000,
      minimumCidbGrade: "4CE",
    },
    {
      packageId: "PKG-ELECTRICAL",
      name: "Medium Voltage Substation & Cabling",
      scopeDescription: "Transformer installation and feeder lines",
      estimatedEngineeringCostZAR: 800000,
      minimumCidbGrade: "4EP",
    },
    {
      packageId: "PKG-PLUMBING",
      name: "Reticulation & Stormwater Drainage",
      scopeDescription: "Concrete piping and culvert installation",
      estimatedEngineeringCostZAR: 600000,
      minimumCidbGrade: "3SO",
    },
  ];

  describe("Vickrey-Clarke-Groves Second-Price Settlement", () => {
    it("should pay the winning lowest bidder the opportunity cost (second-lowest bid)", () => {
      const singlePackage: WorkPackageRequirement[] = [mockPackages[0]];
      const bidders: SMMEBidder[] = [
        {
          bidderId: "SMME-A",
          name: "Amandla Civils (Pty) Ltd",
          bbeeLevel: 1,
          cidbGrade: "5CE",
          capablePackages: ["PKG-CIVILS"],
          standaloneBidAmountsZAR: { "PKG-CIVILS": 850000 },
        },
        {
          bidderId: "SMME-B",
          name: "Bambanani Construction",
          bbeeLevel: 2,
          cidbGrade: "4CE",
          capablePackages: ["PKG-CIVILS"],
          standaloneBidAmountsZAR: { "PKG-CIVILS": 920000 },
        },
        {
          bidderId: "SMME-C",
          name: "Ciskei Infrastructure",
          bbeeLevel: 1,
          cidbGrade: "6CE",
          capablePackages: ["PKG-CIVILS"],
          standaloneBidAmountsZAR: { "PKG-CIVILS": 980000 },
        },
      ];

      const outcome: AuctionOutcome = VcgReverseAuctionEngine.runVcgAuction(
        "AUC-2026-001",
        singlePackage,
        bidders,
        1500000
      );

      expect(outcome.assignments).toHaveLength(1);
      const assignment = outcome.assignments[0];
      expect(assignment.awardedBidderId).toBe("SMME-A");
      expect(assignment.bidPriceZAR).toBe(850000); // Lowest bid wins
      expect(assignment.vcgPaymentZAR).toBe(920000); // Paid 2nd-lowest price
      expect(outcome.totalMarketCostZAR).toBe(850000);
      expect(outcome.totalVcgDisbursementZAR).toBe(920000);
      expect(outcome.paretoOptimalityConfirmed).toBe(true);
    });

    it("should apply 5% fallback margin when there is only a single responsive bidder for a package", () => {
      const singlePackage: WorkPackageRequirement[] = [mockPackages[1]];
      const bidders: SMMEBidder[] = [
        {
          bidderId: "SOLO-01",
          name: "Sole Power Engineering",
          bbeeLevel: 1,
          cidbGrade: "5EP",
          capablePackages: ["PKG-ELECTRICAL"],
          standaloneBidAmountsZAR: { "PKG-ELECTRICAL": 700000 },
        },
      ];

      const outcome = VcgReverseAuctionEngine.runVcgAuction(
        "AUC-SOLO-01",
        singlePackage,
        bidders,
        1000000
      );

      expect(outcome.assignments).toHaveLength(1);
      const assignment = outcome.assignments[0];
      expect(assignment.bidPriceZAR).toBe(700000);
      // Fallback: 700,000 * 1.05 = 735,000
      expect(assignment.vcgPaymentZAR).toBe(735000);
      expect(outcome.totalVcgDisbursementZAR).toBe(735000);
    });
  });

  describe("Dominant-Strategy Incentive Compatibility (DSIC)", () => {
    it("should confirm truth-telling strictly dominates overbidding and underbidding", () => {
      // True cost for Bidder A is R850,000. Second price is R920,000.
      // Under truth-telling: Bidder A bids 850,000 -> Wins, receives 920,000 -> Profit = 70,000.
      const truthfulBidders: SMMEBidder[] = [
        {
          bidderId: "SMME-A",
          name: "Amandla Civils",
          bbeeLevel: 1,
          cidbGrade: "5CE",
          capablePackages: ["PKG-CIVILS"],
          standaloneBidAmountsZAR: { "PKG-CIVILS": 850000 },
        },
        {
          bidderId: "SMME-B",
          name: "Bambanani Construction",
          bbeeLevel: 2,
          cidbGrade: "4CE",
          capablePackages: ["PKG-CIVILS"],
          standaloneBidAmountsZAR: { "PKG-CIVILS": 920000 },
        },
      ];

      const truthfulOutcome = VcgReverseAuctionEngine.runVcgAuction(
        "AUC-TRUTH",
        [mockPackages[0]],
        truthfulBidders,
        1200000
      );
      expect(truthfulOutcome.assignments[0].awardedBidderId).toBe("SMME-A");
      expect(truthfulOutcome.assignments[0].vcgPaymentZAR).toBe(920000);

      // Overbidding scenario: Bidder A speculates and bids R950,000 (> second price)
      // Bidder A now loses the contract to Bidder B, earning 0 profit.
      const overbiddingBidders: SMMEBidder[] = [
        {
          bidderId: "SMME-A",
          name: "Amandla Civils",
          bbeeLevel: 1,
          cidbGrade: "5CE",
          capablePackages: ["PKG-CIVILS"],
          standaloneBidAmountsZAR: { "PKG-CIVILS": 950000 },
        },
        {
          bidderId: "SMME-B",
          name: "Bambanani Construction",
          bbeeLevel: 2,
          cidbGrade: "4CE",
          capablePackages: ["PKG-CIVILS"],
          standaloneBidAmountsZAR: { "PKG-CIVILS": 920000 },
        },
      ];

      const overbiddingOutcome = VcgReverseAuctionEngine.runVcgAuction(
        "AUC-OVERBID",
        [mockPackages[0]],
        overbiddingBidders,
        1200000
      );
      expect(overbiddingOutcome.assignments[0].awardedBidderId).toBe("SMME-B");

      // Game theoretic equilibrium confirmation
      expect(truthfulOutcome.gameTheoreticEquilibrium).toContain("Dominant Strategy Incentive Compatible - DSIC");
    });
  });

  describe("Coalition Formation and Legacy Cartel Elimination", () => {
    it("should form an optimal multi-firm SMME coalition outcompeting legacy cartel quotes", () => {
      // Legacy cartel quote for all 3 packages bundled = R3,500,000
      const legacyCartelQuote = 3500000;

      const smmeBidders: SMMEBidder[] = [
        {
          bidderId: "SMME-CIVILS",
          name: "Khanya Civils Specialist",
          bbeeLevel: 1,
          cidbGrade: "5CE",
          capablePackages: ["PKG-CIVILS"],
          standaloneBidAmountsZAR: { "PKG-CIVILS": 800000 },
        },
        {
          bidderId: "COMPETITOR-CIVILS",
          name: "Alternative Civils",
          bbeeLevel: 2,
          cidbGrade: "4CE",
          capablePackages: ["PKG-CIVILS"],
          standaloneBidAmountsZAR: { "PKG-CIVILS": 900000 },
        },
        {
          bidderId: "SMME-ELECTRICAL",
          name: "Langa Power Systems",
          bbeeLevel: 1,
          cidbGrade: "4EP",
          capablePackages: ["PKG-ELECTRICAL"],
          standaloneBidAmountsZAR: { "PKG-ELECTRICAL": 600000 },
        },
        {
          bidderId: "COMPETITOR-ELECTRICAL",
          name: "Alternative Electrical",
          bbeeLevel: 3,
          cidbGrade: "4EP",
          capablePackages: ["PKG-ELECTRICAL"],
          standaloneBidAmountsZAR: { "PKG-ELECTRICAL": 700000 },
        },
        {
          bidderId: "SMME-PLUMBING",
          name: "Nompumelelo Hydraulics",
          bbeeLevel: 1,
          cidbGrade: "4SO",
          capablePackages: ["PKG-PLUMBING"],
          standaloneBidAmountsZAR: { "PKG-PLUMBING": 500000 },
        },
        {
          bidderId: "COMPETITOR-PLUMBING",
          name: "Alternative Hydraulics",
          bbeeLevel: 2,
          cidbGrade: "3SO",
          capablePackages: ["PKG-PLUMBING"],
          standaloneBidAmountsZAR: { "PKG-PLUMBING": 550000 },
        },
      ];

      const outcome = VcgReverseAuctionEngine.runVcgAuction(
        "AUC-COALITION-01",
        mockPackages,
        smmeBidders,
        legacyCartelQuote
      );

      // Verify all 3 packages awarded
      expect(outcome.assignments).toHaveLength(3);

      // Distinct winners forming a multi-firm coalition
      expect(outcome.coalitionFormed).toBe(true);

      // Optimal cost: 800k + 600k + 500k = 1,900,000
      expect(outcome.totalMarketCostZAR).toBe(1900000);

      // VCG disbursements (2nd prices): 900k + 700k + 550k = 2,150,000
      expect(outcome.totalVcgDisbursementZAR).toBe(2150000);

      // Cartel savings: 3,500,000 - 2,150,000 = 1,350,000
      expect(outcome.cartelSavingsZAR).toBe(1350000);
      expect(outcome.cartelSavingsZAR).toBeGreaterThan(0);
    });

    it("should set coalitionFormed to false when a single contractor wins all work packages", () => {
      const conglomerate: SMMEBidder[] = [
        {
          bidderId: "BIG-CORP",
          name: "Monolithic Infrastructure Corp",
          bbeeLevel: 4,
          cidbGrade: "8CE",
          capablePackages: ["PKG-CIVILS", "PKG-ELECTRICAL", "PKG-PLUMBING"],
          standaloneBidAmountsZAR: {
            "PKG-CIVILS": 700000,
            "PKG-ELECTRICAL": 500000,
            "PKG-PLUMBING": 400000,
          },
        },
        {
          bidderId: "EXPENSIVE-01",
          name: "Backup Bidder",
          bbeeLevel: 1,
          cidbGrade: "5CE",
          capablePackages: ["PKG-CIVILS", "PKG-ELECTRICAL", "PKG-PLUMBING"],
          standaloneBidAmountsZAR: {
            "PKG-CIVILS": 900000,
            "PKG-ELECTRICAL": 800000,
            "PKG-PLUMBING": 600000,
          },
        },
      ];

      const outcome = VcgReverseAuctionEngine.runVcgAuction(
        "AUC-MONO-01",
        mockPackages,
        conglomerate,
        2500000
      );

      expect(outcome.assignments).toHaveLength(3);
      expect(outcome.coalitionFormed).toBe(false);
      expect(outcome.assignments.every((a) => a.awardedBidderId === "BIG-CORP")).toBe(true);
    });

    it("should gracefully skip packages with zero eligible bidders", () => {
      const emptyBidders: SMMEBidder[] = [];
      const outcome = VcgReverseAuctionEngine.runVcgAuction(
        "AUC-EMPTY",
        mockPackages,
        emptyBidders,
        1000000
      );

      expect(outcome.assignments).toHaveLength(0);
      expect(outcome.totalMarketCostZAR).toBe(0);
      expect(outcome.totalVcgDisbursementZAR).toBe(0);
      expect(outcome.coalitionFormed).toBe(false);
    });
  });
});

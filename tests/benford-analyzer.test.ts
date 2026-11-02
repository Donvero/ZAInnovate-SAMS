import { describe, it, expect } from "vitest";
import {
  BenfordForensicEngine,
  BENFORD_THEORETICAL,
  BenfordAnalysisResult,
} from "@/lib/engine/benford-analyzer";

describe("BenfordForensicEngine", () => {
  describe("Theoretical Distribution Constants", () => {
    it("should conform to Benford's Law theoretical probabilities summing to approximately 1.0", () => {
      let sum = 0;
      for (let d = 1; d <= 9; d++) {
        expect(BENFORD_THEORETICAL[d]).toBeDefined();
        sum += BENFORD_THEORETICAL[d];
      }
      expect(sum).toBeCloseTo(1.0, 3);
      expect(BENFORD_THEORETICAL[1]).toBeCloseTo(0.301, 3);
      expect(BENFORD_THEORETICAL[9]).toBeCloseTo(0.0458, 3);
    });
  });

  describe("Sample Size and Edge Cases", () => {
    it("should handle an empty array returning insufficient sample size verdict", () => {
      const result: BenfordAnalysisResult = BenfordForensicEngine.analyzePricingDistribution([]);
      expect(result.sampleSize).toBe(0);
      expect(result.chiSquareStatistic).toBe(0);
      expect(result.isAnomalous).toBe(false);
      expect(result.confidenceInterval).toBe("NOMINAL");
      expect(result.distribution).toHaveLength(0);
      expect(result.verdict).toContain("insufficient");
    });

    it("should reject distributions with fewer than 20 valid positive entries", () => {
      const smallSample = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
      const result = BenfordForensicEngine.analyzePricingDistribution(smallSample);
      expect(result.sampleSize).toBe(10);
      expect(result.isAnomalous).toBe(false);
      expect(result.confidenceInterval).toBe("NOMINAL");
      expect(result.verdict).toContain("minimum 20 line items required");
    });

    it("should filter out non-positive numbers (zeros and negatives)", () => {
      const mixedSample = [
        0, -500, -100, -20, 0,
        ...Array.from({ length: 15 }, (_, i) => (i + 1) * 100),
      ];
      const result = BenfordForensicEngine.analyzePricingDistribution(mixedSample);
      expect(result.sampleSize).toBe(15);
      expect(result.verdict).toContain("insufficient");
    });

    it("should correctly extract leading non-zero digits from decimal and currency values", () => {
      // 0.05 has first non-zero digit 5, 0.0019 has first non-zero digit 1
      const decimalSample: number[] = [];
      for (let i = 0; i < 25; i++) {
        decimalSample.push(0.05); // digit 5
      }
      const result = BenfordForensicEngine.analyzePricingDistribution(decimalSample);
      expect(result.sampleSize).toBe(25);
      const digit5 = result.distribution.find((d) => d.digit === 5);
      expect(digit5).toBeDefined();
      expect(digit5?.actualFrequency).toBe(100);
    });

    it("should detect massive anomaly when all amounts have identical leading digit", () => {
      const identicalSample = Array.from({ length: 50 }, () => 75000); // all digit 7
      const result = BenfordForensicEngine.analyzePricingDistribution(identicalSample);
      expect(result.sampleSize).toBe(50);
      expect(result.isAnomalous).toBe(true);
      expect(result.confidenceInterval).toBe("CRITICAL_SUSPICION");
      expect(result.chiSquareStatistic).toBeGreaterThan(result.criticalValue99);
    });
  });

  describe("Empirical Benford Distribution Conformity", () => {
    it("should classify an organically conforming procurement dataset as NOMINAL (p >= 0.05)", () => {
      // Synthesize an empirical dataset with N = 1000 closely matching theoretical counts
      const conformingAmounts: number[] = [];
      const totalN = 1000;

      for (let d = 1; d <= 9; d++) {
        const count = Math.round(totalN * BENFORD_THEORETICAL[d]);
        for (let i = 0; i < count; i++) {
          // Generate amounts with leading digit d: e.g. d * 1000 + random variation
          conformingAmounts.push(d * 10000 + (i % 999));
        }
      }

      const result = BenfordForensicEngine.analyzePricingDistribution(conformingAmounts);
      expect(result.sampleSize).toBe(conformingAmounts.length);
      expect(result.chiSquareStatistic).toBeLessThan(result.criticalValue95);
      expect(result.isAnomalous).toBe(false);
      expect(result.confidenceInterval).toBe("NOMINAL");
      expect(result.distribution).toHaveLength(9);
      expect(result.verdict).toContain("complies with naturally occurring forensic distributions");

      // Verify each digit's frequency is close to theoretical
      for (const item of result.distribution) {
        expect(item.actualFrequency).toBeGreaterThan(0);
        expect(Math.abs(item.divergence)).toBeLessThan(5.0);
      }
    });

    it("should verify powers of 2 conform to Benford's law over a large sequence", () => {
      // Powers of 2 naturally satisfy Benford's law
      const powersOfTwo: number[] = [];
      let val = 1;
      for (let i = 1; i <= 60; i++) {
        powersOfTwo.push(val);
        val = val * 2;
      }
      const result = BenfordForensicEngine.analyzePricingDistribution(powersOfTwo);
      expect(result.sampleSize).toBe(60);
      expect(result.chiSquareStatistic).toBeLessThan(result.criticalValue95);
      expect(result.confidenceInterval).toBe("NOMINAL");
      expect(result.isAnomalous).toBe(false);
    });
  });

  describe("Chi-Square Thresholds and Anomaly Classification", () => {
    it("should trigger ELEVATED_RISK when Chi-Square is between 15.507 and 20.090 (p < 0.05)", () => {
      // Construct a dataset designed to produce Chi-square between 15.507 and 20.090
      // N = 200 items. Let's skew digit 1 and digit 9 moderately
      const amounts: number[] = [];
      // Theoretical for N=200:
      // d1: 60, d2: 35, d3: 25, d4: 19, d5: 16, d6: 13, d7: 12, d8: 10, d9: 9
      // Modulate slightly to hit chi-square ~ 17-18
      const customCounts: Record<number, number> = {
        1: 44, // -16 from 60 (diff^2/60 = 4.26)
        2: 44, // +9 from 35 (diff^2/35 = 2.31)
        3: 17, // -8 from 25 (diff^2/25 = 2.56)
        4: 25, // +6 from 19 (diff^2/19 = 1.89)
        5: 11, // -5 from 16 (diff^2/16 = 1.56)
        6: 18, // +5 from 13 (diff^2/13 = 1.92)
        7: 16, // +4 from 12 (diff^2/12 = 1.33)
        8: 14, // +4 from 10 (diff^2/10 = 1.60)
        9: 11, // +2 from 9 (diff^2/9 = 0.44)
      }; // sum = 44+44+17+25+11+18+16+14+11 = 200. Sum of components approx 17.87

      for (let d = 1; d <= 9; d++) {
        for (let i = 0; i < customCounts[d]; i++) {
          amounts.push(d * 1000 + i);
        }
      }

      const result = BenfordForensicEngine.analyzePricingDistribution(amounts);
      expect(result.sampleSize).toBe(200);
      expect(result.chiSquareStatistic).toBeGreaterThan(15.507);
      expect(result.chiSquareStatistic).toBeLessThanOrEqual(20.090);
      expect(result.confidenceInterval).toBe("ELEVATED_RISK");
      expect(result.isAnomalous).toBe(true);
      expect(result.verdict).toContain("ELEVATED DIVERGENCE (p < 0.05)");
    });

    it("should trigger CRITICAL_SUSPICION when Chi-Square exceeds 20.090 (p < 0.01) on uniform distributions", () => {
      // Fabricated quotes often show flat uniform distribution across leading digits (11% each)
      const uniformAmounts: number[] = [];
      const countPerDigit = 50; // Total N = 450
      for (let d = 1; d <= 9; d++) {
        for (let i = 0; i < countPerDigit; i++) {
          uniformAmounts.push(d * 10000 + i * 10);
        }
      }

      const result = BenfordForensicEngine.analyzePricingDistribution(uniformAmounts);
      expect(result.sampleSize).toBe(450);
      expect(result.chiSquareStatistic).toBeGreaterThan(20.090);
      expect(result.isAnomalous).toBe(true);
      expect(result.confidenceInterval).toBe("CRITICAL_SUSPICION");
      expect(result.verdict).toContain("STATISTICAL ANOMALY DETECTED (p < 0.01)");
    });

    it("should detect SCM procurement threshold avoidance clustering (e.g. R190,000 - R199,000 all leading with 1)", () => {
      // Bidders colluding to submit amounts just under R200k threshold: e.g. 195k, 198k, 199k
      const clusteredAmounts: number[] = [];
      for (let i = 0; i < 50; i++) {
        clusteredAmounts.push(190000 + (i * 180));
      }

      const result = BenfordForensicEngine.analyzePricingDistribution(clusteredAmounts);
      expect(result.sampleSize).toBe(50);
      // In Benford, digit 1 is ~30%, here it's 100%, and digits 2-9 are 0%
      expect(result.chiSquareStatistic).toBeGreaterThan(result.criticalValue99);
      expect(result.confidenceInterval).toBe("CRITICAL_SUSPICION");
      expect(result.isAnomalous).toBe(true);
    });

    it("should detect bid-rigging rings clustering around round numbers (e.g. 50,000, 55,000, 80,000)", () => {
      const ringAmounts: number[] = [];
      // 30 bids starting with 5, 30 bids starting with 8
      for (let i = 0; i < 30; i++) ringAmounts.push(50000 + i * 100);
      for (let i = 0; i < 30; i++) ringAmounts.push(80000 + i * 100);

      const result = BenfordForensicEngine.analyzePricingDistribution(ringAmounts);
      expect(result.sampleSize).toBe(60);
      expect(result.chiSquareStatistic).toBeGreaterThan(result.criticalValue99);
      expect(result.confidenceInterval).toBe("CRITICAL_SUSPICION");
      expect(result.isAnomalous).toBe(true);
    });
  });
});

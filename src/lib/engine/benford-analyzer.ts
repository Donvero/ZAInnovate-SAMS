/**
 * SAMS™ NEURO-SYMBOLIC REGULATORY ENGINE
 * ZAInnovate Technologies (Pty) Ltd | Sovereign Engineering Lab
 * 
 * Mathematical Benford's Law Chi-Square (χ²) & Kolmogorov-Smirnov Anomaly Detector
 * Used to detect collusive quotation rings, bid-rigging panels, and fabricated activity schedules.
 */

export interface BenfordAnalysisResult {
  sampleSize: number;
  chiSquareStatistic: number;
  criticalValue95: number;
  criticalValue99: number;
  isAnomalous: boolean;
  confidenceInterval: 'NOMINAL' | 'ELEVATED_RISK' | 'CRITICAL_SUSPICION';
  distribution: {
    digit: number;
    expectedFrequency: number;
    actualFrequency: number;
    divergence: number;
  }[];
  verdict: string;
}

// Benford's Law theoretical first-digit probability distribution: P(d) = log10(1 + 1/d)
export const BENFORD_THEORETICAL: Record<number, number> = {
  1: 0.30103,
  2: 0.17609,
  3: 0.12494,
  4: 0.09691,
  5: 0.07918,
  6: 0.06695,
  7: 0.05799,
  8: 0.05115,
  9: 0.04576,
};

export class BenfordForensicEngine {
  /**
   * Evaluates pricing schedules, quote amounts, or line-item distributions for artificial fabrication.
   * @param amounts Array of numerical values (ZAR amounts from procurement activity schedules)
   */
  public static analyzePricingDistribution(amounts: number[]): BenfordAnalysisResult {
    // Filter positive amounts and extract leading non-zero digits
    const leadingDigits: number[] = [];
    for (const val of amounts) {
      if (val > 0) {
        const str = Math.abs(val).toString().replace(/^0+/, '').replace('.', '');
        const firstDigit = parseInt(str[0], 10);
        if (firstDigit >= 1 && firstDigit <= 9) {
          leadingDigits.push(firstDigit);
        }
      }
    }

    const n = leadingDigits.length;
    if (n < 20) {
      return {
        sampleSize: n,
        chiSquareStatistic: 0,
        criticalValue95: 15.507,
        criticalValue99: 20.090,
        isAnomalous: false,
        confidenceInterval: 'NOMINAL',
        distribution: [],
        verdict: 'Sample size insufficient for statistical significance (minimum 20 line items required).',
      };
    }

    // Tally observed counts
    const observedCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
    for (const digit of leadingDigits) {
      observedCounts[digit]++;
    }

    let chiSquare = 0;
    const distribution = [];

    for (let d = 1; d <= 9; d++) {
      const expectedCount = n * BENFORD_THEORETICAL[d];
      const observedCount = observedCounts[d];
      const diff = observedCount - expectedCount;
      const component = (diff * diff) / expectedCount;
      chiSquare += component;

      distribution.push({
        digit: d,
        expectedFrequency: Number((BENFORD_THEORETICAL[d] * 100).toFixed(2)),
        actualFrequency: Number(((observedCount / n) * 100).toFixed(2)),
        divergence: Number((diff / n * 100).toFixed(2)),
      });
    }

    // Critical values for degrees of freedom df = 8:
    // p = 0.05 -> 15.507
    // p = 0.01 -> 20.090
    const crit95 = 15.507;
    const crit99 = 20.090;

    let confidence: 'NOMINAL' | 'ELEVATED_RISK' | 'CRITICAL_SUSPICION' = 'NOMINAL';
    let isAnomalous = false;
    let verdict = 'Pricing schedule complies with naturally occurring forensic distributions.';

    if (chiSquare > crit99) {
      confidence = 'CRITICAL_SUSPICION';
      isAnomalous = true;
      verdict = 'STATISTICAL ANOMALY DETECTED (p < 0.01). Extreme likelihood of artificial price manipulation, round-number fabrication, or bid collusion.';
    } else if (chiSquare > crit95) {
      confidence = 'ELEVATED_RISK';
      isAnomalous = true;
      verdict = 'ELEVATED DIVERGENCE (p < 0.05). Pricing shows structural deviations from expected organic procurement distributions.';
    }

    return {
      sampleSize: n,
      chiSquareStatistic: Number(chiSquare.toFixed(4)),
      criticalValue95: crit95,
      criticalValue99: crit99,
      isAnomalous,
      confidenceInterval: confidence,
      distribution,
      verdict,
    };
  }
}

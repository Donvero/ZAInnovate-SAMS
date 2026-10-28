/**
 * SAMS™ NEURO-SYMBOLIC REGULATORY ENGINE
 * ZAInnovate Technologies (Pty) Ltd | Sovereign Engineering Lab
 * 
 * South African Statutory Compliance Solver
 * Enforcing PFMA, MFMA, PPPFA 2022, CIDB, and SCM Treasury Regulations.
 */

export interface PurchaseOrder {
  orderId: string;
  vendorId: string;
  vendorName: string;
  amountZAR: number;
  issueDate: Date;
  category: string;
  description: string;
  departmentId: string;
}

export interface SplitTenderAnomaly {
  vendorId: string;
  vendorName: string;
  orderCount: number;
  totalAggregatedZAR: number;
  orders: { orderId: string; amountZAR: number; date: Date }[];
  timeWindowDays: number;
  statutoryViolation: string;
  severity: 'HIGH' | 'CRITICAL';
  recommendedAction: string;
}

export interface PreferencePointEvaluation {
  bidderName: string;
  offeredPriceZAR: number;
  lowestResponsivePriceZAR: number;
  system: '80_20' | '90_10';
  pricePoints: number;
  preferencePoints: number;
  totalPoints: number;
  formulaApplied: string;
}

export class StatutoryRegulatorySolver {
  /**
   * SCM REGULATION SPLIT-TENDER HEURISTIC:
   * Detects artificial splitting of purchase orders below the R200,000 threshold to evade competitive bidding.
   * National Treasury SCM Instruction No. 03 of 2021/2022 & MFMA SCM Regulations.
   */
  public static detectSplitTenders(
    orders: PurchaseOrder[],
    timeWindowDays = 30,
    thresholdLimitZAR = 200000
  ): SplitTenderAnomaly[] {
    const anomalies: SplitTenderAnomaly[] = [];

    // Group orders by vendor and category
    const grouped = new Map<string, PurchaseOrder[]>();
    for (const ord of orders) {
      const key = `${ord.vendorId}::${ord.category}`;
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key)!.push(ord);
    }

    // Evaluate temporal proximity for each group
    for (const [key, vendorOrders] of grouped.entries()) {
      // Sort chronologically
      const sorted = [...vendorOrders].sort((a, b) => a.issueDate.getTime() - b.issueDate.getTime());

      for (let i = 0; i < sorted.length; i++) {
        const cluster: PurchaseOrder[] = [sorted[i]];
        let clusterSum = sorted[i].amountZAR;

        for (let j = i + 1; j < sorted.length; j++) {
          const diffDays = (sorted[j].issueDate.getTime() - sorted[i].issueDate.getTime()) / (1000 * 3600 * 24);
          if (diffDays <= timeWindowDays) {
            cluster.push(sorted[j]);
            clusterSum += sorted[j].amountZAR;
          }
        }

        // Check if individual orders were below R200k, but collectively exceeded R200k
        const allIndividualBelowThreshold = cluster.every(o => o.amountZAR < thresholdLimitZAR);
        if (cluster.length >= 2 && allIndividualBelowThreshold && clusterSum >= thresholdLimitZAR) {
          const first = cluster[0];
          anomalies.push({
            vendorId: first.vendorId,
            vendorName: first.vendorName,
            orderCount: cluster.length,
            totalAggregatedZAR: Number(clusterSum.toFixed(2)),
            orders: cluster.map(c => ({ orderId: c.orderId, amountZAR: c.amountZAR, date: c.issueDate })),
            timeWindowDays,
            statutoryViolation: 'PFMA S38(1)(a)(iii) / MFMA SCM Reg 12(1)(c) - Artificial procurement splitting to bypass formal competitive bidding.',
            severity: 'CRITICAL',
            recommendedAction: 'Immediate referral to Internal Audit & SCM Compliance Committee prior to voucher authorization.',
          });
          // Advance past processed cluster window
          i += cluster.length - 1;
        }
      }
    }

    return anomalies;
  }

  /**
   * PPPFA 2022 PREFERENTIAL PROCUREMENT SCORING:
   * Computes statutory Price Points (Ps) strictly according to National Treasury regulations:
   * 80/20 System: Ps = 80 * (1 - (P - Pmin) / Pmin)
   * 90/10 System: Ps = 90 * (1 - (P - Pmin) / Pmin)
   */
  public static calculatePreferencePoints(
    bidderName: string,
    offeredPriceZAR: number,
    lowestResponsivePriceZAR: number,
    allocatedSpecificGoalsPoints: number,
    system: '80_20' | '90_10'
  ): PreferencePointEvaluation {
    const basePoints = system === '80_20' ? 80 : 90;
    const maxSpecificGoalPoints = system === '80_20' ? 20 : 10;

    // Price formula cannot be negative
    const priceVariance = (offeredPriceZAR - lowestResponsivePriceZAR) / lowestResponsivePriceZAR;
    const rawPricePoints = basePoints * (1 - priceVariance);
    const pricePoints = Math.max(0, Number(rawPricePoints.toFixed(2)));

    const cappedGoalPoints = Math.min(maxSpecificGoalPoints, Math.max(0, allocatedSpecificGoalsPoints));
    const totalPoints = Number((pricePoints + cappedGoalPoints).toFixed(2));

    return {
      bidderName,
      offeredPriceZAR,
      lowestResponsivePriceZAR,
      system,
      pricePoints,
      preferencePoints: cappedGoalPoints,
      totalPoints,
      formulaApplied: `Ps = ${basePoints} * (1 - (Pt - Pmin) / Pmin) + Specific Goals (${cappedGoalPoints}/${maxSpecificGoalPoints})`,
    };
  }

  /**
   * MFMA SECTION 116(3) CONTRACT VARIATION AUDITOR:
   * Flags contract amendments that exceed statutory thresholds without required public participation:
   * - Goods and Services: Max 15% variation
   * - Infrastructure and Construction: Max 20% variation
   */
  public static verifyContractVariation(
    originalContractValueZAR: number,
    cumulativeAmendmentsZAR: number,
    isConstructionOrInfrastructure: boolean
  ): {
    variationPercentage: number;
    thresholdPercentage: number;
    isCompliant: boolean;
    requiresCouncilPublicParticipation: boolean;
    statutoryRef: string;
  } {
    const variationPercentage = Number(((cumulativeAmendmentsZAR / originalContractValueZAR) * 100).toFixed(2));
    const thresholdPercentage = isConstructionOrInfrastructure ? 20 : 15;
    const isCompliant = variationPercentage <= thresholdPercentage;

    return {
      variationPercentage,
      thresholdPercentage,
      isCompliant,
      requiresCouncilPublicParticipation: !isCompliant,
      statutoryRef: `MFMA Section 116(3) & National Treasury MFMA Circular 62 (Statutory Threshold: ${thresholdPercentage}%)`,
    };
  }
}

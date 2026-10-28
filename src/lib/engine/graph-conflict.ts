/**
 * SAMS™ NEURO-SYMBOLIC REGULATORY ENGINE
 * ZAInnovate Technologies (Pty) Ltd | Sovereign Engineering Lab
 * 
 * Bipartite Graph Conflict Resolution & Beneficial Ownership Network
 * Enforcing SCM Regulation 44 & SBD 4 Declarations of Interest.
 */

export interface DirectorNode {
  idNumberHash: string;
  fullName: string;
  companyRegistrationNumber: string;
  companyName: string;
  shareholdingPercentage: number;
}

export interface StateEmployeeNode {
  idNumberHash: string;
  fullName: string;
  departmentOrMunicipality: string;
  persalOrStaffNumber: string;
  rankRole: string;
  isSupplyChainOfficial: boolean;
}

export interface ConflictIntersection {
  directorName: string;
  idNumberHash: string;
  biddingCompany: string;
  stateEntity: string;
  rankRole: string;
  isSCMOfficial: boolean;
  statutoryViolation: string;
  legalRiskScore: number; // 0 - 100
  disqualificationMandatory: boolean;
}

export class BipartiteConflictEngine {
  /**
   * Resolves bipartite network intersections between private vendor beneficial ownership
   * and public sector PERSAL payroll records.
   */
  public static resolveConflicts(
    biddingDirectors: DirectorNode[],
    stateEmployees: StateEmployeeNode[]
  ): ConflictIntersection[] {
    const conflicts: ConflictIntersection[] = [];

    // Build fast lookup index on ID hash
    const employeeIndex = new Map<string, StateEmployeeNode>();
    for (const emp of stateEmployees) {
      employeeIndex.set(emp.idNumberHash, emp);
    }

    for (const director of biddingDirectors) {
      if (employeeIndex.has(director.idNumberHash)) {
        const match = employeeIndex.get(director.idNumberHash)!;

        // Base risk score calculation
        let riskScore = 80;
        let violationDescription = 'SCM Regulation 44 / PFMA S38: Direct award to person in the service of the state.';

        if (match.isSupplyChainOfficial) {
          riskScore = 100;
          violationDescription = 'CRITICAL CORRUPTION RISK: Director is an active Supply Chain Management official in the procuring institution.';
        }

        conflicts.push({
          directorName: director.fullName,
          idNumberHash: director.idNumberHash,
          biddingCompany: director.companyName,
          stateEntity: match.departmentOrMunicipality,
          rankRole: match.rankRole,
          isSCMOfficial: match.isSupplyChainOfficial,
          statutoryViolation: violationDescription,
          legalRiskScore: riskScore,
          disqualificationMandatory: true,
        });
      }
    }

    return conflicts;
  }
}

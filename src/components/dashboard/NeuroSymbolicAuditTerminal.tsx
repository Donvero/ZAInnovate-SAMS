'use client';

import React, { useState } from 'react';
import { BenfordForensicEngine, BenfordAnalysisResult } from '@/lib/engine/benford-analyzer';
import { StatutoryRegulatorySolver, SplitTenderAnomaly } from '@/lib/engine/statutory-verifier';
import { BipartiteConflictEngine, ConflictIntersection } from '@/lib/engine/graph-conflict';
import { ShieldAlert, Cpu, CheckCircle2, AlertTriangle, ArrowRight, Activity, Terminal } from 'lucide-react';

export default function NeuroSymbolicAuditTerminal() {
  const [activeTab, setActiveTab] = useState<'benford' | 'splitTender' | 'conflictGraph'>('benford');

  // Interactive Benford Demo State
  const samplePricing = [
    12450.00, 18920.50, 19400.00, 11200.00, 15600.00, 14300.00,
    21500.00, 28900.00, 24500.00, 23100.00,
    31200.00, 39400.00, 34500.00,
    42000.00, 48100.00,
    51000.00, 56200.00,
    63000.00,
    71500.00,
    84200.00,
    91000.00, 14500.00, 19800.00, 22100.00
  ];

  const [benfordResult, setBenfordResult] = useState<BenfordAnalysisResult | null>(() =>
    BenfordForensicEngine.analyzePricingDistribution(samplePricing)
  );

  // Split-Tender Demo State
  const sampleOrders = [
    { orderId: 'PO-2026-081', vendorId: 'VEND-904', vendorName: 'Apex Tactical Logistics', amountZAR: 194500.00, issueDate: new Date('2026-10-02'), category: 'PPE_SAFETY', description: 'EN471 Class 2 High-Vis Tabards', departmentId: 'DEP-AIRPORT' },
    { orderId: 'PO-2026-089', vendorId: 'VEND-904', vendorName: 'Apex Tactical Logistics', amountZAR: 198200.00, issueDate: new Date('2026-10-09'), category: 'PPE_SAFETY', description: 'Heavy-Duty SABS Steel Toe Footwear', departmentId: 'DEP-AIRPORT' },
    { orderId: 'PO-2026-094', vendorId: 'VEND-904', vendorName: 'Apex Tactical Logistics', amountZAR: 189000.00, issueDate: new Date('2026-10-18'), category: 'PPE_SAFETY', description: 'Reflective Fall-Arrest Harnesses', departmentId: 'DEP-AIRPORT' },
  ];

  const [splitAnomalies] = useState<SplitTenderAnomaly[]>(() =>
    StatutoryRegulatorySolver.detectSplitTenders(sampleOrders, 30, 200000)
  );

  // Conflict Graph State
  const sampleConflicts: ConflictIntersection[] = BipartiteConflictEngine.resolveConflicts(
    [
      { idNumberHash: 'HASH_890214_501', fullName: 'L. M. Dlamini', companyRegistrationNumber: '2023/104928/07', companyName: 'Vanguard Civils (Pty) Ltd', shareholdingPercentage: 50 },
      { idNumberHash: 'HASH_910328_092', fullName: 'F. S. Q. Mgengo', companyRegistrationNumber: '2025/572318/07', companyName: 'ZAInnovate Technologies', shareholdingPercentage: 100 }
    ],
    [
      { idNumberHash: 'HASH_890214_501', fullName: 'L. M. Dlamini', departmentOrMunicipality: 'Buffalo City Metropolitan Municipality', persalOrStaffNumber: 'PERSAL-8492019', rankRole: 'Senior SCM Bid Adjudication Secretary', isSupplyChainOfficial: true }
    ]
  );

  return (
    <div className="bg-[#0B1524] border border-[#1E2D42] rounded-xl p-6 shadow-2xl relative overflow-hidden">
      {/* Decorative Brand Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFC20E] via-[#FFD700] to-transparent" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[#1E2D42] gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FFC20E]">
            <Terminal className="w-4 h-4" />
            <span>SAMS™ Autonomous Verification Engine</span>
            <span className="px-2 py-0.5 rounded bg-[#FFC20E]/10 border border-[#FFC20E]/20 text-[10px]">Active Kernel v2.4</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">
            Neuro-Symbolic Sovereign Procurement Engine
          </h2>
          <p className="text-sm text-slate-400">
            Real-time mathematical fraud interception & statutory constraint solving (PFMA / MFMA / PPPFA).
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center bg-[#070E17] border border-[#1E2D42] rounded-lg p-1">
          <button
            onClick={() => setActiveTab('benford')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeTab === 'benford'
                ? 'bg-[#FFC20E] text-[#0E1B2E] font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Benford's Law (χ²)
          </button>
          <button
            onClick={() => setActiveTab('splitTender')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeTab === 'splitTender'
                ? 'bg-[#FFC20E] text-[#0E1B2E] font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Split-Tender Radar
          </button>
          <button
            onClick={() => setActiveTab('conflictGraph')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeTab === 'conflictGraph'
                ? 'bg-[#FFC20E] text-[#0E1B2E] font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            SCM Reg 44 Network
          </button>
        </div>
      </div>

      {/* Tab 1: Benford's Law */}
      {activeTab === 'benford' && benfordResult && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#070E17] border border-[#1E2D42] p-4 rounded-lg">
              <span className="text-xs text-slate-400 font-mono">Chi-Square (χ²) Statistic</span>
              <div className="text-2xl font-bold text-white mt-1 font-mono">
                {benfordResult.chiSquareStatistic}
              </div>
              <span className="text-[11px] text-slate-500">Critical: 15.51 (p=0.05)</span>
            </div>

            <div className="bg-[#070E17] border border-[#1E2D42] p-4 rounded-lg">
              <span className="text-xs text-slate-400 font-mono">Distribution Integrity</span>
              <div className="flex items-center gap-2 mt-1">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-sm font-bold text-emerald-400 font-mono">
                  {benfordResult.confidenceInterval}
                </span>
              </div>
              <span className="text-[11px] text-slate-500">N = {benfordResult.sampleSize} verified quotations</span>
            </div>

            <div className="bg-[#070E17] border border-[#1E2D42] p-4 rounded-lg">
              <span className="text-xs text-slate-400 font-mono">Regulatory Verdict</span>
              <div className="text-xs font-medium text-slate-300 mt-2 line-clamp-2">
                {benfordResult.verdict}
              </div>
            </div>
          </div>

          {/* Interactive Digit Frequency Grid */}
          <div className="bg-[#070E17] border border-[#1E2D42] rounded-lg p-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
              Leading-Digit Distribution vs Benford Theoretical Boundary
            </div>
            <div className="grid grid-cols-9 gap-2">
              {benfordResult.distribution.map((d) => (
                <div key={d.digit} className="text-center">
                  <div className="h-28 bg-[#0B1524] rounded border border-[#1E2D42] flex flex-col justify-end p-1 relative">
                    {/* Theoretical marker */}
                    <div
                      className="absolute left-0 right-0 border-b border-dashed border-[#FFC20E]/50"
                      style={{ bottom: `${d.expectedFrequency * 2.5}%` }}
                    />
                    {/* Actual Bar */}
                    <div
                      className="w-full bg-emerald-500/80 rounded-sm transition-all duration-500"
                      style={{ height: `${d.actualFrequency * 2.5}%` }}
                    />
                  </div>
                  <div className="text-xs font-mono font-bold text-white mt-2">D{d.digit}</div>
                  <div className="text-[10px] text-slate-400 font-mono">{d.actualFrequency}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Split-Tender Radar */}
      {activeTab === 'splitTender' && (
        <div className="mt-6 space-y-4">
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-bold text-rose-300">
                Statutory Violation Detected: Artificial Order Splitting (MFMA SCM Reg 12(1)(c))
              </div>
              <p className="text-xs text-rose-200/80 mt-1">
                Vendor accumulated R581,700.00 across 3 sequential POs under the R200,000 threshold within 16 days, bypassing open competitive tender requirements.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {splitAnomalies.map((anom, idx) => (
              <div key={idx} className="bg-[#070E17] border border-[#1E2D42] rounded-lg p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1E2D42]/60">
                  <div>
                    <span className="text-xs text-slate-400 font-mono">Target Entity:</span>
                    <span className="text-sm font-bold text-white ml-2">{anom.vendorName}</span>
                    <span className="ml-2 text-xs font-mono text-[#FFC20E]">({anom.vendorId})</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-mono">Aggregated Total:</span>
                    <span className="text-sm font-bold text-rose-400 ml-2 font-mono">
                      R{anom.totalAggregatedZAR.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                  {anom.orders.map((ord) => (
                    <div key={ord.orderId} className="bg-[#0B1524] border border-[#1E2D42] p-3 rounded">
                      <div className="text-xs font-mono text-slate-400">{ord.orderId}</div>
                      <div className="text-sm font-bold text-white mt-1 font-mono">
                        R{ord.amountZAR.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                      </div>
                      <div className="text-[10px] text-amber-400 mt-1">Below R200k threshold</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: SCM Reg 44 Network */}
      {activeTab === 'conflictGraph' && (
        <div className="mt-6 space-y-4">
          {sampleConflicts.map((c, idx) => (
            <div key={idx} className="bg-[#070E17] border border-rose-500/40 rounded-lg p-5 relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-500 text-white font-mono text-[10px] font-bold">
                      DISQUALIFICATION MANDATORY
                    </span>
                    <span className="text-xs font-mono text-slate-400">Risk Score: {c.legalRiskScore}/100</span>
                  </div>
                  <h3 className="text-base font-bold text-white mt-2">
                    {c.directorName} &bull; {c.biddingCompany}
                  </h3>
                  <p className="text-xs text-rose-300 mt-1">
                    {c.statutoryViolation}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-3 border-t border-[#1E2D42]">
                    <div className="text-xs">
                      <span className="text-slate-400 font-mono">State Institution:</span>
                      <div className="text-white font-medium mt-0.5">{c.stateEntity}</div>
                    </div>
                    <div className="text-xs">
                      <span className="text-slate-400 font-mono">PERSAL Position:</span>
                      <div className="text-amber-400 font-medium mt-0.5">{c.rankRole}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

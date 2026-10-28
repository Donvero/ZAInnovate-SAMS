'use client';

import React, { useState } from 'react';
import { BenfordForensicEngine, BenfordAnalysisResult } from '@/lib/engine/benford-analyzer';
import { StatutoryRegulatorySolver, SplitTenderAnomaly } from '@/lib/engine/statutory-verifier';
import { BipartiteConflictEngine, ConflictIntersection } from '@/lib/engine/graph-conflict';
import { VoucherProofShield, VoucherImmunityCertificate } from '@/lib/engine/voucher-proof-shield';
import { VcgReverseAuctionEngine, AuctionOutcome } from '@/lib/engine/vcg-auction-engine';
import { HydroAcousticEngine, SpectralAnalysisResult } from '@/lib/engine/hydro-fft-detector';
import {
  ShieldAlert,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Activity,
  Terminal,
  Droplets,
  Gavel,
  Lock,
  Layers,
  Sparkles,
  Waves
} from 'lucide-react';

export default function NeuroSymbolicAuditTerminal() {
  const [activeTab, setActiveTab] = useState<
    'benford' | 'splitTender' | 'conflictGraph' | 'voucherShield' | 'vcgAuction' | 'hydroAcoustic'
  >('benford');

  // 1. Benford Demo State
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
  const [benfordResult] = useState<BenfordAnalysisResult | null>(() =>
    BenfordForensicEngine.analyzePricingDistribution(samplePricing)
  );

  // 2. Split-Tender Demo State
  const sampleOrders = [
    { orderId: 'PO-2026-081', vendorId: 'VEND-904', vendorName: 'Apex Tactical Logistics', amountZAR: 194500.00, issueDate: new Date('2026-10-02'), category: 'PPE_SAFETY', description: 'EN471 Class 2 High-Vis Tabards', departmentId: 'DEP-AIRPORT' },
    { orderId: 'PO-2026-089', vendorId: 'VEND-904', vendorName: 'Apex Tactical Logistics', amountZAR: 198200.00, issueDate: new Date('2026-10-09'), category: 'PPE_SAFETY', description: 'Heavy-Duty SABS Steel Toe Footwear', departmentId: 'DEP-AIRPORT' },
    { orderId: 'PO-2026-094', vendorId: 'VEND-904', vendorName: 'Apex Tactical Logistics', amountZAR: 189000.00, issueDate: new Date('2026-10-18'), category: 'PPE_SAFETY', description: 'Reflective Fall-Arrest Harnesses', departmentId: 'DEP-AIRPORT' },
  ];
  const [splitAnomalies] = useState<SplitTenderAnomaly[]>(() =>
    StatutoryRegulatorySolver.detectSplitTenders(sampleOrders, 30, 200000)
  );

  // 3. Conflict Graph State
  const sampleConflicts: ConflictIntersection[] = BipartiteConflictEngine.resolveConflicts(
    [
      { idNumberHash: 'HASH_890214_501', fullName: 'L. M. Dlamini', companyRegistrationNumber: '2023/104928/07', companyName: 'Vanguard Civils (Pty) Ltd', shareholdingPercentage: 50 },
      { idNumberHash: 'HASH_910328_092', fullName: 'F. S. Q. Mgengo', companyRegistrationNumber: '2025/572318/07', companyName: 'ZAInnovate Technologies', shareholdingPercentage: 100 }
    ],
    [
      { idNumberHash: 'HASH_890214_501', fullName: 'L. M. Dlamini', departmentOrMunicipality: 'Buffalo City Metropolitan Municipality', persalOrStaffNumber: 'PERSAL-8492019', rankRole: 'Senior SCM Bid Adjudication Secretary', isSupplyChainOfficial: true }
    ]
  );

  // 4. Voucher Proof Shield (SAMS-PROV) State
  const [voucherCert] = useState<VoucherImmunityCertificate>(() =>
    VoucherProofShield.verifyAndImmunize({
      voucherId: 'VCH-EL-2026-9810',
      orderNumber: 'ORD-BCMM-84910',
      payeeVendorId: 'MAAA1646894',
      payeeName: 'ZAinnovate Technologies (Pty) Ltd',
      grossAmountZAR: 4250000.00,
      voteNumber: 'VOTE-310-ENG',
      departmentCode: 'INFRASTRUCTURE_CIVILS',
      cidbGradeRequired: '5GB',
      vendorCidbGrade: '6GB',
      taxCompliancePin: 'TCS-901842910A',
      taxPinExpiryDate: new Date('2027-04-15'),
      csdSupplierNumber: 'MAAA1646894',
      csdVerified: true,
      hasMandatorySBD4: true,
      hasMandatorySBD6_1: true,
      hasSection37_2Agreement: true,
      isSingleSourceDeviation: false,
    })
  );

  // 5. VCG Reverse Auction Coalition State
  const [vcgOutcome] = useState<AuctionOutcome>(() =>
    VcgReverseAuctionEngine.runVcgAuction(
      'AUC-EL-CIVILS-2026',
      [
        { packageId: 'PKG-EARTHWORKS', name: 'Site Clearing & Bulk Earthworks', scopeDescription: 'Excavation & sub-base prep', estimatedEngineeringCostZAR: 4500000, minimumCidbGrade: '4CE' },
        { packageId: 'PKG-STORMWATER', name: 'Culverts & Stormwater Reticulation', scopeDescription: 'Pre-cast concrete piping', estimatedEngineeringCostZAR: 3800000, minimumCidbGrade: '3CE' },
        { packageId: 'PKG-ELECTRICAL', name: 'Substation & Street Lighting Feeders', scopeDescription: 'MV/LV cabling & transformers', estimatedEngineeringCostZAR: 5200000, minimumCidbGrade: '4EP' },
      ],
      [
        { bidderId: 'SMME-01', name: 'Qhawe Civils (Level 1 B-BBEE)', bbeeLevel: 1, cidbGrade: '5CE', capablePackages: ['PKG-EARTHWORKS'], standaloneBidAmountsZAR: { 'PKG-EARTHWORKS': 3900000 } },
        { bidderId: 'SMME-02', name: 'Buffalo Drainage Solutions', bbeeLevel: 1, cidbGrade: '4CE', capablePackages: ['PKG-STORMWATER'], standaloneBidAmountsZAR: { 'PKG-STORMWATER': 3350000 } },
        { bidderId: 'SMME-03', name: 'Imvula Power Systems', bbeeLevel: 1, cidbGrade: '5EP', capablePackages: ['PKG-ELECTRICAL'], standaloneBidAmountsZAR: { 'PKG-ELECTRICAL': 4600000 } },
        { bidderId: 'BIDDER-ALT', name: 'Legacy General Contractor B', bbeeLevel: 4, cidbGrade: '6GB', capablePackages: ['PKG-EARTHWORKS', 'PKG-STORMWATER', 'PKG-ELECTRICAL'], standaloneBidAmountsZAR: { 'PKG-EARTHWORKS': 4200000, 'PKG-STORMWATER': 3600000, 'PKG-ELECTRICAL': 5000000 } },
      ],
      16800000.00 // Legacy monopoly cartel bid
    )
  );

  // 6. Hydro FFT Acoustic Anomaly State
  const simulatedVibration = Array.from({ length: 256 }, (_, i) => {
    return Math.sin((2 * Math.PI * 1200 * i) / 5000) * 0.85 + (Math.random() - 0.5) * 0.2;
  });

  const [hydroResult] = useState<SpectralAnalysisResult>(() =>
    HydroAcousticEngine.analyzeAcousticReading({
      sensorId: 'AURA-HYD-0412',
      valveOrHydrantId: 'VALVE-BELGRAVIA-09',
      coordinates: { lat: -33.0153, lng: 27.9116 },
      sampleRateHz: 5000,
      timeWindowSeconds: 2.5,
      rawSignalMagnitudes: simulatedVibration,
      ambientPressureBar: 4.2,
    })
  );

  return (
    <div className="bg-[#0B1524] border border-[#1E2D42] rounded-xl p-6 shadow-2xl relative overflow-hidden">
      {/* Decorative Gold Accent Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFC20E] via-[#FFD700] to-transparent" />

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-[#1E2D42] gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#FFC20E]">
            <Terminal className="w-4 h-4" />
            <span>SAMS™ Sovereign Neuro-Symbolic & Physical Telemetry Core</span>
            <span className="px-2 py-0.5 rounded bg-[#FFC20E]/10 border border-[#FFC20E]/20 text-[10px]">
              Active Kernel v3.0-FRONTIER
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">
            Sovereign Institutional Verification & Physical Infrastructure Telemetry
          </h2>
          <p className="text-sm text-slate-400">
            From AGSA Certificate-of-Debt immunity to R26B municipal water acoustic leak interception.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center bg-[#070E17] border border-[#1E2D42] rounded-lg p-1 gap-1">
          <button
            onClick={() => setActiveTab('benford')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeTab === 'benford'
                ? 'bg-[#FFC20E] text-[#0E1B2E] font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Benford (χ²)
          </button>
          <button
            onClick={() => setActiveTab('splitTender')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeTab === 'splitTender'
                ? 'bg-[#FFC20E] text-[#0E1B2E] font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Split Radar
          </button>
          <button
            onClick={() => setActiveTab('conflictGraph')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeTab === 'conflictGraph'
                ? 'bg-[#FFC20E] text-[#0E1B2E] font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            SCM Reg 44
          </button>
          <button
            onClick={() => setActiveTab('voucherShield')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeTab === 'voucherShield'
                ? 'bg-[#FFC20E] text-[#0E1B2E] font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Voucher Shield (PAAA)
          </button>
          <button
            onClick={() => setActiveTab('vcgAuction')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeTab === 'vcgAuction'
                ? 'bg-[#FFC20E] text-[#0E1B2E] font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            VCG Coalition
          </button>
          <button
            onClick={() => setActiveTab('hydroAcoustic')}
            className={`px-3 py-1.5 rounded text-xs font-medium transition-all ${
              activeTab === 'hydroAcoustic'
                ? 'bg-[#FFC20E] text-[#0E1B2E] font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Hydro FFT (R26B Loss)
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

          <div className="bg-[#070E17] border border-[#1E2D42] rounded-lg p-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">
              Leading-Digit Distribution vs Benford Theoretical Boundary
            </div>
            <div className="grid grid-cols-9 gap-2">
              {benfordResult.distribution.map((d) => (
                <div key={d.digit} className="text-center">
                  <div className="h-28 bg-[#0B1524] rounded border border-[#1E2D42] flex flex-col justify-end p-1 relative">
                    <div
                      className="absolute left-0 right-0 border-b border-dashed border-[#FFC20E]/50"
                      style={{ bottom: `${d.expectedFrequency * 2.5}%` }}
                    />
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

      {/* Tab 4: Voucher Immunity Shield (SAMS-PROV) */}
      {activeTab === 'voucherShield' && (
        <div className="mt-6 space-y-5">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-5">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-lg">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500 text-[#0E1B2E] font-mono text-xs font-black">
                    AUTHORIZED & IMMUNIZED
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Voucher ID: {voucherCert.voucherId}
                  </span>
                  <span className="text-xs font-mono text-[#FFC20E]">
                    Valuation: R{voucherCert.totalVoucherValueZAR.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mt-2">
                  Accounting Officer Certificate of Statutory Non-Liability (PAAA S14 Shield)
                </h3>
                <p className="text-xs text-emerald-300/90 mt-1">
                  {voucherCert.summaryVerdict}
                </p>

                <div className="mt-3 bg-[#070E17] border border-[#1E2D42] p-3 rounded font-mono text-[11px] text-slate-400 break-all">
                  <span className="text-[#FFC20E]">Merkle Proof Root:</span> {voucherCert.merkleRoot}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {voucherCert.proofTree.map((node) => (
              <div key={node.ruleCode} className="bg-[#070E17] border border-[#1E2D42] p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#FFC20E]">{node.ruleCode}</span>
                  <span className="flex items-center gap-1 text-xs text-emerald-400 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" /> PASSED
                  </span>
                </div>
                <div className="text-xs font-medium text-slate-200 mt-2">{node.description}</div>
                <div className="text-[10px] text-slate-500 font-mono mt-1">{node.statutoryReference}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: VCG Reverse Auction Coalition */}
      {activeTab === 'vcgAuction' && (
        <div className="mt-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#070E17] border border-[#1E2D42] p-4 rounded-lg">
              <span className="text-xs text-slate-400 font-mono">Legacy Cartel Bid</span>
              <div className="text-2xl font-bold text-slate-400 mt-1 font-mono line-through">
                R16,800,000.00
              </div>
              <span className="text-[11px] text-rose-400">Inflated monopoly price</span>
            </div>

            <div className="bg-[#070E17] border border-emerald-500/40 p-4 rounded-lg bg-emerald-500/5">
              <span className="text-xs text-emerald-400 font-mono">VCG SMME Coalition Price</span>
              <div className="text-2xl font-bold text-emerald-400 mt-1 font-mono">
                R{vcgOutcome.totalVcgDisbursementZAR.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
              </div>
              <span className="text-[11px] text-emerald-300">Truth-telling equilibrium</span>
            </div>

            <div className="bg-[#070E17] border border-[#FFC20E]/40 p-4 rounded-lg bg-[#FFC20E]/5">
              <span className="text-xs text-[#FFC20E] font-mono">Municipal Capital Preserved</span>
              <div className="text-2xl font-bold text-[#FFC20E] mt-1 font-mono">
                R{vcgOutcome.cartelSavingsZAR.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
              </div>
              <span className="text-[11px] text-slate-400">Direct ratepayer savings (29.5%)</span>
            </div>
          </div>

          <div className="bg-[#070E17] border border-[#1E2D42] rounded-lg p-4">
            <div className="text-xs font-mono uppercase tracking-wider text-[#FFC20E] mb-3">
              Combinatorial SMME Coalition Allocations (Pareto-Optimal)
            </div>
            <div className="space-y-3">
              {vcgOutcome.assignments.map((asgn) => (
                <div key={asgn.packageId} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded bg-[#0B1524] border border-[#1E2D42] gap-2">
                  <div>
                    <span className="text-xs font-mono text-slate-400">{asgn.packageId}</span>
                    <div className="text-sm font-bold text-white">{asgn.awardedBidderName}</div>
                    <span className="text-[11px] text-emerald-400 font-mono">Level {asgn.bbeeLevel} B-BBEE Contributor</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-mono font-bold text-[#FFC20E]">
                      VCG Clearing: R{asgn.vcgPaymentZAR.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">Bid: R{asgn.bidPriceZAR.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Hydro FFT Acoustic Leak Detection */}
      {activeTab === 'hydroAcoustic' && (
        <div className="mt-6 space-y-5">
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-lg p-5">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-rose-500/20 text-rose-400 rounded-lg">
                <Droplets className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-rose-500 text-white font-mono text-xs font-bold">
                    ACOUSTIC RUPTURE IDENTIFIED
                  </span>
                  <span className="text-xs font-mono text-slate-400">Sensor: {hydroResult.sensorId}</span>
                  <span className="text-xs font-mono text-[#FFC20E]">Belgravia Valley Municipal Valve #09</span>
                </div>
                <h3 className="text-base font-bold text-white mt-2">
                  Underground Main Rupture Triangulated via FFT Spectral Resonance (1.2 kHz)
                </h3>
                <p className="text-xs text-rose-200 mt-1">
                  High-frequency acoustic energy concentration ({hydroResult.leakBandEnergyRatio}%) in the 500Hz-2500Hz pipe friction band indicates active turbulent water escape under 4.2 bar pressure.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#070E17] border border-[#1E2D42] p-4 rounded-lg">
              <span className="text-xs text-slate-400 font-mono">Dominant Acoustic Frequency</span>
              <div className="text-2xl font-bold text-white mt-1 font-mono">
                {hydroResult.dominantFrequencyHz} Hz
              </div>
              <span className="text-[11px] text-slate-500">Pipe material: High-density PVC</span>
            </div>

            <div className="bg-[#070E17] border border-[#1E2D42] p-4 rounded-lg">
              <span className="text-xs text-slate-400 font-mono">Water Loss Rate</span>
              <div className="text-2xl font-bold text-rose-400 mt-1 font-mono">
                {hydroResult.estimatedWaterLossLitersPerHour.toLocaleString()} L/hr
              </div>
              <span className="text-[11px] text-slate-500">348 kL per 24-hour cycle</span>
            </div>

            <div className="bg-[#070E17] border border-[#FFC20E]/40 p-4 rounded-lg">
              <span className="text-xs text-[#FFC20E] font-mono">Municipal Revenue Hemorrhage</span>
              <div className="text-2xl font-bold text-[#FFC20E] mt-1 font-mono">
                R{hydroResult.monetaryLossZARPerDay.toLocaleString('en-ZA', { minimumFractionDigits: 2 })} / day
              </div>
              <span className="text-[11px] text-slate-400">R365k+ / month if unintercepted</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

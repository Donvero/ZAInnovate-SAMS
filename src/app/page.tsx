"use client";

import React from "react";
import StatsCard from "@/components/dashboard/StatsCard";
import AlertsTable from "@/components/dashboard/AlertsTable";
import RiskChart from "@/components/dashboard/RiskChart";
import NeuroSymbolicAuditTerminal from "@/components/dashboard/NeuroSymbolicAuditTerminal";
import {
  ShieldAlert,
  Coins,
  FileCheck2,
  Activity,
  Download,
  PlusCircle,
  RefreshCw,
  Search,
  Sparkles,
} from "lucide-react";

export default function SamsDashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Top Banner / Hero header */}
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-400 border border-gold-500/30">
              <Sparkles className="h-3.5 w-3.5" />
              AI Predictive Engine Active
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Live Feed: Eastern Cape Municipal Cluster
            </span>
          </div>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-4xl">
            SAMS Predictive Governance Portal
          </h1>
          <p className="mt-1 text-sm text-slate-400 max-w-3xl">
            Proactive pattern-recognition engine analyzing SCM transactions, tender splitting, and single-source deviations to prevent adverse AGSA audit findings.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-navy-700 bg-navy-800/80 px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-navy-700 transition-colors">
            <Download className="h-3.5 w-3.5 text-gold-400" />
            AGSA Dossier Export
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-gold-500 px-4 py-2 text-xs font-bold text-navy-950 hover:bg-gold-400 transition-all shadow-md shadow-gold-500/10">
            <PlusCircle className="h-3.5 w-3.5" />
            Ingest SCM Batch
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Irregularity Flags"
          value="18"
          change="-28%"
          isPositive={true}
          subtext="3 Critical requiring AO intervention"
          icon={ShieldAlert}
          badgeText="Predictive Early"
        />
        <StatsCard
          title="Preserved Public Capital"
          value="R 61.2M"
          change="+34.5%"
          isPositive={true}
          subtext="Blocked before electronic voucher signoff"
          icon={Coins}
          badgeText="YTD 2025/26"
        />
        <StatsCard
          title="Clean Audit Readiness Index"
          value="94.2%"
          change="+6.1%"
          isPositive={true}
          subtext="MFMA Section 116 compliance score"
          icon={FileCheck2}
          badgeText="AGSA Standard"
        />
        <StatsCard
          title="Scanned SCM Vouchers"
          value="14,892"
          change="+18%"
          isPositive={true}
          subtext="Live cross-checks against Persal & CIPC"
          icon={Activity}
          badgeText="99.98% uptime"
        />
      </div>

      {/* Analytics & Charts */}
      <div className="mt-8">
        <RiskChart />
      </div>

      {/* Frontier Neuro-Symbolic Verification Engine */}
      <div className="mt-8">
        <NeuroSymbolicAuditTerminal />
      </div>

      {/* Live Alerts Radar Table */}
      <div className="mt-8" id="alerts">
        <AlertsTable />
      </div>

      {/* Statutory Regulatory Reference Banner */}
      <div className="mt-8 rounded-xl border border-gold-500/20 bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 p-6 text-slate-300 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-bold text-gold-400 uppercase tracking-wider">
              Statutory Compliance Alignment
            </h4>
            <p className="mt-1 text-xs text-slate-300 max-w-2xl">
              SAMS maps directly to the <strong>Public Audit Act (PAA)</strong> amendments, empowering Accounting Officers to discharge duties under <strong>MFMA Section 62</strong> and <strong>PFMA Section 38</strong>, averting Certificates of Debt.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">
              National Treasury Standard v4.1
            </span>
            <button className="rounded-lg bg-navy-950 px-3 py-1.5 text-xs font-semibold text-gold-400 border border-gold-500/30 hover:bg-gold-500 hover:text-navy-950 transition-colors">
              Review Framework
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

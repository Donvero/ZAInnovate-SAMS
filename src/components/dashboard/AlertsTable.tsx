"use client";

import React, { useState } from "react";
import { AlertTriangle, ShieldAlert, CheckCircle, Search, ExternalLink, Filter } from "lucide-react";

export interface AlertItem {
  id: string;
  code: string;
  title: string;
  department: string;
  statutoryRef: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  potentialLossZAR: number;
  confidence: number;
  timeAgo: string;
  status: "ACTIVE" | "ACKNOWLEDGED" | "RESOLVED";
}

const mockAlerts: AlertItem[] = [
  {
    id: "1",
    code: "ALT-2026-081",
    title: "Split Tender Pattern Detected (Under R200k Quota Bypassing)",
    department: "Buffalo City Metro - Infrastructure & Engineering",
    statutoryRef: "MFMA S116 & National Treasury SCM Instruction 3",
    severity: "CRITICAL",
    potentialLossZAR: 594000,
    confidence: 94.8,
    timeAgo: "12m ago",
    status: "ACTIVE",
  },
  {
    id: "2",
    code: "ALT-2026-079",
    title: "Sole-Supplier Deviation Without Prior Accounting Officer Approval",
    department: "Eastern Cape Dept of Health - Procurement",
    statutoryRef: "PFMA S38(1)(a)(iii) & Treasury Reg 16A6.4",
    severity: "HIGH",
    potentialLossZAR: 2450000,
    confidence: 89.2,
    timeAgo: "45m ago",
    status: "ACTIVE",
  },
  {
    id: "3",
    code: "ALT-2026-074",
    title: "Director Identity Matches State Persal Database Record",
    department: "Nelson Mandela Bay Municipality - Waste Management",
    statutoryRef: "SCM Regulation 44 (Prohibited Awards to State Employees)",
    severity: "CRITICAL",
    potentialLossZAR: 1200000,
    confidence: 98.4,
    timeAgo: "2h ago",
    status: "ACTIVE",
  },
  {
    id: "4",
    code: "ALT-2026-068",
    title: "Variation Order Exceeds 20% Construction Threshold",
    department: "OR Tambo District Municipality - Water Services",
    statutoryRef: "MFMA Circular 62 (Expansion/Variation of Contracts)",
    severity: "MEDIUM",
    potentialLossZAR: 430000,
    confidence: 82.1,
    timeAgo: "5h ago",
    status: "ACKNOWLEDGED",
  },
  {
    id: "5",
    code: "ALT-2026-062",
    title: "Supplier CIPC Deregistration / Inactive Tax Compliance Status",
    department: "Sarah Baartman District - Corporate Services",
    statutoryRef: "SARS Tax Pin Validation & PPPFA 2022",
    severity: "LOW",
    potentialLossZAR: 85000,
    confidence: 96.0,
    timeAgo: "1d ago",
    status: "RESOLVED",
  },
];

export const AlertsTable: React.FC = () => {
  const [filterSeverity, setFilterSeverity] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filtered = mockAlerts.filter((item) => {
    const matchesSeverity = filterSeverity === "ALL" || item.severity === filterSeverity;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  const getSeverityBadge = (severity: AlertItem["severity"]) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-rose-500/15 text-rose-400 border border-rose-500/30";
      case "HIGH":
        return "bg-amber-500/15 text-amber-400 border border-amber-500/30";
      case "MEDIUM":
        return "bg-yellow-500/15 text-yellow-300 border border-yellow-500/30";
      case "LOW":
        return "bg-blue-500/15 text-blue-300 border border-blue-500/30";
    }
  };

  const formatZAR = (val: number) => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="rounded-xl border border-navy-700/60 bg-gradient-to-b from-navy-800/90 to-navy-900/90 p-5 shadow-lg backdrop-blur-md">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-white">
              Live SCM Irregularity Radar
            </h3>
            <span className="inline-flex items-center rounded-full bg-rose-500/10 px-2 py-0.5 text-xs font-medium text-rose-400 border border-rose-500/20 animate-pulse">
              Predictive Active
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-400">
            Real-time pattern flags preventing AGSA audit findings across PFMA / MFMA supply chain flows.
          </p>
        </div>

        {/* Filter & Search */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by title or entity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 rounded-lg border border-navy-700 bg-navy-950/80 pl-8 pr-3 text-xs text-slate-200 placeholder:text-slate-500 focus:border-gold-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center rounded-lg border border-navy-700 bg-navy-950/80 p-0.5 text-xs">
            {["ALL", "CRITICAL", "HIGH", "MEDIUM"].map((lvl) => (
              <button
                key={lvl}
                onClick={() => setFilterSeverity(lvl)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
                  filterSeverity === lvl
                    ? "bg-gold-500 text-navy-950 font-semibold shadow"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-navy-700/60 text-slate-400 uppercase tracking-wider text-[11px]">
              <th className="pb-3 font-medium">Alert / Code</th>
              <th className="pb-3 font-medium">Department / Organ of State</th>
              <th className="pb-3 font-medium">Regulatory Rule</th>
              <th className="pb-3 font-medium">Severity</th>
              <th className="pb-3 font-medium">Exposure (ZAR)</th>
              <th className="pb-3 font-medium">AI Confidence</th>
              <th className="pb-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-navy-700/40 text-slate-300">
            {filtered.map((alert) => (
              <tr
                key={alert.id}
                className="transition-colors hover:bg-navy-750/50"
              >
                <td className="py-3.5 pr-3">
                  <div className="font-semibold text-white">{alert.title}</div>
                  <div className="text-[11px] text-gold-500/80 font-mono mt-0.5">
                    {alert.code} • {alert.timeAgo}
                  </div>
                </td>
                <td className="py-3.5 pr-3 text-slate-300 font-medium">
                  {alert.department}
                </td>
                <td className="py-3.5 pr-3">
                  <span className="rounded bg-navy-950/80 px-2 py-1 text-[11px] font-mono text-slate-300 border border-navy-700/80">
                    {alert.statutoryRef}
                  </span>
                </td>
                <td className="py-3.5 pr-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide ${getSeverityBadge(
                      alert.severity
                    )}`}
                  >
                    {alert.severity}
                  </span>
                </td>
                <td className="py-3.5 pr-3 font-mono font-semibold text-white">
                  {formatZAR(alert.potentialLossZAR)}
                </td>
                <td className="py-3.5 pr-3">
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-14 rounded-full bg-navy-700 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gold-500 to-amber-400 rounded-full"
                        style={{ width: `${alert.confidence}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {alert.confidence}%
                    </span>
                  </div>
                </td>
                <td className="py-3.5 text-right">
                  <button className="inline-flex items-center gap-1 rounded-md bg-gold-500/10 px-2.5 py-1 text-[11px] font-medium text-gold-400 hover:bg-gold-500 hover:text-navy-950 transition-colors border border-gold-500/30">
                    Audit Dossier
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlertsTable;

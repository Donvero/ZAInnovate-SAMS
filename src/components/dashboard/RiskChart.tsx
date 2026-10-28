"use client";

import React from "react";
import { ShieldCheck, AlertCircle, BarChart3 } from "lucide-react";

interface MonthlyTrend {
  month: string;
  irregularitiesPrevented: number;
  savingsMillionZAR: number;
  cleanAuditIndex: number;
}

const trendData: MonthlyTrend[] = [
  { month: "May", irregularitiesPrevented: 14, savingsMillionZAR: 4.2, cleanAuditIndex: 78 },
  { month: "Jun", irregularitiesPrevented: 19, savingsMillionZAR: 6.8, cleanAuditIndex: 81 },
  { month: "Jul", irregularitiesPrevented: 27, savingsMillionZAR: 9.4, cleanAuditIndex: 85 },
  { month: "Aug", irregularitiesPrevented: 22, savingsMillionZAR: 8.1, cleanAuditIndex: 88 },
  { month: "Sep", irregularitiesPrevented: 34, savingsMillionZAR: 14.5, cleanAuditIndex: 92 },
  { month: "Oct", irregularitiesPrevented: 41, savingsMillionZAR: 18.2, cleanAuditIndex: 96 },
];

export const RiskChart: React.FC = () => {
  const maxSavings = 20;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {/* 6-Month Predictive Interception Trend */}
      <div className="lg:col-span-2 rounded-xl border border-navy-700/60 bg-gradient-to-b from-navy-800/90 to-navy-900/90 p-5 shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-gold-500" />
              <h3 className="text-base font-semibold text-white">
                Predictive Audit Interception Trend
              </h3>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Irregular expenditure blocked before AGSA sign-off (in Millions ZAR)
            </p>
          </div>
          <span className="rounded-full bg-gold-500/10 px-2.5 py-1 text-xs font-semibold text-gold-400 border border-gold-500/20">
            R61.2M Total Preserved
          </span>
        </div>

        {/* Chart Visualization */}
        <div className="mt-6 flex h-48 items-end gap-3 sm:gap-6 border-b border-navy-700 pb-2">
          {trendData.map((d) => {
            const heightPercent = (d.savingsMillionZAR / maxSavings) * 100;
            return (
              <div key={d.month} className="group relative flex flex-1 flex-col items-center">
                {/* Tooltip */}
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-navy-950 border border-gold-500/40 text-[10px] text-white px-2 py-1 rounded shadow-lg pointer-events-none whitespace-nowrap z-20">
                  R{d.savingsMillionZAR}M • {d.irregularitiesPrevented} flags
                </div>

                <div className="w-full flex justify-center items-end h-36">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full max-w-[42px] rounded-t-md bg-gradient-to-t from-navy-600 via-gold-600/80 to-gold-400 transition-all duration-300 group-hover:brightness-110 shadow-sm"
                  />
                </div>
                <span className="mt-2 text-xs font-medium text-slate-400 group-hover:text-gold-400">
                  {d.month}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-gold-500" />
            <span>Preserved Public Funds</span>
          </div>
          <span>Audited under MFMA / PFMA standards</span>
        </div>
      </div>

      {/* Irregularity Risk Category Breakdown */}
      <div className="rounded-xl border border-navy-700/60 bg-gradient-to-b from-navy-800/90 to-navy-900/90 p-5 shadow-lg backdrop-blur-md">
        <h3 className="text-base font-semibold text-white">
          Irregularity Pattern Breakdown
        </h3>
        <p className="mt-1 text-xs text-slate-400">
          Distribution of intercepted anomalies across active pipelines
        </p>

        <div className="mt-5 space-y-3.5">
          {[
            { label: "Split Tender Thresholds", pct: 38, count: 24, color: "bg-rose-500" },
            { label: "Sole-Source Deviations", pct: 26, count: 17, color: "bg-amber-500" },
            { label: "State Employee Directorships", pct: 19, count: 12, color: "bg-gold-500" },
            { label: "Contract Variations > 15%", pct: 11, count: 7, color: "bg-blue-400" },
            { label: "Tax Pin & CIPC Anomalies", pct: 6, count: 4, color: "bg-emerald-400" },
          ].map((cat) => (
            <div key={cat.label}>
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-medium">{cat.label}</span>
                <span className="text-slate-400">{cat.count} flags ({cat.pct}%)</span>
              </div>
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-navy-950 overflow-hidden">
                <div
                  className={`h-full ${cat.color} rounded-full`}
                  style={{ width: `${cat.pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-lg border border-navy-700 bg-navy-950/60 p-3 text-xs text-slate-300 flex items-start gap-2.5">
          <ShieldCheck className="h-4 w-4 text-gold-500 flex-shrink-0 mt-0.5" />
          <span>
            Compliant with <strong>AGSA Material Irregularity (MI)</strong> notification regulations.
          </span>
        </div>
      </div>
    </div>
  );
};

export default RiskChart;

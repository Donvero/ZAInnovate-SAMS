import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ShieldCheck, Bell, UserCheck, Building2, ChevronDown } from "lucide-react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "SAMS | Smart Audit Management System - ZAInnovate Technologies",
  description:
    "Predictive governance and supply chain irregularity interception platform for South African Municipalities and Provincial Departments. Engineered by ZAInnovate Technologies (Pty) Ltd.",
  keywords: [
    "SAMS",
    "Audit Management System",
    "PFMA",
    "MFMA",
    "AGSA",
    "Predictive Governance",
    "South Africa Public Sector",
    "ZAInnovate Technologies",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#08101C] font-sans text-slate-100 antialiased selection:bg-gold-500 selection:text-navy-950">
        {/* Top Sovereign Gov Banner */}
        <div className="border-b border-navy-800 bg-[#060D17] px-4 py-1.5 text-[11px] text-slate-400">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="font-semibold text-slate-300">
                ZA Sovereign Cloud
              </span>
              <span className="text-slate-500">|</span>
              <span>POPIA & Treasury Regulations Certified</span>
            </div>
            <div className="hidden sm:flex items-center gap-4">
              <span>ZAInnovate Technologies (Pty) Ltd</span>
              <span>Reg: 2025/572318/07</span>
              <span className="rounded bg-gold-500/10 px-1.5 py-0.5 font-semibold text-gold-400 border border-gold-500/30">
                B-BBEE Level 1
              </span>
            </div>
          </div>
        </div>

        {/* Primary Navbar */}
        <header className="sticky top-0 z-50 border-b border-navy-700/80 bg-[#0E1B2E]/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-gold-400 to-gold-600 text-navy-950 shadow-md font-black text-xl">
                Z
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black tracking-tight text-white">
                    SAMS
                  </span>
                  <span className="rounded bg-gold-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-400 border border-gold-500/30">
                    Predictive Gov
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">
                  ZAInnovate Technologies • Smart Audit Management System
                </p>
              </div>
            </div>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
              <a href="#" className="text-gold-400 font-semibold transition-colors">
                Overview & Radar
              </a>
              <a href="#alerts" className="hover:text-gold-400 transition-colors">
                Irregularity Alerts
              </a>
              <a href="#tenders" className="hover:text-gold-400 transition-colors">
                SCM Procurement
              </a>
              <a href="#compliance" className="hover:text-gold-400 transition-colors">
                AGSA Clean Audit Index
              </a>
              <a href="#reports" className="hover:text-gold-400 transition-colors">
                Statutory Reports
              </a>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-2 rounded-lg border border-navy-700 bg-navy-950/60 px-3 py-1.5 text-xs text-slate-300">
                <Building2 className="h-3.5 w-3.5 text-gold-400" />
                <span>Buffalo City Metro (BCMM)</span>
                <ChevronDown className="h-3 w-3 text-slate-500" />
              </div>

              <button
                className="relative rounded-lg border border-navy-700 bg-navy-800 p-2 text-slate-300 hover:text-gold-400 transition-colors"
                title="Notifications"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                  3
                </span>
              </button>

              <div className="flex items-center gap-2 rounded-lg border border-navy-700 bg-navy-800/80 p-1.5 pl-2.5">
                <div className="text-right text-xs hidden sm:block">
                  <div className="font-semibold text-white">D. Vero (CA SA)</div>
                  <div className="text-[10px] text-gold-400">Chief Audit Executive</div>
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gold-500 text-xs font-bold text-navy-950">
                  DV
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main>{children}</main>

        {/* Footer */}
        <footer className="mt-16 border-t border-navy-800 bg-[#060D17] py-8 text-xs text-slate-500">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-gold-500"></div>
              <span>
                SAMS v2.4 • Engineered by{" "}
                <span className="text-slate-300 font-semibold">
                  ZAInnovate Technologies (Pty) Ltd
                </span>
                , East London, South Africa
              </span>
            </div>
            <div>
              <span>Aligned with MFMA, PFMA & National Treasury Regulations</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

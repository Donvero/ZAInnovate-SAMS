import React from "react";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  subtext: string;
  icon: LucideIcon;
  badgeText?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  isPositive,
  subtext,
  icon: Icon,
  badgeText,
}) => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-navy-700/60 bg-gradient-to-b from-navy-800/90 to-navy-900/90 p-5 shadow-lg backdrop-blur-md transition-all duration-200 hover:border-gold-500/40 hover:shadow-gold-500/5">
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            {title}
          </span>
          <div className="mt-2 text-2xl font-bold tracking-tight text-white lg:text-3xl">
            {value}
          </div>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-gold-500/20 bg-gold-500/10 text-gold-500">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-navy-700/50 pt-3">
        <div className="flex items-center space-x-1.5 text-xs">
          {isPositive ? (
            <span className="flex items-center font-medium text-emerald-400">
              <TrendingUp className="mr-1 h-3.5 w-3.5" />
              {change}
            </span>
          ) : (
            <span className="flex items-center font-medium text-rose-400">
              <TrendingDown className="mr-1 h-3.5 w-3.5" />
              {change}
            </span>
          )}
          <span className="text-slate-400">vs prev cycle</span>
        </div>

        {badgeText && (
          <span className="inline-flex items-center rounded-full bg-navy-700/80 px-2 py-0.5 text-[11px] font-medium text-slate-300">
            {badgeText}
          </span>
        )}
      </div>

      <p className="mt-1 text-[11px] text-slate-400">{subtext}</p>
    </div>
  );
};

export default StatsCard;

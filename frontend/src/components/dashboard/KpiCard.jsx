import React from 'react';
import GlassCard from '../ui/GlassCard';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const KpiCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive = true,
  statusColor = 'orange',
}) => {
  const glowColors = {
    orange: 'border-l-4 border-l-pulse-orange',
    green: 'border-l-4 border-l-emerald-500',
    amber: 'border-l-4 border-l-amber-500',
    red: 'border-l-4 border-l-rose-500',
    blue: 'border-l-4 border-l-blue-500',
  };

  const iconBg = {
    orange: 'bg-pulse-orange/15 text-pulse-orange border-pulse-orange/30',
    green: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    red: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    blue: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  };

  return (
    <GlassCard className={`relative overflow-hidden ${glowColors[statusColor]}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-extrabold text-white mt-1 tracking-tight">{value}</h3>
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl border ${iconBg[statusColor]} shadow-sm`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-800/60">
        <span className="text-xs text-slate-400 font-medium">{subtitle}</span>
        {trend && (
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold ${
              trendPositive ? 'text-emerald-400' : 'text-rose-400'
            }`}
          >
            {trendPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {trend}
          </span>
        )}
      </div>
    </GlassCard>
  );
};

export default KpiCard;

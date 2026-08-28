import React from 'react';
import GlassCard from '../ui/GlassCard';
import { AlertTriangle, TrendingDown, Users, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const RiskReasoningCard = ({ reasons = [] }) => {
  return (
    <GlassCard className="space-y-4 border-l-4 border-l-rose-500">
      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-400" />
          <span>Why is this project at risk?</span>
        </h3>
        <p className="text-xs text-slate-400">Backend AI prediction algorithm factor decomposition</p>
      </div>

      <div className="space-y-3">
        {reasons.length === 0 ? (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>No critical risk factors detected. Project is performing within normal buffer parameters.</span>
          </div>
        ) : (
          reasons.map((reason, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-navy-900/90 border border-slate-800 space-y-1 hover:border-slate-700 transition-all"
            >
              <div className="flex justify-between items-center">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pulse-orange" />
                  <span>{reason.title}</span>
                </h4>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                    reason.severity === 'High'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {reason.severity} Severity
                </span>
              </div>
              <p className="text-xs text-slate-300 pl-4">{reason.desc}</p>
            </div>
          ))
        )}
      </div>
    </GlassCard>
  );
};

export default RiskReasoningCard;

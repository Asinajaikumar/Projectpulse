import React from 'react';
import GlassCard from '../ui/GlassCard';
import RiskBadge from '../ui/Badge';
import { Calendar, Clock, Sparkles, TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react';

export const ScenarioComparison = ({ result }) => {
  if (!result) return null;

  const { currentPlan, simulatedPlan, impactSummary } = result;

  return (
    <div className="space-y-6">
      {/* Top Impact Banner */}
      <GlassCard variant="orange" className="p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-pulse-orange text-white shadow-glow-orange">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-pulse-orange">
                Simulation Impact Result
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-0.5">
                Schedule improves by <span className="text-emerald-400 font-mono">+{impactSummary.daysSaved} Days</span>
              </h3>
              <p className="text-xs text-slate-300 mt-1">{impactSummary.statusChange}</p>
            </div>
          </div>

          <div className="text-right px-4 py-2 rounded-xl bg-navy-950/80 border border-pulse-orange/30">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">New Risk Status</span>
            <div className="mt-1">
              <RiskBadge status={simulatedPlan.riskStatus} size="md" />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Side-by-Side Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Baseline Plan */}
        <GlassCard className="space-y-4 border-l-4 border-l-rose-500">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <h4 className="font-bold text-white text-base">Current Plan (Baseline)</h4>
            <RiskBadge status={currentPlan.riskStatus} size="sm" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Target Deadline:</span>
              <span className="font-mono text-slate-200 font-semibold">{currentPlan.targetDeadline}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Expected Completion:</span>
              <span className="font-mono text-rose-400 font-bold">{currentPlan.expectedCompletion}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Project Delay:</span>
              <span className="font-mono text-rose-400 font-bold">+{currentPlan.delayDays} Days Delayed</span>
            </div>
          </div>
        </GlassCard>

        {/* Simulated Plan */}
        <GlassCard className="space-y-4 border-l-4 border-l-emerald-500 bg-emerald-950/10">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <h4 className="font-bold text-white text-base flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Simulated Plan</span>
            </h4>
            <RiskBadge status={simulatedPlan.riskStatus} size="sm" />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Target Deadline:</span>
              <span className="font-mono text-slate-200 font-semibold">{simulatedPlan.targetDeadline}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Simulated Completion:</span>
              <span className="font-mono text-emerald-400 font-extrabold">{simulatedPlan.expectedCompletion}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Project Delay:</span>
              <span className="font-mono text-emerald-400 font-bold">
                {simulatedPlan.delayDays === 0 ? '0 Days (On Schedule!)' : `+${simulatedPlan.delayDays} Days`}
              </span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Backend Executive Recommendation */}
      <GlassCard className="p-4 bg-navy-900 border border-slate-800 flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-pulse-orange shrink-0 mt-0.5" />
        <div className="text-xs">
          <strong className="text-white font-bold block mb-0.5">AI Optimization Recommendation:</strong>
          <p className="text-slate-300">{impactSummary.recommendation}</p>
        </div>
      </GlassCard>
    </div>
  );
};

export default ScenarioComparison;

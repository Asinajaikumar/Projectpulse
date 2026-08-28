import React from 'react';
import GlassCard from '../ui/GlassCard';
import FireArrowButton from '../ui/FireArrowButton';
import { Sliders, UserPlus, ShieldOff, Zap, RefreshCw } from 'lucide-react';

export const SimulationControls = ({
  params,
  onChange,
  onSimulate,
  onReset,
  loading
}) => {
  return (
    <GlassCard className="space-y-6">
      <div className="flex justify-between items-center pb-3 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-pulse-orange" />
            <span>Simulation Parameters</span>
          </h3>
          <p className="text-xs text-slate-400">Adjust variables to send to the prediction calculation engine</p>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Input 1: Add Extra Developers */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-200 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-blue-400" />
            <span>Assign Additional Engineers</span>
          </span>
          <span className="text-pulse-orange font-mono font-bold">+{params.extraDevelopers} Devs</span>
        </label>
        <input
          type="range"
          min="0"
          max="5"
          step="1"
          value={params.extraDevelopers}
          onChange={(e) => onChange('extraDevelopers', Number(e.target.value))}
          className="w-full h-2 bg-navy-950 rounded-lg appearance-none cursor-pointer accent-pulse-orange border border-slate-800"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>+0 Baseline</span>
          <span>+2 Devs</span>
          <span>+5 Max</span>
        </div>
      </div>

      {/* Input 2: Remove Critical Task Blocker */}
      <div className="p-4 rounded-xl bg-navy-900/80 border border-slate-800 flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldOff className="w-4 h-4 text-emerald-400" />
            <span>Unblock Task #102</span>
          </div>
          <p className="text-xs text-slate-400">Simulate resolving the 7-day database dump bottleneck</p>
        </div>
        <button
          type="button"
          onClick={() => onChange('removeBlockers', !params.removeBlockers)}
          className={`w-12 h-6 rounded-full transition-colors relative border ${
            params.removeBlockers ? 'bg-pulse-orange border-pulse-orange' : 'bg-navy-950 border-slate-700'
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
              params.removeBlockers ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Input 3: Priority Boost */}
      <div className="p-4 rounded-xl bg-navy-900/80 border border-slate-800 flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Sprint Overtime / Priority Boost</span>
          </div>
          <p className="text-xs text-slate-400">Escalate priority to High for all pending modeling tasks</p>
        </div>
        <button
          type="button"
          onClick={() => onChange('priorityBoost', !params.priorityBoost)}
          className={`w-12 h-6 rounded-full transition-colors relative border ${
            params.priorityBoost ? 'bg-pulse-orange border-pulse-orange' : 'bg-navy-950 border-slate-700'
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
              params.priorityBoost ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* Submit Simulation CTA */}
      <FireArrowButton
        onClick={onSimulate}
        disabled={loading}
        size="lg"
        className="w-full"
      >
        {loading ? 'Calculating Backend Model...' : 'Run What-If Simulation'}
      </FireArrowButton>
    </GlassCard>
  );
};

export default SimulationControls;

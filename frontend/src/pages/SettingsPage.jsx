import React from 'react';
import GlassCard from '../components/ui/GlassCard';
import { Settings, Server, Shield, Bell, Github } from 'lucide-react';

export const SettingsPage = () => {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">System Settings & Integration</h1>
        <p className="text-xs text-slate-400 mt-1">Configure API connections, Supabase credentials & GitHub webhooks</p>
      </div>

      <GlassCard className="p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Server className="w-5 h-5 text-pulse-orange" />
            <span>Backend Endpoint Configuration</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Backend API URL (VITE_API_URL)</label>
              <input
                type="text"
                readOnly
                value={import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}
                className="w-full px-3 py-2 bg-navy-900 border border-slate-800 rounded-xl text-slate-300 font-mono"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Mock Data Fallback Mode</label>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-between font-mono">
                <span>ENABLED (Standalone Client Mode)</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Github className="w-5 h-5 text-blue-400" />
            <span>GitHub OAuth Telemetry</span>
          </h3>
          <p className="text-xs text-slate-300">
            Connected to <strong>projectpulse/cloud-migration-backend</strong> with real-time push webhook triggers.
          </p>
        </div>
      </GlassCard>
    </div>
  );
};

export default SettingsPage;

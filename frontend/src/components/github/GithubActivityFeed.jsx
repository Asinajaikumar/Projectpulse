import React, { useState } from 'react';
import GlassCard from '../ui/GlassCard';
import FireArrowButton from '../ui/FireArrowButton';
import {
  Github,
  GitCommit,
  GitPullRequest,
  AlertCircle,
  Users,
  RefreshCw,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export const GithubActivityFeed = ({ data, onSync }) => {
  const [syncing, setSyncing] = useState(false);

  const handleSyncClick = async () => {
    setSyncing(true);
    await onSync();
    setTimeout(() => setSyncing(false), 800);
  };

  return (
    <div className="space-y-8">
      {/* Top Header Sync Status */}
      <GlassCard className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-navy-800 border border-slate-700 text-white shadow-glow-orange/20">
            <Github className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>GitHub Integration Activity</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {data.syncStatus}
              </span>
            </h2>
            <p className="text-xs text-slate-400">Repo: <strong className="text-slate-200">projectpulse/cloud-migration-backend</strong> • Last sync: {data.lastSyncTime}</p>
          </div>
        </div>

        <button
          onClick={handleSyncClick}
          disabled={syncing}
          className="px-4 py-2.5 rounded-xl bg-navy-800 hover:bg-navy-750 text-white border border-slate-700 hover:border-pulse-orange/40 text-xs font-semibold flex items-center gap-2 transition-all"
        >
          <RefreshCw className={`w-4 h-4 text-pulse-orange ${syncing ? 'animate-spin' : ''}`} />
          <span>{syncing ? 'Syncing Webhooks...' : 'Sync GitHub Activity'}</span>
        </button>
      </GlassCard>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-4 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Total Commits</span>
          <div className="text-2xl font-extrabold text-white flex items-center justify-between">
            <span>{data.totalCommits}</span>
            <GitCommit className="w-5 h-5 text-pulse-orange" />
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">+14 this week</span>
        </div>

        <div className="p-4 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Pull Requests</span>
          <div className="text-2xl font-extrabold text-white flex items-center justify-between">
            <span>{data.totalPRs}</span>
            <GitPullRequest className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-[10px] text-blue-400 font-mono">3 open PRs</span>
        </div>

        <div className="p-4 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Open Issues</span>
          <div className="text-2xl font-extrabold text-white flex items-center justify-between">
            <span>{data.openIssues}</span>
            <AlertCircle className="w-5 h-5 text-amber-400" />
          </div>
          <span className="text-[10px] text-amber-400 font-mono">2 high priority</span>
        </div>

        <div className="p-4 rounded-2xl bg-navy-900/80 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-medium">Contributors</span>
          <div className="text-2xl font-extrabold text-white flex items-center justify-between">
            <span>{data.activeContributors}</span>
            <Users className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-[10px] text-emerald-400 font-mono">Active dev team</span>
        </div>
      </div>

      {/* Grid: Commit Velocity Bar Chart & Recent Commits Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Commit Weekly Trend */}
        <GlassCard className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <GitCommit className="w-5 h-5 text-pulse-orange" />
            <span>Weekly Commit & PR Velocity</span>
          </h3>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.weeklyTrends}>
                <XAxis dataKey="day" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1E293B', borderRadius: '12px' }} />
                <Bar dataKey="commits" name="Commits" fill="#FF5722" radius={[4, 4, 0, 0]} />
                <Bar dataKey="prs" name="Pull Requests" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Right: Recent Commits Feed */}
        <GlassCard className="space-y-4">
          <h3 className="text-lg font-bold text-white">Recent GitHub Commits</h3>
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {data.recentCommits.map((c) => (
              <div key={c.id} className="p-3 rounded-xl bg-navy-900/90 border border-slate-800 space-y-1 hover:border-slate-700 transition-all">
                <div className="flex justify-between items-center text-[10px] text-slate-400">
                  <span className="font-mono text-pulse-orange font-bold">#{c.hash}</span>
                  <span>{c.time}</span>
                </div>
                <p className="text-xs font-semibold text-white line-clamp-2">{c.message}</p>
                <div className="flex justify-between items-center text-[10px] text-slate-400 pt-1">
                  <span>Author: {c.author}</span>
                  <span className="font-mono text-slate-500">{c.repo}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default GithubActivityFeed;

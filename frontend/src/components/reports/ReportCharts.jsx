import React from 'react';
import GlassCard from '../ui/GlassCard';
import {
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { BarChart3, PieChart as PieIcon, TrendingUp, Users } from 'lucide-react';

export const ReportCharts = () => {
  const riskDistributionData = [
    { name: 'ON TRACK', value: 8, color: '#10B981' },
    { name: 'AT RISK', value: 3, color: '#F59E0B' },
    { name: 'DELAYED', value: 1, color: '#EF4444' },
  ];

  const progressOverTimeData = [
    { sprint: 'Sprint 1', actual: 15, expected: 15 },
    { sprint: 'Sprint 2', actual: 32, expected: 30 },
    { sprint: 'Sprint 3', actual: 48, expected: 50 },
    { sprint: 'Sprint 4', actual: 65, expected: 70 },
    { sprint: 'Sprint 5', actual: 78, expected: 85 },
  ];

  const teamPerformanceData = [
    { name: 'Sarah J.', completed: 18, pending: 2 },
    { name: 'David C.', completed: 15, pending: 3 },
    { name: 'Alex R.', completed: 22, pending: 1 },
    { name: 'Marcus V.', completed: 9, pending: 4 },
    { name: 'Elena R.', completed: 14, pending: 2 },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white">Project Analytics & Executive Reports</h2>
        <p className="text-xs text-slate-400">Historical sprint throughput, risk distribution & completion trends</p>
      </div>

      {/* Row 1: Progress Over Time & Risk Distribution Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-pulse-orange" />
            <span>Progress Over Time vs Baseline Target</span>
          </h3>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressOverTimeData}>
                <defs>
                  <linearGradient id="actColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5722" stopOpacity={0.5}/>
                    <stop offset="95%" stopColor="#FF5722" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="sprint" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} unit="%" />
                <Tooltip contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1E293B', borderRadius: '12px' }} />
                <Legend />
                <Area type="monotone" dataKey="actual" name="Actual Sprint Velocity %" stroke="#FF5722" strokeWidth={3} fill="url(#actColor)" />
                <Area type="monotone" dataKey="expected" name="Planned Baseline %" stroke="#64748B" strokeDasharray="4 4" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="space-y-4 flex flex-col justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <PieIcon className="w-5 h-5 text-pulse-orange" />
            <span>Portfolio Risk Distribution</span>
          </h3>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1E293B', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-800">
            <div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold block">8 ON TRACK</span>
              <span className="text-[10px] text-slate-500">66.7%</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-amber-400 font-bold block">3 AT RISK</span>
              <span className="text-[10px] text-slate-500">25.0%</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-rose-400 font-bold block">1 DELAYED</span>
              <span className="text-[10px] text-slate-500">8.3%</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Row 2: Team Performance Bar Chart */}
      <GlassCard className="space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-pulse-orange" />
          <span>Team Member Task Completion Throughput</span>
        </h3>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={teamPerformanceData}>
              <XAxis dataKey="name" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} />
              <Tooltip contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1E293B', borderRadius: '12px' }} />
              <Legend />
              <Bar dataKey="completed" name="Completed Tasks" fill="#10B981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" name="In-Flight Tasks" fill="#FF5722" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
};

export default ReportCharts;

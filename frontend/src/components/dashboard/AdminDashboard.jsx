import React from 'react';
import KpiCard from './KpiCard';
import GlassCard from '../ui/GlassCard';
import RiskBadge from '../ui/Badge';
import FireArrowButton from '../ui/FireArrowButton';
import { useNavigate } from 'react-router-dom';
import {
  FolderKanban,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  TrendingUp,
  Activity,
  Users,
  ArrowRight,
  GitCommit,
  GitPullRequest
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const AdminDashboard = ({ projects, predictions, githubActivity }) => {
  const navigate = useNavigate();

  const totalProjects = projects.length;
  const onTrackCount = projects.filter(p => p.riskStatus === 'ON TRACK').length;
  const atRiskCount = projects.filter(p => p.riskStatus === 'AT RISK').length;
  const delayedCount = projects.filter(p => p.riskStatus === 'DELAYED').length;

  const chartData = [
    { week: 'W1', progress: 20, predicted: 22 },
    { week: 'W2', progress: 35, predicted: 38 },
    { week: 'W3', progress: 48, predicted: 55 },
    { week: 'W4', progress: 62, predicted: 70 },
    { week: 'W5', progress: 75, predicted: 82 },
  ];

  return (
    <div className="space-y-8">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard
          title="Total Projects"
          value={totalProjects}
          subtitle="4 Active Sprints"
          icon={FolderKanban}
          statusColor="blue"
          trend="+1 this month"
        />
        <KpiCard
          title="On Track"
          value={onTrackCount}
          subtitle="Meeting targets"
          icon={CheckCircle2}
          statusColor="green"
          trend="50% of total"
        />
        <KpiCard
          title="At Risk"
          value={atRiskCount}
          subtitle="Requires attention"
          icon={AlertTriangle}
          statusColor="amber"
          trend="25% of total"
          trendPositive={false}
        />
        <KpiCard
          title="Delayed"
          value={delayedCount}
          subtitle="Action required"
          icon={AlertCircle}
          statusColor="red"
          trend="High priority"
          trendPositive={false}
        />
      </div>

      {/* Main Grid: Prediction Velocity Chart & High Risk Watch */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Overall Deadline Prediction Velocity Chart */}
        <GlassCard className="lg:col-span-2 space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-2">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-pulse-orange" />
                <span>Overall Deadline Prediction Velocity</span>
              </h3>
              <p className="text-xs text-slate-400">Backend AI prediction model output vs actual velocity</p>
            </div>
            <FireArrowButton
              onClick={() => navigate('/prediction')}
              variant="outline"
              size="sm"
            >
              Open Analytics
            </FireArrowButton>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorProg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF5722" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#FF5722" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPred" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="week" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} unit="%" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1E293B', borderRadius: '12px' }}
                />
                <Area type="monotone" dataKey="progress" name="Actual Progress %" stroke="#FF5722" strokeWidth={3} fillOpacity={1} fill="url(#colorProg)" />
                <Area type="monotone" dataKey="predicted" name="Backend Prediction %" stroke="#3B82F6" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorPred)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Right: Risk Warning Panel */}
        <GlassCard variant="orange" className="space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-pulse-orange">Critical Risk Alert</span>
              <RiskBadge status="DELAYED" size="sm" />
            </div>
            <h4 className="text-lg font-extrabold text-white">AI Deadline Analytics Engine</h4>
            <p className="text-xs text-slate-300 mt-1">
              Backend calculations indicate expected completion is <strong className="text-rose-400 font-semibold">12 days beyond target deadline</strong> due to task blocker #102.
            </p>
          </div>

          <div className="space-y-2 py-3 border-y border-pulse-orange/20 my-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Target Deadline:</span>
              <span className="font-mono text-slate-200 font-semibold">30 Sep 2026</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Expected Completion:</span>
              <span className="font-mono text-rose-400 font-bold">12 Oct 2026</span>
            </div>
          </div>

          <FireArrowButton
            onClick={() => navigate('/what-if')}
            variant="primary"
            size="md"
            className="w-full"
          >
            Start What-If Analysis
          </FireArrowButton>
        </GlassCard>
      </div>

      {/* Projects Overview List */}
      <GlassCard className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold text-white">Active Projects Monitoring</h3>
            <p className="text-xs text-slate-400">Live progress tracking and risk evaluation</p>
          </div>
          <FireArrowButton onClick={() => navigate('/projects')} variant="secondary" size="sm">
            View All Projects
          </FireArrowButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => navigate(`/projects/${proj.id}`)}
              className="p-4 rounded-xl bg-navy-900/80 border border-slate-800 hover:border-pulse-orange/40 transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-white group-hover:text-pulse-orange transition-colors">{proj.name}</h4>
                <RiskBadge status={proj.riskStatus} size="sm" />
              </div>
              <p className="text-xs text-slate-400 line-clamp-2 mb-3">{proj.description}</p>
              
              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400 font-medium">Progress</span>
                  <span className="text-pulse-orange font-mono font-bold">{proj.progress}%</span>
                </div>
                <div className="w-full h-2 bg-navy-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-pulse-orange to-amber-400 transition-all duration-500"
                    style={{ width: `${proj.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
                <span>Deadline: <strong className="text-slate-200">{proj.deadline}</strong></span>
                <span className="text-pulse-orange font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View Details <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default AdminDashboard;

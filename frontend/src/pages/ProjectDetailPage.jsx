import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import RiskBadge from '../components/ui/Badge';
import FireArrowButton from '../components/ui/FireArrowButton';
import ActivityTimeline from '../components/projects/ActivityTimeline';
import projectApi from '../api/projectApi';
import taskApi from '../api/taskApi';
import {
  Calendar,
  Clock,
  Github,
  CheckSquare,
  TrendingUp,
  ArrowLeft,
  Users,
  MessageSquare,
  ShieldAlert,
  Sliders
} from 'lucide-react';

export const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');

  useEffect(() => {
    const fetchProjectDetails = async () => {
      setLoading(true);
      try {
        const projData = await projectApi.getProjectById(id);
        const taskData = await taskApi.getTasks({ projectId: id });
        setProject(projData);
        setTasks(taskData);
      } finally {
        setLoading(false);
      }
    };
    fetchProjectDetails();
  }, [id]);

  if (loading || !project) {
    return <div className="p-8 text-center text-slate-400">Loading project details...</div>;
  }

  const tabs = [
    'Overview',
    'Tasks & Dependencies',
    'GitHub Sync',
    'Deadline Prediction',
    'Activity Timeline'
  ];

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <button
        onClick={() => navigate('/projects')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4 text-pulse-orange" />
        <span>Back to Projects</span>
      </button>

      {/* Project Header Banner */}
      <GlassCard variant="orange" className="space-y-6">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-3">
              <RiskBadge status={project.riskStatus} size="md" />
              <span className="text-xs font-mono text-slate-400">ID: {project.id}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">{project.name}</h1>
            <p className="text-sm text-slate-300 leading-relaxed">{project.description}</p>
          </div>

          <FireArrowButton onClick={() => navigate('/what-if')} size="md">
            Start What-If Simulation
          </FireArrowButton>
        </div>

        {/* Milestone Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-navy-950/80 border border-slate-800 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 font-mono block">Overall Progress</span>
            <span className="text-xl font-extrabold text-pulse-orange font-mono">{project.progress}%</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block">Target Deadline</span>
            <span className="text-sm font-bold text-slate-200">{project.deadline}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block">Expected Completion</span>
            <span className={`text-sm font-bold ${project.riskStatus === 'DELAYED' ? 'text-rose-400' : 'text-slate-200'}`}>
              {project.expectedCompletion}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block">Buffer Days</span>
            <span className="text-sm font-bold text-emerald-400 font-mono">
              {project.bufferDays > 0 ? `+${project.bufferDays} Days` : `${project.bufferDays} Days`}
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-800 space-x-4 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-3 text-xs font-bold transition-all border-b-2 whitespace-nowrap ${
              activeTab === tab
                ? 'border-pulse-orange text-pulse-orange'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content Panels */}
      {activeTab === 'Overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <GlassCard className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-white">Project Scope & Key Milestones</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              This sprint encompasses critical path tasks including backend microservice setup, database indexing, prediction engine scoring, and mobile client push alert handling.
            </p>
            <div className="p-4 rounded-xl bg-navy-900 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-white">Linked GitHub Repository</span>
              <div className="flex items-center gap-2 text-xs font-mono text-pulse-orange">
                <Github className="w-4 h-4" />
                <span>{project.githubRepo || 'projectpulse/cloud-migration-backend'}</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="space-y-4">
            <h3 className="text-lg font-bold text-white">Assigned Team</h3>
            <div className="space-y-3">
              {project.teamMembers.map((m, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-navy-900 border border-slate-800">
                  <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <div className="text-xs font-bold text-white">{m.name}</div>
                    <div className="text-[10px] text-slate-400">{m.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {activeTab === 'Tasks & Dependencies' && (
        <GlassCard className="space-y-4">
          <h3 className="text-lg font-bold text-white">Sprint Tasks ({tasks.length})</h3>
          <div className="space-y-3">
            {tasks.map((t) => (
              <div key={t.id} className="p-4 rounded-xl bg-navy-900 border border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <h4 className="font-bold text-white">{t.title}</h4>
                  <p className="text-slate-400 text-[11px]">{t.description}</p>
                </div>
                <span className="px-2.5 py-1 rounded font-mono font-bold bg-navy-950 text-pulse-orange border border-slate-800">
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {activeTab === 'GitHub Sync' && (
        <GlassCard className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Github className="w-5 h-5 text-pulse-orange" />
            <span>GitHub Telemetry Sync</span>
          </h3>
          <p className="text-xs text-slate-300">
            Repository sync is ACTIVE. {project.commitsThisWeek} commits recorded this week.
          </p>
        </GlassCard>
      )}

      {activeTab === 'Deadline Prediction' && (
        <GlassCard className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-white">Backend Deadline Risk Analysis</h3>
            <FireArrowButton onClick={() => navigate('/prediction')} size="sm">
              Open Full Prediction Model
            </FireArrowButton>
          </div>
          <p className="text-xs text-slate-300">
            Expected completion calculated at <strong className="text-pulse-orange font-mono">{project.expectedCompletion}</strong> against deadline <strong className="font-mono">{project.deadline}</strong>.
          </p>
        </GlassCard>
      )}

      {activeTab === 'Activity Timeline' && (
        <ActivityTimeline />
      )}
    </div>
  );
};

export default ProjectDetailPage;

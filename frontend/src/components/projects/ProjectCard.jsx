import React from 'react';
import GlassCard from '../ui/GlassCard';
import RiskBadge from '../ui/Badge';
import FireArrowButton from '../ui/FireArrowButton';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, GitBranch, ArrowRight, BarChart2 } from 'lucide-react';

export const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <GlassCard className="space-y-4 flex flex-col justify-between group">
      <div>
        {/* Header: Name + Risk Badge */}
        <div className="flex justify-between items-start gap-2 mb-2">
          <h3
            onClick={() => navigate(`/projects/${project.id}`)}
            className="text-lg font-extrabold text-white group-hover:text-pulse-orange transition-colors cursor-pointer"
          >
            {project.name}
          </h3>
          <RiskBadge status={project.riskStatus} size="sm" />
        </div>

        <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Progress Bar & Percentage */}
        <div className="space-y-1.5 mb-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-medium">Overall Progress</span>
            <span className="text-pulse-orange font-mono font-bold text-sm">{project.progress}%</span>
          </div>
          <div className="w-full h-2.5 bg-navy-950 rounded-full overflow-hidden border border-slate-800">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                project.riskStatus === 'ON TRACK'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                  : project.riskStatus === 'AT RISK'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                  : 'bg-gradient-to-r from-rose-500 to-pulse-orange'
              }`}
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        {/* Key Milestone Dates */}
        <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-navy-900/90 border border-slate-800 text-xs mb-4">
          <div>
            <span className="text-[10px] text-slate-400 font-mono block">Target Deadline</span>
            <div className="font-semibold text-slate-200 flex items-center gap-1.5 mt-0.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{project.deadline}</span>
            </div>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-mono block">Expected Completion</span>
            <div
              className={`font-semibold flex items-center gap-1.5 mt-0.5 ${
                project.riskStatus === 'DELAYED' ? 'text-rose-400 font-bold' : 'text-slate-200'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-pulse-orange" />
              <span>{project.expectedCompletion}</span>
            </div>
          </div>
        </div>

        {/* Team Avatars */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
          <div className="flex items-center -space-x-2">
            {project.teamMembers.map((member, idx) => (
              <img
                key={idx}
                src={member.avatar}
                alt={member.name}
                title={`${member.name} (${member.role})`}
                className="w-7 h-7 rounded-full object-cover ring-2 ring-navy-900"
              />
            ))}
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Updated {project.lastUpdated}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 pt-2">
        <FireArrowButton
          onClick={() => navigate(`/projects/${project.id}`)}
          variant="secondary"
          size="sm"
          className="flex-1"
        >
          View Project
        </FireArrowButton>
        <button
          onClick={() => navigate('/prediction')}
          className="p-2.5 rounded-xl bg-navy-900 border border-slate-800 text-slate-300 hover:text-white hover:border-pulse-orange/40 transition-colors"
          title="Prediction Analytics"
        >
          <BarChart2 className="w-4 h-4 text-pulse-orange" />
        </button>
      </div>
    </GlassCard>
  );
};

export default ProjectCard;

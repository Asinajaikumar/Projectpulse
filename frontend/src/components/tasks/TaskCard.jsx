import React from 'react';
import { PriorityBadge } from '../ui/Badge';
import { Clock, MessageSquare, AlertOctagon, ArrowRightLeft } from 'lucide-react';

export const TaskCard = ({ task, onStatusChange }) => {
  const isBlocked = task.status === 'BLOCKED';

  return (
    <div
      className={`p-4 rounded-2xl bg-navy-900/90 border transition-all hover:translate-y-[-2px] space-y-3 ${
        isBlocked
          ? 'border-rose-500/40 bg-rose-950/10 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
          : 'border-slate-800 hover:border-pulse-orange/40'
      }`}
    >
      {/* Header: Priority + Project Name */}
      <div className="flex justify-between items-center text-xs">
        <span className="text-[10px] font-mono text-slate-400 font-bold uppercase truncate max-w-[140px]">
          {task.projectName}
        </span>
        <PriorityBadge priority={task.priority} />
      </div>

      {/* Task Title & Description */}
      <div>
        <h4 className="text-sm font-bold text-white leading-snug">{task.title}</h4>
        <p className="text-xs text-slate-300 line-clamp-2 mt-1">{task.description}</p>
      </div>

      {/* Dependencies alert if blocked */}
      {isBlocked && task.dependencies && task.dependencies.length > 0 && (
        <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20 text-[11px] text-rose-300 flex items-center gap-1.5 font-mono">
          <AlertOctagon className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{task.dependencies[0]}</span>
        </div>
      )}

      {/* Animated Progress Bar */}
      <div className="space-y-1">
        <div className="flex justify-between items-center text-[11px]">
          <span className="text-slate-400 font-medium">Task Progress</span>
          <span className="text-pulse-orange font-mono font-bold">{task.progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-navy-950 rounded-full overflow-hidden border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-pulse-orange to-amber-400 transition-all duration-300"
            style={{ width: `${task.progress}%` }}
          />
        </div>
      </div>

      {/* Footer: Assigned Avatar + Date + Comments */}
      <div className="flex justify-between items-center pt-2 border-t border-slate-800/80 text-[11px]">
        <div className="flex items-center gap-2">
          {task.assignedAvatar ? (
            <img
              src={task.assignedAvatar}
              alt={task.assignedTo}
              title={task.assignedTo}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-700"
            />
          ) : (
            <span className="text-slate-400 font-medium">{task.assignedTo}</span>
          )}
          <span className="text-slate-300 font-medium text-[11px]">{task.assignedTo?.split(' ')[0]}</span>
        </div>

        <div className="flex items-center gap-3 text-slate-400">
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3 h-3 text-slate-500" />
            <span>{task.commentsCount || 0}</span>
          </span>
          <span className="flex items-center gap-1 font-mono text-[10px]">
            <Clock className="w-3 h-3 text-slate-500" />
            <span>{task.plannedEnd?.slice(5)}</span>
          </span>
        </div>
      </div>

      {/* Quick Move Status Actions */}
      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
        <span className="text-slate-500 text-[10px]">Move status:</span>
        <div className="flex gap-1">
          {task.status !== 'NOT STARTED' && (
            <button
              onClick={() => onStatusChange(task.id, 'NOT STARTED', 0)}
              className="px-2 py-0.5 rounded bg-navy-950 text-slate-400 hover:text-white border border-slate-800"
            >
              To Start
            </button>
          )}
          {task.status !== 'IN PROGRESS' && (
            <button
              onClick={() => onStatusChange(task.id, 'IN PROGRESS', 50)}
              className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/30"
            >
              In Prog
            </button>
          )}
          {task.status !== 'BLOCKED' && (
            <button
              onClick={() => onStatusChange(task.id, 'BLOCKED', task.progress)}
              className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30"
            >
              Block
            </button>
          )}
          {task.status !== 'COMPLETED' && (
            <button
              onClick={() => onStatusChange(task.id, 'COMPLETED', 100)}
              className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30"
            >
              Done
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;

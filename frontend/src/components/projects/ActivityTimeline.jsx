import React from 'react';
import {
  PlusCircle,
  UserCheck,
  TrendingUp,
  Github,
  AlertTriangle,
  Calendar
} from 'lucide-react';

export const ActivityTimeline = () => {
  const events = [
    {
      id: 1,
      type: 'Risk Changed',
      title: 'Risk Status Escalated to DELAYED',
      description: 'Backend prediction engine updated status based on 7-day blocker on task #102.',
      timestamp: '2 hours ago',
      icon: AlertTriangle,
      color: 'bg-rose-500/20 text-rose-400 border-rose-500/30'
    },
    {
      id: 2,
      type: 'GitHub Activity Synced',
      title: '4 Commits Pushed to main branch',
      description: 'Elena Rostova merged PR #42: "Optimize regression risk calculation query".',
      timestamp: '5 hours ago',
      icon: Github,
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    },
    {
      id: 3,
      type: 'Progress Updated',
      title: 'Task #103 Progress set to 75%',
      description: 'Jessica Alba updated Dark Mode Wireframes completion rate.',
      timestamp: 'Yesterday at 4:15 PM',
      icon: TrendingUp,
      color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    },
    {
      id: 4,
      type: 'Task Assigned',
      title: 'Task #105 Assigned to Alex Rivera',
      description: 'Database indexing optimization scheduled for upcoming sprint.',
      timestamp: '2 days ago',
      icon: UserCheck,
      color: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    },
    {
      id: 5,
      type: 'Project Created',
      title: 'Project Created & GitHub Repo Linked',
      description: 'Sarah Jenkins initialized project workspace and connected repository.',
      timestamp: '1 week ago',
      icon: PlusCircle,
      color: 'bg-pulse-orange/20 text-pulse-orange border-pulse-orange/30'
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-white">Project Activity Timeline</h3>
      
      <div className="relative pl-6 border-l border-slate-800 space-y-6">
        {events.map((evt) => {
          const Icon = evt.icon;
          return (
            <div key={evt.id} className="relative group">
              {/* Timeline dot icon */}
              <div className={`absolute -left-[35px] top-0 p-1.5 rounded-full border ${evt.color} shadow-sm bg-navy-950`}>
                <Icon className="w-3.5 h-3.5" />
              </div>

              <div className="p-4 rounded-2xl bg-navy-900/80 border border-slate-800 group-hover:border-slate-700 transition-all space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-mono font-bold text-pulse-orange">{evt.type}</span>
                  <span className="text-[11px] text-slate-400 font-mono">{evt.timestamp}</span>
                </div>
                <h4 className="text-sm font-bold text-white">{evt.title}</h4>
                <p className="text-xs text-slate-300">{evt.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityTimeline;

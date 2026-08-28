import React from 'react';
import GlassCard from '../ui/GlassCard';
import {
  Bell,
  AlertTriangle,
  AlertOctagon,
  UserCheck,
  Clock,
  CheckCircle2
} from 'lucide-react';

export const NotificationCenter = ({ notifications, onMarkAsRead, onMarkAllRead }) => {
  const getNotifIcon = (type) => {
    switch (type) {
      case 'Risk Change':
        return { icon: AlertTriangle, color: 'bg-amber-500/15 text-amber-400 border-amber-500/30' };
      case 'Blocker':
        return { icon: AlertOctagon, color: 'bg-rose-500/15 text-rose-400 border-rose-500/30' };
      case 'Assignment':
        return { icon: UserCheck, color: 'bg-blue-500/15 text-blue-400 border-blue-500/30' };
      case 'Deadline Reminder':
        return { icon: Clock, color: 'bg-pulse-orange/15 text-pulse-orange border-pulse-orange/30' };
      default:
        return { icon: Bell, color: 'bg-slate-700/50 text-slate-300 border-slate-600' };
    }
  };

  return (
    <GlassCard className="space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Bell className="w-5 h-5 text-pulse-orange" />
            <span>Notification & Alert Center</span>
          </h2>
          <p className="text-xs text-slate-400">Real-time risk warnings, task blockers, and sprint milestone updates</p>
        </div>

        <button
          onClick={onMarkAllRead}
          className="px-3.5 py-1.5 rounded-xl bg-navy-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Mark All Read</span>
        </button>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-sm">No notifications right now.</div>
        ) : (
          notifications.map((n) => {
            const { icon: Icon, color } = getNotifIcon(n.type);

            return (
              <div
                key={n.id}
                onClick={() => onMarkAsRead(n.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
                  n.read
                    ? 'bg-navy-900/40 border-slate-800/60 opacity-70'
                    : 'bg-navy-900/90 border-slate-700 shadow-sm hover:border-pulse-orange/40'
                }`}
              >
                <div className={`p-2.5 rounded-xl border ${color} shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold text-white">{n.title}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{n.timestamp}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{n.message}</p>
                </div>

                {!n.read && (
                  <span className="w-2 h-2 rounded-full bg-pulse-orange shrink-0 self-center" />
                )}
              </div>
            );
          })
        )}
      </div>
    </GlassCard>
  );
};

export default NotificationCenter;

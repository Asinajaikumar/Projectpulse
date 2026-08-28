import React from 'react';
import GlassCard from '../components/ui/GlassCard';
import { RoleBadge } from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Key } from 'lucide-react';

export const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">User Profile & Account</h1>
        <p className="text-xs text-slate-400 mt-1">Manage user preferences and security settings</p>
      </div>

      <GlassCard className="p-8 space-y-6">
        <div className="flex items-center gap-6 pb-6 border-b border-slate-800">
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100"}
            alt={user?.name}
            className="w-20 h-20 rounded-2xl object-cover ring-2 ring-pulse-orange shadow-glow-orange/30"
          />
          <div>
            <h2 className="text-2xl font-extrabold text-white">{user?.name || 'Alex Rivera'}</h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{user?.email}</p>
            <div className="mt-3">
              <RoleBadge role={user?.role} />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-pulse-orange font-mono">
            Account Metadata
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-navy-900 border border-slate-800 space-y-1">
              <span className="text-slate-400">User ID</span>
              <p className="font-mono text-slate-200 font-bold">{user?.id || 'user-001'}</p>
            </div>
            <div className="p-3 rounded-xl bg-navy-900 border border-slate-800 space-y-1">
              <span className="text-slate-400">Current Role Scope</span>
              <p className="font-mono text-slate-200 font-bold">{user?.role || 'Admin'}</p>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default ProfilePage;

import React from 'react';
import Navbar from '../components/layouts/Navbar';
import WordStreamBackground from '../components/ui/WordStreamBackground';
import FireArrowButton from '../components/ui/FireArrowButton';
import RiskBadge from '../components/ui/Badge';
import GlassCard from '../components/ui/GlassCard';
import PageTransition from '../components/layouts/PageTransition';
import { useNavigate, Link } from 'react-router-dom';
import {
  TrendingUp,
  ShieldAlert,
  Sliders,
  Github,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  ArrowRight,
  Zap,
  BarChart2,
  Lock,
  Users
} from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="relative min-h-screen bg-navy-950 text-slate-100 overflow-hidden">
        {/* Animated background term stream */}
        <WordStreamBackground />

        {/* Top Navbar */}
        <Navbar />

        {/* Hero Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 text-center">
          {/* Top Pill Alert */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900/90 border border-pulse-orange/40 text-xs font-semibold text-slate-200 mb-8 shadow-glow-orange/30">
            <span className="w-2 h-2 rounded-full bg-pulse-orange animate-pulse" />
            <span>ProjectPulse Predictive Engine 2.0 Released</span>
            <span className="text-pulse-orange font-mono">→</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl mx-auto">
            Track Progress.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pulse-orange via-amber-400 to-pulse-orange-light drop-shadow-[0_0_20px_rgba(255,87,34,0.4)]">
              Predict Deadlines.
            </span>{' '}
            Stay Ahead.
          </h1>

          {/* Hero Subtext */}
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            ProjectPulse gives teams a live view of project progress and deadline risk, helping managers identify delays before they become critical.
          </p>

          {/* Action CTA Buttons */}
          <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
            <FireArrowButton
              onClick={() => navigate('/register')}
              size="lg"
            >
              Get Started
            </FireArrowButton>

            <FireArrowButton
              onClick={() => navigate('/dashboard')}
              variant="secondary"
              size="lg"
            >
              View Demo
            </FireArrowButton>
          </div>

          {/* Hero Live Dashboard Teaser Preview Card */}
          <div className="mt-16 max-w-5xl mx-auto rounded-3xl p-2 bg-gradient-to-b from-pulse-orange/30 via-slate-800/40 to-navy-900/80 backdrop-blur-2xl border border-slate-800 shadow-2xl">
            <div className="rounded-2xl bg-navy-950/90 p-6 sm:p-8 space-y-6 text-left border border-slate-800/80">
              {/* Preview Header */}
              <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-mono text-slate-400 pl-2">projectpulse.io/dashboard/predictions</span>
                </div>
                <div className="flex gap-2">
                  <RiskBadge status="ON TRACK" size="sm" />
                  <RiskBadge status="AT RISK" size="sm" />
                  <RiskBadge status="DELAYED" size="sm" />
                </div>
              </div>

              {/* Sample Dashboard Preview Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-navy-900 border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400">Enterprise Cloud Migration</span>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-white">78% Done</span>
                    <RiskBadge status="ON TRACK" size="sm" />
                  </div>
                  <div className="w-full h-1.5 bg-navy-950 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-[78%]" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-navy-900 border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400">AI Analytics Engine</span>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-white">52% Done</span>
                    <RiskBadge status="DELAYED" size="sm" />
                  </div>
                  <div className="w-full h-1.5 bg-navy-950 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 w-[52%]" />
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-navy-900 border border-slate-800 space-y-2">
                  <span className="text-xs text-slate-400">Mobile SDK Portal</span>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-white">65% Done</span>
                    <RiskBadge status="AT RISK" size="sm" />
                  </div>
                  <div className="w-full h-1.5 bg-navy-950 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 w-[65%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Highlights Grid */}
        <section id="features" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-slate-800/80">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs uppercase font-mono font-bold tracking-widest text-pulse-orange">Enterprise Features</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Built for Commercial Engineering Teams</h2>
            <p className="text-slate-400 text-sm">Everything you need to predict bottlenecks and guarantee on-time delivery.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlassCard className="space-y-3">
              <div className="p-3 w-12 h-12 rounded-xl bg-pulse-orange/15 text-pulse-orange border border-pulse-orange/30 flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Backend Prediction Model</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Backend algorithms evaluate sprint velocity, PR merge rates, and task blockers to project exact completion dates.
              </p>
            </GlassCard>

            <GlassCard className="space-y-3">
              <div className="p-3 w-12 h-12 rounded-xl bg-blue-500/15 text-blue-400 border border-blue-500/30 flex items-center justify-center">
                <Sliders className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Interactive What-If Engine</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Simulate adding engineers or unblocking dependencies to see expected date improvements before committing resources.
              </p>
            </GlassCard>

            <GlassCard className="space-y-3">
              <div className="p-3 w-12 h-12 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
                <Github className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">GitHub Activity Sync</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Real-time commit telemetry and pull request activity automatically feeds progress calculations.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-slate-800 py-10 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-4">
            <div className="font-bold text-white">PROJECTPULSE</div>
            <div>© 2026 ProjectPulse SaaS Platform. All rights reserved.</div>
            <div className="flex gap-6">
              <Link to="/login" className="hover:text-white">Login</Link>
              <Link to="/register" className="hover:text-white">Register</Link>
              <Link to="/dashboard" className="hover:text-white">Dashboard</Link>
            </div>
          </div>
        </footer>
      </div>
    </PageTransition>
  );
};

export default LandingPage;

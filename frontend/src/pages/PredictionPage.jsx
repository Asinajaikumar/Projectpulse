import React, { useState, useEffect } from 'react';
import GlassCard from '../components/ui/GlassCard';
import RiskBadge from '../components/ui/Badge';
import RiskReasoningCard from '../components/prediction/RiskReasoningCard';
import FireArrowButton from '../components/ui/FireArrowButton';
import predictionApi from '../api/predictionApi';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Calendar,
  Clock,
  ShieldAlert,
  Sliders,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

export const PredictionPage = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrediction = async () => {
      setLoading(true);
      try {
        const data = await predictionApi.getProjectPrediction('proj-2');
        setPrediction(data);
      } finally {
        setLoading(false);
      }
    };
    fetchPrediction();
  }, []);

  if (loading || !prediction) {
    return <div className="p-8 text-center text-slate-400">Loading prediction model calculations...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Top Banner Header */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-pulse-orange" />
            <span>AI Deadline Prediction Engine</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">Backend calculation results & deadline risk evaluation</p>
        </div>

        <FireArrowButton onClick={() => navigate('/what-if')} size="md">
          Start What-If Analysis
        </FireArrowButton>
      </div>

      {/* Large Date Cards & Risk Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Expected Completion Date Card */}
        <GlassCard variant="orange" className="p-6 border-l-4 border-l-rose-500">
          <span className="text-xs text-slate-400 uppercase font-mono font-bold block">Backend Expected Completion</span>
          <div className="text-2xl font-extrabold text-white mt-2 flex items-center gap-2">
            <Clock className="w-6 h-6 text-pulse-orange" />
            <span>12 Oct 2026</span>
          </div>
          <span className="text-[11px] text-rose-400 font-semibold block mt-2">+12 days beyond target</span>
        </GlassCard>

        {/* Project Target Deadline */}
        <GlassCard className="p-6">
          <span className="text-xs text-slate-400 uppercase font-mono font-bold block">Target Project Deadline</span>
          <div className="text-2xl font-extrabold text-slate-200 mt-2 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-400" />
            <span>30 Sep 2026</span>
          </div>
          <span className="text-[11px] text-slate-400 block mt-2">Configured sprint deadline</span>
        </GlassCard>

        {/* Calculated Risk Badge */}
        <GlassCard className="p-6 flex flex-col justify-between">
          <span className="text-xs text-slate-400 uppercase font-mono font-bold block">Backend Risk Status</span>
          <div className="mt-2">
            <RiskBadge status={prediction.riskStatus} size="lg" />
          </div>
          <span className="text-[11px] text-slate-400 block mt-2">Confidence Score: 89%</span>
        </GlassCard>

        {/* Current vs Remaining Work */}
        <GlassCard className="p-6">
          <span className="text-xs text-slate-400 uppercase font-mono font-bold block">Progress Ratio</span>
          <div className="text-2xl font-extrabold text-white mt-2 font-mono">
            {prediction.currentProgress}% <span className="text-xs text-slate-400 font-normal">({prediction.remainingWork}% remaining)</span>
          </div>
          <div className="w-full h-2 bg-navy-950 rounded-full overflow-hidden mt-3 border border-slate-800">
            <div className="h-full bg-pulse-orange w-[52%]" />
          </div>
        </GlassCard>
      </div>

      {/* Prediction Explanation: Why is this project at risk? */}
      <RiskReasoningCard reasons={prediction.reasons} />

      {/* Historical Trend Chart */}
      <GlassCard className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-pulse-orange" />
          <span>Historical Expected Completion Drift Trend</span>
        </h3>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={prediction.historicalTrend}>
              <defs>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="#64748B" fontSize={12} />
              <YAxis stroke="#64748B" fontSize={12} domain={[20, 50]} />
              <Tooltip contentStyle={{ backgroundColor: '#0B0F19', borderColor: '#1E293B', borderRadius: '12px' }} />
              <Area type="monotone" dataKey="expected" name="Expected Days" stroke="#EF4444" strokeWidth={3} fill="url(#expGrad)" />
              <Area type="monotone" dataKey="deadline" name="Target Target Days" stroke="#3B82F6" strokeDasharray="4 4" fill="none" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
};

export default PredictionPage;

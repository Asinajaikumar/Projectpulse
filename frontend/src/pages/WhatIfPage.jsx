import React, { useState } from 'react';
import SimulationControls from '../components/whatif/SimulationControls';
import ScenarioComparison from '../components/whatif/ScenarioComparison';
import predictionApi from '../api/predictionApi';
import { Sliders, Sparkles } from 'lucide-react';

export const WhatIfPage = () => {
  const [params, setParams] = useState({
    extraDevelopers: 1,
    removeBlockers: true,
    priorityBoost: false,
  });

  const [loading, setLoading] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);

  const handleParamChange = (key, value) => {
    setParams(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    const defaultParams = { extraDevelopers: 0, removeBlockers: false, priorityBoost: false };
    setParams(defaultParams);
    setSimulationResult(null);
  };

  const handleRunSimulation = async () => {
    setLoading(true);
    try {
      const result = await predictionApi.runWhatIfSimulation(params);
      setSimulationResult(result);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title & Subtitle */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
          <Sliders className="w-8 h-8 text-pulse-orange" />
          <span>What-If Analysis Engine</span>
        </h1>
        <p className="text-sm text-slate-400 mt-1">Test project changes before making real decisions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Simulation Parameters */}
        <div className="lg:col-span-1">
          <SimulationControls
            params={params}
            onChange={handleParamChange}
            onSimulate={handleRunSimulation}
            onReset={handleReset}
            loading={loading}
          />
        </div>

        {/* Right Column: Scenario Comparison Output */}
        <div className="lg:col-span-2 space-y-6">
          {!simulationResult ? (
            <div className="p-12 text-center glass-panel rounded-3xl border border-slate-800 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-pulse-orange/15 text-pulse-orange border border-pulse-orange/30 flex items-center justify-center mx-auto shadow-glow-orange/30">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Ready for Simulation</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Adjust developer counts or toggle dependency unblocking on the left, then click <strong>"Run What-If Simulation"</strong> to calculate backend scenario impact.
              </p>
            </div>
          ) : (
            <ScenarioComparison result={simulationResult} />
          )}
        </div>
      </div>
    </div>
  );
};

export default WhatIfPage;

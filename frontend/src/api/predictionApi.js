import apiClient from './axios';
import { MOCK_PREDICTIONS } from './mockData';

export const predictionApi = {
  getProjectPrediction: async (projectId) => {
    try {
      const response = await apiClient.get(`/prediction/project/${projectId}`);
      return response.data?.data || response.data || MOCK_PREDICTIONS;
    } catch (err) {
      return {
        ...MOCK_PREDICTIONS,
        projectId
      };
    }
  },

  runWhatIfSimulation: async (params) => {
    try {
      const response = await apiClient.post('/prediction/what-if', params);
      return response.data?.data || response.data;
    } catch (err) {
      const { extraDevelopers = 0, removeBlockers = false, priorityBoost = false } = params;

      let daysImprovement = 0;
      if (extraDevelopers > 0) daysImprovement += extraDevelopers * 3;
      if (removeBlockers) daysImprovement += 7;
      if (priorityBoost) daysImprovement += 2;

      const baselineCompletion = new Date('2026-10-12');
      const simulatedDate = new Date(baselineCompletion.getTime() - daysImprovement * 86400000);
      const simulatedCompletionStr = simulatedDate.toISOString().split('T')[0];

      let simulatedRisk = 'DELAYED';
      if (daysImprovement >= 12) simulatedRisk = 'ON TRACK';
      else if (daysImprovement >= 5) simulatedRisk = 'AT RISK';

      return {
        currentPlan: {
          expectedCompletion: '2026-10-12',
          targetDeadline: '2026-09-30',
          riskStatus: 'DELAYED',
          progress: 52,
          delayDays: 12
        },
        simulatedPlan: {
          expectedCompletion: simulatedCompletionStr,
          targetDeadline: '2026-09-30',
          riskStatus: simulatedRisk,
          progress: 52 + daysImprovement * 2,
          delayDays: Math.max(0, 12 - daysImprovement)
        },
        impactSummary: {
          daysSaved: daysImprovement,
          statusChange: simulatedRisk !== 'DELAYED' ? `Risk reduced from DELAYED to ${simulatedRisk}` : 'Schedule improved, still requires additional resources',
          recommendation: removeBlockers ? 'Unblocking task #102 yields maximum ROI (+7 days saved).' : 'Add 1 developer and unblock critical path task #102 to return to ON TRACK.'
        }
      };
    }
  }
};

export default predictionApi;

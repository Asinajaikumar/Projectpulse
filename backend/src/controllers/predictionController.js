import { predictionService } from '../services/predictionService.js';

export const getPrediction = async (req, res, next) => {
  try {
    const { id } = req.params;

    const mockProject = {
      id,
      name: 'AI Deadline Analytics Engine',
      start_date: '2026-08-01',
      deadline: '2026-09-30'
    };

    const mockTasks = [
      { id: 't1', progress_percent: 40, status: 'blocked', priority: 'high' },
      { id: 't2', progress_percent: 60, status: 'in_progress', priority: 'high' },
      { id: 't3', progress_percent: 100, status: 'completed', priority: 'medium' }
    ];

    const result = await predictionService.computeProjectPrediction(mockProject, mockTasks);

    return res.status(200).json({
      success: true,
      data: result
    });
  } catch (err) {
    next(err);
  }
};

export const runWhatIf = async (req, res, next) => {
  try {
    const { id } = req.params;
    const simulationParams = req.body;

    const mockProject = {
      id,
      name: 'AI Deadline Analytics Engine',
      start_date: '2026-08-01',
      deadline: '2026-09-30'
    };

    const mockTasks = [
      { id: 't1', progress_percent: 40, status: 'blocked', priority: 'high' },
      { id: 't2', progress_percent: 60, status: 'in_progress', priority: 'high' },
      { id: 't3', progress_percent: 100, status: 'completed', priority: 'medium' }
    ];

    const comparison = await predictionService.runWhatIfSimulation(mockProject, mockTasks, simulationParams);

    return res.status(200).json({
      success: true,
      data: comparison
    });
  } catch (err) {
    next(err);
  }
};

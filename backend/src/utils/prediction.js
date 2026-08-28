/**
 * Deterministic ProjectPulse Prediction Math & Risk Rules
 */

export const calculateProjectProgress = (tasks = []) => {
  if (!tasks || tasks.length === 0) return 0;
  const totalProgress = tasks.reduce((sum, task) => sum + (task.progress_percent || 0), 0);
  return Math.round(totalProgress / tasks.length);
};

export const calculateExpectedCompletion = (startDate, deadlineDate, progressPercent) => {
  const start = new Date(startDate);
  const deadline = new Date(deadlineDate);
  const today = new Date();

  // If project completed or 100% progress
  if (progressPercent >= 100) {
    return {
      expectedDate: today.toISOString().split('T')[0],
      daysRemaining: 0,
      isCompleted: true
    };
  }

  // Safe duration calculations
  const totalPlannedDays = Math.max(1, Math.ceil((deadline - start) / (1000 * 60 * 60 * 24)));
  const elapsedDays = Math.max(1, Math.ceil((today - start) / (1000 * 60 * 60 * 24)));

  // Avoid division by zero
  const effectiveProgress = Math.max(1, progressPercent);

  // Expected Total Days = Elapsed Days / (Progress % / 100)
  const expectedTotalDays = Math.ceil(elapsedDays / (effectiveProgress / 100));

  const expectedDate = new Date(start.getTime() + expectedTotalDays * (1000 * 60 * 60 * 24));
  const expectedDateStr = expectedDate.toISOString().split('T')[0];

  return {
    expectedDate: expectedDateStr,
    expectedTotalDays,
    totalPlannedDays,
    elapsedDays,
    isCompleted: false
  };
};

export const evaluateRiskStatus = (expectedCompletionDate, deadlineDate, bufferDays = 5) => {
  const expected = new Date(expectedCompletionDate);
  const deadline = new Date(deadlineDate);

  const diffMs = expected.getTime() - deadline.getTime();
  const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) {
    return {
      status: 'on_track',
      displayStatus: 'ON TRACK',
      delayDays: 0,
      bufferRemaining: Math.abs(diffDays)
    };
  } else if (diffDays <= bufferDays) {
    return {
      status: 'at_risk',
      displayStatus: 'AT RISK',
      delayDays: diffDays,
      bufferRemaining: bufferDays - diffDays
    };
  } else {
    return {
      status: 'delayed',
      displayStatus: 'DELAYED',
      delayDays: diffDays,
      bufferRemaining: 0
    };
  }
};

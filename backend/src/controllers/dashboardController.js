export const getDashboardMetrics = async (req, res, next) => {
  try {
    const role = (req.user?.role || 'admin').toLowerCase().replace(' ', '_');

    if (role === 'admin' || role === 'manager') {
      return res.status(200).json({
        success: true,
        data: {
          role: 'admin',
          totalProjects: 4,
          activeProjects: 4,
          completedProjects: 1,
          onTrackCount: 2,
          atRiskCount: 1,
          delayedCount: 1,
          overallProgressPercent: 72,
          teamPerformance: [
            { name: 'Sarah J.', completed: 18, pending: 2 },
            { name: 'David C.', completed: 15, pending: 3 },
            { name: 'Alex R.', completed: 22, pending: 1 }
          ],
          recentActivity: [
            { id: 1, title: 'Risk Status Escalated to DELAYED', type: 'risk_change', time: '2 hours ago' },
            { id: 2, title: '4 Commits Pushed to main branch', type: 'github_sync', time: '5 hours ago' }
          ]
        }
      });
    } else if (role === 'team_leader') {
      return res.status(200).json({
        success: true,
        data: {
          role: 'team_leader',
          assignedProjects: 2,
          teamProgressPercent: 74,
          activeTasksCount: 5,
          blockersCount: 1,
          deadlineStatus: 'AT RISK'
        }
      });
    } else {
      return res.status(200).json({
        success: true,
        data: {
          role: 'employee',
          assignedTasksCount: 3,
          personalProgressPercent: 72,
          upcomingDeadlinesCount: 2,
          blockedTasksCount: 0,
          recentUpdatesCount: 4
        }
      });
    }
  } catch (err) {
    next(err);
  }
};

import { supabase } from '../config/supabase.js';
import { validateTaskInput } from '../utils/validation.js';
import { notificationService } from '../services/notificationService.js';

// Fallback dataset for standalone demo mode
const SEED_TASKS = [
  {
    id: 'task-101',
    project_id: 'proj-1',
    title: 'Configure Automated CI/CD Pipeline on GitHub Actions',
    description: 'Build workflow triggers on main branch push to run test suites and deploys to Staging.',
    assigned_to: 'user-002',
    assignedTo: 'David Chen',
    assignedAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    status: 'completed',
    progress_percent: 100,
    progress: 100,
    priority: 'high',
    planned_start: '2026-08-01',
    planned_end: '2026-08-10',
    projectName: 'Enterprise Cloud Migration',
    commentsCount: 4
  },
  {
    id: 'task-102',
    project_id: 'proj-2',
    title: 'Train Historical Deadline Prediction Model',
    description: 'Train XGBoost regression model using historical pull request review duration and task story points.',
    assigned_to: 'user-003',
    assignedTo: 'Marcus Vance',
    assignedAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    status: 'blocked',
    progress_percent: 40,
    progress: 40,
    priority: 'high',
    planned_start: '2026-08-12',
    planned_end: '2026-09-05',
    dependencies: ['Waiting on clean dataset export from PostgreSQL'],
    projectName: 'AI Deadline Analytics Engine',
    commentsCount: 7
  },
  {
    id: 'task-103',
    project_id: 'proj-2',
    title: 'Implement What-If Scenario Simulation Engine',
    description: 'Frontend comparison controls allowing managers to adjust team size and recalculate deadline impact.',
    assigned_to: 'user-004',
    assignedTo: 'Elena Rostova',
    assignedAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    status: 'in_progress',
    progress_percent: 60,
    progress: 60,
    priority: 'high',
    planned_start: '2026-08-20',
    planned_end: '2026-09-12',
    projectName: 'AI Deadline Analytics Engine',
    commentsCount: 5
  }
];

export const getTasks = async (req, res, next) => {
  try {
    const { projectId } = req.query;
    let query = supabase.from('tasks').select('*');
    if (projectId) query = query.eq('project_id', projectId);

    const { data: dbTasks, error } = await query;
    if (error || !dbTasks || dbTasks.length === 0) {
      if (projectId) {
        return res.status(200).json({
          success: true,
          data: SEED_TASKS.filter(t => t.project_id === projectId)
        });
      }
      return res.status(200).json({ success: true, data: SEED_TASKS });
    }

    const mapped = dbTasks.map(t => ({
      ...t,
      progress: t.progress_percent,
      assignedTo: t.assigned_to ? 'Assigned Member' : 'Alex Rivera',
      projectName: 'ProjectPulse Sprint'
    }));

    return res.status(200).json({ success: true, data: mapped });
  } catch (err) {
    next(err);
  }
};

export const getTasksByProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { data: dbTasks, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('project_id', projectId);

    if (error || !dbTasks || dbTasks.length === 0) {
      return res.status(200).json({
        success: true,
        data: SEED_TASKS.filter(t => t.project_id === projectId)
      });
    }

    return res.status(200).json({ success: true, data: dbTasks });
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { title, description, assigned_to, priority = 'medium', planned_start, planned_end } = req.body;

    const valErrors = validateTaskInput({ title, priority });
    if (valErrors.length > 0) {
      return res.status(400).json({ success: false, message: valErrors.join(' ') });
    }

    const newTaskData = {
      project_id: projectId || req.body.project_id || 'proj-1',
      title,
      description,
      assigned_to: (assigned_to && assigned_to.includes('-')) ? assigned_to : null,
      status: 'not_started',
      progress_percent: 0,
      priority: priority.toLowerCase(),
      planned_start: planned_start || new Date().toISOString().split('T')[0],
      planned_end: planned_end || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
    };

    const { data: created, error } = await supabase
      .from('tasks')
      .insert([newTaskData])
      .select()
      .single();

    if (error) {
      const createdFallback = {
        id: `task-${Date.now()}`,
        ...newTaskData,
        assignedTo: req.body.assignedTo || 'Alex Rivera',
        projectName: 'Enterprise Cloud Migration',
        progress: 0,
        commentsCount: 0
      };
      SEED_TASKS.unshift(createdFallback);
      return res.status(201).json({ success: true, data: createdFallback });
    }

    // Trigger notification if assigned
    if (assigned_to && assigned_to.includes('-')) {
      await notificationService.createNotification({
        userId: assigned_to,
        message: `New task assigned to you: "${title}"`,
        type: 'assignment'
      });
    }

    return res.status(201).json({
      success: true,
      data: {
        ...created,
        progress: created.progress_percent,
        assignedTo: 'Assigned Member'
      }
    });
  } catch (err) {
    next(err);
  }
};

export const updateTaskProgress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { progress_percent, progress, note } = req.body;

    const newProgress = Number(progress_percent !== undefined ? progress_percent : progress);
    if (isNaN(newProgress) || newProgress < 0 || newProgress > 100) {
      return res.status(400).json({ success: false, message: 'progress_percent must be between 0 and 100.' });
    }

    let newStatus = newProgress === 100 ? 'completed' : newProgress > 0 ? 'in_progress' : 'not_started';

    // Update in Supabase
    const { data: updated, error } = await supabase
      .from('tasks')
      .update({ progress_percent: newProgress, status: newStatus })
      .eq('id', id)
      .select()
      .single();

    if (!error && updated) {
      // Record update history in task_updates table
      await supabase.from('task_updates').insert([
        {
          task_id: id,
          updated_by: req.user?.id && req.user.id.includes('-') ? req.user.id : null,
          old_progress: 0,
          new_progress: newProgress,
          note: note || 'Progress update recorded'
        }
      ]);

      return res.status(200).json({
        success: true,
        data: {
          ...updated,
          progress: updated.progress_percent
        }
      });
    }

    // Fallback in-memory update
    const task = SEED_TASKS.find(t => t.id === id) || { id, progress_percent: 0, status: 'in_progress' };
    task.progress_percent = newProgress;
    task.progress = newProgress;
    task.status = newStatus;

    return res.status(200).json({
      success: true,
      data: task
    });
  } catch (err) {
    next(err);
  }
};

export const updateTaskStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, progress_percent } = req.body;

    const normStatus = status.toLowerCase();

    const updateObj = { status: normStatus };
    if (progress_percent !== undefined) {
      updateObj.progress_percent = Number(progress_percent);
    }

    const { data: updated, error } = await supabase
      .from('tasks')
      .update(updateObj)
      .eq('id', id)
      .select()
      .single();

    if (normStatus === 'blocked') {
      await notificationService.createNotification({
        userId: req.user?.id && req.user.id.includes('-') ? req.user.id : null,
        message: `Task "${updated?.title || id}" was marked as BLOCKED!`,
        type: 'blocker'
      });
    }

    if (!error && updated) {
      return res.status(200).json({
        success: true,
        data: {
          ...updated,
          progress: updated.progress_percent
        }
      });
    }

    const task = SEED_TASKS.find(t => t.id === id);
    if (task) {
      task.status = normStatus;
      if (progress_percent !== undefined) {
        task.progress_percent = progress_percent;
        task.progress = progress_percent;
      }
    }

    return res.status(200).json({
      success: true,
      data: task || { id, status: normStatus, progress_percent }
    });
  } catch (err) {
    next(err);
  }
};

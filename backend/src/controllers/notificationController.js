import { supabase } from '../config/supabase.js';

const SEED_NOTIFS = [
  {
    id: 'notif-1',
    type: 'risk_change',
    title: 'Risk Status Updated',
    message: 'AI Deadline Analytics Engine risk status changed from AT RISK to DELAYED by backend predictor.',
    timestamp: '15 minutes ago',
    is_read: false,
    read: false,
    projectId: 'proj-2'
  },
  {
    id: 'notif-2',
    type: 'blocker',
    title: 'New Task Blocker Reported',
    message: 'Marcus Vance marked "Train Historical Model" as BLOCKED: Waiting on DB dump.',
    timestamp: '1 hour ago',
    is_read: false,
    read: false,
    projectId: 'proj-2'
  },
  {
    id: 'notif-3',
    type: 'assignment',
    title: 'New Task Assigned',
    message: 'You were assigned to "PostgreSQL Database Indexing Optimization".',
    timestamp: '3 hours ago',
    is_read: true,
    read: true,
    projectId: 'proj-1'
  }
];

export const getNotifications = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { data: dbNotifs, error } = await supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !dbNotifs || dbNotifs.length === 0) {
      return res.status(200).json({ success: true, data: SEED_NOTIFS });
    }

    return res.status(200).json({ success: true, data: dbNotifs });
  } catch (err) {
    next(err);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const { id } = req.params;
    await supabase.from('notifications').update({ is_read: true }).eq('id', id);

    const target = SEED_NOTIFS.find(n => n.id === id);
    if (target) {
      target.is_read = true;
      target.read = true;
    }

    return res.status(200).json({
      success: true,
      message: `Notification ${id} marked as read.`
    });
  } catch (err) {
    next(err);
  }
};

export const markAllRead = async (req, res, next) => {
  try {
    await supabase.from('notifications').update({ is_read: true }).eq('is_read', false);
    SEED_NOTIFS.forEach(n => {
      n.is_read = true;
      n.read = true;
    });

    return res.status(200).json({
      success: true,
      message: 'All notifications marked as read.'
    });
  } catch (err) {
    next(err);
  }
};

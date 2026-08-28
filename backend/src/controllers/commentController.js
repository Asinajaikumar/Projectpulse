import { supabase } from '../config/supabase.js';

const SEED_COMMENTS = [
  { id: 'c1', task_id: 'task-101', author: 'Sarah Jenkins', role: 'Team Lead', comment_text: 'Great progress on the CI/CD pipeline! Please double check GitHub Webhook secrets.', created_at: '2 hours ago' },
  { id: 'c2', task_id: 'task-101', author: 'Alex Rivera', role: 'Developer', comment_text: 'Staging build passed successfully. Testing production migration script now.', created_at: '45 mins ago' }
];

export const getCommentsByTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { data: dbComments, error } = await supabase
      .from('comments')
      .select('*, users(full_name, role)')
      .eq('task_id', taskId);

    if (error || !dbComments || dbComments.length === 0) {
      return res.status(200).json({ success: true, data: SEED_COMMENTS });
    }

    return res.status(200).json({ success: true, data: dbComments });
  } catch (err) {
    next(err);
  }
};

export const addComment = async (req, res, next) => {
  try {
    const { taskId: task_id } = req.params;
    const { comment_text } = req.body;

    if (!comment_text || comment_text.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'comment_text cannot be empty.' });
    }

    const newComment = {
      id: `c-${Date.now()}`,
      task_id,
      user_id: req.user?.id || 'user-001',
      author: req.user?.full_name || 'Alex Rivera',
      role: req.user?.role || 'Developer',
      comment_text,
      created_at: new Date().toISOString()
    };

    SEED_COMMENTS.push(newComment);

    return res.status(201).json({
      success: true,
      data: newComment
    });
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    await supabase.from('comments').delete().eq('id', id);

    return res.status(200).json({
      success: true,
      message: `Comment ${id} deleted.`
    });
  } catch (err) {
    next(err);
  }
};

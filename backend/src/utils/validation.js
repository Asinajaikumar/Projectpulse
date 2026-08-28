/**
 * Validation utilities for incoming params, query, and request body
 */

export const isValidUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return typeof uuid === 'string' && (uuidRegex.test(uuid) || uuid.startsWith('proj-') || uuid.startsWith('user-') || uuid.startsWith('task-'));
};

export const isValidDate = (dateStr) => {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  return !isNaN(d.getTime());
};

export const validateProjectInput = ({ name, start_date, deadline }) => {
  const errors = [];
  if (!name || name.trim().length === 0) errors.push('Project name is required.');
  if (!start_date || !isValidDate(start_date)) errors.push('Valid start_date is required.');
  if (!deadline || !isValidDate(deadline)) errors.push('Valid deadline date is required.');

  if (start_date && deadline && new Date(deadline) < new Date(start_date)) {
    errors.push('Deadline cannot be earlier than start_date.');
  }
  return errors;
};

export const validateTaskInput = ({ title, progress_percent, priority, status }) => {
  const errors = [];
  if (!title || title.trim().length === 0) errors.push('Task title is required.');

  if (progress_percent !== undefined) {
    const num = Number(progress_percent);
    if (isNaN(num) || num < 0 || num > 100) {
      errors.push('progress_percent must be a number between 0 and 100.');
    }
  }

  const validStatuses = ['not_started', 'in_progress', 'blocked', 'completed'];
  if (status && !validStatuses.includes(status.toLowerCase())) {
    errors.push(`Status must be one of: ${validStatuses.join(', ')}`);
  }

  const validPriorities = ['low', 'medium', 'high'];
  if (priority && !validPriorities.includes(priority.toLowerCase())) {
    errors.push(`Priority must be one of: ${validPriorities.join(', ')}`);
  }

  return errors;
};

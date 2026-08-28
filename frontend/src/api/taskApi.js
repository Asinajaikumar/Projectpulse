import apiClient from './axios';
import { MOCK_TASKS } from './mockData';

export const taskApi = {
  getTasks: async (filters = {}) => {
    try {
      const response = await apiClient.get('/tasks', { params: filters });
      return response.data?.data || response.data || MOCK_TASKS;
    } catch (err) {
      if (filters.projectId) {
        return MOCK_TASKS.filter(t => t.projectId === filters.projectId || t.project_id === filters.projectId);
      }
      return MOCK_TASKS;
    }
  },

  createTask: async (taskData) => {
    try {
      const response = await apiClient.post('/tasks', taskData);
      return response.data?.data || response.data;
    } catch (err) {
      const newTask = {
        id: `task-${Date.now()}`,
        ...taskData,
        status: taskData.status || 'NOT STARTED',
        progress: taskData.progress || 0,
        commentsCount: 0
      };
      MOCK_TASKS.unshift(newTask);
      return newTask;
    }
  },

  updateTaskStatus: async (id, status, progress) => {
    try {
      const response = await apiClient.patch(`/tasks/${id}/status`, { status, progress_percent: progress });
      return response.data?.data || response.data;
    } catch (err) {
      const task = MOCK_TASKS.find(t => t.id === id);
      if (task) {
        task.status = status;
        if (progress !== undefined) task.progress = progress;
        return task;
      }
      throw err;
    }
  }
};

export default taskApi;

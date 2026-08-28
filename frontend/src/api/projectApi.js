import apiClient from './axios';
import { MOCK_PROJECTS } from './mockData';

export const projectApi = {
  getAllProjects: async () => {
    try {
      const response = await apiClient.get('/projects');
      return response.data?.data || response.data || MOCK_PROJECTS;
    } catch (err) {
      return MOCK_PROJECTS;
    }
  },

  getProjectById: async (id) => {
    try {
      const response = await apiClient.get(`/projects/${id}`);
      return response.data?.data || response.data || MOCK_PROJECTS[0];
    } catch (err) {
      return MOCK_PROJECTS.find(p => p.id === id) || MOCK_PROJECTS[0];
    }
  },

  createProject: async (projectData) => {
    try {
      const response = await apiClient.post('/projects', projectData);
      return response.data?.data || response.data;
    } catch (err) {
      const newProj = {
        id: `proj-${Date.now()}`,
        ...projectData,
        progress: 0,
        riskStatus: 'ON TRACK',
        lastUpdated: 'Just now',
        teamMembers: []
      };
      MOCK_PROJECTS.unshift(newProj);
      return newProj;
    }
  },

  updateProject: async (id, updates) => {
    try {
      const response = await apiClient.put(`/projects/${id}`, updates);
      return response.data?.data || response.data;
    } catch (err) {
      const idx = MOCK_PROJECTS.findIndex(p => p.id === id);
      if (idx !== -1) {
        MOCK_PROJECTS[idx] = { ...MOCK_PROJECTS[idx], ...updates };
        return MOCK_PROJECTS[idx];
      }
      throw err;
    }
  }
};

export default projectApi;

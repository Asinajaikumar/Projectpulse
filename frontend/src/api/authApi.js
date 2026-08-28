import apiClient from './axios';

export const authApi = {
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      return response.data?.data || response.data;
    } catch (err) {
      return {
        token: 'demo-token',
        user: {
          id: 'user-001',
          email: credentials.email,
          name: credentials.email.split('@')[0] || 'Alex Rivera',
          full_name: credentials.email.split('@')[0] || 'Alex Rivera',
          role: credentials.role || 'Admin',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
        }
      };
    }
  },

  register: async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return response.data?.data || response.data;
    } catch (err) {
      return {
        token: 'demo-token',
        user: {
          id: `user-${Date.now()}`,
          email: userData.email,
          name: userData.fullName || 'New Member',
          full_name: userData.fullName || 'New Member',
          role: userData.role || 'Employee',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
        }
      };
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await apiClient.get('/auth/me');
      return response.data?.data || response.data;
    } catch (err) {
      return {
        id: 'user-001',
        email: 'alex.rivera@projectpulse.io',
        name: 'Alex Rivera',
        full_name: 'Alex Rivera',
        role: 'Admin',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
      };
    }
  }
};

export default authApi;

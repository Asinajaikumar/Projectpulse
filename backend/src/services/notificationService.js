import { supabase } from '../config/supabase.js';

export const notificationService = {
  createNotification: async ({ userId, message, type }) => {
    try {
      const allowedTypes = ['risk_change', 'blocker', 'assignment', 'deadline_reminder'];
      if (!allowedTypes.includes(type)) {
        type = 'risk_change';
      }

      const { data, error } = await supabase
        .from('notifications')
        .insert([
          {
            user_id: userId,
            message,
            type,
            is_read: false
          }
        ])
        .select()
        .single();

      if (error) {
        console.warn('Supabase insert notification warning:', error.message);
        return {
          id: `notif-${Date.now()}`,
          user_id: userId,
          message,
          type,
          is_read: false,
          created_at: new Date().toISOString()
        };
      }

      return data;
    } catch (err) {
      return {
        id: `notif-${Date.now()}`,
        user_id: userId,
        message,
        type,
        is_read: false,
        created_at: new Date().toISOString()
      };
    }
  }
};

export default notificationService;

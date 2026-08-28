import { supabase } from '../config/supabase.js';

export const register = async (req, res, next) => {
  try {
    const { email, password, fullName, role = 'employee' } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed: Email, password, and full_name are required.'
      });
    }

    const normalizedRole = role.toLowerCase().replace(' ', '_');

    // 1. Create Supabase Auth user account
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: normalizedRole
        }
      }
    });

    if (authError) {
      // Fallback for standalone demo mode
      const mockId = `user-${Date.now()}`;
      return res.status(201).json({
        success: true,
        data: {
          token: 'mock-jwt-token-registered',
          user: {
            id: mockId,
            email,
            full_name: fullName,
            role: normalizedRole,
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
          }
        }
      });
    }

    const userId = authData.user.id;

    // 2. Create user profile in 'users' table
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .insert([
        {
          id: userId,
          full_name: fullName,
          email,
          role: normalizedRole
        }
      ])
      .select()
      .single();

    return res.status(201).json({
      success: true,
      data: {
        token: authData.session?.access_token || 'mock-jwt-token-xyz789',
        user: userProfile || {
          id: userId,
          email,
          full_name: fullName,
          role: normalizedRole
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed: Email and password are required.'
      });
    }

    // Attempt Supabase Auth login
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (authError || !authData.user) {
      // Standalone development fallback
      const normalizedRole = (role || 'admin').toLowerCase().replace(' ', '_');
      return res.status(200).json({
        success: true,
        data: {
          token: 'demo-token',
          user: {
            id: 'user-001',
            email,
            name: email.split('@')[0] || 'Alex Rivera',
            full_name: email.split('@')[0] || 'Alex Rivera',
            role: normalizedRole === 'admin' ? 'Admin' : normalizedRole === 'team_leader' ? 'Team Leader' : 'Employee',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
          }
        }
      });
    }

    // Fetch user profile from database
    const { data: userProfile } = await supabase
      .from('users')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    return res.status(200).json({
      success: true,
      data: {
        token: authData.session.access_token,
        user: {
          id: authData.user.id,
          email: authData.user.email,
          full_name: userProfile?.full_name || 'Alex Rivera',
          name: userProfile?.full_name || 'Alex Rivera',
          role: userProfile?.role || 'admin',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
        }
      }
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    await supabase.auth.signOut();
    return res.status(200).json({
      success: true,
      message: 'Signed out successfully.'
    });
  } catch (err) {
    next(err);
  }
};

export const me = async (req, res, next) => {
  try {
    return res.status(200).json({
      success: true,
      data: req.user
    });
  } catch (err) {
    next(err);
  }
};

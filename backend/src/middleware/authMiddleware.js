import { supabase } from '../config/supabase.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Authorization token required in header format (Bearer <token>).'
      });
    }

    const token = authHeader.split(' ')[1];

    // Demo/Development Token Fallback
    if (token === 'demo-token' || token.startsWith('mock-')) {
      req.user = {
        id: 'user-001',
        email: 'alex.rivera@projectpulse.io',
        full_name: 'Alex Rivera',
        role: req.headers['x-demo-role'] || 'admin'
      };
      return next();
    }

    // Verify token via Supabase Auth
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !authUser) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: Invalid or expired authentication token.'
      });
    }

    // Fetch user record & role from 'users' table
    const { data: userProfile } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .single();

    req.user = {
      id: authUser.id,
      email: authUser.email,
      full_name: userProfile?.full_name || authUser.user_metadata?.full_name || 'ProjectPulse User',
      role: userProfile?.role || authUser.user_metadata?.role || 'admin'
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Failed to authenticate user request.'
    });
  }
};

export default authMiddleware;

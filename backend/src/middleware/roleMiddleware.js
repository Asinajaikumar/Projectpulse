export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized: User is not authenticated.'
      });
    }

    const userRole = (req.user.role || '').toLowerCase();
    const normalizedAllowed = allowedRoles.map(r => r.toLowerCase().replace(' ', '_'));

    // Admin has access to all routes
    if (userRole === 'admin' || userRole === 'manager') {
      return next();
    }

    const isAllowed = normalizedAllowed.some(role => {
      if (role === 'team_leader' && (userRole === 'team_leader' || userRole === 'team leader')) return true;
      if (role === 'employee' && userRole === 'employee') return true;
      return userRole === role;
    });

    if (!isAllowed) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Access restricted to [${allowedRoles.join(', ')}] roles. Your current role is '${req.user.role}'.`
      });
    }

    next();
  };
};

export default requireRole;

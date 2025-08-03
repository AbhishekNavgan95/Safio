/**
 * Middleware to verify if user is authenticated
 * Uses Passport.js isAuthenticated() method to check the session
 */
export const verifyToken = (req, res, next) => {
  // Check if user is authenticated via session
  if (req.isAuthenticated()) {
    return next();
  }

  // If not authenticated, return 401 Unauthorized
  return res.status(401).json({
    success: false,
    message: 'Unauthorized - Please log in to access this resource',
  });
};

/**
 * Middleware to verify if user has admin role
 */
export const isAdmin = (req, res, next) => {
  // First verify user is authenticated
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized - Please log in to access this resource',
    });
  }

  // Then check if user has admin role
  if (req.user && req.user.role === 'admin') {
    return next();
  }

  // If not admin, return 403 Forbidden
  return res.status(403).json({
    success: false,
    message: 'Forbidden - Admin access required',
  });
};

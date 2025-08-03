import passport from 'passport';

// Google OAuth login route handler
export const googleLogin = passport.authenticate('google', {
  scope: ['profile', 'email']
});

// Google OAuth callback handler
export const googleCallback = (req, res, next) => {
  passport.authenticate('google', {
    successRedirect: `${process.env.CLIENT_URL}/dashboard`,
    failureRedirect: `${process.env.CLIENT_URL}/login`
  })(req, res, next);
};

// Success and failure handlers
export const loginSuccess = (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'Login successful',
      user: req.user
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Not authorized'
    });
  }
};

export const loginFailed = (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Login failed'
  });
};

// Logout handler
export const logout = (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return next(err);
      }
      res.clearCookie('connect.sid');
      res.status(200).json({
        success: true,
        message: 'Logged out successfully'
      });
    });
  });
};

// Get current user
export const getCurrentUser = (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      user: req.user
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Not authenticated'
    });
  }
};

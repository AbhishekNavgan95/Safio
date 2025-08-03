import express from 'express';
import passport from 'passport';
import {
  googleLogin,
  googleCallback,
  loginSuccess,
  loginFailed,
  logout,
  getCurrentUser
} from '../controllers/auth.controller.js';

const router = express.Router();

// Google OAuth routes
router.get('/google', googleLogin);
router.get('/google/callback', googleCallback);

// Login status routes
router.get('/login/success', loginSuccess);
router.get('/login/failed', loginFailed);

// Logout route
router.post('/logout', logout);

// Get current user
router.get('/me', getCurrentUser);

export default router;

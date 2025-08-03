import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

// Configure Google Strategy
passport.use(new GoogleStrategy({ 
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BASE_URL}/api/auth/google/callback`,

    passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile, done) => {
    try {
      // Check if user exists
      let user = await User.findOne({ googleId: profile.id });

      if (user) {
        return done(null, user);
      }

      // Create new user if doesn't exist
      user = new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos?.[0]?.value
      });

      await user.save();
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

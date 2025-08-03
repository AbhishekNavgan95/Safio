import 'dotenv/config';
import express from 'express';
import connectDB from './config/db.js';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import bodyParser from 'body-parser';
import './config/passport.js'; // Google OAuth strategy

// Routes
import authRoutes from './routes/auth.routes.js';
// import moduleRoutes from './routes/module.routes.js';
// import userRoutes from './routes/user.routes.js';

// Initialize Express app
const app = express();

// ======= MIDDLEWARES =======
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ======= SESSION CONFIG =======
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecretkey',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // set secure: true in production with HTTPS
}));

// ======= PASSPORT SETUP =======
app.use(passport.initialize());
app.use(passport.session());

// ======= ROUTES =======
app.use('/api/auth', authRoutes);
// app.use('/api/modules', moduleRoutes);
// app.use('/api/user', userRoutes);

// Connect to MongoDB
connectDB().then(() => {
  // ======= SERVER START =======
  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
}).catch(err => {
  console.error('❌ Failed to connect to MongoDB:', err);
  process.exit(1);
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});

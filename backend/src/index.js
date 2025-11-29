import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import problemRoutes from './routes/problems.routes.js';
import executeCodeRoutes from './routes/executeCode.routes.js';
import playlistRoutes from './routes/playlist.routes.js';
import submissionRoutes from './routes/submission.routes.js';
import aiRoutes from './routes/ai.routes.js';
import { checkEnvVariables } from './libs/config.js';

dotenv.config();
checkEnvVariables();

const app = express();

// Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:5173', // Local dev - frontend
  process.env.FRONTEND_URL, // Netlify prod URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/problems', problemRoutes);
app.use('/api/v1/execute-code', executeCodeRoutes);
app.use('/api/v1/submissions', submissionRoutes);
app.use('/api/v1/playlist', playlistRoutes);
app.use('/api/v1/ai', aiRoutes);

// Start the server (IMPORTANT FIX)
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

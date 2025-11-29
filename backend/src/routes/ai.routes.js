import express from 'express';
import {
  getHint,
  debugUserCode,
  explainProblemSolution,
  explainProblemSolutionStream,
  getRecommendations,
  chat,
} from '../controllers/ai.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get hint for a problem
router.get('/hint/:problemId', getHint);

// Debug user's code
router.post('/debug', debugUserCode);

// Explain solution (non-streaming)
router.get('/explain/:problemId', explainProblemSolution);

// Explain solution (streaming - real-time like ChatGPT)
router.get('/explain/:problemId/stream', explainProblemSolutionStream);

// Get personalized recommendations
router.get('/recommend', getRecommendations);

// Chat with AI
router.post('/chat', chat);

export default router;
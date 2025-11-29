import {
  generateHint,
  debugCode,
  explainSolution,
  recommendProblems,
  chatWithAI,
  streamAIResponse, // 👈 ADD THIS
} from '../services/ai.service.js';
import { db } from '../libs/db.js';

/**
 * GET /api/v1/ai/hint/:problemId
 * Get a hint for a specific problem
 */
export const getHint = async (req, res) => {
  try {
    const { problemId } = req.params;
    const { level = 1 } = req.query;
    const userId = req.user.id;

    const hint = await generateHint(problemId, userId, parseInt(level));

    res.status(200).json({
      success: true,
      message: 'Hint generated successfully',
      data: hint,
    });
  } catch (error) {
    console.error('Error generating hint:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate hint',
    });
  }
};

/**
 * POST /api/v1/ai/debug
 * Debug user's code and provide feedback
 */
export const debugUserCode = async (req, res) => {
  try {
    const { problemId, code, language, error } = req.body;
    const userId = req.user.id;

    if (!problemId || !code || !language) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: problemId, code, language',
      });
    }

    const debugResult = await debugCode(problemId, userId, code, language, error);

    res.status(200).json({
      success: true,
      message: 'Code analyzed successfully',
      data: debugResult,
    });
  } catch (error) {
    console.error('Error debugging code:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to debug code',
    });
  }
};

/**
 * GET /api/v1/ai/explain/:problemId
 * Explain the reference solution
 */
export const explainProblemSolution = async (req, res) => {
  try {
    const { problemId } = req.params;
    const { language = 'JAVASCRIPT' } = req.query;

    const explanation = await explainSolution(problemId, language);

    res.status(200).json({
      success: true,
      message: 'Solution explained successfully',
      data: explanation,
    });
  } catch (error) {
    console.error('Error explaining solution:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to explain solution',
    });
  }
};

/**
 * GET /api/v1/ai/recommend
 * Get personalized problem recommendations
 */
export const getRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;

    const recommendations = await recommendProblems(userId);

    res.status(200).json({
      success: true,
      message: 'Recommendations generated successfully',
      data: recommendations,
    });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate recommendations',
    });
  }
};


export const chat = async (req, res) => {
  try {
    const { problemId, message, conversationHistory = [] } = req.body;
    const userId = req.user.id;

    if (!problemId || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: problemId, message',
      });
    }

    if (!Array.isArray(conversationHistory)) {
      return res.status(400).json({
        success: false,
        error: 'conversationHistory must be an array',
      });
    }

    const chatResponse = await chatWithAI(problemId, userId, message, conversationHistory);

    res.status(200).json({
      success: true,
      message: 'Chat response generated successfully',
      data: chatResponse,
    });
  } catch (error) {
    console.error('Error in chat:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate chat response',
    });
  }
};

/**
 * GET /api/v1/ai/explain/:problemId/stream
 * Stream explanation in real-time (like ChatGPT)
 */
export const explainProblemSolutionStream = async (req, res) => {
  try {
    const { problemId } = req.params;
    const { language = 'JAVASCRIPT' } = req.query;

    // Set headers for Server-Sent Events
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Get problem details
    const problem = await db.problem.findUnique({
      where: { id: problemId },
    });

    if (!problem) {
      res.write(`data: ${JSON.stringify({ error: 'Problem not found' })}\n\n`);
      res.end();
      return;
    }

    // Build the prompt (same as non-streaming version)
    const referenceSolution = problem.referenceSolutions?.[language.toLowerCase()];
    
    const prompt = `You are an expert coding instructor. Provide a COMPREHENSIVE and DETAILED explanation of the solution to this problem.

**Problem Title**: ${problem.title}
**Difficulty**: ${problem.difficulty}

**Problem Description**:
${problem.description}

${referenceSolution ? `**Reference Solution (${language})**:\n\`\`\`${language.toLowerCase()}\n${referenceSolution}\n\`\`\`` : ''}

**IMPORTANT**: Format your response in MARKDOWN with the following sections:

## 1. Problem Understanding
[Explain what the problem is asking in simple terms]

## 2. Approach
[Explain the algorithm/approach to solve this problem]

## 3. Step-by-Step Walkthrough
[Walk through the solution line by line]

## 4. Code Implementation
\`\`\`${language.toLowerCase()}
[Show the complete solution code]
\`\`\`

## 5. Complexity Analysis
- **Time Complexity**: [Explain]
- **Space Complexity**: [Explain]

## 6. Key Insights
[Important concepts or patterns used]

## 7. Common Mistakes
[What beginners typically get wrong]

## 8. Optimization Tips
[How to improve or variations of the solution]

Provide a MINIMUM of 500 words total. Be thorough and educational.`;

    // Get streaming response from Gemini
    const stream = await streamAIResponse(prompt, true); // Use Pro model for quality

    // Parse SSE data and forward to client
    stream.on('data', (chunk) => {
      const lines = chunk.toString().split('\n');
      
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          try {
            const jsonData = JSON.parse(line.slice(6));
            const text = jsonData?.candidates?.[0]?.content?.parts?.[0]?.text;
            
            if (text) {
              // Send text chunk to client
              res.write(`data: ${JSON.stringify({ text })}\n\n`);
            }
          } catch (e) {
            // Skip invalid JSON
          }
        }
      }
    });

    stream.on('end', () => {
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      res.end();
    });

    stream.on('error', (error) => {
      console.error('Stream error:', error);
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
      res.end();
    });

  } catch (error) {
    console.error('Error in stream explanation:', error);
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }
};
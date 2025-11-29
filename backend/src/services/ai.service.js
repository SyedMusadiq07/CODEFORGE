import axios from 'axios';
import { db } from '../libs/db.js';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Use available models from your API key
const FLASH_MODEL = 'gemini-2.5-flash';      // Fast and efficient
const PRO_MODEL = 'gemini-2.5-pro';          // More capable

const generateAIResponse = async (prompt, useProModel = false) => {
  try {
    const modelName = useProModel ? PRO_MODEL : FLASH_MODEL;
    
    console.log(`🤖 Calling Gemini API (${modelName})...`);
    console.log(`📝 Prompt length: ${prompt.length} chars`);
    
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 4096, // 🔥 INCREASED from 2048 to 4096 for longer responses
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_NONE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_NONE"
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 60000
      }
    );

    console.log('✅ API Response received');

    const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error('❌ Unexpected response structure:', JSON.stringify(response.data, null, 2));
      
      if (response.data?.promptFeedback?.blockReason) {
        throw new Error(`Content blocked: ${response.data.promptFeedback.blockReason}`);
      }
      
      if (response.data?.candidates?.[0]?.finishReason === 'SAFETY') {
        throw new Error('Response blocked by safety filters');
      }
      
      if (response.data?.candidates?.[0]?.finishReason === 'MAX_TOKENS') {
        throw new Error('Response truncated due to length. Try a shorter prompt.');
      }
      
      throw new Error('No text in API response');
    }

    console.log('✅ Text extracted, length:', text.length, 'characters');
    return text;
    
  } catch (error) {
    console.error('❌ Gemini API error:', error.message);
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Data:', JSON.stringify(error.response.data, null, 2));
    }
    
    if (error.response?.status === 400) {
      throw new Error('Invalid request to Gemini API');
    } else if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again in a few minutes');
    } else if (error.response?.status === 500) {
      throw new Error('Gemini API server error. Please try again');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. The prompt may be too long');
    }
    
    throw new Error(`AI service error: ${error.message}`);
  }
};
/**
 * Generate a hint for the problem
 */
export const generateHint = async (problemId, userId, hintLevel = 1) => {
  try {
    console.log('📥 generateHint called:', { problemId, userId, hintLevel });

    const problem = await db.problem.findUnique({
      where: { id: problemId },
    });

    if (!problem) {
      throw new Error('Problem not found');
    }

    const submissions = await db.submission.findMany({
      where: { userId, problemId },
      orderBy: { createdAt: 'desc' },
      take: 3,
    });

    // Shorter, focused prompts by level
    let prompt;
    
    if (hintLevel === 1) {
      prompt = `Give a gentle hint for "${problem.title}" (${problem.difficulty}).
Problem: ${problem.description}
User has ${submissions.length} attempts.
Hint: Mention the general approach or data structure in 2 sentences. Don't reveal the algorithm.`;
    } else if (hintLevel === 2) {
      prompt = `Give a moderate hint for "${problem.title}".
Problem: ${problem.description}
Explain the algorithm concept without code in 3-4 sentences. Give a small example.`;
    } else {
      prompt = `Give a detailed hint for "${problem.title}".
Problem: ${problem.description}
Provide step-by-step breakdown with pseudocode. Explain the logic clearly but don't give the exact implementation.`;
    }

    const hint = await generateAIResponse(prompt, false);

    return {
      hint,
      hintLevel,
      maxHints: 3,
      generatedBy: 'Gemini 2.5 Flash',
      problemTitle: problem.title,
      problemDifficulty: problem.difficulty,
    };
  } catch (error) {
    console.error('❌ Error in generateHint:', error);
    throw error;
  }
};

export const debugCode = async (problemId, userId, code, language, errorMessage) => {
  try {
    console.log('🐛 debugCode called');

    const problem = await db.problem.findUnique({
      where: { id: problemId },
    });

    if (!problem) {
      throw new Error('Problem not found');
    }

    const prompt = `Debug this ${language} code for "${problem.title}".

Problem: ${problem.description}

Code:
\`\`\`${language.toLowerCase()}
${code}
\`\`\`

Error: ${errorMessage || 'Wrong answer'}

Provide:
1. What's wrong (identify the bug)
2. Why it's wrong (explain the issue)
3. How to fix it (give a hint, not the solution)
4. What to test next

Be friendly and educational.`;

    const debugResult = await generateAIResponse(prompt, false);

    return {
      type: 'debug',
      analysis: debugResult,
      generatedBy: 'Gemini 2.5 Flash',
      problemTitle: problem.title,
    };
  } catch (error) {
    console.error('❌ Error in debugCode:', error);
    throw error;
  }
};
export const explainSolution = async (problemId, language) => {
  try {
    console.log('📖 explainSolution called');
    console.log('📥 Input:', { problemId, language });

    const problem = await db.problem.findUnique({
      where: { id: problemId },
    });

    if (!problem) {
      throw new Error('Problem not found');
    }

    console.log('🔍 Checking referenceSolutions...');

    if (!problem.referenceSolutions || typeof problem.referenceSolutions !== 'object') {
      throw new Error('Reference solutions not available for this problem');
    }

    const normalizedLanguage = language.toUpperCase();
    const referenceSolution = problem.referenceSolutions[normalizedLanguage];

    if (!referenceSolution) {
      const available = Object.keys(problem.referenceSolutions).join(', ');
      throw new Error(`No solution for ${language}. Available: ${available}`);
    }

    console.log('✅ Generating comprehensive explanation...');

    // 🔥 MUCH MORE DETAILED PROMPT
    const prompt = `You are an expert DSA tutor. Provide a COMPREHENSIVE, DETAILED explanation of this solution.

**Problem: ${problem.title}**
Difficulty: ${problem.difficulty}
Description: ${problem.description}

**Solution Code (${language}):**
\`\`\`${language.toLowerCase()}
${referenceSolution}
\`\`\`

**IMPORTANT: Provide a DETAILED explanation (minimum 500 words) covering ALL these sections:**

## 1. PROBLEM UNDERSTANDING
- Restate what the problem is asking in your own words
- What are the inputs and expected outputs?
- What are the constraints we need to consider?

## 2. INTUITION & APPROACH
- What is the KEY INSIGHT needed to solve this?
- What is the overall strategy/algorithm?
- Why does this approach work?
- What pattern or technique is being used? (e.g., two pointers, hash map, sliding window)

## 3. DETAILED ALGORITHM EXPLANATION
Break down the approach step-by-step:
- Step 1: What do we do first and why?
- Step 2: What's the next step?
- Step 3: Continue until complete
- Explain the logic behind each step

## 4. CODE WALKTHROUGH
Go through the code line by line or section by section:
- Explain what each variable does
- Explain what each loop/condition does
- Why is each part necessary?
- Connect the code to the algorithm steps

## 5. EXAMPLE WALKTHROUGH
Use a concrete example to demonstrate:
- Choose specific input values (e.g., a=5, b=3)
- Show what happens at each step
- Trace through the execution with actual values
- Show the final output

## 6. TIME & SPACE COMPLEXITY ANALYSIS
- **Time Complexity:** O(?) - Explain WHY in detail
  - What operations are we doing?
  - How many times?
  - Best/average/worst case if different
- **Space Complexity:** O(?) - Explain WHY in detail
  - What extra memory are we using?
  - What data structures?

## 7. KEY CONCEPTS & TECHNIQUES
- What programming concepts are demonstrated?
- What data structures are used and why?
- When should you use this approach?
- What makes this solution efficient/optimal?

## 8. EDGE CASES & COMMON MISTAKES
- What edge cases does this handle?
- What are common mistakes beginners make?
- What should you watch out for?
- How could this solution break if modified incorrectly?

## 9. ALTERNATIVE APPROACHES
- Are there other ways to solve this problem?
- What are the trade-offs?
- Why is this approach better/worse than alternatives?

## 10. LEARNING TAKEAWAYS
- What's the main lesson from this problem?
- How can this technique be applied to other problems?
- What should a student remember?

**Make the explanation:**
- ✅ Very detailed and thorough
- ✅ Beginner-friendly with clear language
- ✅ Well-structured with proper markdown formatting
- ✅ Include code snippets where helpful
- ✅ Use analogies or real-world examples if appropriate
- ✅ Educational and encouraging in tone

**MINIMUM LENGTH: 500-800 words. Be comprehensive!**`;

    console.log('📏 Prompt length:', prompt.length, 'characters');

    const explanation = await generateAIResponse(prompt, true); // Use Pro model for better quality

    console.log('✅ Explanation generated successfully');
    console.log('📏 Explanation length:', explanation.length, 'characters');

    return {
      explanation,
      code: referenceSolution,
      language: normalizedLanguage,
      generatedBy: 'Gemini 2.5 Pro',
      problemTitle: problem.title,
    };
  } catch (error) {
    console.error('❌ ERROR in explainSolution:', error);
    throw error;
  }
};

export const recommendProblems = async (userId) => {
  try {
    console.log('🎯 recommendProblems called for user:', userId);

    const solvedProblems = await db.problemSolved.findMany({
      where: { userId },
      include: { problem: true },
    });

    const recentSubmissions = await db.submission.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { problem: true },
    });

    console.log('📊 User stats:', {
      solvedCount: solvedProblems.length,
      recentSubmissions: recentSubmissions.length,
    });

    const totalSolved = solvedProblems.length;
    const successRate = recentSubmissions.length
      ? (recentSubmissions.filter((s) => s.status === 'Accepted').length /
          recentSubmissions.length) *
        100
      : 0;

    const tagFrequency = {};
    solvedProblems.forEach((sp) => {
      sp.problem.tags.forEach((tag) => {
        tagFrequency[tag] = (tagFrequency[tag] || 0) + 1;
      });
    });

    const sortedTags = Object.entries(tagFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);
    const strongTags = sortedTags.map((t) => t[0]);

    const easySolved = solvedProblems.filter(
      (sp) => sp.problem.difficulty === 'EASY'
    ).length;
    const mediumSolved = solvedProblems.filter(
      (sp) => sp.problem.difficulty === 'MEDIUM'
    ).length;

    let suggestedDifficulty = 'EASY';
    if (easySolved >= 5 && successRate > 70) suggestedDifficulty = 'MEDIUM';
    if (mediumSolved >= 5 && successRate > 60) suggestedDifficulty = 'HARD';

    const recommendations = await db.problem.findMany({
      where: {
        difficulty: suggestedDifficulty,
        id: { notIn: solvedProblems.map((p) => p.problemId) },
      },
      take: 5,
    });

    console.log('📚 Recommendations found:', recommendations.length);

    const prompt = `You are a personalized learning coach for a DSA platform.

**User Stats:**
- Total problems solved: ${totalSolved}
- Success rate: ${Math.round(successRate)}%
- Strong topics: ${strongTags.join(', ') || 'None yet'}
- Easy problems solved: ${easySolved}
- Medium problems solved: ${mediumSolved}

**Recommended Difficulty:** ${suggestedDifficulty}

**Task:**
Write a short, encouraging message (2-3 sentences) explaining:
1. Why these problems are recommended
2. What the user should focus on next
3. A motivational tip

Be friendly and personalized.`;

    const aiMessage = await generateAIResponse(prompt, false);

    return {
      recommendations,
      analysis: {
        totalSolved,
        successRate: Math.round(successRate),
        strongTags,
        suggestedDifficulty,
        message: aiMessage,
      },
      generatedBy: 'Gemini 2.5 Flash',
    };
  } catch (error) {
    console.error('❌ Error in recommendProblems:', error);
    throw error;
  }
};



export const chatWithAI = async (problemId, userId, userMessage, conversationHistory = []) => {
  try {
    console.log('💬 chatWithAI called');

    const problem = await db.problem.findUnique({
      where: { id: problemId },
    });

    if (!problem) {
      throw new Error('Problem not found');
    }

    // Build conversation context (limit to last 6 messages to avoid long prompts)
    const recentHistory = conversationHistory.slice(-6);
    let conversationContext = recentHistory.map(msg => 
      `${msg.role === 'user' ? 'Student' : 'Mentor'}: ${msg.content}`
    ).join('\n');

    const prompt = `You're helping with "${problem.title}" (${problem.difficulty}).

Problem: ${problem.description}

${conversationContext ? `Previous chat:\n${conversationContext}\n` : ''}
Student: ${userMessage}

Respond helpfully. Don't give away the solution unless asked. Be encouraging.`;

    const response = await generateAIResponse(prompt, false);

    return {
      response,
      generatedBy: 'Gemini 2.5 Flash',
      problemTitle: problem.title,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('❌ Error in chatWithAI:', error);
    throw error;
  }
};

/**
 * Stream AI response for real-time display
 * Uses Gemini's streamGenerateContent API
 */
export const streamAIResponse = async (prompt, useProModel = false) => {
  const modelName = useProModel ? PRO_MODEL : FLASH_MODEL;
  
  console.log(`🌊 Streaming from Gemini API (${modelName})...`);
  
  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:streamGenerateContent?key=${GEMINI_API_KEY}&alt=sse`,
    {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 4096,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_NONE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_NONE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_NONE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_NONE"
        }
      ]
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'stream',
      timeout: 120000 // 2 minutes for streaming
    }
  );

  return response.data;
};

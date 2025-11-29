import { axiosInstance } from '../libs/axios';

/**
 * AI Service - Handles all AI-related API calls
 */
export const aiService = {
  /**
   * Get AI hint for a problem
   * @param {string} problemId 
   * @param {number} level - 1, 2, or 3
   */
  getHint: async (problemId, level = 1) => {
    try {
      const response = await axiosInstance.get(`/ai/hint/${problemId}?level=${level}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get hint');
    }
  },

  /**
   * Chat with AI about the problem
   * @param {string} problemId 
   * @param {string} message 
   * @param {Array} conversationHistory 
   */
  chat: async (problemId, message, conversationHistory = []) => {
    try {
      const response = await axiosInstance.post('/ai/chat', {
        problemId,
        message,
        conversationHistory,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to chat with AI');
    }
  },

  /**
   * Debug failed code
   * @param {string} problemId 
   * @param {string} code 
   * @param {string} language 
   * @param {string} errorMessage 
   */
  debugCode: async (problemId, code, language, errorMessage) => {
    try {
      const response = await axiosInstance.post('/ai/debug', {
        problemId,
        code,
        language: language.toUpperCase(),
        errorMessage,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to debug code');
    }
  },

  /**
   * Explain the solution
   * @param {string} problemId 
   * @param {string} language - Optional, defaults to JAVASCRIPT on backend
   */
  explainSolution: async (problemId, language = 'JAVASCRIPT') => {
    try {
      const response = await axiosInstance.get(
        `/ai/explain/${problemId}?language=${language.toUpperCase()}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to explain solution');
    }
  },

  /**
   * Get personalized problem recommendations
   */
  getRecommendations: async () => {
    try {
      const response = await axiosInstance.get('/ai/recommend');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Failed to get recommendations');
    }
  },
};

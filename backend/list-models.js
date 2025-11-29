import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  console.log('🔑 Testing API Key...');
  console.log('Key starts with:', apiKey?.substring(0, 10));
  
  try {
    console.log('\n📋 Fetching available models via REST API...\n');
    
    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );
    
    console.log('✅ Available models:\n');
    
    response.data.models.forEach(model => {
      console.log(`📦 ${model.name}`);
      console.log(`   Display: ${model.displayName}`);
      console.log(`   Methods: ${model.supportedGenerationMethods.join(', ')}`);
      console.log('');
    });
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
}

listModels();
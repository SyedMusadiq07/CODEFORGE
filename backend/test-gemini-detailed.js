import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = 'gemini-2.5-flash';
  
  try {
    console.log('🧪 Testing Gemini API...');
    console.log('Model:', modelName);
    console.log('API Key (first 10):', apiKey?.substring(0, 10));
    
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
      {
        contents: [{
          parts: [{
            text: 'Say hello in one sentence'
          }]
        }]
      }
    );

    console.log('\n✅ API Request Successful!');
    console.log('\n📦 Full Response:');
    console.log(JSON.stringify(response.data, null, 2));
    
  } catch (error) {
    console.error('\n❌ API Request Failed');
    console.error('Status:', error.response?.status);
    console.error('Status Text:', error.response?.statusText);
    console.error('\n📦 Error Response:');
    console.error(JSON.stringify(error.response?.data, null, 2));
    console.error('\nError Message:', error.message);
  }
}

testGemini();
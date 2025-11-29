import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

async function testGemini() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  // Use the correct model name from the list
  const modelName = 'gemini-2.5-flash'; // 👈 This one is available!

  try {
    console.log(`\n🧪 Testing: ${modelName}...`);
    
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

    const text = response.data.candidates[0].content.parts[0].text;
    console.log(`✅ SUCCESS with ${modelName}!`);
    console.log(`Response: ${text}`);
    
  } catch (error) {
    console.log(`❌ Failed: ${error.response?.status} - ${error.response?.data?.error?.message || error.message}`);
  }
}

testGemini();
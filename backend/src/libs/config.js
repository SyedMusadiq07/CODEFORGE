export const checkEnvVariables = () => {
  const required = [
    'DATABASE_URL',
    'JWT_SECRET',
    'GEMINI_API_KEY',
    'JUDGE0_API_URL',
    'SULU_API_KEY',
  ];

  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error('❌ Missing environment variables:', missing.join(', '));
    process.exit(1);
  }

  console.log('✅ All environment variables loaded');
};
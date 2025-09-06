#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up HelloWorld Language Learning App...\n');

// Check if Node.js is installed
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  console.log(`✅ Node.js version: ${nodeVersion}`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js first.');
  process.exit(1);
}

// Setup backend
console.log('\n📦 Setting up backend...');
try {
  process.chdir('backend');
  
  // Install dependencies
  console.log('Installing backend dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  // Create .env file if it doesn't exist
  const envPath = '.env';
  if (!fs.existsSync(envPath)) {
    const envContent = `PORT=3000
MONGODB_URI=mongodb://localhost:27017/helloworld
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development`;
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created .env file');
  } else {
    console.log('✅ .env file already exists');
  }
  
  console.log('✅ Backend setup complete');
} catch (error) {
  console.error('❌ Backend setup failed:', error.message);
  process.exit(1);
}

// Setup frontend
console.log('\n📱 Setting up mobile app...');
try {
  process.chdir('../mobile');
  
  // Install dependencies
  console.log('Installing mobile dependencies...');
  execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
  
  console.log('✅ Mobile app setup complete');
} catch (error) {
  console.error('❌ Mobile app setup failed:', error.message);
  console.log('\n🔧 Troubleshooting:');
  console.log('1. Make sure you have the latest version of npm: npm install -g npm@latest');
  console.log('2. Clear npm cache: npm cache clean --force');
  console.log('3. Try installing manually: cd mobile && npm install');
  console.log('4. If using Expo CLI, make sure it\'s installed: npm install -g @expo/cli');
  process.exit(1);
}

// Go back to root directory
process.chdir('..');

console.log('\n🎉 Setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Make sure MongoDB is running');
console.log('2. Start the backend server:');
console.log('   cd backend && npm run dev');
console.log('3. In a new terminal, start the mobile app:');
console.log('   cd mobile && npm start');
console.log('4. Use Expo Go app to scan the QR code');
console.log('\n📱 Expo SDK 53 Features:');
console.log('- Latest React Native 0.76.3');
console.log('- Improved performance and stability');
console.log('- Better TypeScript support');
console.log('- Enhanced development tools');
console.log('\n📚 For more information, see the README.md files in each directory.');
console.log('\nHappy learning! 🌍');

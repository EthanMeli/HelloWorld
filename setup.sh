#!/bin/bash

# HelloWorld Language Learning App - Setup Script
# This script sets up both backend and frontend for development

echo "🌍 Setting up HelloWorld Language Learning App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v16+ first."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Setup Backend
echo "📦 Setting up backend..."
cd backend

# Install backend dependencies
npm install

# Copy environment file
if [ ! -f .env ]; then
    cp .env.example .env
    echo "📝 Please update the .env file with your database credentials"
    echo "   Database: helloworld_db"
    echo "   Default user: postgres"
fi

# Create database (you may need to adjust this based on your PostgreSQL setup)
echo "🗄️  Creating database..."
createdb helloworld_db 2>/dev/null || echo "Database might already exist"

# Seed database
echo "🌱 Seeding database with sample data..."
npm run seed

cd ..

# Setup Frontend
echo "📱 Setting up frontend..."
cd frontend

# Install frontend dependencies
npm install

# iOS setup (if on macOS)
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 Setting up iOS dependencies..."
    cd ios && pod install && cd ..
fi

cd ..

echo "✅ Setup complete!"
echo ""
echo "🚀 To start the application:"
echo "1. Start the backend: cd backend && npm run dev"
echo "2. Start the frontend: cd frontend && npm start"
echo "3. Run on device: npm run ios (or npm run android)"
echo ""
echo "📖 For more details, see README.md"

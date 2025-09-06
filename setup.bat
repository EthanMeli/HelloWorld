@echo off
echo 🌍 Setting up HelloWorld Language Learning App...

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js v16+ first.
    exit /b 1
)

REM Check if PostgreSQL is installed
psql --version >nul 2>&1
if errorlevel 1 (
    echo ❌ PostgreSQL is not installed. Please install PostgreSQL first.
    exit /b 1
)

echo ✅ Prerequisites check passed

REM Setup Backend
echo 📦 Setting up backend...
cd backend

REM Install backend dependencies
npm install

REM Copy environment file
if not exist .env (
    copy .env.example .env
    echo 📝 Please update the .env file with your database credentials
    echo    Database: helloworld_db
    echo    Default user: postgres
)

REM Create database
echo 🗄️  Creating database...
createdb helloworld_db 2>nul || echo Database might already exist

REM Seed database
echo 🌱 Seeding database with sample data...
npm run seed

cd ..

REM Setup Frontend
echo 📱 Setting up frontend...
cd frontend

REM Install frontend dependencies
npm install

cd ..

echo ✅ Setup complete!
echo.
echo 🚀 To start the application:
echo 1. Start the backend: cd backend ^&^& npm run dev
echo 2. Start the frontend: cd frontend ^&^& npm start
echo 3. Run on device: npm run android
echo.
echo 📖 For more details, see README.md

pause

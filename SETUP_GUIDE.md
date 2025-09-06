# HelloWorld Language Learning App - Complete Setup Guide

This guide will walk you through setting up the HelloWorld language learning app with MongoDB, Render deployment, and Expo SDK 53.

## Prerequisites

1. **Node.js** (18 or higher)
2. **npm** or **yarn**
3. **Git**
4. **Expo CLI** - Install globally: `npm install -g @expo/cli`
5. **MongoDB Atlas Account** (free tier available)
6. **Render Account** (free tier available)

## Project Structure

```
HelloWorld/
├── backend/                 # Node.js Express API server
│   ├── models/             # Mongoose database models
│   ├── routes/             # API routes
│   ├── middleware/         # Authentication & validation
│   └── server.js           # Main server file
├── frontend/               # React Native Expo app
│   ├── src/               # App source code
│   └── app.json           # Expo configuration
└── render.yaml            # Render deployment config
```

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <your-repo-url>
cd HelloWorld

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. MongoDB Atlas Setup

1. **Create MongoDB Atlas Account**:
   - Visit [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account
   - Create a new cluster (free tier M0)

2. **Configure Database Access**:
   - Go to "Database Access" in sidebar
   - Click "Add New Database User"
   - Create username/password (save these)
   - Set role to "Atlas Admin" or "Read and write to any database"

3. **Configure Network Access**:
   - Go to "Network Access" in sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add your specific IP for better security

4. **Get Connection String**:
   - Go to "Clusters" and click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - It should look like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/helloworld_db?retryWrites=true&w=majority`

### 3. Backend Environment Setup

1. **Create Environment File**:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. **Configure Environment Variables** in `backend/.env`:
   ```env
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/helloworld_db?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-here
   FRONTEND_URL=http://localhost:8081
   ```

   Replace:
   - `<username>` and `<password>` with your MongoDB Atlas credentials
   - `your-super-secret-jwt-key-here` with a secure random string

### 4. Test Backend Locally

```bash
cd backend
npm start
```

The backend should start on `http://localhost:3000`. You should see:
- "MongoDB Connected: cluster0-xxxxx.mongodb.net"
- "HelloWorld Backend Server running on port 3000"

Test the API:
```bash
curl http://localhost:3000/api/health
```

### 5. Render Deployment Setup

1. **Create Render Account**:
   - Visit [Render](https://render.com)
   - Sign up with your GitHub account

2. **Push Code to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Deploy Backend on Render**:
   - In Render dashboard, click "New +"
   - Select "Web Service"
   - Connect your GitHub repository
   - Configure the service:
     - **Name**: `helloworld-backend`
     - **Root Directory**: `backend`
     - **Environment**: `Node`
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free

4. **Add Environment Variables in Render**:
   - In your service settings, go to "Environment"
   - Add these variables:
     ```
     NODE_ENV=production
     MONGODB_URI=<your-mongodb-connection-string>
     JWT_SECRET=<your-jwt-secret>
     FRONTEND_URL=https://expo.dev
     ```

5. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your backend URL: `https://helloworld-backend.onrender.com`

### 6. Frontend Configuration

1. **Update API Configuration**:
   Create `frontend/src/config/api.js`:
   ```javascript
   const API_BASE_URL = __DEV__ 
     ? 'http://localhost:3000/api' 
     : 'https://helloworld-backend.onrender.com/api';

   export default API_BASE_URL;
   ```

2. **Update API calls** in your Redux slices to use this base URL.

### 7. Run Frontend with Expo

1. **Start Expo Development Server**:
   ```bash
   cd frontend
   npm start
   ```

2. **Install Expo Go App**:
   - Download "Expo Go" from Google Play Store or App Store
   - Open the app and scan the QR code from your terminal

3. **Development Workflow**:
   - Make changes to your code
   - App will reload automatically
   - Use Expo Go to test on your phone
   - Use `expo start --web` to test in browser

### 8. Environment-Specific Configuration

**Development** (local backend):
```javascript
// frontend/src/config/api.js
const API_BASE_URL = 'http://localhost:3000/api';
```

**Production** (Render backend):
```javascript
// frontend/src/config/api.js
const API_BASE_URL = 'https://helloworld-backend.onrender.com/api';
```

### 9. Building for Production

**Android APK**:
```bash
cd frontend
expo build:android
```

**iOS Build** (requires macOS):
```bash
cd frontend
expo build:ios
```

**Web Build**:
```bash
cd frontend
expo build:web
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**:
   - Check your connection string format
   - Verify username/password are correct
   - Ensure IP address is whitelisted in MongoDB Atlas

2. **Expo App Won't Connect**:
   - Make sure your phone and computer are on the same WiFi network
   - Try using the tunnel option: `expo start --tunnel`

3. **Backend Not Accessible from Phone**:
   - Use your computer's local IP instead of localhost
   - Or deploy to Render and update the frontend config

4. **CORS Issues**:
   - Backend is configured to accept requests from Expo
   - If issues persist, check the CORS configuration in `server.js`

### Performance Tips

1. **Free Tier Limitations**:
   - Render free tier sleeps after 15 minutes of inactivity
   - First request after sleep may take 30+ seconds
   - Consider upgrading to paid tier for production

2. **MongoDB Atlas**:
   - Free tier (M0) has 512MB storage limit
   - Monitor usage in Atlas dashboard

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/lessons` - Get lessons for user's language
- `GET /api/flashcards/decks` - Get user's flashcard decks
- `GET /api/media` - Get media content

## Database Schema

The app uses the following MongoDB collections:
- `users` - User accounts and preferences
- `lessons` - Language lessons
- `decks` - Flashcard decks
- `cards` - Individual flashcards
- `reviewlogs` - Spaced repetition tracking
- `mediaitems` - Audio/video content
- `userlessonprogresses` - User progress tracking

## Next Steps

1. **Add Sample Data**: Create initial lessons and flashcards
2. **Implement Features**: Add more language learning features
3. **Testing**: Add unit and integration tests
4. **Monitoring**: Set up error tracking and analytics
5. **App Store**: Prepare for app store submission

## Support

If you encounter issues:
1. Check the console logs for error messages
2. Verify all environment variables are set correctly
3. Test API endpoints individually
4. Check MongoDB Atlas and Render service logs

Happy coding! 🚀

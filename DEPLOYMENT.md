# Deployment Guide

## Frontend (Vercel)

### 1. Prepare Repository
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Deploy to Vercel
1. Go to [Vercel](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 3. Environment Variables (Vercel Dashboard)
Add these in Vercel's project settings:
```
VITE_API_URL=https://your-backend-url.onrender.com
VITE_FIREBASE_API_KEY=AIzaSyCZSdDPxnBgjjgj8pfdr-yfBAkq0964l38
VITE_FIREBASE_AUTH_DOMAIN=todo-62330.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=todo-62330
VITE_FIREBASE_STORAGE_BUCKET=todo-62330.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=670803768931
VITE_FIREBASE_APP_ID=1:670803768931:web:d5a8d0ef71b46b853eaa56
VITE_FIREBASE_MEASUREMENT_ID=G-8KP1L97W4Z
```

---

## Backend (Render)

### 1. Deploy to Render
1. Go to [Render](https://render.com)
2. Click "New" → "Web Service"
3. Connect your repository
4. Configure:
   - **Name**: `checkit-backend`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 2. Environment Variables (Render Dashboard)
Add these in Render's environment settings:
```
NODE_ENV=production
PORT=3000
GOOGLE_API_KEY=your_google_gemini_api_key
TAVILY_API_KEY=your_tavily_api_key
MONGODB_URI=your_mongodb_connection_string
```

### 3. After Backend Deploys
1. Copy your Render backend URL (e.g., `https://checkit-backend.onrender.com`)
2. Go back to Vercel
3. Update `VITE_API_URL` to your Render backend URL
4. Redeploy frontend

---

## CORS Configuration

The backend already has CORS enabled (`cors()` middleware in `index.js`), so it will accept requests from your Vercel frontend.

---

## Testing Production
1. Visit your Vercel URL
2. Try a fact-check query
3. Check browser console for any errors
4. Verify DAO voting works

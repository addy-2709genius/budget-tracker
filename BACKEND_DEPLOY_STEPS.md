# 🚀 Deploy Backend on Render - Step by Step

Complete guide to deploy your backend API on Render.

---

## 📋 Prerequisites

- ✅ GitHub repository with your code (already done)
- ✅ Render account (sign up at render.com if needed)
- ✅ PostgreSQL database created on Render (you mentioned you have this)

---

## 🎯 Step 1: Sign Up / Log In to Render

1. Go to **[render.com](https://render.com)**
2. Click **"Get Started for Free"** or **"Sign In"**
3. Sign up with **GitHub** (recommended - connects automatically)
   - Click **"Sign up with GitHub"**
   - Authorize Render to access your repositories
4. You'll be redirected to Render dashboard

---

## 🗄️ Step 2: Verify PostgreSQL Database (If Not Done)

If you haven't created the database yet:

1. In Render dashboard, click **"New +"** → **"PostgreSQL"**
2. Configure:
   - **Name**: `budget-tracker-db`
   - **Database**: `budget_tracker`
   - **User**: Leave default or use `budget_user`
   - **Region**: Choose closest to you
   - **PostgreSQL Version**: `16` (or latest)
   - **Plan**: **Free**
3. Click **"Create Database"**
4. Wait ~2 minutes for creation

**📝 Save Database Details:**
- Go to database → **"Info"** tab
- Copy: **Host**, **Port**, **Database**, **User**, **Password**
- Or copy the **Internal Database URL**

---

## ⚙️ Step 3: Create Web Service (Backend)

### 3.1: Start Creating Service

1. In Render dashboard, click **"New +"** button (top right)
2. Select **"Web Service"** from dropdown menu

### 3.2: Connect GitHub Repository

1. **If GitHub not connected:**
   - Click **"Connect account"** or **"Configure GitHub"**
   - Authorize Render to access your repositories
   - Select repositories (choose **"All repositories"** or specific ones)

2. **Select Your Repository:**
   - You'll see a list of your GitHub repositories
   - Find and click: **`budget-tracker`** (or your repo name)
   - Click **"Connect"**

### 3.3: Configure Basic Settings

Fill in these fields:

1. **Name**
   - Enter: `budget-tracker-api`
   - This is just for identification in Render

2. **Region**
   - Choose: **Same region as your database** (for faster connection)
   - Or closest to you

3. **Branch**
   - Select: `main` (or `master` if that's your branch)

4. **Root Directory** ⚠️ **VERY IMPORTANT!**
   - Enter: `server`
   - This tells Render where your backend code is
   - **DO NOT leave empty!**

5. **Runtime**
   - Select: `Node`
   - Render should auto-detect this

6. **Build Command**
   - Enter: `npm install`
   - This installs all dependencies

7. **Start Command**
   - Enter: `npm start`
   - This starts your server

8. **Plan**
   - Select: **Free** (or paid if you want always-on)

### 3.4: Add Environment Variables

1. **Scroll down to "Environment Variables"** section
2. **Click "Add Environment Variable"** button
3. **Add each variable one by one:**

#### Variable 1: NODE_ENV
- **Key**: `NODE_ENV`
- **Value**: `production`
- Click **"Add"**

#### Variable 2: PORT
- **Key**: `PORT`
- **Value**: `4000`
- Click **"Add"**

#### Variable 3: DB_TYPE
- **Key**: `DB_TYPE`
- **Value**: `postgresql`
- Click **"Add"`

#### Variable 4: DB_HOST
- **Key**: `DB_HOST`
- **Value**: Your PostgreSQL host from Step 2
  - Example: `dpg-xxxxx-a.oregon-postgres.render.com`
  - Get this from PostgreSQL service → Info tab
- Click **"Add"**

#### Variable 5: DB_USER
- **Key**: `DB_USER`
- **Value**: Your PostgreSQL user from Step 2
  - Get this from PostgreSQL service → Info tab
- Click **"Add"**

#### Variable 6: DB_PASSWORD
- **Key**: `DB_PASSWORD`
- **Value**: Your PostgreSQL password from Step 2
  - Get this from PostgreSQL service → Info tab
  - Click "Show" to reveal password
- Click **"Add"**

#### Variable 7: DB_NAME
- **Key**: `DB_NAME`
- **Value**: `budget_tracker`
- Click **"Add"**

#### Variable 8: DB_PORT
- **Key**: `DB_PORT`
- **Value**: `5432`
- Click **"Add"**

#### Variable 9: JWT_SECRET
- **Key**: `JWT_SECRET`
- **Value**: Click the **🔄 refresh icon** next to the field
  - Render will auto-generate a secure random string
  - Or generate manually (see below)
- Click **"Add"**

**To generate JWT_SECRET manually:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### Variable 10: FRONTEND_URL
- **Key**: `FRONTEND_URL`
- **Value**: `https://budget-tracker-frontend.onrender.com`
  - ⚠️ **If frontend not deployed yet**, use placeholder:
  - `http://localhost:5173` (temporary, update later)
- Click **"Add"**

### 3.5: Review and Deploy

1. **Double-check all settings:**
   - ✅ Root Directory: `server`
   - ✅ Build Command: `npm install`
   - ✅ Start Command: `npm start`
   - ✅ All 10 environment variables added

2. **Click "Create Web Service"** button (bottom)
3. Render will start deploying your backend
4. Wait **5-7 minutes** for deployment

---

## 📊 Step 4: Monitor Deployment

### 4.1: Watch Build Logs

1. You'll see build logs automatically
2. Look for:
   - ✅ "Installing dependencies..."
   - ✅ "npm install" completing
   - ✅ "Starting service..."
   - ✅ "Server running on port 4000"

### 4.2: Check for Errors

**If you see errors:**

- **"Module not found"**
  - Check Root Directory is `server`
  - Verify `package.json` exists in `server/` folder

- **"Database connection failed"**
  - Check database environment variables
  - Verify database is running
  - Check database credentials

- **"Port already in use"**
  - Check PORT environment variable is `4000`

### 4.3: Get Your Backend URL

Once deployment completes:
- Render will show: **"Your service is live at"**
- URL format: `https://budget-tracker-api.onrender.com`
- **Save this URL!** You'll need it for frontend

---

## ✅ Step 5: Test Your Backend

### 5.1: Test Root Endpoint

1. Open in browser: `https://your-backend.onrender.com/`
2. Should see:
   ```json
   {
     "status": "ok",
     "message": "Budget Tracker API is running",
     "version": "1.0.0",
     "endpoints": { ... }
   }
   ```

### 5.2: Test Health Check

1. Open: `https://your-backend.onrender.com/health`
2. Should see:
   ```json
   {
     "status": "ok",
     "message": "Budget Tracker API is running"
   }
   ```

### 5.3: Test API Endpoint (Optional)

1. Open browser console (F12)
2. Run:
   ```javascript
   fetch('https://your-backend.onrender.com/api/auth/register', {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({
       name: 'Test User',
       email: 'test@example.com',
       password: 'password123'
     })
   }).then(r => r.json()).then(console.log)
   ```
3. Should return user data with token (if successful)

---

## 🔧 Step 6: Troubleshooting

### Backend Won't Start

**Check:**
1. **Render Logs** → Look for error messages
2. **Root Directory** → Should be `server`
3. **Environment Variables** → All 10 variables set
4. **Database Connection** → Check DB_* variables

### "Route not found" Error

- Make sure you're using `/api` prefix
- Test: `https://your-backend.onrender.com/api/auth/register`
- Not: `https://your-backend.onrender.com/auth/register`

### Database Connection Error

1. Verify database is running (green status in Render)
2. Check all DB_* environment variables
3. Test database connection from Render PostgreSQL dashboard

### Build Fails

1. Check build logs for specific error
2. Verify `package.json` exists in `server/` folder
3. Check Node.js version compatibility
4. Ensure all dependencies are in `package.json`

---

## 📝 Environment Variables Checklist

Make sure you have all these:

- [ ] `NODE_ENV=production`
- [ ] `PORT=4000`
- [ ] `DB_TYPE=postgresql`
- [ ] `DB_HOST=your-postgres-host`
- [ ] `DB_USER=your-postgres-user`
- [ ] `DB_PASSWORD=your-postgres-password`
- [ ] `DB_NAME=budget_tracker`
- [ ] `DB_PORT=5432`
- [ ] `JWT_SECRET=your-generated-secret`
- [ ] `FRONTEND_URL=your-frontend-url` (or placeholder)

---

## 🎯 Quick Reference

### Your Backend URLs:
- **Root**: `https://your-backend.onrender.com/`
- **Health**: `https://your-backend.onrender.com/health`
- **API Base**: `https://your-backend.onrender.com/api`

### Important Settings:
- **Root Directory**: `server` ⚠️
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Runtime**: `Node`

---

## ✅ Deployment Checklist

- [ ] Signed up for Render
- [ ] PostgreSQL database created
- [ ] Web Service created
- [ ] GitHub repository connected
- [ ] Root Directory set to `server`
- [ ] All 10 environment variables added
- [ ] Build completed successfully
- [ ] Backend URL received
- [ ] Root endpoint (`/`) works
- [ ] Health check (`/health`) works
- [ ] Backend is live! 🎉

---

## 🚀 Next Steps

After backend is deployed:

1. **Create Database Tables**
   - See `COMPLETE_DEPLOYMENT_GUIDE.md` Step 3

2. **Deploy Frontend**
   - See `COMPLETE_DEPLOYMENT_GUIDE.md` Step 4

3. **Connect Everything**
   - Update `FRONTEND_URL` in backend
   - Test complete website

---

## 🆘 Need Help?

If you encounter issues:
1. Check Render logs (Logs tab in your service)
2. Verify all environment variables
3. Test each endpoint individually
4. Check `BACKEND_TROUBLESHOOTING.md` for common issues

Good luck! 🚀


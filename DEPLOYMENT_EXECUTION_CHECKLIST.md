# ✅ Deployment Execution Checklist

Follow this checklist step by step. I'll guide you through each action.

---

## 📋 Current Status

Based on the guide, you've already done:
- ✅ PostgreSQL Database created
- ✅ Backend API deployed

**Remaining steps:**
- [ ] Step 3: Create Database Tables
- [ ] Step 4: Deploy Frontend
- [ ] Step 5: Connect Backend and Frontend
- [ ] Step 6: Test Everything

---

## 🗄️ STEP 3: Create Database Tables

### What You Need:
- ✅ SQL schema file: `server/database/schema_postgresql.sql` (already exists)

### Actions to Take:

1. **Open Render Dashboard**
   - Go to: https://dashboard.render.com
   - Make sure you're logged in

2. **Find Your Database**
   - Look for PostgreSQL service: `budget-tracker-db`
   - **Click on it**

3. **Open Query Tab** (Easiest Method)
   - Click **"Query"** tab (next to Info, Logs, etc.)
   - A text editor will open

4. **Copy SQL Schema**
   - Open file: `server/database/schema_postgresql.sql` (in your project)
   - Select ALL content (Cmd+A / Ctrl+A)
   - Copy (Cmd+C / Ctrl+C)

5. **Paste and Run**
   - Go back to Render Query tab
   - Paste the SQL (Cmd+V / Ctrl+V)
   - Click **"Run"** button (or Cmd+Enter / Ctrl+Enter)

6. **Verify Success**
   - Should see "Query OK" messages
   - No errors

**✅ Mark Complete:** [ ] Database tables created

---

## 🎨 STEP 4: Deploy Frontend

### What You Need:
- ✅ GitHub repository: `budget-tracker` (already on GitHub)
- ✅ Backend URL: `https://your-backend.onrender.com` (get from Render)

### Actions to Take:

1. **Create Static Site**
   - In Render dashboard, click **"New +"** (top right)
   - Select **"Static Site"**

2. **Connect GitHub**
   - If not connected: Click "Connect account"
   - Select repository: **`budget-tracker`**
   - Click **"Connect"**

3. **Configure Settings:**
   - **Name**: `budget-tracker-frontend`
   - **Region**: Singapore (same as backend)
   - **Branch**: `main`
   - **Root Directory**: Leave EMPTY (or `.`)
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Plan**: Free

4. **Add Environment Variables:**
   - Click **"Add Environment Variable"**
   - **Variable 1:**
     - Key: `VITE_API_URL`
     - Value: `https://your-backend-name.onrender.com/api`
     - ⚠️ Replace `your-backend-name` with your actual backend service name
     - Example: If backend is `budget-tracker`, use: `https://budget-tracker.onrender.com/api`
   - **Variable 2:**
     - Key: `VITE_USE_MOCK`
     - Value: `false`

5. **Deploy**
   - Click **"Create Static Site"**
   - Wait 3-5 minutes for build
   - **Save the frontend URL** when it's ready!

**✅ Mark Complete:** [ ] Frontend deployed
**Frontend URL:** `https://____________________.onrender.com`

---

## 🔗 STEP 5: Connect Backend and Frontend

### What You Need:
- ✅ Frontend URL from Step 4

### Actions to Take:

1. **Go to Backend Service**
   - In Render dashboard, click on your backend service (`budget-tracker`)

2. **Open Environment Tab**
   - Click **"Environment"** tab

3. **Find FRONTEND_URL**
   - Scroll to find `FRONTEND_URL` variable
   - Or search for it

4. **Update FRONTEND_URL**
   - Click on the variable
   - Change value to your frontend URL from Step 4
   - Example: `https://budget-tracker-frontend.onrender.com`
   - ⚠️ Include `https://`, no trailing slash

5. **Save**
   - Variable will auto-save
   - Backend will auto-redeploy (wait 2-3 minutes)

**✅ Mark Complete:** [ ] Backend and frontend connected

---

## 🧪 STEP 6: Test Everything

### Test Backend:

1. **Health Check**
   - Open: `https://your-backend.onrender.com/health`
   - Should see: `{"status":"ok",...}`

2. **Root Endpoint**
   - Open: `https://your-backend.onrender.com/`
   - Should see API information

**✅ Mark Complete:** [ ] Backend working

### Test Frontend:

1. **Open Frontend**
   - Go to: `https://your-frontend.onrender.com`
   - Should see login page

2. **Check Console**
   - Press F12 (or Cmd+Option+I)
   - Open "Console" tab
   - Should see NO errors

3. **Test Registration**
   - Click "Register"
   - Fill in:
     - Name: Test User
     - Email: test@example.com
     - Password: password123
   - Click "Register"
   - Should redirect to dashboard

4. **Test Login**
   - Logout (if needed)
   - Login with same credentials
   - Should work

5. **Test Dashboard**
   - Should see dashboard with charts
   - May be empty initially (no data yet)

6. **Test Creating Data**
   - Create a category
   - Create a transaction
   - Should appear on dashboard

**✅ Mark Complete:** [ ] Frontend working
**✅ Mark Complete:** [ ] Can register/login
**✅ Mark Complete:** [ ] Can create data

---

## 🎉 STEP 7: You're Live!

### Your Live URLs:

- **Frontend**: `https://____________________.onrender.com`
- **Backend**: `https://____________________.onrender.com`

### Share Your Website:
Share the **frontend URL** with others!

---

## 🆘 Need Help?

If you get stuck on any step:
1. Check the detailed guide: `COMPLETE_DEPLOYMENT_GUIDE.md`
2. Check troubleshooting section in the guide
3. Check Render logs for errors
4. Verify all environment variables are set

---

## 📝 Quick Reference

### Frontend Environment Variables:
```
VITE_API_URL=https://your-backend.onrender.com/api
VITE_USE_MOCK=false
```

### Backend Environment Variables (should already be set):
```
DB_TYPE=postgresql
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=budget_tracker
DB_PORT=5432
FRONTEND_URL=https://your-frontend.onrender.com
```

---

**Start with Step 3 and work through each step!** 🚀


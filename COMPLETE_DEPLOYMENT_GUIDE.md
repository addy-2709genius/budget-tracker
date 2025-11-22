# 🚀 Complete Deployment Guide - Step by Step

You've already deployed:
- ✅ PostgreSQL Database
- ✅ Backend API

Now let's complete the deployment!

---

## 📋 Step 3: Create Database Tables (5 minutes)

### Why This Step?
Your database is empty. You need to create the tables (users, categories, transactions, goals) before your app can work.

### How to Do It:

#### Method 1: Using Render's psql (Easiest)

1. **Go to Render Dashboard**
   - Click on your PostgreSQL service (`budget-tracker-db`)

2. **Open psql Terminal**
   - Click **"Connect"** button (top right)
   - Select **"psql"** from dropdown
   - A terminal window will open

3. **Copy the Schema**
   - Open this file in your project: `server/database/schema_postgresql.sql`
   - Select **ALL** the content (Cmd+A / Ctrl+A)
   - Copy it (Cmd+C / Ctrl+C)

4. **Paste and Run**
   - Go back to the psql terminal in Render
   - Paste the entire schema (Cmd+V / Ctrl+V)
   - Press **Enter**
   - Wait a few seconds

5. **Verify Tables Created**
   - In the psql terminal, type:
     ```sql
     \dt
     ```
   - Press Enter
   - You should see:
     ```
     users
     categories
     transactions
     savings_goals
     ```

#### Method 2: Using Render's Query Tab

1. **Go to PostgreSQL Service**
   - Click on your database service

2. **Open Query Tab**
   - Click **"Query"** tab (next to Info, Logs, etc.)

3. **Paste Schema**
   - Open `server/database/schema_postgresql.sql` from your project
   - Copy the entire content
   - Paste into the Query editor

4. **Run Query**
   - Click **"Run"** button
   - Or press Cmd+Enter / Ctrl+Enter

5. **Check Results**
   - Should see "Query OK" messages
   - No errors should appear

### ✅ Verification Checklist:
- [ ] No errors in psql/Query tab
- [ ] Tables listed: users, categories, transactions, savings_goals
- [ ] Can see table structure with `\d users` command

---

## 🎨 Step 4: Deploy Frontend (10 minutes)

### Overview:
Your frontend is a React app that needs to be built and hosted as a static site.

### Detailed Steps:

#### 4.1: Create Static Site Service

1. **Go to Render Dashboard**
   - Click **"New +"** button (top right)
   - Select **"Static Site"** from dropdown

2. **Connect GitHub Repository**
   - If not connected, click **"Connect account"** or **"Configure GitHub"**
   - Authorize Render to access your repositories
   - Select your repository: **`budget-tracker`** (or your repo name)
   - Click **"Connect"**

#### 4.2: Configure Frontend Settings

**Basic Settings Tab:**

1. **Name**
   - Enter: `budget-tracker-frontend`
   - This is just for identification in Render

2. **Region**
   - Choose: Same region as your backend (for faster connection)
   - Or closest to you

3. **Branch**
   - Select: `main` (or `master` if that's your branch)

4. **Root Directory**
   - Leave **EMPTY** or enter: `.` (dot)
   - This means "use the root of the repository"

5. **Build Command**
   - Enter: `npm install && npm run build`
   - This installs dependencies and builds your React app

6. **Publish Directory**
   - Enter: `dist`
   - This is where Vite builds your app

7. **Plan**
   - Select: **Free**

#### 4.3: Add Environment Variables

1. **Scroll down to "Environment Variables"** section
2. **Click "Add Environment Variable"**
3. **Add First Variable:**
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-name.onrender.com/api`
   - ⚠️ **Replace `your-backend-name`** with your actual backend service name
   - Example: `https://budget-tracker-api.onrender.com/api`
   - ⚠️ **Important**: Include `/api` at the end!

4. **Add Second Variable:**
   - **Key**: `VITE_USE_MOCK`
   - **Value**: `false`
   - This disables mock data and uses real backend

5. **Click "Add"** after each variable

#### 4.4: Deploy Frontend

1. **Review Settings**
   - Double-check:
     - Build Command: `npm install && npm run build`
     - Publish Directory: `dist`
     - `VITE_API_URL` has correct backend URL with `/api`

2. **Click "Create Static Site"**
   - Render will start building your frontend
   - This takes 3-5 minutes

3. **Watch Build Logs**
   - You'll see build progress
   - Look for:
     - ✅ "npm install" completing
     - ✅ "npm run build" completing
     - ✅ "Build successful"

4. **Get Your Frontend URL**
   - Once deployed, Render gives you a URL
   - Example: `https://budget-tracker-frontend.onrender.com`
   - **Save this URL!** You'll need it in the next step

### ✅ Frontend Deployment Checklist:
- [ ] Static site created
- [ ] GitHub repository connected
- [ ] Build command: `npm install && npm run build`
- [ ] Publish directory: `dist`
- [ ] `VITE_API_URL` set correctly (with `/api`)
- [ ] `VITE_USE_MOCK` set to `false`
- [ ] Build completed successfully
- [ ] Frontend URL received

---

## 🔗 Step 5: Connect Backend and Frontend (3 minutes)

### Why This Step?
Your backend needs to know your frontend URL to allow CORS (Cross-Origin Resource Sharing). Without this, your frontend can't make API calls.

### Detailed Steps:

1. **Go to Backend Service**
   - In Render dashboard, click on your backend service (`budget-tracker-api`)

2. **Open Environment Tab**
   - Click **"Environment"** tab (in the service menu)

3. **Find FRONTEND_URL Variable**
   - Scroll to find `FRONTEND_URL`
   - Or search for it

4. **Update FRONTEND_URL**
   - Click on the `FRONTEND_URL` variable
   - Change the value to your frontend URL from Step 4
   - Example: `https://budget-tracker-frontend.onrender.com`
   - ⚠️ **Important**: 
     - Include `https://`
     - No trailing slash
     - Exact match to your frontend URL

5. **Save Changes**
   - Click **"Save Changes"** or the variable will auto-save
   - Render will automatically redeploy your backend
   - Wait 2-3 minutes for redeployment

### ✅ Connection Checklist:
- [ ] `FRONTEND_URL` updated in backend
- [ ] Value matches frontend URL exactly
- [ ] Backend redeployed automatically
- [ ] No errors in backend logs

---

## 🧪 Step 6: Test Your Complete Website (5 minutes)

### 6.1: Test Backend

1. **Test Root Endpoint**
   - Open in browser: `https://your-backend.onrender.com/`
   - Should see API information with all endpoints

2. **Test Health Check**
   - Open: `https://your-backend.onrender.com/health`
   - Should see: `{"status":"ok","message":"Budget Tracker API is running"}`

3. **Test Register Endpoint** (Optional)
   - Use browser console or Postman:
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

### 6.2: Test Frontend

1. **Open Frontend URL**
   - Go to: `https://your-frontend.onrender.com`
   - Should see your login page

2. **Check Browser Console**
   - Press F12 (or Cmd+Option+I on Mac)
   - Open "Console" tab
   - Look for errors
   - Should see no CORS errors

3. **Test Registration**
   - Click "Register" or "Sign Up"
   - Fill in:
     - Name: Test User
     - Email: test@example.com
     - Password: password123
   - Click "Register"
   - Should successfully register and redirect to dashboard

4. **Test Login**
   - If registration worked, try logging out
   - Then login with same credentials
   - Should work

5. **Test Dashboard**
   - After login, should see dashboard
   - Should show:
     - Total Balance
     - Monthly Income/Expense
     - Charts (may be empty initially)
     - Recent Transactions

6. **Test Creating Data**
   - Create a category
   - Create a transaction
   - Check if it appears on dashboard

### ✅ Complete Testing Checklist:
- [ ] Backend root endpoint works
- [ ] Backend health check works
- [ ] Frontend loads without errors
- [ ] No CORS errors in browser console
- [ ] Can register new user
- [ ] Can login
- [ ] Dashboard displays
- [ ] Can create category
- [ ] Can create transaction
- [ ] Data persists (refresh page, data still there)

---

## 🎉 Step 7: Your Website is Live!

### Your Live URLs:

- **Frontend (Your Website)**: `https://your-frontend.onrender.com`
- **Backend API**: `https://your-backend.onrender.com`
- **API Health**: `https://your-backend.onrender.com/health`

### Share Your Website:
Share the **frontend URL** with others:
```
https://your-frontend.onrender.com
```

---

## 🐛 Troubleshooting

### Frontend Shows "Cannot Connect to Backend"

**Check:**
1. `VITE_API_URL` in frontend environment variables
   - Should be: `https://your-backend.onrender.com/api`
   - Not: `https://your-backend.onrender.com`

2. Backend is running
   - Check backend logs in Render
   - Test `/health` endpoint

3. CORS is configured
   - `FRONTEND_URL` in backend matches frontend URL exactly

### Registration/Login Fails

**Check:**
1. Database tables are created
   - Go to PostgreSQL → psql → type `\dt`
   - Should see 4 tables

2. Backend can connect to database
   - Check backend logs for database errors
   - Verify database environment variables

3. Backend is running
   - Check backend service status in Render

### Frontend Build Fails

**Check:**
1. Build command is correct: `npm install && npm run build`
2. Publish directory is: `dist`
3. Check build logs for specific errors
4. Verify `package.json` has all dependencies

### Data Not Persisting

**Check:**
1. Database tables exist
2. Backend can write to database (check logs)
3. No errors in browser console
4. Backend environment variables are correct

---

## 📝 Quick Reference

### Environment Variables Summary:

**Backend:**
```
NODE_ENV=production
PORT=4000
DB_TYPE=postgresql
DB_HOST=from-postgres
DB_USER=from-postgres
DB_PASSWORD=from-postgres
DB_NAME=budget_tracker
DB_PORT=5432
JWT_SECRET=your-secret
FRONTEND_URL=https://your-frontend.onrender.com
```

**Frontend:**
```
VITE_API_URL=https://your-backend.onrender.com/api
VITE_USE_MOCK=false
```

### Important URLs:
- Backend Root: `https://your-backend.onrender.com/`
- Backend Health: `https://your-backend.onrender.com/health`
- Frontend: `https://your-frontend.onrender.com`

---

## ✅ Final Checklist

- [ ] PostgreSQL database created
- [ ] Database tables created (users, categories, transactions, savings_goals)
- [ ] Backend deployed and running
- [ ] Backend health check works
- [ ] Frontend deployed and running
- [ ] Frontend environment variables set correctly
- [ ] Backend `FRONTEND_URL` updated
- [ ] Can register new user
- [ ] Can login
- [ ] Dashboard displays correctly
- [ ] Can create categories
- [ ] Can create transactions
- [ ] Website is fully functional! 🎉

---

## 🎊 Congratulations!

Your Budget Tracker is now live on the internet! 

Share it with friends, family, or use it yourself to track your finances.

**Your website URL**: `https://your-frontend.onrender.com`

---

## 📚 Need More Help?

- Check `BACKEND_TROUBLESHOOTING.md` for backend issues
- Check Render logs for specific errors
- Verify all environment variables are set correctly
- Test each endpoint individually

Good luck! 🚀


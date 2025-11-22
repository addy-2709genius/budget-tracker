# 🔧 Fix Backend Not Reachable (ERR_FAILED)

## ❌ The Problem

`ERR_FAILED` means your frontend can't connect to the backend. This usually means:
- Backend is not running
- Backend URL is wrong
- Backend crashed or failed to start

---

## ✅ Step 1: Check Backend Status

### 1.1: Go to Backend Service

1. **Open Render Dashboard**
   - Go to: https://dashboard.render.com
   - Make sure you're logged in

2. **Find Your Backend Service**
   - Look for: `budget-tracker` (or your backend name)
   - Type: **Web Service** or **Node**
   - **Click on it**

### 1.2: Check Service Status

1. **Look at the top of the page**
   - You should see status: **"Live"**, **"Deployed"**, or **"Building"**
   
2. **If status is:**
   - ✅ **"Live"** or **"Deployed"** = Backend should be running
   - ⚠️ **"Building"** = Wait for it to finish
   - ❌ **"Failed"** or **"Error"** = Backend failed to start

---

## ✅ Step 2: Check Backend Logs

### 2.1: Open Logs Tab

1. **Click "Logs" tab** (in the service menu)
2. **Look at the latest logs**

### 2.2: What to Look For

**Good signs:**
- ✅ "Server running on port 4000"
- ✅ "API available at http://localhost:4000/api"
- ✅ "Connected to database"
- ✅ No error messages

**Bad signs:**
- ❌ "Error: Cannot connect to database"
- ❌ "Error: Module not found"
- ❌ "Port already in use"
- ❌ "Build failed"
- ❌ Any red error messages

---

## ✅ Step 3: Test Backend Directly

### 3.1: Test Health Endpoint

1. **Get your backend URL**
   - It's shown at the top of the backend service page
   - Format: `https://budget-tracker.onrender.com`

2. **Open in browser:**
   ```
   https://budget-tracker.onrender.com/health
   ```

3. **What you should see:**
   - ✅ `{"status":"ok","message":"Budget Tracker API is running"}` = Backend is working!
   - ❌ Page doesn't load / Error = Backend is not running

### 3.2: Test Root Endpoint

1. **Open in browser:**
   ```
   https://budget-tracker.onrender.com/
   ```

2. **What you should see:**
   - ✅ API information with endpoints = Backend is working!
   - ❌ Error / Page doesn't load = Backend is not running

---

## 🔧 Step 4: Fix Common Issues

### Issue 1: Backend Not Running

**If backend status is "Failed" or "Error":**

1. **Check Logs** for specific error
2. **Common errors:**

   **a) Database Connection Failed:**
   - Check database environment variables (DB_HOST, DB_USER, DB_PASSWORD, etc.)
   - Verify database is running
   - Check database credentials

   **b) Module Not Found:**
   - Check Root Directory is set to `server`
   - Verify `package.json` exists in `server/` folder
   - Check build logs

   **c) Port Already in Use:**
   - Check PORT environment variable is `4000`
   - Or change to different port

3. **Try Manual Redeploy:**
   - Go to "Manual Deploy" tab
   - Click "Deploy latest commit"
   - Wait for deployment

### Issue 2: Backend URL Wrong

**Check frontend environment variable:**

1. **Go to Frontend Service** (`budget-tracker-frontend-7rr8`)
2. **Click "Environment" tab**
3. **Check `VITE_API_URL`:**
   - Should be: `https://budget-tracker.onrender.com/api`
   - ⚠️ **Important:** Include `/api` at the end!
   - Not: `https://budget-tracker.onrender.com` (missing `/api`)

4. **If wrong, update it:**
   - Click on `VITE_API_URL`
   - Change to: `https://budget-tracker.onrender.com/api`
   - Save
   - Frontend will redeploy

### Issue 3: Backend Spun Down (Free Tier)

**Render free tier spins down after 15 minutes of inactivity:**

1. **First request takes 30-60 seconds** to wake up
2. **Wait a bit longer** and try again
3. **Or use UptimeRobot** (free) to ping backend every 5 minutes

---

## 🧪 Step 5: Verify Everything

### Checklist:

- [ ] Backend status is "Live" or "Deployed"
- [ ] Backend logs show "Server running"
- [ ] Health endpoint works: `https://budget-tracker.onrender.com/health`
- [ ] Root endpoint works: `https://budget-tracker.onrender.com/`
- [ ] Frontend `VITE_API_URL` is: `https://budget-tracker.onrender.com/api`
- [ ] No errors in backend logs
- [ ] Database connection successful

---

## 🐛 Still Not Working?

### Check 1: Backend URL

**Your backend URL should be:**
```
https://budget-tracker.onrender.com
```

**Test it:**
- Health: `https://budget-tracker.onrender.com/health`
- Root: `https://budget-tracker.onrender.com/`

**If these don't work, backend is not running!**

### Check 2: Frontend API URL

**In frontend environment variables:**
```
VITE_API_URL=https://budget-tracker.onrender.com/api
```

**Not:**
- ❌ `https://budget-tracker.onrender.com` (missing `/api`)
- ❌ `http://budget-tracker.onrender.com/api` (http instead of https)

### Check 3: Backend Logs

1. Go to backend → Logs tab
2. Look for errors
3. Share the error message if you see one

---

## 🚀 Quick Fix Steps

1. **Check backend status** in Render
2. **Check backend logs** for errors
3. **Test backend directly:** `https://budget-tracker.onrender.com/health`
4. **If backend not working:** Fix errors in logs
5. **If backend working:** Check frontend `VITE_API_URL`
6. **Update if needed** and redeploy

---

## 📝 Common Solutions

### Solution 1: Backend Crashed

**Fix:**
1. Check logs for error
2. Fix the error (database connection, missing env vars, etc.)
3. Redeploy backend

### Solution 2: Wrong API URL

**Fix:**
1. Update `VITE_API_URL` in frontend to: `https://budget-tracker.onrender.com/api`
2. Redeploy frontend

### Solution 3: Backend Spun Down

**Fix:**
1. Wait 30-60 seconds
2. Try again
3. Or use service to keep it awake

---

**Start by checking if `https://budget-tracker.onrender.com/health` works in your browser!** 🚀


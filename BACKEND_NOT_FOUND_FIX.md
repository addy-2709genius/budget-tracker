# 🔧 Fix Backend "Not Found" Error

## ❌ The Problem

Your backend is returning "Not Found" for all endpoints. This means:
- Backend is deployed but routes aren't working
- Backend might not be starting correctly
- Root directory might be wrong

---

## ✅ Step 1: Check Backend Configuration in Render

### 1.1: Verify Root Directory

1. **Go to Backend Service** in Render
2. **Click "Settings" tab**
3. **Check "Root Directory":**
   - Should be: `server`
   - **NOT:** `.` or empty
   - **NOT:** `budget-tracker/server`

4. **If wrong:**
   - Update to: `server`
   - Save
   - Backend will redeploy

### 1.2: Verify Build and Start Commands

1. **In Settings tab, check:**
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

2. **If wrong, update:**
   - Build Command: `npm install`
   - Start Command: `npm start`

---

## ✅ Step 2: Check Backend Logs

### 2.1: Open Logs Tab

1. **Go to backend service** → **"Logs" tab**
2. **Look at the latest deployment logs**

### 2.2: What to Look For

**Good signs:**
- ✅ "Installing dependencies..."
- ✅ "npm install" completed
- ✅ "Server running on port 4000"
- ✅ "API available at http://localhost:4000/api"

**Bad signs:**
- ❌ "Error: Cannot find module"
- ❌ "Error: ENOENT: no such file or directory"
- ❌ "Root directory not found"
- ❌ No "Server running" message

---

## ✅ Step 3: Common Issues and Fixes

### Issue 1: Wrong Root Directory

**Symptoms:**
- "Not Found" for all endpoints
- Logs show "Cannot find module" errors

**Fix:**
1. Go to backend → Settings
2. Set Root Directory to: `server`
3. Save and redeploy

### Issue 2: Missing package.json

**Symptoms:**
- Build fails
- "Cannot find package.json"

**Fix:**
1. Verify `server/package.json` exists in your GitHub repo
2. Verify Root Directory is `server`
3. Redeploy

### Issue 3: Server Not Starting

**Symptoms:**
- No "Server running" in logs
- Backend shows as deployed but doesn't respond

**Fix:**
1. Check logs for startup errors
2. Verify all environment variables are set
3. Check database connection
4. Try manual redeploy

### Issue 4: Port Configuration

**Symptoms:**
- Server starts but doesn't respond

**Fix:**
1. Check PORT environment variable is `4000`
2. Verify in server.js: `const PORT = process.env.PORT || 4000`

---

## 🔧 Step 4: Manual Redeploy

### 4.1: Force Redeploy

1. **Go to backend service**
2. **Click "Manual Deploy" tab**
3. **Click "Deploy latest commit"**
4. **Wait 5-7 minutes**
5. **Check logs** for success

### 4.2: Verify Deployment

1. **After redeploy, check logs:**
   - Should see "Server running on port 4000"
   - No errors

2. **Test backend:**
   - `https://budget-tracker.onrender.com/health`
   - Should return JSON, not "Not Found"

---

## 📝 Quick Fix Checklist

- [ ] Root Directory is `server` (not `.` or empty)
- [ ] Build Command is `npm install`
- [ ] Start Command is `npm start`
- [ ] Backend logs show "Server running"
- [ ] No errors in logs
- [ ] Health endpoint works: `/health`
- [ ] Root endpoint works: `/`

---

## 🧪 Step 5: Test After Fix

### Test 1: Health Endpoint

```bash
curl https://budget-tracker.onrender.com/health
```

**Should return:**
```json
{"status":"ok","message":"Budget Tracker API is running"}
```

### Test 2: Root Endpoint

```bash
curl https://budget-tracker.onrender.com/
```

**Should return:**
```json
{
  "status": "ok",
  "message": "Budget Tracker API is running",
  "version": "1.0.0",
  ...
}
```

### Test 3: API Endpoint

```bash
curl https://budget-tracker.onrender.com/api/auth/login
```

**Should return:**
- Not "Not Found"
- Either error about missing body (expected) or method not allowed

---

## 🎯 Most Likely Issue

**Root Directory is probably wrong!**

**Check:**
1. Backend Settings → Root Directory
2. Should be: `server`
3. If not, change it and redeploy

---

## 🆘 Still Not Working?

**Share:**
1. What Root Directory is set to
2. What Build Command is set to
3. What Start Command is set to
4. Latest logs from backend
5. Any error messages

---

**Start by checking Root Directory in backend Settings!** 🚀


# 🔧 Fix CORS Error - Step by Step

## ❌ The Problem

Your frontend (`https://budget-tracker-frontend-7rr8.onrender.com`) is being blocked by CORS because the backend doesn't allow requests from that origin.

---

## ✅ Solution: Update FRONTEND_URL in Backend

### Step 1: Go to Backend Service

1. **Open Render Dashboard**
   - Go to: https://dashboard.render.com
   - Make sure you're logged in

2. **Find Your Backend Service**
   - Look for: `budget-tracker` (or your backend name)
   - Type: **Web Service** or **Node**
   - **Click on it**

### Step 2: Open Environment Tab

1. **Click "Environment" tab**
   - Usually 3rd or 4th tab in the service menu
   - **Click it**

2. **You'll see a list of environment variables**

### Step 3: Find and Update FRONTEND_URL

1. **Look for `FRONTEND_URL` variable**
   - Scroll through the list
   - Or use search/filter if available

2. **Click on `FRONTEND_URL`** (or click edit icon)

3. **Update the value to:**
   ```
   https://budget-tracker-frontend-7rr8.onrender.com
   ```
   - ⚠️ **Important:**
     - Include `https://`
     - No trailing slash
     - Exact match to your frontend URL

4. **If FRONTEND_URL doesn't exist:**
   - Click **"Add Environment Variable"**
   - Key: `FRONTEND_URL`
   - Value: `https://budget-tracker-frontend-7rr8.onrender.com`
   - Click **"Add"**

5. **Save** (or it auto-saves)

### Step 4: Wait for Redeployment

1. **Backend will automatically redeploy**
   - You'll see a notification
   - Or check "Logs" tab for deployment progress

2. **Wait 2-3 minutes** for redeployment to complete

3. **Check deployment status:**
   - Go to "Logs" tab
   - Should see: "Server running on port 4000"
   - No errors

### Step 5: Test Again

1. **Go to your frontend:** `https://budget-tracker-frontend-7rr8.onrender.com`
2. **Try to login or register**
3. **CORS error should be gone!** ✅

---

## 🔍 Verify CORS Configuration

Your backend code should have CORS configured like this (in `server/server.js`):

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
```

This means:
- If `FRONTEND_URL` is set correctly, CORS will allow that origin
- If not set, it defaults to `localhost:5173` (which won't work in production)

---

## 📝 Quick Checklist

- [ ] Went to backend service in Render
- [ ] Opened Environment tab
- [ ] Found `FRONTEND_URL` variable
- [ ] Updated value to: `https://budget-tracker-frontend-7rr8.onrender.com`
- [ ] Saved (no trailing slash, includes https://)
- [ ] Backend redeployed (waited 2-3 minutes)
- [ ] Tested frontend again
- [ ] CORS error fixed! ✅

---

## 🐛 Still Getting CORS Error?

### Check 1: Verify FRONTEND_URL Value

1. Go to backend → Environment tab
2. Check `FRONTEND_URL` value
3. Should be exactly: `https://budget-tracker-frontend-7rr8.onrender.com`
4. **Not:**
   - ❌ `https://budget-tracker-frontend-7rr8.onrender.com/` (trailing slash)
   - ❌ `http://budget-tracker-frontend-7rr8.onrender.com` (http instead of https)
   - ❌ `budget-tracker-frontend-7rr8.onrender.com` (missing https://)

### Check 2: Backend Redeployed

1. Check backend logs
2. Should see recent deployment
3. Server should be running

### Check 3: Clear Browser Cache

1. Press **Cmd+Shift+R** (Mac) or **Ctrl+Shift+R** (Windows)
2. Or open in incognito/private window
3. Try again

### Check 4: Verify Backend is Running

1. Test backend health: `https://budget-tracker.onrender.com/health`
2. Should return: `{"status":"ok",...}`
3. If not working, backend might not be running

---

## 🎯 Your Frontend URL

Based on the error, your frontend URL is:
```
https://budget-tracker-frontend-7rr8.onrender.com
```

**So `FRONTEND_URL` in backend should be exactly:**
```
https://budget-tracker-frontend-7rr8.onrender.com
```

---

## ✅ After Fixing

Once you update `FRONTEND_URL` and backend redeploys:
1. CORS error will be gone
2. Frontend can make API calls
3. Login/registration will work
4. Everything should work! 🎉

---

**Go update `FRONTEND_URL` in your backend environment variables now!** 🚀


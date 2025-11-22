# 🔧 Update Frontend to Use Correct Backend URL

## ✅ Good News!

Your backend is working! I can see it's responding at:
```
https://budget-tracker-0ufx.onrender.com
```

Now we need to update your frontend to use this correct backend URL.

---

## 🎯 Step 1: Update Frontend Environment Variable

### 1.1: Go to Frontend Service

1. **Open Render Dashboard**
   - Go to: https://dashboard.render.com
   - Make sure you're logged in

2. **Find Your Frontend Service**
   - Look for: `budget-tracker-frontend-7rr8` (or your frontend name)
   - Type: **Static Site**
   - **Click on it**

### 1.2: Open Environment Tab

1. **Click "Environment" tab**
   - Usually in the service menu
   - **Click it**

2. **You'll see environment variables**

### 1.3: Update VITE_API_URL

1. **Find `VITE_API_URL` variable**
   - Scroll through the list
   - Or search for it

2. **Click on `VITE_API_URL`** (or click edit icon)

3. **Update the value to:**
   ```
   https://budget-tracker-0ufx.onrender.com/api
   ```
   - ⚠️ **Important:**
     - Include `https://`
     - Include `/api` at the end
     - Exact match to your backend URL + `/api`

4. **If `VITE_API_URL` doesn't exist:**
   - Click **"Add Environment Variable"**
   - Key: `VITE_API_URL`
   - Value: `https://budget-tracker-0ufx.onrender.com/api`
   - Click **"Add"**

5. **Save** (or it auto-saves)

### 1.4: Wait for Redeployment

1. **Frontend will automatically redeploy**
   - You'll see a notification
   - Or check "Logs" tab for deployment progress

2. **Wait 3-5 minutes** for redeployment to complete

3. **Check deployment status:**
   - Go to "Logs" tab
   - Should see: "Build successful"
   - No errors

---

## 🎯 Step 2: Update Backend FRONTEND_URL (For CORS)

### 2.1: Go to Backend Service

1. **Go to Render Dashboard**
2. **Find Your Backend Service**
   - Look for: `budget-tracker-0ufx` (or your backend name)
   - **Click on it**

### 2.2: Open Environment Tab

1. **Click "Environment" tab**
2. **Find `FRONTEND_URL` variable**

### 2.3: Update FRONTEND_URL

1. **Click on `FRONTEND_URL`** (or click edit icon)

2. **Update the value to:**
   ```
   https://budget-tracker-frontend-7rr8.onrender.com
   ```
   - ⚠️ **Important:**
     - Include `https://`
     - No trailing slash
     - Exact match to your frontend URL

3. **If `FRONTEND_URL` doesn't exist:**
   - Click **"Add Environment Variable"**
   - Key: `FRONTEND_URL`
   - Value: `https://budget-tracker-frontend-7rr8.onrender.com`
   - Click **"Add"**

4. **Save** (or it auto-saves)

### 2.4: Wait for Redeployment

1. **Backend will automatically redeploy**
2. **Wait 2-3 minutes** for redeployment
3. **Check logs** for "Server running"

---

## ✅ Step 3: Verify Everything

### 3.1: Test Backend

1. **Open in browser:**
   ```
   https://budget-tracker-0ufx.onrender.com/
   ```
   - Should see API information ✅

2. **Test health:**
   ```
   https://budget-tracker-0ufx.onrender.com/health
   ```
   - Should return: `{"status":"ok",...}` ✅

### 3.2: Test Frontend

1. **Go to your frontend:**
   ```
   https://budget-tracker-frontend-7rr8.onrender.com
   ```

2. **Open browser console** (F12)
   - Should see NO CORS errors
   - Should see NO "ERR_FAILED" errors

3. **Try to register/login**
   - Should work now! ✅

---

## 📝 Quick Reference

### Your URLs:

- **Backend**: `https://budget-tracker-0ufx.onrender.com`
- **Frontend**: `https://budget-tracker-frontend-7rr8.onrender.com`

### Environment Variables:

**Frontend (`VITE_API_URL`):**
```
https://budget-tracker-0ufx.onrender.com/api
```

**Backend (`FRONTEND_URL`):**
```
https://budget-tracker-frontend-7rr8.onrender.com
```

---

## ✅ Checklist

- [ ] Updated `VITE_API_URL` in frontend to: `https://budget-tracker-0ufx.onrender.com/api`
- [ ] Updated `FRONTEND_URL` in backend to: `https://budget-tracker-frontend-7rr8.onrender.com`
- [ ] Frontend redeployed (waited 3-5 minutes)
- [ ] Backend redeployed (waited 2-3 minutes)
- [ ] Tested frontend - no errors
- [ ] Can register/login
- [ ] Everything works! 🎉

---

## 🎉 You're Almost Done!

After updating both environment variables and waiting for redeployment:
1. Your frontend will connect to the correct backend
2. CORS will be fixed
3. Login/registration will work
4. Your app will be fully functional!

**Update both environment variables now and wait for redeployment!** 🚀


# 🔧 Fix 500 Error During Signup - Render Backend

## ✅ Good News!

Your database connection works locally, so the issue is likely with **backend environment variables in Render**.

---

## 🎯 Step 1: Check Backend Logs (Most Important!)

### 1.1: Get the Exact Error

1. **Go to Render Dashboard**
2. **Click Backend Service** (`budget-tracker-0ufx`)
3. **Click "Logs" tab**
4. **Scroll to the bottom** (latest logs)
5. **Try to register** from frontend
6. **Watch the logs** - you'll see the exact error!

**Common errors you might see:**

**a) "JWT_SECRET is not defined":**
```
Error: JWT_SECRET is not defined
```
→ **Fix:** Add `JWT_SECRET` environment variable

**b) "Cannot connect to database":**
```
Error: connect ECONNREFUSED
Error: password authentication failed
```
→ **Fix:** Check database environment variables

**c) "relation 'users' does not exist":**
```
Error: relation "users" does not exist
```
→ **Fix:** Tables not created (but we verified they exist, so unlikely)

**d) Other errors:**
- Copy the exact error message
- This tells us exactly what's wrong

---

## 🔧 Step 2: Verify Environment Variables

### 2.1: Go to Backend Environment

1. **Backend Service** → **"Environment" tab**
2. **Check all these variables exist:**

### Required Variables:

```
✅ NODE_ENV=production
✅ PORT=4000
✅ DB_TYPE=postgresql
✅ DB_HOST=dpg-d4gpr2ili9vc73dpajfg-a.singapore-postgres.render.com
✅ DB_USER=budget_user
✅ DB_PASSWORD=nvm99rsf23LKDNqwL32iNYHybyZHBKc5
✅ DB_NAME=budget_tracker_8go5
✅ DB_PORT=5432
✅ JWT_SECRET=your-secret-key-here
✅ FRONTEND_URL=https://budget-tracker-frontend-7rr8.onrender.com
```

### 2.2: Get Correct Database Values

**From your PostgreSQL service:**

1. **Go to PostgreSQL service** → **"Info" tab**
2. **Copy these values:**
   - **Host**: Should include `.singapore-postgres.render.com`
   - **User**: `budget_user` (or from Info tab)
   - **Password**: Click "Show" to reveal
   - **Database**: `budget_tracker_8go5` (or from Info tab)

3. **Update in backend environment variables**

### 2.3: Add Missing JWT_SECRET (If Not Set)

1. **In backend Environment tab**
2. **Click "Add Environment Variable"**
3. **Key:** `JWT_SECRET`
4. **Value:** Click refresh icon (🔄) to auto-generate
   - Or generate manually (see below)
5. **Click "Add"**

**Generate JWT_SECRET manually:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🔍 Step 3: Most Likely Issues

### Issue 1: Missing JWT_SECRET (Very Common!)

**Symptoms:**
- 500 error during signup
- Logs show "JWT_SECRET is not defined"

**Fix:**
1. Add `JWT_SECRET` environment variable
2. Generate a random 32+ character string
3. Save and redeploy

### Issue 2: Wrong Database Host

**Symptoms:**
- Database connection fails
- "ENOTFOUND" or "ECONNREFUSED" errors

**Fix:**
1. Get correct host from PostgreSQL → Info tab
2. Should include full domain: `dpg-xxxxx-a.singapore-postgres.render.com`
3. Update `DB_HOST` in backend
4. Save and redeploy

### Issue 3: Wrong Database Name

**Symptoms:**
- "database does not exist" errors

**Fix:**
1. Check actual database name from connection string
2. Should be: `budget_tracker_8go5`
3. Update `DB_NAME` in backend
4. Save and redeploy

### Issue 4: Wrong Database Password

**Symptoms:**
- "password authentication failed"

**Fix:**
1. Get correct password from PostgreSQL → Info tab
2. Click "Show" to reveal password
3. Copy exactly (no extra spaces)
4. Update `DB_PASSWORD` in backend
5. Save and redeploy

---

## 📝 Step 4: Environment Variables Checklist

**Verify all these in Backend → Environment tab:**

- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `4000`
- [ ] `DB_TYPE` = `postgresql`
- [ ] `DB_HOST` = `dpg-d4gpr2ili9vc73dpajfg-a.singapore-postgres.render.com` (with full domain)
- [ ] `DB_USER` = `budget_user` (or correct from Info tab)
- [ ] `DB_PASSWORD` = (correct password from Info tab)
- [ ] `DB_NAME` = `budget_tracker_8go5` (or correct from Info tab)
- [ ] `DB_PORT` = `5432`
- [ ] `JWT_SECRET` = (32+ character random string) ⚠️ **MUST BE SET!**
- [ ] `FRONTEND_URL` = `https://budget-tracker-frontend-7rr8.onrender.com`

---

## 🧪 Step 5: Test After Fix

### 5.1: Wait for Redeployment

1. **After updating environment variables**
2. **Backend will auto-redeploy**
3. **Wait 2-3 minutes**
4. **Check logs** for "Server running"

### 5.2: Test Registration

1. **Go to frontend:** `https://budget-tracker-frontend-7rr8.onrender.com`
2. **Try to register** a new user
3. **Check backend logs** in real-time
4. **Should work now!** ✅

---

## 🐛 Still Getting 500 Error?

### Check Backend Logs:

1. **Go to backend → Logs tab**
2. **Try to register** from frontend
3. **Copy the exact error message** from logs
4. **Share it with me** - I can help fix it!

### Common Error Messages:

**"JWT_SECRET is not defined":**
→ Add `JWT_SECRET` environment variable

**"password authentication failed":**
→ Check `DB_PASSWORD` is correct

**"database does not exist":**
→ Check `DB_NAME` is correct

**"connect ECONNREFUSED":**
→ Check `DB_HOST` includes full domain

---

## ✅ Quick Fix Steps

1. **Check backend logs** for exact error
2. **Verify all environment variables** are set (especially `JWT_SECRET`)
3. **Get correct database values** from PostgreSQL → Info tab
4. **Update environment variables** in backend
5. **Wait for redeployment** (2-3 minutes)
6. **Test registration again**

---

## 🎯 Most Likely Fix

**Missing `JWT_SECRET`!**

1. Go to backend → Environment tab
2. Add `JWT_SECRET` variable
3. Click refresh icon to auto-generate
4. Save and redeploy
5. Test again

---

**Check your backend logs first - that will tell us exactly what's wrong!** 🚀


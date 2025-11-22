# ✅ Your Exact Configuration - Final Setup

## 📋 Your Services

- **Backend**: `budget-tracker-0ufx` → `https://budget-tracker-0ufx.onrender.com`
- **Frontend**: `budget-tracker-frontend-7rr8` → `https://budget-tracker-frontend-7rr8.onrender.com`
- **Database**: `budget-tracker-db` → Service ID: `dpg-d4gpr2ili9vc73dpajfg-a`

---

## 🔧 Backend Environment Variables

**Go to:** Backend Service (`budget-tracker-0ufx`) → Environment Tab

**Set these EXACT values:**

```
NODE_ENV=production
PORT=4000
DB_TYPE=postgresql
DB_HOST=dpg-d4gpr2ili9vc73dpajfg-a.singapore-postgres.render.com
DB_USER=budget_user
DB_PASSWORD=nvm99rsf23LKDNqwL32iNYHybyZHBKc5
DB_NAME=budget_tracker_8go5
DB_PORT=5432
JWT_SECRET=GENERATE_RANDOM_32_CHAR_STRING
FRONTEND_URL=https://budget-tracker-frontend-7rr8.onrender.com
```

### ⚠️ Important Notes:

1. **`DB_HOST`**: Try with domain first. If doesn't work, try: `dpg-d4gpr2ili9vc73dpajfg-a` (without domain)

2. **`JWT_SECRET`**: 
   - Click refresh icon (🔄) in Render to auto-generate
   - OR generate: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
   - Must be 32+ characters

3. **`DB_PASSWORD`**: Exact match, no spaces: `nvm99rsf23LKDNqwL32iNYHybyZHBKc5`

---

## 🎨 Frontend Environment Variables

**Go to:** Frontend Service (`budget-tracker-frontend-7rr8`) → Environment Tab

**Set these EXACT values:**

```
VITE_API_URL=https://budget-tracker-0ufx.onrender.com/api
VITE_USE_MOCK=false
```

### ⚠️ Important:

- Include `/api` at the end of `VITE_API_URL`
- Not: `https://budget-tracker-0ufx.onrender.com` (missing `/api`)

---

## 📝 Step-by-Step: Fix 500 Error

### Step 1: Add JWT_SECRET (CRITICAL!)

1. **Backend Service** → **Environment tab**
2. **Find `JWT_SECRET`**
3. **If missing:**
   - Click "Add Environment Variable"
   - Key: `JWT_SECRET`
   - Value: Click refresh icon (🔄) to auto-generate
   - Click "Add"
4. **If exists but empty:**
   - Click on it
   - Click refresh icon
   - Save

### Step 2: Update All Database Variables

**Update these in Backend → Environment tab:**

1. **`DB_HOST`**
   - Try: `dpg-d4gpr2ili9vc73dpajfg-a.singapore-postgres.render.com`
   - If doesn't work: `dpg-d4gpr2ili9vc73dpajfg-a`

2. **`DB_USER`** = `budget_user`

3. **`DB_PASSWORD`** = `nvm99rsf23LKDNqwL32iNYHybyZHBKc5` (exact, no spaces)

4. **`DB_NAME`** = `budget_tracker_8go5`

5. **`DB_PORT`** = `5432`

6. **`DB_TYPE`** = `postgresql`

### Step 3: Update FRONTEND_URL

**In Backend → Environment tab:**

1. **Find `FRONTEND_URL`**
2. **Update to:** `https://budget-tracker-frontend-7rr8.onrender.com`
3. **No trailing slash!**

### Step 4: Update Frontend VITE_API_URL

**In Frontend → Environment tab:**

1. **Find `VITE_API_URL`**
2. **Update to:** `https://budget-tracker-0ufx.onrender.com/api`
3. **Include `/api` at the end!**

### Step 5: Save and Wait

1. **All variables updated**
2. **Both services will auto-redeploy**
3. **Wait 3-5 minutes**
4. **Check logs** for "Server running"

---

## ✅ Verification Checklist

### Backend:
- [ ] `JWT_SECRET` is set (32+ characters)
- [ ] `DB_HOST` is set (try with domain first)
- [ ] `DB_USER` = `budget_user`
- [ ] `DB_PASSWORD` = `nvm99rsf23LKDNqwL32iNYHybyZHBKc5`
- [ ] `DB_NAME` = `budget_tracker_8go5`
- [ ] `DB_PORT` = `5432`
- [ ] `DB_TYPE` = `postgresql`
- [ ] `FRONTEND_URL` = `https://budget-tracker-frontend-7rr8.onrender.com`
- [ ] Backend logs show "Server running"
- [ ] Health check works: `https://budget-tracker-0ufx.onrender.com/health`

### Frontend:
- [ ] `VITE_API_URL` = `https://budget-tracker-0ufx.onrender.com/api`
- [ ] `VITE_USE_MOCK` = `false`
- [ ] Frontend loads: `https://budget-tracker-frontend-7rr8.onrender.com`
- [ ] No CORS errors in browser console
- [ ] Can register/login

---

## 🧪 Test Your Setup

### Test 1: Backend Health
```
https://budget-tracker-0ufx.onrender.com/health
```
Should return: `{"status":"ok",...}`

### Test 2: Backend Root
```
https://budget-tracker-0ufx.onrender.com/
```
Should return API information

### Test 3: Frontend
```
https://budget-tracker-frontend-7rr8.onrender.com
```
Should show login page

### Test 4: Registration
1. Go to frontend
2. Try to register
3. Should work! ✅

---

## 🎯 Most Common Issue: Missing JWT_SECRET

**If you're still getting 500 error:**

1. **Check backend logs** for exact error
2. **Most likely:** "JWT_SECRET is not defined"
3. **Fix:** Add `JWT_SECRET` environment variable (Step 1 above)

---

## 📋 Quick Reference

### Your URLs:
- **Backend**: `https://budget-tracker-0ufx.onrender.com`
- **Frontend**: `https://budget-tracker-frontend-7rr8.onrender.com`
- **Backend API**: `https://budget-tracker-0ufx.onrender.com/api`

### Database Connection:
- **Host**: `dpg-d4gpr2ili9vc73dpajfg-a.singapore-postgres.render.com` (or without domain)
- **User**: `budget_user`
- **Password**: `nvm99rsf23LKDNqwL32iNYHybyZHBKc5`
- **Database**: `budget_tracker_8go5`
- **Port**: `5432`

---

## 🚀 Final Steps

1. **Add `JWT_SECRET`** in backend (if missing)
2. **Update all DB_* variables** with exact values above
3. **Update `FRONTEND_URL`** in backend
4. **Update `VITE_API_URL`** in frontend
5. **Wait for redeployment** (3-5 minutes)
6. **Test registration** - should work! ✅

---

**Update all environment variables with the exact values above and your app will work!** 🎉


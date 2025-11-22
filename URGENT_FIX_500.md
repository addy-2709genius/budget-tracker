# 🚨 URGENT FIX: 500 Error During Registration

## 🎯 The Problem

Your backend is returning 500 error. The **most likely cause** is **missing `JWT_SECRET`** environment variable.

---

## ✅ IMMEDIATE FIX (Do This First!)

### Step 1: Add JWT_SECRET (CRITICAL!)

1. **Go to Render Dashboard**
2. **Click Backend Service** (`budget-tracker-0ufx`)
3. **Click "Environment" tab**
4. **Look for `JWT_SECRET` variable**

**If it doesn't exist:**
1. Click **"Add Environment Variable"**
2. **Key:** `JWT_SECRET`
3. **Value:** Click the **🔄 refresh icon** (Render will auto-generate)
   - OR generate manually (see below)
4. Click **"Add"**

**If it exists but is empty/wrong:**
1. Click on `JWT_SECRET`
2. Click **🔄 refresh icon** to regenerate
3. Save

**Generate manually (if needed):**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 2: Verify All Database Variables

**While in Environment tab, verify these are set correctly:**

```
DB_TYPE=postgresql
DB_HOST=dpg-d4gpr2ili9vc73dpajfg-a.singapore-postgres.render.com
DB_USER=budget_user
DB_PASSWORD=nvm99rsf23LKDNqwL32iNYHybyZHBKc5
DB_NAME=budget_tracker_8go5
DB_PORT=5432
```

**⚠️ Important:**
- `DB_HOST` - Try with domain first, if doesn't work try without: `dpg-d4gpr2ili9vc73dpajfg-a`
- `DB_PASSWORD` - Exact match, no spaces: `nvm99rsf23LKDNqwL32iNYHybyZHBKc5`

### Step 3: Save and Wait

1. **All variables updated**
2. **Backend auto-redeploys**
3. **Wait 3-5 minutes** for complete redeployment
4. **Check "Logs" tab** - should see "Server running"

---

## 🔍 Step 4: Check Backend Logs

### After Redeployment:

1. **Go to backend → Logs tab**
2. **Scroll to bottom** (latest logs)
3. **Try to register** from frontend
4. **Watch the logs** - you'll see the exact error

**Common errors you might see:**

**a) "JWT_SECRET is not defined":**
```
ReferenceError: JWT_SECRET is not defined
```
→ **Fix:** Add `JWT_SECRET` (Step 1 above)

**b) "Cannot connect to database":**
```
Error: connect ECONNREFUSED
Error: password authentication failed
```
→ **Fix:** Check DB_* variables (Step 2 above)

**c) Other errors:**
→ Copy the exact error and we'll fix it

---

## 📝 Complete Environment Variables

**Copy these EXACTLY into your backend:**

```
NODE_ENV=production
PORT=4000
DB_TYPE=postgresql
DB_HOST=dpg-d4gpr2ili9vc73dpajfg-a.singapore-postgres.render.com
DB_USER=budget_user
DB_PASSWORD=nvm99rsf23LKDNqwL32iNYHybyZHBKc5
DB_NAME=budget_tracker_8go5
DB_PORT=5432
JWT_SECRET=GENERATE_THIS_NOW
FRONTEND_URL=https://budget-tracker-frontend-7rr8.onrender.com
```

**Replace `GENERATE_THIS_NOW` with a random 32+ character string!**

---

## ✅ Step 5: Test After Fix

### 5.1: Wait for Redeployment

1. **After updating variables**
2. **Wait 3-5 minutes**
3. **Check logs** for "Server running"

### 5.2: Test Registration

1. **Go to frontend**
2. **Try to register**
3. **Should work now!** ✅

---

## 🎯 Most Likely Issue: Missing JWT_SECRET

**Line 31 in authController.js:**
```javascript
const token = jwt.sign({ userId, email, name }, process.env.JWT_SECRET, { expiresIn: '7d' })
```

**If `JWT_SECRET` is not set, this will throw an error and cause 500!**

**Fix:** Add `JWT_SECRET` environment variable (Step 1 above)

---

## 🆘 Still Not Working?

### Check Backend Logs:

1. **Go to backend → Logs tab**
2. **Try to register**
3. **Copy the EXACT error message**
4. **Share it with me** - I'll help fix it

---

## ✅ Final Checklist

- [ ] `JWT_SECRET` is set (32+ character random string)
- [ ] All DB_* variables are set correctly
- [ ] `DB_HOST` tried with and without domain
- [ ] `DB_PASSWORD` is exact (no spaces)
- [ ] Backend redeployed (waited 3-5 minutes)
- [ ] Backend logs show "Server running"
- [ ] Tested registration - works! ✅

---

## 🚀 DO THIS NOW:

1. **Add `JWT_SECRET`** if missing
2. **Verify all DB_* variables** are correct
3. **Save and wait for redeploy**
4. **Test registration**

**The #1 issue is missing `JWT_SECRET` - add it first!** 🎯


# ✅ Exact Environment Variables from Your Connection String

## 📝 Your Internal Database URL

```
postgresql://budget_user:nvm99rsf23LKDNqwL32iNYHybyZHBKc5@dpg-d4gpr2ili9vc73dpajfg-a/budget_tracker_8go5
```

---

## 🔍 Extracted Values

From your connection string:

- **User**: `budget_user`
- **Password**: `nvm99rsf23LKDNqwL32iNYHybyZHBKc5`
- **Host**: `dpg-d4gpr2ili9vc73dpajfg-a`
- **Database**: `budget_tracker_8go5`
- **Port**: `5432` (default PostgreSQL port)

---

## ✅ Step 1: Update Backend Environment Variables

### Go to Backend Service → Environment Tab

Update these variables with the EXACT values:

### Variable 1: DB_TYPE
```
DB_TYPE=postgresql
```

### Variable 2: DB_HOST
```
DB_HOST=dpg-d4gpr2ili9vc73dpajfg-a.singapore-postgres.render.com
```
⚠️ **Note:** Add `.singapore-postgres.render.com` to the hostname
- If this doesn't work, try: `dpg-d4gpr2ili9vc73dpajfg-a` (without domain)
- Or check PostgreSQL Info tab for full hostname

### Variable 3: DB_USER
```
DB_USER=budget_user
```

### Variable 4: DB_PASSWORD
```
DB_PASSWORD=nvm99rsf23LKDNqwL32iNYHybyZHBKc5
```

### Variable 5: DB_NAME
```
DB_NAME=budget_tracker_8go5
```

### Variable 6: DB_PORT
```
DB_PORT=5432
```

### Variable 7: JWT_SECRET
```
JWT_SECRET=your-generated-secret-here
```
⚠️ **Generate a random 32+ character string** (click refresh icon in Render)

### Variable 8: FRONTEND_URL
```
FRONTEND_URL=https://budget-tracker-frontend-7rr8.onrender.com
```

---

## 🎯 Step 2: Try Both Host Formats

### Option A: With Full Domain (Try First)

```
DB_HOST=dpg-d4gpr2ili9vc73dpajfg-a.singapore-postgres.render.com
```

### Option B: Without Domain (If Option A Doesn't Work)

```
DB_HOST=dpg-d4gpr2ili9vc73dpajfg-a
```

**Render's Internal Database URL sometimes works with just the short hostname for internal connections.**

---

## 📝 Complete Environment Variables List

**Copy these exactly into your backend environment variables:**

```
NODE_ENV=production
PORT=4000
DB_TYPE=postgresql
DB_HOST=dpg-d4gpr2ili9vc73dpajfg-a.singapore-postgres.render.com
DB_USER=budget_user
DB_PASSWORD=nvm99rsf23LKDNqwL32iNYHybyZHBKc5
DB_NAME=budget_tracker_8go5
DB_PORT=5432
JWT_SECRET=generate-random-32-char-string
FRONTEND_URL=https://budget-tracker-frontend-7rr8.onrender.com
```

---

## ✅ Step 3: Update in Render

### 3.1: Go to Backend Environment

1. **Render Dashboard** → **Backend Service** (`budget-tracker-0ufx`)
2. **Click "Environment" tab**
3. **Update each variable** one by one

### 3.2: Update Variables

**For each variable:**
1. **Find it in the list** (or add if missing)
2. **Click to edit**
3. **Update to the value above**
4. **Save**

**Important variables to check:**
- ✅ `DB_HOST` - Try with domain first, then without if needed
- ✅ `DB_USER` = `budget_user`
- ✅ `DB_PASSWORD` = `nvm99rsf23LKDNqwL32iNYHybyZHBKc5`
- ✅ `DB_NAME` = `budget_tracker_8go5`
- ✅ `JWT_SECRET` - Must be set!

### 3.3: Save and Redeploy

1. **All variables updated**
2. **Backend auto-redeploys**
3. **Wait 2-3 minutes**
4. **Check logs** for "Server running"

---

## 🧪 Step 4: Test

### 4.1: Check Backend Logs

1. **Go to backend → Logs tab**
2. **Look for:**
   - ✅ "Server running on port 4000"
   - ✅ "Connected to database" (if logged)
   - ❌ No connection errors

### 4.2: Test Registration

1. **Go to frontend**
2. **Try to register** a new user
3. **Check backend logs** in real-time
4. **Should work now!** ✅

---

## 🐛 If DB_HOST Still Doesn't Work

### Try These Variations:

1. **With domain:**
   ```
   dpg-d4gpr2ili9vc73dpajfg-a.singapore-postgres.render.com
   ```

2. **Without domain:**
   ```
   dpg-d4gpr2ili9vc73dpajfg-a
   ```

3. **Check PostgreSQL Info tab:**
   - Look for "Host" field
   - Use that exact value

4. **Check Internal Database URL:**
   - The hostname between `@` and `/` is your host
   - In your case: `dpg-d4gpr2ili9vc73dpajfg-a`
   - Try with and without domain

---

## ✅ Quick Checklist

- [ ] `DB_TYPE` = `postgresql`
- [ ] `DB_HOST` = `dpg-d4gpr2ili9vc73dpajfg-a.singapore-postgres.render.com` (try with domain first)
- [ ] `DB_USER` = `budget_user`
- [ ] `DB_PASSWORD` = `nvm99rsf23LKDNqwL32iNYHybyZHBKc5`
- [ ] `DB_NAME` = `budget_tracker_8go5`
- [ ] `DB_PORT` = `5432`
- [ ] `JWT_SECRET` = (generated random string)
- [ ] `FRONTEND_URL` = `https://budget-tracker-frontend-7rr8.onrender.com`
- [ ] Backend redeployed
- [ ] Tested registration - works! ✅

---

## 🎯 Most Important

**Update these 3 variables first:**
1. `DB_HOST` - Try with domain: `dpg-d4gpr2ili9vc73dpajfg-a.singapore-postgres.render.com`
2. `DB_PASSWORD` - Make sure it's exactly: `nvm99rsf23LKDNqwL32iNYHybyZHBKc5`
3. `JWT_SECRET` - Must be set (generate random string)

---

**Update all environment variables with the exact values above and test!** 🚀


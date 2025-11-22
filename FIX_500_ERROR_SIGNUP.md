# 🔧 Fix 500 Error During Signup

## ❌ The Problem

A 500 error means the backend received your request but something failed on the server. Common causes:
- Database connection issue
- Missing environment variables
- Database table doesn't exist
- Code error in the backend

---

## ✅ Step 1: Check Backend Logs

### 1.1: Open Backend Logs

1. **Go to Render Dashboard**
2. **Click on your Backend Service** (`budget-tracker-0ufx`)
3. **Click "Logs" tab**
4. **Look at the latest logs** (scroll to bottom)

### 1.2: Look for Error Messages

**Common errors you might see:**

**a) Database Connection Error:**
```
Error: connect ECONNREFUSED
Error: getaddrinfo ENOTFOUND
Error: password authentication failed
```
→ **Fix:** Check database environment variables

**b) Table Doesn't Exist:**
```
Error: relation "users" does not exist
Error: table "users" doesn't exist
```
→ **Fix:** Database tables not created (run SQL schema)

**c) Missing Environment Variable:**
```
Error: JWT_SECRET is not defined
```
→ **Fix:** Add missing environment variable

**d) Other Errors:**
- Copy the exact error message
- This will help identify the issue

---

## ✅ Step 2: Common Fixes

### Fix 1: Database Connection Issue

**Symptoms:**
- Logs show "Cannot connect to database"
- "Connection refused" errors

**Solution:**

1. **Go to Backend → Environment tab**
2. **Verify these variables are set:**
   ```
   DB_TYPE=postgresql
   DB_HOST=your-database-host
   DB_USER=your-database-user
   DB_PASSWORD=your-database-password
   DB_NAME=budget_tracker_8go5
   DB_PORT=5432
   ```

3. **Get correct values:**
   - Go to PostgreSQL service → Info tab
   - Copy Host, User, Password, Database
   - Update in backend environment variables

4. **Save and redeploy**

### Fix 2: Database Tables Not Created

**Symptoms:**
- Logs show "relation 'users' does not exist"
- "table 'users' doesn't exist"

**Solution:**

1. **Run the SQL schema** (if you haven't already)
2. **Use the script we created earlier:**
   ```bash
   cd "/Users/aadityarajsoni/Desktop/budget tracker"
   node run-schema.js
   ```
3. **Or use psql** to run `server/database/schema_postgresql.sql`

### Fix 3: Missing JWT_SECRET

**Symptoms:**
- Logs show "JWT_SECRET is not defined"

**Solution:**

1. **Go to Backend → Environment tab**
2. **Add `JWT_SECRET` variable:**
   - Click "Add Environment Variable"
   - Key: `JWT_SECRET`
   - Value: Click refresh icon to auto-generate
   - Or generate manually (see below)
3. **Save and redeploy**

**Generate JWT_SECRET manually:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Fix 4: Database Name Mismatch

**Symptoms:**
- "database does not exist" errors

**Solution:**

1. **Check database name in backend:**
   - Environment variable: `DB_NAME`
   - Should match your actual database name
   - From your connection string: `budget_tracker_8go5`

2. **Update if wrong:**
   - Set `DB_NAME=budget_tracker_8go5`
   - Save and redeploy

---

## 🔍 Step 3: Detailed Troubleshooting

### 3.1: Check Database Connection

**Test if backend can connect to database:**

1. **Check backend logs** for:
   - "Connected to database" ✅
   - "Database connection failed" ❌

2. **If connection fails:**
   - Verify all DB_* environment variables
   - Check database is running in Render
   - Verify credentials from database Info tab

### 3.2: Verify Tables Exist

**Check if tables were created:**

1. **Use the verification script:**
   ```bash
   cd "/Users/aadityarajsoni/Desktop/budget tracker"
   node run-schema.js
   ```
   - Should show: "All tables created successfully!"

2. **Or check manually:**
   - Connect to database via psql
   - Run: `\dt`
   - Should see: users, categories, transactions, savings_goals

### 3.3: Test Backend Endpoints

**Test registration endpoint directly:**

```bash
curl -X POST https://budget-tracker-0ufx.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

**What you should see:**
- ✅ Success: `{"token":"...","user":{...}}`
- ❌ Error: Check the error message

---

## 📝 Step 4: Environment Variables Checklist

**Make sure all these are set in Backend:**

- [ ] `NODE_ENV=production`
- [ ] `PORT=4000`
- [ ] `DB_TYPE=postgresql`
- [ ] `DB_HOST=your-database-host` (from PostgreSQL Info tab)
- [ ] `DB_USER=your-database-user` (from PostgreSQL Info tab)
- [ ] `DB_PASSWORD=your-database-password` (from PostgreSQL Info tab)
- [ ] `DB_NAME=budget_tracker_8go5` (or your actual database name)
- [ ] `DB_PORT=5432`
- [ ] `JWT_SECRET=your-generated-secret` (32+ characters)
- [ ] `FRONTEND_URL=https://budget-tracker-frontend-7rr8.onrender.com`

---

## 🧪 Step 5: Test After Fix

### 5.1: Check Backend Logs

1. **Go to backend → Logs tab**
2. **Try to register again** from frontend
3. **Watch logs in real-time**
4. **See what error appears**

### 5.2: Test Registration

1. **Go to frontend:** `https://budget-tracker-frontend-7rr8.onrender.com`
2. **Try to register** a new user
3. **Check browser console** (F12) for errors
4. **Check backend logs** for errors

---

## 🐛 Most Common Issues

### Issue 1: Database Tables Not Created (Most Likely!)

**Fix:**
```bash
cd "/Users/aadityarajsoni/Desktop/budget tracker"
node run-schema.js
```

### Issue 2: Wrong Database Credentials

**Fix:**
1. Get correct credentials from PostgreSQL → Info tab
2. Update in backend → Environment tab
3. Redeploy

### Issue 3: Database Name Wrong

**Fix:**
1. Check actual database name from connection string
2. Update `DB_NAME` in backend environment variables
3. Redeploy

---

## 🆘 Still Getting 500 Error?

**Share with me:**
1. **Exact error from backend logs** (copy the error message)
2. **What environment variables are set** (without passwords)
3. **Whether tables were created** (run `node run-schema.js` to check)

---

## ✅ Quick Fix Steps

1. **Check backend logs** for specific error
2. **Verify database tables exist** (run `node run-schema.js`)
3. **Check all environment variables** are set correctly
4. **Verify database connection** in logs
5. **Test registration again**

---

**Start by checking the backend logs - that will tell us exactly what's wrong!** 🚀


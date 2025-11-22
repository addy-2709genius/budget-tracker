# 🔗 Connect Database to Backend - Step by Step (Click by Click)

Complete visual guide to connect your PostgreSQL database to your backend on Render.

---

## 📋 Prerequisites

- ✅ PostgreSQL database created on Render
- ✅ Backend service created on Render
- ✅ Database connection details ready

---

## 🎯 Step 1: Get Database Connection Details

### 1.1: Open Your Database Service

1. **Go to Render Dashboard**
   - Open [dashboard.render.com](https://dashboard.render.com) in your browser
   - Make sure you're logged in

2. **Find Your Database**
   - Look at your services list
   - Find the service named: **`budget-tracker-db`** (or your database name)
   - It should show **"PostgreSQL"** as the type
   - **Click on the service name** (click anywhere on that row)

### 1.2: Get Connection Information

1. **You're now on the database service page**
   - You'll see tabs at the top: **Info**, **Logs**, **Settings**, etc.

2. **Click on "Info" tab**
   - This is usually the first tab, or second after "Overview"
   - **Click it**

3. **Scroll down to "Connection Information" section**
   - You'll see several fields:
     - **Internal Database URL**
     - **Host**
     - **Port**
     - **Database**
     - **User**
     - **Password**

4. **Copy Each Value:**
   
   **a) Host:**
   - Look for **"Host"** field
   - Copy the value (e.g., `dpg-xxxxx-a.singapore-postgres.render.com`)
   - **Write it down** or keep it copied

   **b) Port:**
   - Look for **"Port"** field
   - Should be: `5432`
   - **Write it down**

   **c) Database:**
   - Look for **"Database"** field
   - Should be: `budget_tracker` (or your database name)
   - **Write it down**

   **d) User:**
   - Look for **"User"** field
   - Copy the username (e.g., `budget_user` or similar)
   - **Write it down**

   **e) Password:**
   - Look for **"Password"** field
   - You'll see a **"Show"** button or eye icon
   - **Click "Show"** to reveal the password
   - **Copy the password** (it's long and random)
   - **Write it down** (you'll need it!)

5. **Keep This Tab Open** (or write down all values)
   - You'll need these values in the next step

---

## ⚙️ Step 2: Open Your Backend Service

### 2.1: Navigate to Backend

1. **Go back to Render Dashboard**
   - Click **"Dashboard"** in the top navigation
   - Or click the Render logo at the top left

2. **Find Your Backend Service**
   - Look for service named: **`budget-tracker`** (or your backend name)
   - It should show **"Web Service"** or **"Node"** as the type
   - **Click on the service name** (click anywhere on that row)

### 2.2: Open Environment Variables

1. **You're now on the backend service page**
   - You'll see tabs: **Overview**, **Logs**, **Environment**, **Settings**, etc.

2. **Click on "Environment" tab**
   - This is usually the 3rd or 4th tab
   - **Click it**

3. **You'll see a list of environment variables**
   - Some might already be there
   - You need to add/update database-related variables

---

## 🔧 Step 3: Add/Update Database Environment Variables

### 3.1: Add DB_TYPE Variable

1. **Look for "Add Environment Variable" button**
   - Usually at the top right of the environment variables list
   - **Click "Add Environment Variable"**

2. **Add DB_TYPE:**
   - **Key field**: Type `DB_TYPE`
   - **Value field**: Type `postgresql`
   - **Click "Save"** or **"Add"** button
   - ✅ Variable added!

### 3.2: Add DB_HOST Variable

1. **Click "Add Environment Variable" again**

2. **Add DB_HOST:**
   - **Key field**: Type `DB_HOST`
   - **Value field**: Paste the **Host** value you copied from database Info tab
     - Example: `dpg-xxxxx-a.singapore-postgres.render.com`
   - **Click "Save"** or **"Add"**
   - ✅ Variable added!

### 3.3: Add DB_USER Variable

1. **Click "Add Environment Variable" again**

2. **Add DB_USER:**
   - **Key field**: Type `DB_USER`
   - **Value field**: Paste the **User** value you copied from database Info tab
     - Example: `budget_user`
   - **Click "Save"** or **"Add"**
   - ✅ Variable added!

### 3.4: Add DB_PASSWORD Variable

1. **Click "Add Environment Variable" again**

2. **Add DB_PASSWORD:**
   - **Key field**: Type `DB_PASSWORD`
   - **Value field**: Paste the **Password** value you copied from database Info tab
     - (The long random string you revealed with "Show")
   - **Click "Save"** or **"Add"**
   - ✅ Variable added!

### 3.5: Add DB_NAME Variable

1. **Click "Add Environment Variable" again**

2. **Add DB_NAME:**
   - **Key field**: Type `DB_NAME`
   - **Value field**: Type `budget_tracker`
     - (Or whatever database name you used)
   - **Click "Save"** or **"Add"**
   - ✅ Variable added!

### 3.6: Add DB_PORT Variable

1. **Click "Add Environment Variable" again**

2. **Add DB_PORT:**
   - **Key field**: Type `DB_PORT`
   - **Value field**: Type `5432`
   - **Click "Save"** or **"Add"**
   - ✅ Variable added!

### 3.7: Update Existing Variables (If Any)

If you see any of these variables already exist:

1. **Find the variable** in the list
2. **Click on it** (or click the edit/pencil icon)
3. **Update the value** to match your database
4. **Click "Save"**

---

## ✅ Step 4: Verify All Variables

### 4.1: Check Your Variables List

You should now have these 6 database variables:

- ✅ `DB_TYPE` = `postgresql`
- ✅ `DB_HOST` = `your-database-host`
- ✅ `DB_USER` = `your-database-user`
- ✅ `DB_PASSWORD` = `your-database-password`
- ✅ `DB_NAME` = `budget_tracker`
- ✅ `DB_PORT` = `5432`

### 4.2: Double-Check Values

1. **Compare each value** with what you copied from database Info tab
2. **Make sure:**
   - No extra spaces
   - No typos
   - Host matches exactly
   - Password is complete (they're long!)

---

## 🚀 Step 5: Save and Deploy

### 5.1: Save Changes

1. **After adding all variables**, Render will automatically save
2. **You'll see a notification** that backend is redeploying
3. **Or manually trigger deploy:**
   - Go to **"Manual Deploy"** tab
   - Click **"Deploy latest commit"**

### 5.2: Wait for Redeployment

1. **Go to "Logs" tab** to watch deployment
2. **Wait 2-3 minutes** for redeployment
3. **Look for:**
   - ✅ "Installing dependencies..."
   - ✅ "Starting service..."
   - ✅ "Server running on port 4000"
   - ❌ No database connection errors

---

## 🧪 Step 6: Test Connection

### 6.1: Test Backend Health

1. **Get your backend URL**
   - It's shown at the top of the backend service page
   - Format: `https://budget-tracker.onrender.com`

2. **Open in browser:**
   - Go to: `https://your-backend.onrender.com/health`
   - Should see: `{"status":"ok","message":"Budget Tracker API is running"}`

### 6.2: Check Backend Logs

1. **Go to backend service** → **"Logs" tab**
2. **Look for:**
   - ✅ "Connected to database"
   - ✅ "Server running"
   - ❌ No "connection refused" or "authentication failed" errors

### 6.3: Test Database Connection (Optional)

1. **Try registering a user:**
   - Use browser console or Postman
   - POST to: `https://your-backend.onrender.com/api/auth/register`
   - If it works, database is connected! ✅

---

## 🐛 Troubleshooting

### Error: "Database connection failed"

**Check:**
1. All 6 database variables are added
2. Values match exactly from database Info tab
3. No typos in host, user, password
4. Database is running (green status)

**Fix:**
1. Go back to Environment tab
2. Double-check each variable value
3. Compare with database Info tab
4. Save and redeploy

### Error: "Variable not found"

**Check:**
1. Variable name is exactly: `DB_HOST`, `DB_USER`, etc. (uppercase)
2. No spaces before/after variable name
3. Variable was saved (appears in list)

**Fix:**
1. Delete the variable
2. Add it again with exact spelling
3. Save

### Backend Won't Start

**Check:**
1. All required variables are present
2. No syntax errors in values
3. Database is accessible

**Fix:**
1. Check Logs tab for specific error
2. Verify database credentials
3. Test database connection from database service

---

## 📝 Quick Reference

### Database Variables Checklist:

- [ ] `DB_TYPE` = `postgresql`
- [ ] `DB_HOST` = (from database Info tab)
- [ ] `DB_USER` = (from database Info tab)
- [ ] `DB_PASSWORD` = (from database Info tab)
- [ ] `DB_NAME` = `budget_tracker`
- [ ] `DB_PORT` = `5432`

### Where to Find Database Info:

1. **Database service** → **"Info" tab** → **"Connection Information" section**

### Where to Add Variables:

1. **Backend service** → **"Environment" tab** → **"Add Environment Variable" button**

---

## ✅ Success Checklist

- [ ] Opened database service Info tab
- [ ] Copied all 6 database values (Host, Port, Database, User, Password)
- [ ] Opened backend service Environment tab
- [ ] Added all 6 database environment variables
- [ ] Verified all values are correct
- [ ] Backend redeployed automatically
- [ ] Health check endpoint works
- [ ] No database errors in logs
- [ ] Database is connected! 🎉

---

## 🎉 You're Done!

Your database is now connected to your backend! 

**Next Steps:**
1. Create database tables (see `COMPLETE_DEPLOYMENT_GUIDE.md` Step 3)
2. Deploy frontend
3. Test your complete website

Good luck! 🚀


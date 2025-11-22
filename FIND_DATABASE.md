# 🔍 How to Find Your PostgreSQL Database on Render

## 📍 Where Databases Appear

In Render, **databases are separate services** from web services. They appear in the same dashboard but as different service types.

---

## 🔎 Step 1: Check Your Services List

1. **Go to Render Dashboard**
   - You should see all your services listed

2. **Look for Service Types:**
   - **Web Services** (your backend) - shows as "Node" runtime
   - **PostgreSQL** (your database) - shows as "PostgreSQL" runtime
   - **Static Sites** (your frontend) - shows as "Static" runtime

3. **Your database should show:**
   - **Name**: `budget-tracker-db` (or whatever you named it)
   - **Type**: PostgreSQL
   - **Status**: Running/Deployed
   - **Region**: Same as your backend

---

## 🆕 Step 2: Create Database (If Not Found)

If you don't see a PostgreSQL service, create one:

### 2.1: Create New Database

1. **Click "New +"** button (top right)
2. **Select "PostgreSQL"** from dropdown
3. **Configure:**
   - **Name**: `budget-tracker-db`
   - **Database**: `budget_tracker`
   - **User**: Leave default or use `budget_user`
   - **Region**: **Singapore** (same as your backend)
   - **PostgreSQL Version**: `16` (or latest)
   - **Plan**: **Free**
4. **Click "Create Database"**
5. **Wait ~2 minutes** for creation

### 2.2: Get Connection Details

Once created:

1. **Click on your database service** (`budget-tracker-db`)
2. **Go to "Info" tab**
3. **You'll see:**
   - **Internal Database URL**: `postgresql://user:password@host:5432/database`
   - **Host**: `dpg-xxxxx-a.singapore-postgres.render.com`
   - **Port**: `5432`
   - **Database**: `budget_tracker`
   - **User**: `budget_user` (or default)
   - **Password**: (click "Show" to reveal)

**📝 Copy these details!** You'll need them for backend environment variables.

---

## 🔗 Step 3: Connect Database to Backend

Now update your backend service with database credentials:

1. **Go to your backend service** (`budget-tracker`)
2. **Click "Environment" tab**
3. **Update these variables:**

```
DB_HOST=your-database-host-from-info-tab
DB_USER=your-database-user-from-info-tab
DB_PASSWORD=your-database-password-from-info-tab
DB_NAME=budget_tracker
DB_PORT=5432
DB_TYPE=postgresql
```

4. **Save changes** (Render will auto-redeploy)

---

## 🧪 Step 4: Verify Database Connection

### Method 1: Check Backend Logs

1. Go to backend service → **"Logs" tab**
2. Look for:
   - ✅ "Connected to database"
   - ✅ "Server running on port 4000"
   - ❌ No database connection errors

### Method 2: Test Backend Health

1. Open: `https://your-backend.onrender.com/health`
2. Should return: `{"status":"ok",...}`
3. If it works, database connection is likely OK

### Method 3: Test Database Directly

1. Go to database service → **"Connect"** → **"psql"**
2. Type: `\dt` (list tables)
3. Should show tables (if you've created them)

---

## 📊 Step 5: Create Database Tables

Once database is connected:

1. **Go to database service** → **"Connect"** → **"psql"**
2. **Or use "Query" tab**
3. **Open** `server/database/schema_postgresql.sql` from your project
4. **Copy entire content**
5. **Paste into psql/Query editor**
6. **Run** (Enter or click Run)
7. **Verify**: Type `\dt` - should see 4 tables

---

## 🐛 Troubleshooting

### Database Not Showing in Services

**Possible reasons:**
1. **Not created yet** - Create it (Step 2)
2. **Different account** - Check you're logged into correct Render account
3. **Deleted** - Check if it was accidentally deleted

**Solution:**
- Create a new database following Step 2

### Can't Find Database Connection Details

1. **Click on database service name**
2. **Click "Info" tab** (not Logs or Settings)
3. **Scroll down** to see connection details
4. **Click "Show"** next to password to reveal it

### Backend Can't Connect to Database

**Check:**
1. Database is running (green status)
2. All DB_* environment variables are set correctly
3. Database region matches backend region (both Singapore)
4. No typos in host, user, password

**Fix:**
1. Go to backend → Environment tab
2. Verify all DB_* variables match database Info tab
3. Save and wait for redeploy

---

## ✅ Quick Checklist

- [ ] PostgreSQL service visible in Render dashboard
- [ ] Database status is "Running" or "Deployed"
- [ ] Database region matches backend (Singapore)
- [ ] Copied database connection details from Info tab
- [ ] Updated backend environment variables with database credentials
- [ ] Backend redeployed after updating variables
- [ ] Backend logs show no database errors
- [ ] Health check endpoint works

---

## 📝 Quick Reference

### Your Services Should Show:

1. **budget-tracker** (Web Service - Node - Singapore)
2. **budget-tracker-db** (PostgreSQL - Singapore) ← **This is your database!**

### Database Connection Format:

```
Host: dpg-xxxxx-a.singapore-postgres.render.com
Port: 5432
Database: budget_tracker
User: your_user
Password: your_password
```

---

## 🆘 Still Can't Find It?

1. **Check all services:**
   - Scroll through your entire services list
   - Look for any service with "PostgreSQL" type

2. **Check different views:**
   - Try "All Services" view
   - Check if there's a filter applied

3. **Create new database:**
   - If truly not found, create a new one (Step 2)
   - Make sure region is **Singapore** (same as backend)

4. **Contact Render support:**
   - If database was created but not visible
   - Check Render status page for issues

---

Good luck! Your database should be there - it might just be in a different part of the dashboard. 🚀


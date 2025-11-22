# 🚀 Next Steps: Deploy Your Budget Tracker on Render

Your code is now on GitHub! Here's what to do next:

---

## 📋 Quick Overview

You need to deploy **3 things** on Render:
1. **PostgreSQL Database** (free for 90 days)
2. **Backend API** (Web Service)
3. **Frontend** (Static Site)

**Time needed:** ~15-20 minutes  
**Cost:** $0 (free tier)

---

## 🎯 Step-by-Step Deployment

### **Step 1: Sign Up for Render** (2 minutes)

1. Go to **[render.com](https://render.com)**
2. Click **"Get Started for Free"** or **"Sign Up"**
3. Sign up with **GitHub** (easiest - connects automatically)
4. Authorize Render to access your GitHub repositories

---

### **Step 2: Create PostgreSQL Database** (3 minutes)

1. In Render dashboard, click **"New +"** → **"PostgreSQL"**
2. Configure:
   - **Name**: `budget-tracker-db`
   - **Database**: `budget_tracker`
   - **User**: Leave default or use `budget_user`
   - **Region**: Choose closest to you (e.g., `Oregon (US West)`)
   - **PostgreSQL Version**: `16` (or latest)
   - **Plan**: **Free**
3. Click **"Create Database"**
4. Wait ~2 minutes for database to be created

**📝 Save these details** (you'll need them):
- Go to database → **"Info"** tab
- Copy: **Host**, **Port**, **Database**, **User**, **Password**
- Or copy the **Internal Database URL**

---

### **Step 3: Deploy Backend API** (5 minutes)

1. In Render dashboard, click **"New +"** → **"Web Service"**
2. **Connect GitHub** (if not already connected)
3. Select your repository: **`budget-tracker`**
4. Click **"Connect"**

#### Configure Backend:

**Basic Settings:**
- **Name**: `budget-tracker-api`
- **Region**: Same as your database
- **Branch**: `main`
- **Root Directory**: `server` ⚠️ **IMPORTANT!**
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: **Free**

**Environment Variables:**
Click **"Advanced"** → **"Add Environment Variable"** and add:

```
NODE_ENV=production
PORT=4000
DB_TYPE=postgresql
DB_HOST=your-postgres-host-from-step-2
DB_USER=your-postgres-user-from-step-2
DB_PASSWORD=your-postgres-password-from-step-2
DB_NAME=budget_tracker
DB_PORT=5432
JWT_SECRET=click-the-refresh-icon-to-auto-generate
FRONTEND_URL=https://budget-tracker-frontend.onrender.com
```

**To generate JWT_SECRET:**
- Click the 🔄 refresh icon next to the field
- Render will auto-generate a secure random string

**Note**: Set `FRONTEND_URL` after deploying frontend (Step 4). For now, use placeholder.

5. Click **"Create Web Service"**
6. Wait ~5-7 minutes for deployment
7. Once deployed, you'll get a URL: `https://budget-tracker-api.onrender.com`

**✅ Test Backend:**
- Open: `https://budget-tracker-api.onrender.com/health`
- Should return: `{"status":"ok","message":"Budget Tracker API is running"}`

---

### **Step 4: Create Database Tables** (2 minutes)

After backend is deployed:

1. Go to your PostgreSQL service in Render
2. Click **"Connect"** → **"psql"** (opens web terminal)
3. Or use **"Query"** tab for SQL editor
4. Open `server/database/schema_postgresql.sql` from your project
5. Copy the **entire contents** of that file
6. Paste into the psql terminal or Query editor
7. Press Enter or click **"Run"**

**Verify tables created:**
```sql
\dt
```
Should show: `users`, `categories`, `transactions`, `savings_goals`

---

### **Step 5: Deploy Frontend** (3 minutes)

1. In Render dashboard, click **"New +"** → **"Static Site"**
2. **Connect GitHub** (if not already)
3. Select your repository: **`budget-tracker`**
4. Click **"Connect"**

#### Configure Frontend:

**Basic Settings:**
- **Name**: `budget-tracker-frontend`
- **Branch**: `main`
- **Root Directory**: `.` (leave empty - root directory)
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`
- **Plan**: **Free**

**Environment Variables:**
Click **"Add Environment Variable"**:

```
VITE_API_URL=https://budget-tracker-api.onrender.com
VITE_USE_MOCK=false
```

**Replace** `https://budget-tracker-api.onrender.com` with your actual backend URL from Step 3.

5. Click **"Create Static Site"**
6. Wait ~3-5 minutes for build
7. Once deployed, you'll get a URL: `https://budget-tracker-frontend.onrender.com`

---

### **Step 6: Connect Everything** (2 minutes)

1. Go back to your backend service (`budget-tracker-api`)
2. Go to **"Environment"** tab
3. Find `FRONTEND_URL` variable
4. Update it to your frontend URL: `https://budget-tracker-frontend.onrender.com`
5. Render will automatically redeploy backend

---

### **Step 7: Test Your App** (2 minutes)

1. Open your frontend: `https://budget-tracker-frontend.onrender.com`
2. Try to **register** a new user
3. Try to **login**
4. Create a **category**
5. Create a **transaction**
6. Check **dashboard**

If everything works, **you're live!** 🎉

---

## 📝 Environment Variables Checklist

### Backend (Web Service):
```
✅ NODE_ENV=production
✅ PORT=4000
✅ DB_TYPE=postgresql
✅ DB_HOST=from-postgres-service
✅ DB_USER=from-postgres-service
✅ DB_PASSWORD=from-postgres-service
✅ DB_NAME=budget_tracker
✅ DB_PORT=5432
✅ JWT_SECRET=auto-generated
✅ FRONTEND_URL=https://budget-tracker-frontend.onrender.com
```

### Frontend (Static Site):
```
✅ VITE_API_URL=https://budget-tracker-api.onrender.com
✅ VITE_USE_MOCK=false
```

---

## 🎉 Your Live URLs

After deployment:
- **Frontend**: `https://budget-tracker-frontend.onrender.com`
- **Backend**: `https://budget-tracker-api.onrender.com`
- **Health Check**: `https://budget-tracker-api.onrender.com/health`

---

## 🐛 Common Issues & Quick Fixes

### Backend won't start
- Check **Logs** tab in Render
- Verify all environment variables are set
- Check database connection details
- Ensure tables are created

### Database connection fails
- Double-check `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- Make sure `DB_TYPE=postgresql` is set
- Check if database is active in Render dashboard

### Frontend can't connect to backend
- Verify `VITE_API_URL` matches backend URL exactly
- Check `FRONTEND_URL` in backend matches frontend URL
- Open browser console (F12) to see errors

### CORS errors
- Ensure `FRONTEND_URL` in backend exactly matches frontend URL
- No trailing slashes
- Include `https://` protocol

### Build fails
- Check build logs in Render
- Verify Node.js version compatibility
- Check for syntax errors

---

## ⚡ Free Tier Limitations

- **Web Services**: Spin down after 15 minutes of inactivity
- **First Request**: May take 30-60 seconds to wake up
- **PostgreSQL**: Free for 90 days, then $7/month

**Tip**: Use [UptimeRobot](https://uptimerobot.com) (free) to ping your backend every 5 minutes to keep it awake.

---

## 📚 Detailed Guide

For more detailed instructions, see: **`RENDER_DEPLOY_STEPS.md`**

---

## ✅ Deployment Checklist

- [ ] Signed up for Render
- [ ] Created PostgreSQL database
- [ ] Deployed backend API
- [ ] Created database tables
- [ ] Deployed frontend
- [ ] Updated backend CORS
- [ ] Tested registration
- [ ] Tested login
- [ ] Tested creating transactions
- [ ] App is live! 🎉

---

**Ready to start?** Go to [render.com](https://render.com) and begin with Step 1!

Good luck! 🚀


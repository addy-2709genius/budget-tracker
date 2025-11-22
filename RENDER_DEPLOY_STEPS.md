# 🚀 Deploy Budget Tracker on Render - Step by Step

## ✅ Pre-Deployment Checklist

- [x] Code supports both MySQL and PostgreSQL
- [x] PostgreSQL schema created
- [x] Database adapter configured
- [ ] Code pushed to GitHub
- [ ] Render account created

---

## 📝 Step 1: Push Code to GitHub

If you haven't already:

```bash
cd "/Users/aadityarajsoni/Desktop/budget tracker"

# Check if git is initialized
git status

# If not initialized:
git init
git add .
git commit -m "Prepare for Render deployment"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

---

## 🗄️ Step 2: Create PostgreSQL Database on Render

1. **Go to [render.com](https://render.com)** and sign up/login
2. Click **"New +"** → **"PostgreSQL"**
3. Configure:
   - **Name**: `budget-tracker-db`
   - **Database**: `budget_tracker`
   - **User**: `budget_user` (or leave default)
   - **Region**: Choose closest to you (e.g., `Oregon (US West)`)
   - **PostgreSQL Version**: `16` (or latest)
   - **Plan**: **Free** (or Starter for production)
4. Click **"Create Database"**
5. Wait ~2 minutes for database to be created

### Get Connection Details

1. Click on your database service
2. Go to **"Info"** tab
3. You'll see:
   - **Internal Database URL**: `postgresql://user:password@host:5432/database`
   - Or individual fields: Host, Port, Database, User, Password

**Save these details!** You'll need them in the next step.

---

## ⚙️ Step 3: Deploy Backend API

1. In Render dashboard, click **"New +"** → **"Web Service"**
2. **Connect your GitHub account** (if not already connected)
3. Select your repository: `budget-tracker` (or your repo name)
4. Click **"Connect"**

### Configure Backend Service

**Basic Settings:**
- **Name**: `budget-tracker-api`
- **Region**: Same as your database
- **Branch**: `main`
- **Root Directory**: `server` ⚠️ **IMPORTANT!**
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: **Free** (spins down after 15 min inactivity)

**Environment Variables:**
Click **"Advanced"** → **"Add Environment Variable"** and add:

```
NODE_ENV=production
PORT=4000
DB_TYPE=postgresql
DB_HOST=your-postgres-host-from-render
DB_USER=your-postgres-user
DB_PASSWORD=your-postgres-password
DB_NAME=budget_tracker
DB_PORT=5432
JWT_SECRET=generate-a-random-32-character-string-here
FRONTEND_URL=https://budget-tracker-frontend.onrender.com
```

**To generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Or use Render's auto-generate:**
- Click the 🔄 icon next to `JWT_SECRET` field
- Render will generate a secure random string

**Note**: Set `FRONTEND_URL` after deploying frontend (Step 4). For now, use a placeholder.

### Deploy Backend

1. Click **"Create Web Service"**
2. Wait for deployment (~5-7 minutes)
3. Render will show build logs
4. Once deployed, you'll get a URL: `https://budget-tracker-api.onrender.com`

### Test Backend

1. Open: `https://budget-tracker-api.onrender.com/health`
2. Should return: `{"status":"ok","message":"Budget Tracker API is running"}`
3. If it works, backend is live! ✅

---

## 🗃️ Step 4: Create Database Tables

After backend is deployed:

### Option A: Using Render's PostgreSQL Dashboard

1. Go to your PostgreSQL service
2. Click **"Connect"** → **"psql"** (opens web terminal)
3. Or use **"Query"** tab for SQL editor
4. Copy and paste the contents of `server/database/schema_postgresql.sql`
5. Click **"Run"** or press Enter

### Option B: Using psql Command Line

```bash
# Get connection string from Render
psql "postgresql://user:password@host:5432/database"

# Then paste schema_postgresql.sql content
```

### Verify Tables Created

Run in psql:
```sql
\dt
```

Should show: `users`, `categories`, `transactions`, `savings_goals`

---

## 🎨 Step 5: Deploy Frontend

1. In Render dashboard, click **"New +"** → **"Static Site"**
2. **Connect your GitHub account** (if not already)
3. Select your repository: `budget-tracker`
4. Click **"Connect"**

### Configure Frontend

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

### Deploy Frontend

1. Click **"Create Static Site"**
2. Wait for build (~3-5 minutes)
3. Once deployed, you'll get a URL: `https://budget-tracker-frontend.onrender.com`

---

## 🔗 Step 6: Connect Everything

### Update Backend CORS

1. Go back to your backend service (`budget-tracker-api`)
2. Go to **"Environment"** tab
3. Find `FRONTEND_URL` variable
4. Update it to your frontend URL: `https://budget-tracker-frontend.onrender.com`
5. Render will automatically redeploy

### Test Complete Flow

1. Open your frontend: `https://budget-tracker-frontend.onrender.com`
2. Try to **register** a new user
3. Try to **login**
4. Create a **category**
5. Create a **transaction**
6. Check **dashboard**

If everything works, **you're live!** 🎉

---

## 📝 Environment Variables Summary

### Backend (Web Service):
```
NODE_ENV=production
PORT=4000
DB_TYPE=postgresql
DB_HOST=from-render-postgres
DB_USER=from-render-postgres
DB_PASSWORD=from-render-postgres
DB_NAME=budget_tracker
DB_PORT=5432
JWT_SECRET=your-generated-secret
FRONTEND_URL=https://budget-tracker-frontend.onrender.com
```

### Frontend (Static Site):
```
VITE_API_URL=https://budget-tracker-api.onrender.com
VITE_USE_MOCK=false
```

---

## 🐛 Troubleshooting

### Backend won't start
- Check **Logs** tab in Render
- Verify all environment variables are set
- Check database connection string
- Ensure database tables are created

### Database connection fails
- Verify `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` are correct
- Check if database is active in Render dashboard
- Review backend logs for specific error
- Ensure `DB_TYPE=postgresql` is set

### Frontend can't connect to backend
- Verify `VITE_API_URL` matches backend URL exactly
- Check `FRONTEND_URL` in backend matches frontend URL
- Check browser console (F12) for errors
- Test backend health: `/health` endpoint

### CORS errors
- Ensure `FRONTEND_URL` in backend exactly matches frontend URL
- No trailing slashes
- Include `https://` protocol

### Build fails
- Check build logs in Render
- Ensure all dependencies are in `package.json`
- Verify Node.js version (should auto-detect)
- Check for syntax errors

### Tables not created
- Verify you ran `schema_postgresql.sql` (not MySQL schema)
- Check psql connection is working
- Review error messages in query output

---

## ⚡ Free Tier Limitations

**Render Free Tier:**
- **Web Services**: Spin down after 15 minutes of inactivity
- **First Request**: May take 30-60 seconds to wake up
- **PostgreSQL**: Free for 90 days, then requires paid plan ($7/month)

**Tip**: Use [UptimeRobot](https://uptimerobot.com) (free) to ping your backend every 5 minutes to keep it awake.

---

## 💰 Pricing

**Free Tier:**
- Web Service: Free (with spin-down)
- Static Site: Free (unlimited)
- PostgreSQL: Free (90 days)

**After Free Tier:**
- Web Service: $7/month (always-on)
- PostgreSQL: $7/month (persistent)

**Total**: $0 (free) → $14/month (always-on)

---

## 🎉 You're Live!

Your Budget Tracker is now accessible at:
**https://budget-tracker-frontend.onrender.com**

Share this URL with everyone! 🌍

---

## 📚 Additional Resources

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com
- PostgreSQL Docs: https://www.postgresql.org/docs/

Good luck! 🚀


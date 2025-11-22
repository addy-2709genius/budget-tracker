# 🚀 Deploy Budget Tracker on Render

Complete guide to deploy your Budget Tracker on Render.com

---

## 📋 Prerequisites

- GitHub account (free)
- Render account (free tier available)
- Email address

---

## 🎯 Step 1: Push Code to GitHub

If you haven't already:

```bash
cd "/Users/aadityarajsoni/Desktop/budget tracker"

# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

---

## 🗄️ Step 2: Set Up Database

### Option A: Use Render PostgreSQL (Recommended - Free)

1. Go to [render.com](https://render.com) and sign up/login
2. Click "New +" → "PostgreSQL"
3. Configure:
   - **Name**: `budget-tracker-db`
   - **Database**: `budget_tracker`
   - **User**: `budget_user` (or auto-generated)
   - **Region**: Choose closest to you
   - **Plan**: Free
4. Click "Create Database"
5. Wait for database to be created (~2 minutes)
6. Go to database dashboard → Copy **Internal Database URL** or individual connection details

**Note**: Render PostgreSQL uses PostgreSQL, not MySQL. You'll need to either:
- Use PostgreSQL (recommended - easier)
- Or use external MySQL (PlanetScale, Aiven, etc.)

### Option B: Use External MySQL (PlanetScale)

1. Sign up at [planetscale.com](https://planetscale.com)
2. Create database
3. Get connection string
4. Use those credentials in Render

---

## ⚙️ Step 3: Deploy Backend on Render

### 3.1 Create Web Service

1. In Render dashboard, click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select your `budget-tracker` repository
4. Configure the service:

**Basic Settings:**
- **Name**: `budget-tracker-api`
- **Region**: Same as database
- **Branch**: `main`
- **Root Directory**: `server`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Environment Variables:**
Click "Advanced" → "Add Environment Variable" and add:

```
NODE_ENV=production
PORT=4000
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=budget_tracker
DB_PORT=3306
JWT_SECRET=your-random-secret-key-here-min-32-chars
FRONTEND_URL=https://your-frontend.onrender.com
```

**Generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**For Render PostgreSQL:**
- `DB_HOST`: From your PostgreSQL service (e.g., `dpg-xxxxx-a.oregon-postgres.render.com`)
- `DB_USER`: Your PostgreSQL user
- `DB_PASSWORD`: Your PostgreSQL password
- `DB_NAME`: `budget_tracker`
- `DB_PORT`: `5432` (PostgreSQL default)

### 3.2 Create Database Tables

After backend is deployed:

1. Go to your PostgreSQL service in Render
2. Click "Connect" → "psql" or use "Query" tab
3. Run your schema (you may need to convert MySQL to PostgreSQL, or use the SQL below)

**Quick PostgreSQL Schema:**
```sql
-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
  color VARCHAR(7) DEFAULT '#4C6EF5',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('income', 'expense')),
  amount DECIMAL(10, 2) NOT NULL,
  date DATE NOT NULL,
  category_id INTEGER NOT NULL,
  account VARCHAR(100),
  notes TEXT,
  is_recurring BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT
);

-- Savings Goals table
CREATE TABLE IF NOT EXISTS savings_goals (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  title VARCHAR(255) NOT NULL,
  target_amount DECIMAL(10, 2) NOT NULL,
  current_amount DECIMAL(10, 2) DEFAULT 0.00,
  target_date DATE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_categories_user_id ON categories(user_id);
CREATE INDEX IF NOT EXISTS idx_categories_type ON categories(type);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_date ON transactions(date);
CREATE INDEX IF NOT EXISTS idx_transactions_type ON transactions(type);
CREATE INDEX IF NOT EXISTS idx_transactions_category_id ON transactions(category_id);
CREATE INDEX IF NOT EXISTS idx_goals_user_id ON savings_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_goals_target_date ON savings_goals(target_date);
```

### 3.3 Get Backend URL

1. Wait for deployment to complete (~5 minutes)
2. Render will give you a URL: `https://budget-tracker-api.onrender.com`
3. Test it: `https://budget-tracker-api.onrender.com/health`
4. Should return: `{"status":"ok","message":"Budget Tracker API is running"}`

---

## 🎨 Step 4: Deploy Frontend on Render

### 4.1 Create Static Site

1. In Render dashboard, click "New +" → "Static Site"
2. Connect your GitHub repository
3. Select your `budget-tracker` repository
4. Configure:

**Basic Settings:**
- **Name**: `budget-tracker-frontend`
- **Branch**: `main`
- **Root Directory**: `.` (root)
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

**Environment Variables:**
```
VITE_API_URL=https://budget-tracker-api.onrender.com
VITE_USE_MOCK=false
```

**Replace** `https://budget-tracker-api.onrender.com` with your actual backend URL from Step 3.3

### 4.2 Deploy

1. Click "Create Static Site"
2. Wait for build to complete (~3-5 minutes)
3. Render will give you a URL: `https://budget-tracker-frontend.onrender.com`

---

## 🔗 Step 5: Connect Everything

### 5.1 Update Backend CORS

1. Go back to your backend service in Render
2. Go to "Environment" tab
3. Update `FRONTEND_URL` to your frontend URL: `https://budget-tracker-frontend.onrender.com`
4. Render will automatically redeploy

### 5.2 Test Your App

1. Open your frontend URL: `https://budget-tracker-frontend.onrender.com`
2. Try to register a new user
3. Try to login
4. Create a category
5. Create a transaction

If everything works, **you're live!** 🎉

---

## 📝 Environment Variables Summary

### Backend (Render Web Service):
```
NODE_ENV=production
PORT=4000
DB_HOST=your-postgres-host
DB_USER=your-postgres-user
DB_PASSWORD=your-postgres-password
DB_NAME=budget_tracker
DB_PORT=5432
JWT_SECRET=your-generated-secret
FRONTEND_URL=https://budget-tracker-frontend.onrender.com
```

### Frontend (Render Static Site):
```
VITE_API_URL=https://budget-tracker-api.onrender.com
VITE_USE_MOCK=false
```

---

## 🐛 Troubleshooting

### Backend won't start
- Check Render logs: Service → "Logs" tab
- Verify all environment variables are set
- Check database connection string
- Ensure database tables are created

### Frontend can't connect to backend
- Verify `VITE_API_URL` matches your backend URL exactly
- Check `FRONTEND_URL` in backend matches frontend URL
- Check browser console (F12) for errors
- Verify backend is running: `/health` endpoint

### Database connection fails
- Check if using PostgreSQL (port 5432) vs MySQL (port 3306)
- Verify credentials in environment variables
- Check if database is active in Render dashboard
- Review backend logs for specific error

### CORS errors
- Ensure `FRONTEND_URL` in backend exactly matches frontend URL
- No trailing slashes
- Include `https://` protocol

### Build fails
- Check build logs in Render
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility
- Check for syntax errors in code

---

## 💰 Render Pricing

**Free Tier:**
- Web Services: Free (spins down after 15 min inactivity)
- Static Sites: Free (unlimited)
- PostgreSQL: Free (90 days, then $7/month)

**After Free Tier:**
- Web Service: $7/month (always on)
- PostgreSQL: $7/month (persistent)

**Total Cost**: $0 (free tier) → $14/month (always-on)

---

## ⚡ Free Tier Limitations

- **Web Services**: Spin down after 15 minutes of inactivity
- **First Request**: May take 30-60 seconds to wake up
- **PostgreSQL**: Free for 90 days, then requires paid plan

**Tip**: Use a service like UptimeRobot (free) to ping your backend every 5 minutes to keep it awake.

---

## 🎉 You're Live!

Your Budget Tracker is now accessible at:
**https://budget-tracker-frontend.onrender.com**

---

## 📚 Additional Resources

- Render Docs: https://render.com/docs
- Render Community: https://community.render.com
- PostgreSQL Docs: https://www.postgresql.org/docs/

Good luck! 🚀


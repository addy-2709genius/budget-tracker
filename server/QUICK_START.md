# Quick Start - Setup Complete! ✅

## ✅ What's Been Done

1. ✅ Dependencies installed (`npm install`)
2. ✅ `.env` file created in `server/` directory
3. ✅ Setup scripts created

## 🔧 Manual Steps Required

### Step 1: Add MySQL Password to .env

Edit `server/.env` and add your MySQL root password:

```bash
cd server
nano .env  # or use your preferred editor
```

Update this line:
```
DB_PASSWORD=your_actual_mysql_password
```

### Step 2: Create Database

Option A - Use the setup script:
```bash
cd server
./setup-db.sh
```

Option B - Manual MySQL command:
```bash
cd server
/usr/local/mysql/bin/mysql -u root -p < database/schema.sql
```

Option C - Interactive MySQL:
```bash
/usr/local/mysql/bin/mysql -u root -p
```
Then run:
```sql
source /Users/aadityarajsoni/Desktop/budget\ tracker/server/database/schema.sql
```

### Step 3: Update Frontend .env

Create `.env` in the root directory (same level as `package.json`):

```bash
cd ..  # Go back to project root
cat > .env << 'EOF'
VITE_API_URL=http://localhost:4000/api
VITE_USE_MOCK=false
EOF
```

### Step 4: Start Backend Server

```bash
cd server
npm run dev
```

You should see:
```
🚀 Server running on http://localhost:4000
📊 API available at http://localhost:4000/api
```

### Step 5: Start Frontend (in a new terminal)

```bash
cd /Users/aadityarajsoni/Desktop/budget\ tracker
npm run dev
```

## 🧪 Test the Setup

### Test Backend Health:
```bash
curl http://localhost:4000/health
```

Should return: `{"status":"ok","message":"Budget Tracker API is running"}`

### Test Registration:
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

## 🐛 Troubleshooting

**Database connection error:**
- Make sure MySQL is running
- Check password in `server/.env`
- Verify database exists: `SHOW DATABASES;` in MySQL

**Port 4000 in use:**
- Change PORT in `server/.env`
- Or kill process: `lsof -ti:4000 | xargs kill`

**Frontend can't connect:**
- Verify backend is running on port 4000
- Check `VITE_API_URL` in root `.env`
- Make sure `VITE_USE_MOCK=false`

## 📝 Next Steps

1. Register a user via the frontend
2. Create some categories
3. Add transactions
4. View your dashboard!


# 🔧 Backend Troubleshooting Guide

## ❌ Error: "Route not found"

### What This Means

You're seeing `{"error":"Route not found"}` because you're accessing a URL that doesn't exist in the API.

---

## ✅ Correct API Endpoints

Your backend API routes are **prefixed with `/api`**. Here are the correct URLs:

### Base URLs:
- **Root**: `https://your-backend.onrender.com/`
- **Health Check**: `https://your-backend.onrender.com/health`
- **API Base**: `https://your-backend.onrender.com/api`

### Available Endpoints:

#### Authentication (No token required):
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

#### Categories (Token required):
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

#### Transactions (Token required):
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `GET /api/transactions/summary` - Get summary

#### Goals (Token required):
- `GET /api/goals` - Get all goals
- `POST /api/goals` - Create goal
- `PUT /api/goals/:id` - Update goal
- `DELETE /api/goals/:id` - Delete goal

---

## 🧪 How to Test

### 1. Test Root Endpoint
Open in browser:
```
https://your-backend.onrender.com/
```
Should return API information with all endpoints listed.

### 2. Test Health Check
Open in browser:
```
https://your-backend.onrender.com/health
```
Should return: `{"status":"ok","message":"Budget Tracker API is running"}`

### 3. Test Register Endpoint
Use curl or Postman:
```bash
curl -X POST https://your-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 4. Test Login Endpoint
```bash
curl -X POST https://your-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

## 🐛 Common Issues

### Issue 1: Accessing Wrong URL

**Wrong:**
- `https://your-backend.onrender.com/auth/register` ❌
- `https://your-backend.onrender.com/register` ❌

**Correct:**
- `https://your-backend.onrender.com/api/auth/register` ✅

### Issue 2: Missing `/api` Prefix

All API routes require `/api` prefix. The frontend should use:
```
VITE_API_URL=https://your-backend.onrender.com/api
```

**Not:**
```
VITE_API_URL=https://your-backend.onrender.com  ❌
```

### Issue 3: Frontend Configuration

Check your frontend `.env` or Render environment variables:

**Correct:**
```
VITE_API_URL=https://your-backend.onrender.com/api
```

The frontend code automatically adds `/api` to requests, so if you set:
```
VITE_API_URL=https://your-backend.onrender.com/api
```

Then requests go to: `https://your-backend.onrender.com/api/auth/login` ✅

---

## 🔍 Check Render Logs

1. Go to your backend service in Render
2. Click **"Logs"** tab
3. Look for:
   - Server startup messages
   - Database connection errors
   - Route registration messages
   - Any error messages

**Expected logs:**
```
🚀 Server running on http://localhost:4000
📊 API available at http://localhost:4000/api
```

---

## ✅ Quick Fixes

### Fix 1: Update Frontend Environment Variable

In Render (Frontend service):
1. Go to **"Environment"** tab
2. Check `VITE_API_URL`
3. Should be: `https://your-backend.onrender.com/api`
4. If wrong, update and redeploy

### Fix 2: Test with Browser

1. Open: `https://your-backend.onrender.com/`
2. Should see API information
3. Open: `https://your-backend.onrender.com/health`
4. Should see: `{"status":"ok",...}`

### Fix 3: Check Database Connection

If routes work but return errors:
1. Check database environment variables in Render
2. Verify database tables are created
3. Check database connection in logs

---

## 📝 Testing Checklist

- [ ] Root endpoint (`/`) returns API info
- [ ] Health check (`/health`) returns OK
- [ ] Register endpoint (`/api/auth/register`) works
- [ ] Login endpoint (`/api/auth/login`) works
- [ ] Frontend `VITE_API_URL` is set correctly
- [ ] No errors in Render logs
- [ ] Database connection successful

---

## 🆘 Still Not Working?

1. **Check Render Logs**: Look for startup errors
2. **Verify Environment Variables**: All required vars are set
3. **Test Health Endpoint**: `/health` should work
4. **Check Database**: Tables should be created
5. **Verify Root Directory**: Should be `server` in Render

---

## 📞 Need More Help?

Share:
1. The exact URL you're accessing
2. Render logs (from Logs tab)
3. Environment variables (without passwords)
4. What you see when accessing `/health`

Good luck! 🚀


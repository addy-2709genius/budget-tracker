# 🔧 Fix 401 Unauthorized Error During Login

## ❌ The Problem

401 Unauthorized means:
- ✅ Backend is working (request reached server)
- ✅ Database connection is working
- ❌ Authentication failed (wrong email/password OR user doesn't exist)

---

## ✅ Step 1: Check If User Exists

### 1.1: Try Registration First

**If you haven't registered yet:**
1. **Go to frontend:** `https://budget-tracker-frontend-7rr8.onrender.com`
2. **Click "Register" or "Sign Up"**
3. **Fill in:**
   - Name: Test User
   - Email: test@example.com
   - Password: password123
4. **Click "Register"**
5. **Should successfully register**

**Then try to login with the same credentials.**

### 1.2: Verify User Was Created

**If registration worked but login doesn't:**
- Check if you're using the **exact same email and password**
- Email is case-sensitive
- Password must match exactly

---

## ✅ Step 2: Common Login Issues

### Issue 1: Wrong Email

**Symptoms:**
- 401 error
- "Invalid credentials" message

**Fix:**
- Use the **exact email** you registered with
- Check for typos
- Email is case-sensitive

### Issue 2: Wrong Password

**Symptoms:**
- 401 error
- "Invalid credentials" message

**Fix:**
- Use the **exact password** you registered with
- Check for typos
- No extra spaces

### Issue 3: User Doesn't Exist

**Symptoms:**
- 401 error
- Trying to login with email that wasn't registered

**Fix:**
- **Register first** (Step 1.1 above)
- Then login with registered credentials

### Issue 4: Registration Failed Silently

**Symptoms:**
- Thought you registered but user doesn't exist

**Fix:**
1. **Check backend logs** during registration
2. **Look for errors**
3. **Try registration again**
4. **Check if it succeeds**

---

## 🔍 Step 3: Check Backend Logs

### 3.1: Check Login Attempt

1. **Go to Backend Service** → **Logs tab**
2. **Try to login** from frontend
3. **Watch the logs** - you'll see:
   - "Login error:" followed by error message
   - Or "Invalid credentials" if email/password wrong

### 3.2: Check Registration

1. **Go to Backend Service** → **Logs tab**
2. **Try to register** from frontend
3. **Watch the logs** - should see:
   - Success: User created
   - Error: Specific error message

---

## 🧪 Step 4: Test Registration and Login

### 4.1: Test Registration

**Use curl or browser console:**

```javascript
fetch('https://budget-tracker-0ufx.onrender.com/api/auth/register', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  })
})
.then(r => r.json())
.then(console.log)
```

**Should return:**
```json
{
  "token": "...",
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

### 4.2: Test Login

**After successful registration:**

```javascript
fetch('https://budget-tracker-0ufx.onrender.com/api/auth/login', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    email: 'test@example.com',
    password: 'password123'
  })
})
.then(r => r.json())
.then(console.log)
```

**Should return:**
```json
{
  "token": "...",
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

---

## 🐛 Troubleshooting

### "Invalid credentials" Error

**This means:**
- Email doesn't exist in database, OR
- Password doesn't match

**Fix:**
1. **Register first** with the email you want to use
2. **Use exact same email and password** for login
3. **Check for typos**

### Registration Works But Login Doesn't

**Possible causes:**
1. **Password hashing issue**
2. **Database issue**
3. **Code bug**

**Fix:**
1. **Check backend logs** for specific error
2. **Try registering again** with different email
3. **Then try login** with new credentials

### 401 But User Should Exist

**Check:**
1. **Backend logs** - what error appears?
2. **Database** - does user actually exist?
3. **Password** - is it correct?

---

## ✅ Quick Fix Steps

1. **Try to register** a new user first
2. **Use exact email and password** for login
3. **Check backend logs** for specific errors
4. **Verify user exists** in database (if possible)
5. **Try again** with correct credentials

---

## 🎯 Most Likely Issue

**You're trying to login with credentials that don't exist!**

**Solution:**
1. **Register first** using the frontend
2. **Then login** with the same credentials
3. **Make sure email and password match exactly**

---

## 📝 Test Checklist

- [ ] Registered a new user successfully
- [ ] Used exact same email for login
- [ ] Used exact same password for login
- [ ] No typos in email or password
- [ ] Backend logs checked for errors
- [ ] Login works! ✅

---

## 🆘 Still Getting 401?

**Check:**
1. **Backend logs** - what's the exact error?
2. **Did registration succeed?** - Check logs
3. **Are you using the correct email/password?**
4. **Try registering again** with a new email

---

**401 means authentication failed - make sure you register first, then login with the exact same credentials!** 🚀


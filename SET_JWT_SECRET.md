# 🔐 How to Set JWT_SECRET

## 🎯 Generated JWT_SECRET

I'll generate a secure JWT_SECRET for you below. Use this value in your backend environment variables.

---

## ✅ Step 1: Generate JWT_SECRET

**Run this command to generate:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Or use Render's auto-generate feature** (easiest - see Step 2)

---

## ✅ Step 2: Set JWT_SECRET in Render

### Method 1: Auto-Generate in Render (Easiest)

1. **Go to Render Dashboard**
2. **Click Backend Service** (`budget-tracker-0ufx`)
3. **Click "Environment" tab**
4. **Find `JWT_SECRET` variable** (or add it if missing)
5. **Click the refresh icon (🔄)** next to the value field
6. **Render will auto-generate** a secure random string
7. **Save** (or it auto-saves)

### Method 2: Use Generated Value

1. **Copy the generated JWT_SECRET** (from command above)
2. **Go to Backend → Environment tab**
3. **Find `JWT_SECRET`** (or add if missing)
4. **Paste the generated value**
5. **Save**

---

## 📝 Example JWT_SECRET Format

**A JWT_SECRET should be:**
- 32+ characters long
- Random hexadecimal string
- Example: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6`

---

## ✅ Step 3: Verify It's Set

1. **In Environment tab**
2. **Find `JWT_SECRET`**
3. **Should show a long random string** (not empty, not "GENERATE_THIS_NOW")
4. **Save if needed**

---

## 🚀 Step 4: Redeploy and Test

1. **After setting JWT_SECRET**
2. **Backend will auto-redeploy**
3. **Wait 2-3 minutes**
4. **Test registration** - should work now! ✅

---

## 🎯 Quick Steps

1. **Backend → Environment tab**
2. **Find `JWT_SECRET`**
3. **Click refresh icon (🔄)** to auto-generate
4. **Save**
5. **Wait for redeploy**
6. **Test registration**

---

**Set JWT_SECRET now and your 500 error should be fixed!** 🚀


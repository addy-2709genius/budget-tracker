# 🔍 Where to Find FRONTEND_URL

## 📍 Quick Answer

**FRONTEND_URL** is the URL of your frontend service **after you deploy it** in Step 4. You'll get it from Render after deploying your frontend.

---

## 🎯 Step-by-Step: Getting Your Frontend URL

### Step 1: Deploy Frontend First (Step 4)

You need to deploy your frontend **before** you can get the FRONTEND_URL.

1. **Go to Render Dashboard**
2. **Click "New +"** → **"Static Site"**
3. **Connect GitHub repo** and configure (see Step 4 in deployment guide)
4. **Click "Create Static Site"**
5. **Wait 3-5 minutes** for deployment

### Step 2: Get Your Frontend URL

**After deployment completes:**

1. **Go to your Static Site service** (`budget-tracker-frontend`)
2. **Look at the top of the page**
3. **You'll see a URL** like:
   ```
   https://budget-tracker-frontend.onrender.com
   ```
   or
   ```
   https://budget-tracker-frontend-xxxxx.onrender.com
   ```

4. **This is your FRONTEND_URL!** 📝 Copy it!

---

## 🔧 Step 3: Update FRONTEND_URL in Backend

### Where to Update It:

1. **Go to Render Dashboard**
2. **Click on your Backend Service** (`budget-tracker` or your backend name)
3. **Click "Environment" tab** (in the service menu)
4. **Find `FRONTEND_URL` variable**
   - Scroll through the list
   - Or use search/filter if available
5. **Click on `FRONTEND_URL`** (or click edit icon)
6. **Update the value:**
   - Change to: `https://your-frontend-name.onrender.com`
   - ⚠️ **Important:**
     - Include `https://`
     - No trailing slash
     - Exact match to your frontend URL
7. **Save** (or it auto-saves)
8. **Backend will auto-redeploy** (wait 2-3 minutes)

---

## 📝 Visual Guide

```
Step 1: Deploy Frontend
    ↓
Step 2: Get Frontend URL from Static Site service
    Example: https://budget-tracker-frontend.onrender.com
    ↓
Step 3: Go to Backend Service → Environment Tab
    ↓
Step 4: Find FRONTEND_URL variable
    ↓
Step 5: Update value to your frontend URL
    ↓
Step 6: Save (auto-redeploys)
    ↓
Done! ✅
```

---

## 🎯 Current Status

**Right now, you probably don't have a frontend URL yet** because you haven't deployed the frontend (Step 4).

**What to do:**
1. **First:** Deploy your frontend (Step 4 in `COMPLETE_DEPLOYMENT_GUIDE.md`)
2. **Then:** Get the frontend URL from Render
3. **Finally:** Update `FRONTEND_URL` in backend environment variables

---

## 📋 Quick Checklist

- [ ] Frontend deployed on Render (Step 4)
- [ ] Frontend URL visible in Static Site service
- [ ] Copied frontend URL
- [ ] Went to backend service → Environment tab
- [ ] Found `FRONTEND_URL` variable
- [ ] Updated value to frontend URL
- [ ] Saved (backend redeployed)
- [ ] `FRONTEND_URL` is set correctly! ✅

---

## 🐛 Troubleshooting

### "I can't find FRONTEND_URL variable"

**If it doesn't exist:**
1. **Add it:**
   - Click "Add Environment Variable"
   - Key: `FRONTEND_URL`
   - Value: `https://your-frontend.onrender.com`
   - Click "Add"

### "I don't have a frontend URL yet"

**You need to deploy frontend first:**
1. Follow Step 4 in `COMPLETE_DEPLOYMENT_GUIDE.md`
2. Deploy your frontend as Static Site
3. Get the URL from Render
4. Then update `FRONTEND_URL`

### "What should FRONTEND_URL be set to now?"

**If frontend not deployed yet:**
- You can set a temporary value: `http://localhost:5173`
- **But remember to update it** after deploying frontend!

---

## ✅ Example

**Your Frontend URL might be:**
```
https://budget-tracker-frontend.onrender.com
```

**So FRONTEND_URL in backend should be:**
```
FRONTEND_URL=https://budget-tracker-frontend.onrender.com
```

**Not:**
- ❌ `https://budget-tracker-frontend.onrender.com/` (no trailing slash)
- ❌ `budget-tracker-frontend.onrender.com` (missing https://)
- ❌ `http://budget-tracker-frontend.onrender.com` (use https, not http)

---

## 🚀 Next Steps

1. **Deploy Frontend** (Step 4) - Get the URL
2. **Update FRONTEND_URL** in Backend (Step 5) - Use the URL
3. **Test Everything** (Step 6) - Make sure it works!

---

**Summary:** FRONTEND_URL comes from your frontend service URL in Render, which you'll get after deploying the frontend in Step 4! 🎯


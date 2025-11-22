# 🗄️ How to Run SQL Using Connection String

You have the connection string! Here are 3 ways to run your SQL schema.

---

## 🎯 Method 1: Use Render's Shell/Console (Easiest)

### Step 1: Check for Shell/Console Tab

1. **On your database service page**, look for these tabs:
   - **Shell**
   - **Console**
   - **Terminal**
   - **Database Console**

2. **Click on any of these tabs**
   - One of them should open a terminal/console

3. **If you find one:**
   - You should see a command prompt
   - Type: `psql` and press Enter
   - Then paste your SQL

---

## 🎯 Method 2: Use Your Local Terminal (Recommended)

### Step 1: Install psql (if not installed)

**On Mac:**
```bash
# Check if installed
which psql

# If not installed, install with Homebrew:
brew install postgresql

# Or download from: https://www.postgresql.org/download/macosx/
```

**On Windows:**
- Download from: https://www.postgresql.org/download/windows/
- Or use WSL (Windows Subsystem for Linux)

**On Linux:**
```bash
sudo apt-get install postgresql-client
```

### Step 2: Connect to Database

1. **Copy the connection string** from Render:
   ```
   postgresql://budget_user:nvm99rsf23LKDNqwL32iNYHybyZHBKc5@dpg-d4gpr2ili9vc73dpajfg-a/budget_tracker_8go5
   ```

2. **Open your terminal** (Terminal on Mac, Command Prompt on Windows)

3. **Run this command:**
   ```bash
   psql "postgresql://budget_user:nvm99rsf23LKDNqwL32iNYHybyZHBKc5@dpg-d4gpr2ili9vc73dpajfg-a/budget_tracker_8go5"
   ```

4. **You'll be connected!** You'll see:
   ```
   budget_tracker_8go5=>
   ```

### Step 3: Run SQL Schema

1. **Open `COPY_THIS_SQL.txt`** from your project
2. **Copy ALL content** (Cmd+A, Cmd+C)
3. **Go back to terminal**
4. **Paste** (Cmd+V / Ctrl+V)
5. **Press Enter**
6. **Wait a few seconds**

### Step 4: Verify

1. **Type:**
   ```sql
   \dt
   ```
2. **Press Enter**
3. **Should see 4 tables:**
   - users
   - categories
   - transactions
   - savings_goals

4. **Exit psql:**
   ```sql
   \q
   ```

---

## 🎯 Method 3: Use Online PostgreSQL Client

### Option A: DBeaver (Free Desktop App)

1. **Download DBeaver**: https://dbeaver.io/download/
2. **Install and open**
3. **Create new connection:**
   - Database: PostgreSQL
   - Host: `dpg-d4gpr2ili9vc73dpajfg-a`
   - Port: `5432`
   - Database: `budget_tracker_8go5`
   - Username: `budget_user`
   - Password: `nvm99rsf23LKDNqwL32iNYHybyZHBKc5`
4. **Connect**
5. **Open SQL Editor**
6. **Paste your SQL from `COPY_THIS_SQL.txt`**
7. **Run**

### Option B: pgAdmin (Web/Desktop)

1. **Download**: https://www.pgadmin.org/download/
2. **Install and open**
3. **Add server** with your connection details
4. **Run SQL queries**

### Option C: Online Tools (Quick)

1. **Go to**: https://www.elephantsql.com/ (or similar)
2. **Use their web SQL editor** (if they allow external connections)
3. **Or use**: https://adminer.org/ (web-based database tool)

---

## 🚀 Quick Method: One-Line Command

If you have psql installed, you can run everything in one command:

### On Mac/Linux:

```bash
psql "postgresql://budget_user:nvm99rsf23LKDNqwL32iNYHybyZHBKc5@dpg-d4gpr2ili9vc73dpajfg-a/budget_tracker_8go5" -f server/database/schema_postgresql.sql
```

**Or paste SQL directly:**

```bash
psql "postgresql://budget_user:nvm99rsf23LKDNqwL32iNYHybyZHBKc5@dpg-d4gpr2ili9vc73dpajfg-a/budget_tracker_8go5" << EOF
$(cat server/database/schema_postgresql.sql)
EOF
```

---

## 📝 Step-by-Step: Using Local Terminal (Easiest)

### Complete Steps:

1. **Open Terminal** (on your Mac)

2. **Navigate to your project:**
   ```bash
   cd "/Users/aadityarajsoni/Desktop/budget tracker"
   ```

3. **Check if psql is installed:**
   ```bash
   which psql
   ```
   - If it shows a path, you're good!
   - If not, install: `brew install postgresql`

4. **Connect to database:**
   ```bash
   psql "postgresql://budget_user:nvm99rsf23LKDNqwL32iNYHybyZHBKc5@dpg-d4gpr2ili9vc73dpajfg-a/budget_tracker_8go5"
   ```

5. **You're connected!** (see `budget_tracker_8go5=>`)

6. **Open `COPY_THIS_SQL.txt`** in your editor

7. **Copy ALL content**

8. **Paste into terminal** (Cmd+V)

9. **Press Enter**

10. **Wait for completion**

11. **Verify:**
    ```sql
    \dt
    ```

12. **Exit:**
    ```sql
    \q
    ```

---

## ✅ Verification

After running SQL, verify tables exist:

```sql
\dt
```

**Should show:**
```
users
categories
transactions
savings_goals
```

---

## 🐛 Troubleshooting

### "psql: command not found"

**Install psql:**
```bash
# Mac
brew install postgresql

# Or download from postgresql.org
```

### "Connection refused" or "Timeout"

**Check:**
1. Database is running in Render (green status)
2. Connection string is correct
3. No firewall blocking connection

### "Authentication failed"

**Check:**
1. Username is correct: `budget_user`
2. Password is correct (no extra spaces)
3. Database name is correct: `budget_tracker_8go5`

---

## 🎉 Recommended Method

**I recommend Method 2 (Local Terminal)** because:
- ✅ Most reliable
- ✅ Easy to use
- ✅ Works on any system
- ✅ Can verify results easily

---

## 📋 Quick Checklist

- [ ] psql installed locally (or use online tool)
- [ ] Copied connection string from Render
- [ ] Connected to database
- [ ] Copied SQL from `COPY_THIS_SQL.txt`
- [ ] Pasted and ran SQL
- [ ] Verified with `\dt` command
- [ ] Saw 4 tables
- [ ] Tables created successfully! ✅

---

**Try Method 2 (Local Terminal) - it's the easiest!** Let me know if you need help installing psql or connecting.


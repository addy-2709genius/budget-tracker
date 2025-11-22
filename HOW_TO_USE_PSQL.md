# 🖥️ What is psql Terminal and How to Use It

## 📖 What is psql?

**psql** is a command-line tool (terminal) that lets you interact with PostgreSQL databases. Think of it as a way to "talk" to your database directly.

---

## 🎯 Why Do You Need It?

You need psql to:
- Create database tables
- Run SQL commands
- Check if tables exist
- View database structure

---

## 🚀 How to Open psql Terminal in Render

### Method 1: Using Render's Built-in psql (Easiest)

#### Step 1: Go to Your Database Service

1. **Open Render Dashboard**
   - Go to [dashboard.render.com](https://dashboard.render.com)
   - Make sure you're logged in

2. **Find Your Database**
   - Look for your PostgreSQL service
   - Name: `budget-tracker-db` (or your database name)
   - Type: **PostgreSQL**

3. **Click on the Database Service**
   - Click anywhere on that service row
   - You'll be taken to the database service page

#### Step 2: Open psql Terminal

1. **Look for "Connect" Button**
   - At the top right of the page
   - You'll see a button labeled **"Connect"**
   - **Click it**

2. **Select "psql"**
   - A dropdown menu will appear
   - Options might be:
     - **psql** ← Click this one
     - External connection
     - Connection string
   - **Click "psql"**

3. **Terminal Opens**
   - A new window or panel will open
   - You'll see a command prompt like:
     ```
     budget_tracker=>
     ```
   - This is the **psql terminal**!

#### Step 3: You're Ready!

- You can now type SQL commands
- Type `\dt` and press Enter to see tables
- Type SQL and press Enter to run it

---

## 📝 Visual Guide

```
Render Dashboard
    ↓
Click on "budget-tracker-db" (PostgreSQL service)
    ↓
You're on database service page
    ↓
Click "Connect" button (top right)
    ↓
Select "psql" from dropdown
    ↓
Terminal window opens
    ↓
You see: budget_tracker=>
    ↓
You can type SQL commands!
```

---

## 🎯 What to Do in psql Terminal

### 1. Check Existing Tables

Type this and press Enter:
```sql
\dt
```

**What you'll see:**
- If tables exist: List of tables (users, categories, etc.)
- If no tables: "Did not find any relations"

### 2. Create Tables

1. **Open** `server/database/schema_postgresql.sql` from your project
2. **Copy ALL the content** (Cmd+A, then Cmd+C)
3. **Go back to psql terminal**
4. **Paste** the content (Cmd+V or right-click → Paste)
5. **Press Enter**
6. **Wait a few seconds**

**What you'll see:**
- `CREATE TABLE` messages
- `CREATE INDEX` messages
- No errors = Success! ✅

### 3. Verify Tables Were Created

Type and press Enter:
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

### 4. Exit psql (When Done)

Type and press Enter:
```sql
\q
```

Or just close the terminal window.

---

## 🔄 Alternative Method: Query Tab

If you can't find the psql option, use the Query tab:

### Step 1: Open Query Tab

1. **Go to your database service page**
2. **Look for tabs** at the top: Info, Logs, **Query**, Settings, etc.
3. **Click "Query" tab**

### Step 2: Use Query Editor

1. **You'll see a text editor** (like a code editor)
2. **Open** `server/database/schema_postgresql.sql` from your project
3. **Copy ALL content**
4. **Paste into the Query editor**
5. **Click "Run" button** (or press Cmd+Enter / Ctrl+Enter)

### Step 3: Check Results

- You'll see results below
- Should see "Query OK" messages
- No errors = Success! ✅

---

## 🐛 Troubleshooting

### "Connect" Button Not Showing

**Possible reasons:**
1. You're not on the database service page
2. Database is still creating (wait a few minutes)
3. Different Render interface

**Solution:**
- Use **Query tab** instead (see Alternative Method above)

### Can't Paste into psql Terminal

**Try:**
1. Right-click in terminal → Paste
2. Or use keyboard shortcut: Cmd+V (Mac) / Ctrl+V (Windows)
3. Some terminals: Cmd+Shift+V / Ctrl+Shift+V

### Terminal Shows Errors

**Common errors:**
- "relation already exists" = Tables already created (that's OK!)
- "syntax error" = Check your SQL file
- "permission denied" = Check database credentials

**Solution:**
- Read the error message
- Check your SQL syntax
- Verify you're connected to the right database

---

## 📚 Common psql Commands

Here are useful commands you can use:

| Command | What It Does |
|---------|-------------|
| `\dt` | List all tables |
| `\d users` | Show structure of "users" table |
| `\l` | List all databases |
| `\q` | Quit/exit psql |
| `\?` | Show help |
| `SELECT * FROM users;` | Show all users (example SQL) |

---

## ✅ Quick Checklist

- [ ] Found database service in Render
- [ ] Clicked on database service
- [ ] Found "Connect" button
- [ ] Selected "psql" from dropdown
- [ ] Terminal opened (see `budget_tracker=>` prompt)
- [ ] Ready to paste SQL schema!

---

## 🎉 Summary

**psql terminal** = A command-line interface to run SQL commands on your PostgreSQL database.

**How to open:**
1. Database service → "Connect" button → "psql"

**What to do:**
1. Paste your SQL schema
2. Press Enter
3. Tables are created!

**Alternative:**
- Use "Query" tab instead (easier for some people)

---

Need more help? Check `COMPLETE_DEPLOYMENT_GUIDE.md` Step 3 for the full process! 🚀


# Quick Setup Guide

## Step 1: Install MySQL

Make sure MySQL is installed and running on your system.

## Step 2: Create Database

Run the schema file to create the database:

```bash
mysql -u root -p < database/schema.sql
```

Or manually:
1. Open MySQL: `mysql -u root -p`
2. Run: `source database/schema.sql`

## Step 3: Configure Environment

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` with your MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=budget_tracker
   JWT_SECRET=change_this_to_a_random_string
   ```

## Step 4: Install Dependencies

```bash
npm install
```

## Step 5: Start Server

Development mode (auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on `http://localhost:4000`

## Step 6: Connect Frontend

In your frontend `.env` file, set:
```env
VITE_API_URL=http://localhost:4000/api
VITE_USE_MOCK=false
```

## Testing the API

You can test the API using curl or Postman:

### Register a user:
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

### Login:
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Get categories (with token):
```bash
curl -X GET http://localhost:4000/api/categories \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Troubleshooting

**Database connection error:**
- Check MySQL is running: `mysql -u root -p`
- Verify credentials in `.env`
- Ensure database exists: `SHOW DATABASES;`

**Port 4000 already in use:**
- Change PORT in `.env`
- Or kill the process: `lsof -ti:4000 | xargs kill`

**Module not found:**
- Run `npm install` again
- Check Node.js version (should be v18+)


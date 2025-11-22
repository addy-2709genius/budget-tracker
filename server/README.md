# Budget Tracker Backend API

Node.js + Express + MySQL backend for the Budget Tracker application.

## Features

- User authentication (JWT-based)
- Category management (CRUD)
- Transaction management (CRUD)
- Financial summary and analytics
- Secure password hashing with bcrypt
- MySQL database with proper relationships

## Prerequisites

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Setup

### 1. Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials:

```env
PORT=4000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=budget_tracker
DB_PORT=3306

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

**Important:** Change `JWT_SECRET` to a strong random string in production!

### 3. Create Database

Run the SQL schema to create the database and tables:

```bash
mysql -u root -p < database/schema.sql
```

Or manually:

1. Open MySQL client
2. Run the SQL commands from `database/schema.sql`

### 4. Start the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:4000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### Categories (Protected - requires authentication)

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a category
  ```json
  {
    "name": "Groceries",
    "type": "expense",
    "color": "#F06595"
  }
  ```
- `PUT /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category

### Transactions (Protected - requires authentication)

- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create a transaction
  ```json
  {
    "type": "expense",
    "amount": 1500.00,
    "date": "2025-01-15",
    "categoryId": 1,
    "account": "Checking",
    "notes": "Monthly rent",
    "isRecurring": true
  }
  ```
- `PUT /api/transactions/:id` - Update a transaction
- `DELETE /api/transactions/:id` - Delete a transaction
- `GET /api/transactions/summary` - Get financial summary

### Authentication Header

For protected routes, include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Database Schema

### Users
- `id` - Primary key
- `name` - User's full name
- `email` - Unique email address
- `password` - Hashed password
- `created_at`, `updated_at` - Timestamps

### Categories
- `id` - Primary key
- `user_id` - Foreign key to users
- `name` - Category name
- `type` - 'income' or 'expense'
- `color` - Hex color code
- `created_at`, `updated_at` - Timestamps

### Transactions
- `id` - Primary key
- `user_id` - Foreign key to users
- `type` - 'income' or 'expense'
- `amount` - Decimal amount
- `date` - Transaction date
- `category_id` - Foreign key to categories
- `account` - Account name (optional)
- `notes` - Transaction notes (optional)
- `is_recurring` - Boolean flag
- `created_at`, `updated_at` - Timestamps

## Security Features

- Passwords are hashed using bcrypt
- JWT tokens expire after 7 days
- All user data is isolated by user_id
- SQL injection protection via parameterized queries
- CORS enabled for frontend communication

## Error Handling

The API returns standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

Error responses follow this format:
```json
{
  "error": "Error message"
}
```

## Development

### Project Structure

```
server/
├── config/
│   └── database.js       # MySQL connection pool
├── controllers/
│   ├── authController.js
│   ├── categoryController.js
│   └── transactionController.js
├── database/
│   └── schema.sql        # Database schema
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── routes/
│   ├── authRoutes.js
│   ├── categoryRoutes.js
│   └── transactionRoutes.js
├── .env.example
├── package.json
├── server.js            # Main server file
└── README.md
```

## Troubleshooting

### Database Connection Issues

- Verify MySQL is running
- Check database credentials in `.env`
- Ensure database `budget_tracker` exists
- Verify user has proper permissions

### Port Already in Use

Change the `PORT` in `.env` or kill the process using port 4000:
```bash
lsof -ti:4000 | xargs kill
```

### JWT Errors

- Ensure `JWT_SECRET` is set in `.env`
- Check token expiration (default: 7 days)
- Verify token is included in Authorization header

## License

MIT


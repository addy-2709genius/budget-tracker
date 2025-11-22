# View Live Database

To see all users, categories, and transactions in real-time:

```bash
cd server
npm run show-db
```

Or directly:
```bash
node show-live-database.js
```

This will show:
- All users with their details
- All categories with user associations
- All transactions grouped by user with income/expense totals
- Summary statistics

The data is displayed in a formatted, easy-to-read format with:
- User information (name, email, creation date)
- Category details (name, type, color, owner)
- Transaction breakdown per user (with totals and balance)
- Overall statistics


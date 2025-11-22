#!/bin/bash

# Database Setup Script for Budget Tracker
# This script will create the database and tables

echo "📊 Budget Tracker Database Setup"
echo "=================================="
echo ""

# Check if MySQL is available
if [ -f "/usr/local/mysql/bin/mysql" ]; then
    MYSQL_CMD="/usr/local/mysql/bin/mysql"
elif command -v mysql &> /dev/null; then
    MYSQL_CMD="mysql"
else
    echo "❌ MySQL not found. Please install MySQL first."
    exit 1
fi

echo "Please enter your MySQL root password:"
read -s MYSQL_PASSWORD

echo ""
echo "Creating database and tables..."

$MYSQL_CMD -u root -p"$MYSQL_PASSWORD" < database/schema.sql

if [ $? -eq 0 ]; then
    echo "✅ Database setup complete!"
    echo ""
    echo "Next steps:"
    echo "1. Create a .env file in the server directory with your MySQL credentials"
    echo "2. Run: npm run dev"
else
    echo "❌ Database setup failed. Please check your MySQL credentials."
    exit 1
fi


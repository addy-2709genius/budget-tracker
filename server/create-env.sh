#!/bin/bash
if [ ! -f .env ]; then
  cat > .env << 'ENVFILE'
PORT=4000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=budget_tracker
DB_PORT=3306

JWT_SECRET=budget_tracker_super_secret_jwt_key_change_in_production_2025
ENVFILE
  echo "✅ .env file created! Please edit it with your MySQL password."
else
  echo "⚠️  .env file already exists. Skipping creation."
fi

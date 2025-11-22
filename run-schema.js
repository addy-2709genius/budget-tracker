#!/usr/bin/env node

// Script to run PostgreSQL schema using Node.js
import pg from 'pg'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const { Client } = pg

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Connection string from Render
// Format: postgresql://user:password@host:port/database
// If your connection string doesn't have port, add :5432
const connectionString = 'postgresql://budget_user:nvm99rsf23LKDNqwL32iNYHybyZHBKc5@dpg-d4gpr2ili9vc73dpajfg-a.singapore-postgres.render.com:5432/budget_tracker_8go5'

// Read SQL file
const sqlFile = join(__dirname, 'server', 'database', 'schema_postgresql.sql')
const sql = fs.readFileSync(sqlFile, 'utf8')

async function runSchema() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  })

  try {
    console.log('🔌 Connecting to database...')
    await client.connect()
    console.log('✅ Connected!')

    console.log('📝 Running SQL schema...')
    await client.query(sql)
    console.log('✅ Schema executed successfully!')

    // Verify tables
    console.log('🔍 Verifying tables...')
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `)

    console.log('\n📊 Tables created:')
    result.rows.forEach(row => {
      console.log(`   ✅ ${row.table_name}`)
    })

    const expectedTables = ['users', 'categories', 'transactions', 'savings_goals']
    const createdTables = result.rows.map(r => r.table_name)
    const allCreated = expectedTables.every(table => createdTables.includes(table))

    if (allCreated) {
      console.log('\n🎉 All tables created successfully!')
    } else {
      console.log('\n⚠️  Some tables might be missing. Check above.')
    }

  } catch (error) {
    console.error('❌ Error:', error.message)
    if (error.message.includes('already exists')) {
      console.log('ℹ️  Tables already exist. That\'s okay!')
    }
    process.exit(1)
  } finally {
    await client.end()
    console.log('\n👋 Disconnected from database.')
  }
}

runSchema()


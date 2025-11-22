#!/usr/bin/env node

// Test script to diagnose backend connection issues
import pg from 'pg'

const { Client } = pg

// Get connection details from environment or use the connection string
const connectionString = process.env.DATABASE_URL || 
  'postgresql://budget_user:nvm99rsf23LKDNqwL32iNYHybyZHBKc5@dpg-d4gpr2ili9vc73dpajfg-a.singapore-postgres.render.com:5432/budget_tracker_8go5'

async function testConnection() {
  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
  })

  try {
    console.log('🔌 Testing database connection...')
    await client.connect()
    console.log('✅ Connected to database!')

    console.log('\n📊 Testing queries...')
    
    // Test 1: Check if users table exists
    const tableCheck = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name = 'users';
    `)
    console.log(`✅ Users table exists: ${tableCheck.rows.length > 0}`)

    // Test 2: Try to query users table
    const userQuery = await client.query('SELECT COUNT(*) as count FROM users')
    console.log(`✅ Can query users table: ${userQuery.rows[0].count} users`)

    // Test 3: Try to insert a test user (then delete it)
    console.log('\n🧪 Testing INSERT query...')
    const insertResult = await client.query(`
      INSERT INTO users (name, email, password) 
      VALUES ($1, $2, $3) 
      RETURNING id
    `, ['Test User', `test-${Date.now()}@test.com`, 'hashed_password'])
    
    const testUserId = insertResult.rows[0].id
    console.log(`✅ Can insert into users table: ID = ${testUserId}`)

    // Clean up test user
    await client.query('DELETE FROM users WHERE id = $1', [testUserId])
    console.log('✅ Can delete from users table')

    console.log('\n🎉 All database operations working!')
    console.log('\n💡 If signup still fails, check:')
    console.log('   1. JWT_SECRET is set in backend environment variables')
    console.log('   2. Backend logs for specific error messages')
    console.log('   3. All DB_* environment variables are correct')

  } catch (error) {
    console.error('❌ Error:', error.message)
    console.error('\n🔍 Error details:')
    console.error(error)
    
    if (error.message.includes('password authentication')) {
      console.log('\n💡 Fix: Check DB_USER and DB_PASSWORD in backend environment variables')
    } else if (error.message.includes('does not exist')) {
      console.log('\n💡 Fix: Database or table does not exist. Run: node run-schema.js')
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Fix: Check DB_HOST in backend environment variables')
    }
  } finally {
    await client.end()
  }
}

testConnection()


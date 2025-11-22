import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config()

async function setupDatabase() {
  try {
    console.log('📊 Setting up Budget Tracker database...\n')

    // Create connection without database first
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: parseInt(process.env.DB_PORT || '3306'),
    })

    console.log('✅ Connected to MySQL server')

    // Read and execute schema
    const schemaPath = join(__dirname, 'database', 'schema.sql')
    const schema = readFileSync(schemaPath, 'utf-8')

    // Create database first
    console.log('📦 Creating database...')
    await connection.query('CREATE DATABASE IF NOT EXISTS budget_tracker')
    
    // Switch to database
    console.log('🔄 Switching to database...')
    await connection.query('USE budget_tracker')

    // Read schema and execute all statements
    const statements = schema
      .split(';')
      .map((s) => s.trim())
      .filter((s) => {
        const lower = s.toLowerCase()
        return s.length > 0 && 
               !s.startsWith('--') && 
               !lower.includes('create database') && 
               !lower.includes('use ')
      })

    for (const statement of statements) {
      if (statement.length > 0) {
        const lower = statement.toLowerCase()
        if (lower.includes('create table')) {
          const tableMatch = statement.match(/create table.*?if not exists.*?`?(\w+)`?/i) || 
                            statement.match(/create table.*?`?(\w+)`?/i)
          const tableName = tableMatch ? tableMatch[1] : 'table'
          console.log(`📋 Creating table: ${tableName}...`)
        }
        try {
          await connection.query(statement)
        } catch (err) {
          if (!err.message.includes('already exists')) {
            console.error(`   Error: ${err.message}`)
          }
        }
      }
    }

    await connection.end()

    console.log('\n✅ Database setup complete!')
    console.log('\nNext: Start the server with: npm run dev')
  } catch (error) {
    console.error('\n❌ Database setup failed:')
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('   Authentication failed. Please check your MySQL password in .env')
    } else if (error.code === 'ECONNREFUSED') {
      console.error('   Cannot connect to MySQL. Make sure MySQL is running.')
    } else {
      console.error('   Error:', error.message)
    }
    process.exit(1)
  }
}

setupDatabase()


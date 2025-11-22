import mysql from 'mysql2/promise'
import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Pool: PgPool } = pg

// Determine database type from environment or port
const dbType = process.env.DB_TYPE || (process.env.DB_PORT === '5432' ? 'postgresql' : 'mysql')

let basePool
let isPostgres = false

if (dbType === 'postgresql') {
  // PostgreSQL connection (for Render)
  isPostgres = true
  const connectionString = process.env.DATABASE_URL || 
    `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME}`
  
  basePool = new PgPool({
    connectionString,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  })
} else {
  // MySQL connection (for local development)
  basePool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'budget_tracker',
    port: parseInt(process.env.DB_PORT || '3306'),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
}

// Create adapter to make PostgreSQL work like MySQL
const pool = {
  ...basePool,
  execute: async (query, params = []) => {
    if (isPostgres) {
      // Convert MySQL ? placeholders to PostgreSQL $1, $2, etc.
      let paramIndex = 1
      let pgQuery = query.replace(/\?/g, () => `$${paramIndex++}`)
      
      // For INSERT queries, add RETURNING id to get the inserted ID
      if (query.trim().toUpperCase().startsWith('INSERT') && !pgQuery.includes('RETURNING')) {
        pgQuery = pgQuery.replace(/;?\s*$/, '') + ' RETURNING id'
      }
      
      // Execute query
      const result = await basePool.query(pgQuery, params)
      
      // Convert PostgreSQL result to MySQL format [result, fields]
      const fields = result.fields || []
      
      // For INSERT queries, create result object with insertId (like MySQL)
      if (query.trim().toUpperCase().startsWith('INSERT')) {
        let insertId = null
        if (result.rows && result.rows.length > 0 && result.rows[0].id) {
          insertId = parseInt(result.rows[0].id)
        } else {
          // Fallback: get last inserted ID from sequence
          try {
            const idResult = await basePool.query('SELECT LASTVAL() as id')
            if (idResult.rows && idResult.rows[0]) {
              insertId = parseInt(idResult.rows[0].id)
            }
          } catch (e) {
            console.warn('Could not get insertId:', e.message)
          }
        }
        
        // Create result object similar to MySQL format
        const resultObj = {
          insertId: insertId,
          affectedRows: result.rowCount || 1,
        }
        
        return [resultObj, fields]
      }
      
      // For SELECT and other queries, return rows array
      return [result.rows || [], fields]
    } else {
      // MySQL - use execute directly
      return await basePool.execute(query, params)
    }
  },
  query: async (query, params = []) => {
    if (isPostgres) {
      let paramIndex = 1
      const pgQuery = query.replace(/\?/g, () => `$${paramIndex++}`)
      const result = await basePool.query(pgQuery, params)
      return [result.rows || [], result.fields || []]
    } else {
      return await basePool.query(query, params)
    }
  }
}

export default pool


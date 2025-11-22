import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

async function showDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'budget_tracker',
      port: parseInt(process.env.DB_PORT || '3306'),
    })

    console.log('\n📊 Budget Tracker Database')
    console.log('='.repeat(60))
    
    // Show tables
    const [tables] = await connection.query('SHOW TABLES')
    console.log('\n📋 Tables:')
    tables.forEach((t) => console.log(`   • ${Object.values(t)[0]}`))
    
    // Show structure and data for each table
    for (const table of tables) {
      const tableName = Object.values(table)[0]
      console.log(`\n${'='.repeat(60)}`)
      console.log(`\n📊 Table: ${tableName}`)
      console.log('-'.repeat(60))
      
      // Show structure
      const [structure] = await connection.query(`DESCRIBE ${tableName}`)
      console.log('\nStructure:')
      structure.forEach((col) => {
        console.log(`   ${col.Field.padEnd(20)} ${col.Type.padEnd(20)} ${col.Null} ${col.Key} ${col.Default || ''}`)
      })
      
      // Show row count
      const [count] = await connection.query(`SELECT COUNT(*) as count FROM ${tableName}`)
      const rowCount = count[0].count
      console.log(`\n📈 Total rows: ${rowCount}`)
      
      // Show sample data if any
      if (rowCount > 0) {
        const [data] = await connection.query(`SELECT * FROM ${tableName} LIMIT 10`)
        console.log(`\n📝 Sample data (showing ${data.length} of ${rowCount}):`)
        console.log(JSON.stringify(data, null, 2))
      } else {
        console.log('\n📝 No data yet')
      }
    }
    
    await connection.end()
    console.log('\n' + '='.repeat(60))
    console.log('✅ Database query complete\n')
  } catch (error) {
    console.error('\n❌ Error:', error.message)
    process.exit(1)
  }
}

showDatabase()


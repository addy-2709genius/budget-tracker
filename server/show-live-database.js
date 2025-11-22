import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

async function showLiveDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'budget_tracker',
      port: parseInt(process.env.DB_PORT || '3306'),
    })

    console.log('\n' + '='.repeat(80))
    console.log('📊 LIVE BUDGET TRACKER DATABASE')
    console.log('='.repeat(80) + '\n')

    // Get all users
    const [users] = await connection.query('SELECT * FROM users ORDER BY created_at DESC')
    
    console.log(`👥 USERS (${users.length} total)\n`)
    console.log('-'.repeat(80))
    
    if (users.length === 0) {
      console.log('   No users found in database.\n')
    } else {
      users.forEach((user, index) => {
        console.log(`\n${index + 1}. User ID: ${user.id}`)
        console.log(`   Name: ${user.name}`)
        console.log(`   Email: ${user.email}`)
        console.log(`   Provider: ${user.provider || 'local'}`)
        console.log(`   Created: ${user.created_at.toLocaleString()}`)
        console.log(`   Updated: ${user.updated_at.toLocaleString()}`)
      })
    }

    // Get all categories
    const [categories] = await connection.query(`
      SELECT c.*, u.name as user_name, u.email as user_email 
      FROM categories c 
      LEFT JOIN users u ON c.user_id = u.id 
      ORDER BY c.created_at DESC
    `)
    
    console.log('\n' + '='.repeat(80))
    console.log(`📁 CATEGORIES (${categories.length} total)\n`)
    console.log('-'.repeat(80))
    
    if (categories.length === 0) {
      console.log('   No categories found.\n')
    } else {
      categories.forEach((cat, index) => {
        console.log(`\n${index + 1}. Category ID: ${cat.id}`)
        console.log(`   Name: ${cat.name}`)
        console.log(`   Type: ${cat.type}`)
        console.log(`   Color: ${cat.color}`)
        console.log(`   User: ${cat.user_name} (${cat.user_email})`)
        console.log(`   Created: ${cat.created_at.toLocaleString()}`)
      })
    }

    // Get all transactions with user and category info
    const [transactions] = await connection.query(`
      SELECT 
        t.*,
        u.name as user_name,
        u.email as user_email,
        c.name as category_name,
        c.type as category_type
      FROM transactions t
      LEFT JOIN users u ON t.user_id = u.id
      LEFT JOIN categories c ON t.category_id = c.id
      ORDER BY t.date DESC, t.created_at DESC
    `)
    
    console.log('\n' + '='.repeat(80))
    console.log(`💰 TRANSACTIONS (${transactions.length} total)\n`)
    console.log('-'.repeat(80))
    
    if (transactions.length === 0) {
      console.log('   No transactions found.\n')
    } else {
      // Group by user
      const transactionsByUser = {}
      transactions.forEach((txn) => {
        const userId = txn.user_id
        if (!transactionsByUser[userId]) {
          transactionsByUser[userId] = {
            user: `${txn.user_name} (${txn.user_email})`,
            transactions: [],
            totalIncome: 0,
            totalExpense: 0,
          }
        }
        transactionsByUser[userId].transactions.push(txn)
        const amount = parseFloat(txn.amount)
        if (txn.type === 'income') {
          transactionsByUser[userId].totalIncome += amount
        } else {
          transactionsByUser[userId].totalExpense += amount
        }
      })

      Object.entries(transactionsByUser).forEach(([userId, data], userIndex) => {
        console.log(`\n👤 USER: ${data.user}`)
        console.log(`   Total Income: ₹${data.totalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`)
        console.log(`   Total Expense: ₹${data.totalExpense.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`)
        console.log(`   Balance: ₹${(data.totalIncome - data.totalExpense).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`)
        console.log(`   Transactions: ${data.transactions.length}`)
        console.log('\n   Transaction Details:')
        
        data.transactions.forEach((txn, txnIndex) => {
          const amount = parseFloat(txn.amount)
          const sign = txn.type === 'income' ? '+' : '-'
          const color = txn.type === 'income' ? '🟢' : '🔴'
          console.log(`   ${txnIndex + 1}. ${color} ${txn.category_name || 'Uncategorized'}`)
          console.log(`      ${sign}₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`)
          console.log(`      Date: ${txn.date.toISOString().split('T')[0]}`)
          if (txn.account) console.log(`      Account: ${txn.account}`)
          if (txn.notes) console.log(`      Notes: ${txn.notes}`)
          console.log(`      Recurring: ${txn.is_recurring ? 'Yes' : 'No'}`)
          console.log(`      Created: ${txn.created_at.toLocaleString()}`)
          if (txnIndex < data.transactions.length - 1) console.log('')
        })
      })
    }

    // Summary statistics
    console.log('\n' + '='.repeat(80))
    console.log('📈 SUMMARY STATISTICS\n')
    console.log('-'.repeat(80))
    
    const [stats] = await connection.query(`
      SELECT 
        COUNT(DISTINCT u.id) as total_users,
        COUNT(DISTINCT c.id) as total_categories,
        COUNT(t.id) as total_transactions,
        SUM(CASE WHEN t.type = 'income' THEN t.amount ELSE 0 END) as total_income,
        SUM(CASE WHEN t.type = 'expense' THEN t.amount ELSE 0 END) as total_expense
      FROM users u
      LEFT JOIN categories c ON u.id = c.user_id
      LEFT JOIN transactions t ON u.id = t.user_id
    `)
    
    const stat = stats[0]
    const totalIncome = parseFloat(stat.total_income || 0)
    const totalExpense = parseFloat(stat.total_expense || 0)
    const netBalance = totalIncome - totalExpense
    
    console.log(`Total Users: ${stat.total_users}`)
    console.log(`Total Categories: ${stat.total_categories}`)
    console.log(`Total Transactions: ${stat.total_transactions}`)
    console.log(`Total Income: ₹${totalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`)
    console.log(`Total Expense: ₹${totalExpense.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`)
    console.log(`Net Balance: ₹${netBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`)
    
    console.log('\n' + '='.repeat(80))
    console.log('✅ Database query complete\n')

    await connection.end()
  } catch (error) {
    console.error('\n❌ Error:', error.message)
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('   Check your MySQL credentials in .env file')
    } else if (error.code === 'ECONNREFUSED') {
      console.error('   Cannot connect to MySQL. Make sure MySQL is running.')
    }
    process.exit(1)
  }
}

showLiveDatabase()


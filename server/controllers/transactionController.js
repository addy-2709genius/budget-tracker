import pool from '../config/database.js'
import { format, subMonths, eachMonthOfInterval, startOfMonth, endOfMonth, parseISO } from 'date-fns'

export const getTransactions = async (req, res) => {
  try {
    const [transactions] = await pool.execute(
      `SELECT t.*, c.name as category_name, c.color as category_color 
       FROM transactions t 
       LEFT JOIN categories c ON t.category_id = c.id 
       WHERE t.user_id = ? 
       ORDER BY t.date DESC, t.created_at DESC`,
      [req.userId]
    )

    const formatted = transactions.map((txn) => ({
      id: txn.id,
      type: txn.type,
      amount: parseFloat(txn.amount),
      date: txn.date.toISOString().split('T')[0],
      categoryId: txn.category_id,
      categoryName: txn.category_name,
      account: txn.account,
      notes: txn.notes,
      isRecurring: Boolean(txn.is_recurring),
    }))

    res.json(formatted)
  } catch (error) {
    console.error('Get transactions error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const createTransaction = async (req, res) => {
  try {
    const { type, amount, date, categoryId, account, notes, isRecurring } = req.body

    if (!type || !amount || !date || !categoryId) {
      return res.status(400).json({ error: 'Type, amount, date, and categoryId are required' })
    }

    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ error: 'Type must be either income or expense' })
    }

    // Verify category belongs to user
    const [categories] = await pool.execute('SELECT * FROM categories WHERE id = ? AND user_id = ?', [
      categoryId,
      req.userId,
    ])
    if (categories.length === 0) {
      return res.status(404).json({ error: 'Category not found' })
    }

    const [result] = await pool.execute(
      `INSERT INTO transactions (user_id, type, amount, date, category_id, account, notes, is_recurring) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [req.userId, type, amount, date, categoryId, account || null, notes || null, isRecurring || false]
    )

    const [newTransaction] = await pool.execute(
      `SELECT t.*, c.name as category_name 
       FROM transactions t 
       LEFT JOIN categories c ON t.category_id = c.id 
       WHERE t.id = ?`,
      [result.insertId]
    )

    const txn = newTransaction[0]
    res.status(201).json({
      id: txn.id,
      type: txn.type,
      amount: parseFloat(txn.amount),
      date: txn.date.toISOString().split('T')[0],
      categoryId: txn.category_id,
      categoryName: txn.category_name,
      account: txn.account,
      notes: txn.notes,
      isRecurring: Boolean(txn.is_recurring),
    })
  } catch (error) {
    console.error('Create transaction error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params
    const { type, amount, date, categoryId, account, notes, isRecurring } = req.body

    // Verify transaction belongs to user
    const [transactions] = await pool.execute('SELECT * FROM transactions WHERE id = ? AND user_id = ?', [
      id,
      req.userId,
    ])
    if (transactions.length === 0) {
      return res.status(404).json({ error: 'Transaction not found' })
    }

    // If categoryId is being updated, verify it belongs to user
    if (categoryId !== undefined) {
      const [categories] = await pool.execute('SELECT * FROM categories WHERE id = ? AND user_id = ?', [
        categoryId,
        req.userId,
      ])
      if (categories.length === 0) {
        return res.status(404).json({ error: 'Category not found' })
      }
    }

    const updates = []
    const values = []

    if (type !== undefined) {
      if (!['income', 'expense'].includes(type)) {
        return res.status(400).json({ error: 'Type must be either income or expense' })
      }
      updates.push('type = ?')
      values.push(type)
    }
    if (amount !== undefined) {
      updates.push('amount = ?')
      values.push(amount)
    }
    if (date !== undefined) {
      updates.push('date = ?')
      values.push(date)
    }
    if (categoryId !== undefined) {
      updates.push('category_id = ?')
      values.push(categoryId)
    }
    if (account !== undefined) {
      updates.push('account = ?')
      values.push(account)
    }
    if (notes !== undefined) {
      updates.push('notes = ?')
      values.push(notes)
    }
    if (isRecurring !== undefined) {
      updates.push('is_recurring = ?')
      values.push(isRecurring)
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' })
    }

    values.push(id, req.userId)

    await pool.execute(`UPDATE transactions SET ${updates.join(', ')} WHERE id = ? AND user_id = ?`, values)

    const [updated] = await pool.execute(
      `SELECT t.*, c.name as category_name 
       FROM transactions t 
       LEFT JOIN categories c ON t.category_id = c.id 
       WHERE t.id = ?`,
      [id]
    )

    const txn = updated[0]
    res.json({
      id: txn.id,
      type: txn.type,
      amount: parseFloat(txn.amount),
      date: txn.date.toISOString().split('T')[0],
      categoryId: txn.category_id,
      categoryName: txn.category_name,
      account: txn.account,
      notes: txn.notes,
      isRecurring: Boolean(txn.is_recurring),
    })
  } catch (error) {
    console.error('Update transaction error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params

    // Verify transaction belongs to user
    const [transactions] = await pool.execute('SELECT * FROM transactions WHERE id = ? AND user_id = ?', [
      id,
      req.userId,
    ])
    if (transactions.length === 0) {
      return res.status(404).json({ error: 'Transaction not found' })
    }

    await pool.execute('DELETE FROM transactions WHERE id = ? AND user_id = ?', [id, req.userId])

    res.json({ success: true })
  } catch (error) {
    console.error('Delete transaction error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getSummary = async (req, res) => {
  try {
    // Get all transactions for user
    const [transactions] = await pool.execute(
      `SELECT t.*, c.name as category_name, c.color as category_color 
       FROM transactions t 
       LEFT JOIN categories c ON t.category_id = c.id 
       WHERE t.user_id = ?`,
      [req.userId]
    )

    // Calculate totals
    let totalIncome = 0
    let totalExpense = 0

    transactions.forEach((txn) => {
      const amount = parseFloat(txn.amount)
      if (txn.type === 'income') {
        totalIncome += amount
      } else {
        totalExpense += amount
      }
    })

    const totalBalance = totalIncome - totalExpense

    // Calculate monthly totals (current month)
    const now = new Date()
    const currentMonth = format(now, 'yyyy-MM')
    let monthlyIncome = 0
    let monthlyExpense = 0

    transactions.forEach((txn) => {
      const txnDate = txn.date.toISOString().split('T')[0]
      if (txnDate.startsWith(currentMonth)) {
        const amount = parseFloat(txn.amount)
        if (txn.type === 'income') {
          monthlyIncome += amount
        } else {
          monthlyExpense += amount
        }
      }
    })

    // Calculate monthly trend (last 6 months)
    const startWindow = startOfMonth(subMonths(now, 5))
    const months = eachMonthOfInterval({ start: startWindow, end: endOfMonth(now) })

    const monthlyTrend = months.map((monthDate) => {
      const monthKey = format(monthDate, 'yyyy-MM')
      let income = 0
      let expense = 0

      transactions.forEach((txn) => {
        const txnDate = txn.date.toISOString().split('T')[0]
        if (txnDate.startsWith(monthKey)) {
          const amount = parseFloat(txn.amount)
          if (txn.type === 'income') {
            income += amount
          } else {
            expense += amount
          }
        }
      })

      return {
        month: format(monthDate, 'LLL yyyy'),
        income,
        expense,
      }
    })

    // Calculate category breakdown (expenses only)
    const categoryTotals = {}
    transactions.forEach((txn) => {
      if (txn.type === 'expense') {
        const key = txn.category_id
        if (!categoryTotals[key]) {
          categoryTotals[key] = {
            categoryId: txn.category_id,
            category: txn.category_name || 'Uncategorized',
            categoryName: txn.category_name || 'Uncategorized',
            color: txn.category_color || '#4C6EF5',
            amount: 0,
          }
        }
        categoryTotals[key].amount += parseFloat(txn.amount)
      }
    })

    const categoryBreakdown = Object.values(categoryTotals).sort((a, b) => b.amount - a.amount)

    res.json({
      totalBalance,
      totalIncome,
      totalExpense,
      monthlyIncome,
      monthlyExpense,
      monthlyTrend,
      categoryBreakdown,
    })
  } catch (error) {
    console.error('Get summary error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}


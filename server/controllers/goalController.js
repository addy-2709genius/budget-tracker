import pool from '../config/database.js'

export const getGoals = async (req, res) => {
  try {
    const [goals] = await pool.execute(
      'SELECT * FROM savings_goals WHERE user_id = ? ORDER BY target_date ASC, created_at DESC',
      [req.userId]
    )

    const formatted = goals.map((goal) => ({
      id: goal.id,
      title: goal.title,
      targetAmount: parseFloat(goal.target_amount) || 0,
      currentAmount: parseFloat(goal.current_amount) || 0,
      targetDate: goal.target_date ? goal.target_date.toISOString().split('T')[0] : null,
      description: goal.description || null,
      createdAt: goal.created_at ? goal.created_at.toISOString() : null,
      updatedAt: goal.updated_at ? goal.updated_at.toISOString() : null,
    }))

    res.json(formatted)
  } catch (error) {
    console.error('Get goals error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const createGoal = async (req, res) => {
  try {
    const { title, targetAmount, currentAmount, targetDate, description } = req.body

    if (!title || !targetAmount || !targetDate) {
      return res.status(400).json({ error: 'Title, target amount, and target date are required' })
    }

    const [result] = await pool.execute(
      'INSERT INTO savings_goals (user_id, title, target_amount, current_amount, target_date, description) VALUES (?, ?, ?, ?, ?, ?)',
      [req.userId, title, targetAmount, currentAmount || 0, targetDate, description || null]
    )

    const [newGoal] = await pool.execute('SELECT * FROM savings_goals WHERE id = ?', [result.insertId])

    const goal = newGoal[0]
    res.status(201).json({
      id: goal.id,
      title: goal.title,
      targetAmount: parseFloat(goal.target_amount) || 0,
      currentAmount: parseFloat(goal.current_amount) || 0,
      targetDate: goal.target_date ? goal.target_date.toISOString().split('T')[0] : null,
      description: goal.description || null,
      createdAt: goal.created_at ? goal.created_at.toISOString() : null,
      updatedAt: goal.updated_at ? goal.updated_at.toISOString() : null,
    })
  } catch (error) {
    console.error('Create goal error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateGoal = async (req, res) => {
  try {
    const { id } = req.params
    const { title, targetAmount, currentAmount, targetDate, description } = req.body

    // Verify goal belongs to user
    const [goals] = await pool.execute('SELECT * FROM savings_goals WHERE id = ? AND user_id = ?', [id, req.userId])
    if (goals.length === 0) {
      return res.status(404).json({ error: 'Goal not found' })
    }

    const updates = []
    const values = []

    if (title !== undefined) {
      updates.push('title = ?')
      values.push(title)
    }
    if (targetAmount !== undefined) {
      updates.push('target_amount = ?')
      values.push(targetAmount)
    }
    if (currentAmount !== undefined) {
      updates.push('current_amount = ?')
      values.push(currentAmount)
    }
    if (targetDate !== undefined) {
      updates.push('target_date = ?')
      values.push(targetDate)
    }
    if (description !== undefined) {
      updates.push('description = ?')
      values.push(description)
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' })
    }

    values.push(id, req.userId)

    await pool.execute(`UPDATE savings_goals SET ${updates.join(', ')} WHERE id = ? AND user_id = ?`, values)

    const [updated] = await pool.execute('SELECT * FROM savings_goals WHERE id = ?', [id])

    const goal = updated[0]
    res.json({
      id: goal.id,
      title: goal.title,
      targetAmount: parseFloat(goal.target_amount) || 0,
      currentAmount: parseFloat(goal.current_amount) || 0,
      targetDate: goal.target_date ? goal.target_date.toISOString().split('T')[0] : null,
      description: goal.description || null,
      createdAt: goal.created_at ? goal.created_at.toISOString() : null,
      updatedAt: goal.updated_at ? goal.updated_at.toISOString() : null,
    })
  } catch (error) {
    console.error('Update goal error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params

    // Verify goal belongs to user
    const [goals] = await pool.execute('SELECT * FROM savings_goals WHERE id = ? AND user_id = ?', [id, req.userId])
    if (goals.length === 0) {
      return res.status(404).json({ error: 'Goal not found' })
    }

    await pool.execute('DELETE FROM savings_goals WHERE id = ? AND user_id = ?', [id, req.userId])

    res.json({ success: true })
  } catch (error) {
    console.error('Delete goal error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}


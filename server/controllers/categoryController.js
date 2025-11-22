import pool from '../config/database.js'

export const getCategories = async (req, res) => {
  try {
    const [categories] = await pool.execute('SELECT * FROM categories WHERE user_id = ? ORDER BY created_at DESC', [
      req.userId,
    ])

    const formatted = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      type: cat.type,
      color: cat.color,
    }))

    res.json(formatted)
  } catch (error) {
    console.error('Get categories error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const createCategory = async (req, res) => {
  try {
    const { name, type, color } = req.body

    if (!name || !type) {
      return res.status(400).json({ error: 'Name and type are required' })
    }

    if (!['income', 'expense'].includes(type)) {
      return res.status(400).json({ error: 'Type must be either income or expense' })
    }

    const [result] = await pool.execute(
      'INSERT INTO categories (user_id, name, type, color) VALUES (?, ?, ?, ?)',
      [req.userId, name, type, color || '#4C6EF5']
    )

    const [newCategory] = await pool.execute('SELECT * FROM categories WHERE id = ?', [result.insertId])

    res.status(201).json({
      id: newCategory[0].id,
      name: newCategory[0].name,
      type: newCategory[0].type,
      color: newCategory[0].color,
    })
  } catch (error) {
    console.error('Create category error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params
    const { name, type, color } = req.body

    // Verify category belongs to user
    const [categories] = await pool.execute('SELECT * FROM categories WHERE id = ? AND user_id = ?', [id, req.userId])
    if (categories.length === 0) {
      return res.status(404).json({ error: 'Category not found' })
    }

    const updates = []
    const values = []

    if (name !== undefined) {
      updates.push('name = ?')
      values.push(name)
    }
    if (type !== undefined) {
      if (!['income', 'expense'].includes(type)) {
        return res.status(400).json({ error: 'Type must be either income or expense' })
      }
      updates.push('type = ?')
      values.push(type)
    }
    if (color !== undefined) {
      updates.push('color = ?')
      values.push(color)
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No fields to update' })
    }

    values.push(id, req.userId)

    await pool.execute(`UPDATE categories SET ${updates.join(', ')} WHERE id = ? AND user_id = ?`, values)

    const [updated] = await pool.execute('SELECT * FROM categories WHERE id = ?', [id])

    res.json({
      id: updated[0].id,
      name: updated[0].name,
      type: updated[0].type,
      color: updated[0].color,
    })
  } catch (error) {
    console.error('Update category error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params

    // Verify category belongs to user
    const [categories] = await pool.execute('SELECT * FROM categories WHERE id = ? AND user_id = ?', [id, req.userId])
    if (categories.length === 0) {
      return res.status(404).json({ error: 'Category not found' })
    }

    // Check if category is used in transactions
    const [transactions] = await pool.execute('SELECT id FROM transactions WHERE category_id = ? LIMIT 1', [id])
    if (transactions.length > 0) {
      return res.status(400).json({ error: 'Cannot delete category with existing transactions' })
    }

    await pool.execute('DELETE FROM categories WHERE id = ? AND user_id = ?', [id, req.userId])

    res.json({ success: true })
  } catch (error) {
    console.error('Delete category error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}


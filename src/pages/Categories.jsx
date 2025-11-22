import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CategoryForm from '../components/CategoryForm'
import { api } from '../services/api'

const Categories = () => {
  const [categories, setCategories] = useState([])
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadCategories = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.getCategories()
      setCategories(data)
    } catch (err) {
      setError(err.message || 'Unable to load categories.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const handleCreate = async (payload) => {
    try {
      const newCategory = await api.createCategory(payload)
      setCategories((prev) => [newCategory, ...prev])
    } catch (err) {
      setError(err.message || 'Unable to create category.')
    }
  }

  const handleUpdate = async (payload) => {
    try {
      const updated = await api.updateCategory(editing.id, payload)
      setCategories((prev) => prev.map((cat) => (cat.id === editing.id ? updated : cat)))
      setEditing(null)
    } catch (err) {
      setError(err.message || 'Unable to update category.')
    }
  }

  const handleDelete = async (id) => {
    const confirmed = confirm('Delete this category?')
    if (!confirmed) return
    try {
      await api.deleteCategory(id)
      setCategories((prev) => prev.filter((cat) => cat.id !== id))
    } catch (err) {
      setError(err.message || 'Unable to delete category.')
    }
  }

  const handleSubmit = (payload) => {
    if (editing) {
      handleUpdate(payload)
    } else {
      handleCreate(payload)
    }
  }

  return (
    <motion.section
      className="page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
    >
      <div className="page__header">
        <div>
          <h1>Categories</h1>
          <p className="muted">Organize how you track spending.</p>
        </div>
      </div>

      {error ? <div className="card error-card">{error}</div> : null}

      <div className="card">
        <h3>{editing ? 'Edit category' : 'Create category'}</h3>
        <CategoryForm
          initialData={editing}
          onSubmit={handleSubmit}
          onCancel={editing ? () => setEditing(null) : undefined}
        />
      </div>

      {loading ? (
        <div className="card loading-card">
          <p>Loading categories...</p>
        </div>
      ) : (
        <div className="category-grid">
          {categories.map((category) => (
            <article key={category.id} className="card category-card">
              <div className="category-card__header">
                <div className="category-dot" style={{ background: category.color }} />
                <div>
                  <h4>{category.name}</h4>
                  <p className="muted">{category.type}</p>
                </div>
              </div>
              <div className="category-card__actions">
                <button className="btn btn--ghost" onClick={() => setEditing(category)}>
                  Edit
                </button>
                <button className="btn btn--danger" onClick={() => handleDelete(category.id)}>
                  Delete
                </button>
              </div>
            </article>
          ))}
          {!categories.length ? <p className="muted">No categories yet.</p> : null}
        </div>
      )}
    </motion.section>
  )
}

export default Categories


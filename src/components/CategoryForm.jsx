import { useEffect, useState } from 'react'

const DEFAULT_CATEGORY = {
  name: '',
  type: 'expense',
  color: '#4C6EF5',
}

const CategoryForm = ({ onSubmit, onCancel, initialData }) => {
  const [form, setForm] = useState(DEFAULT_CATEGORY)

  useEffect(() => {
    if (initialData) {
      setForm({
        ...DEFAULT_CATEGORY,
        ...initialData,
      })
    } else {
      setForm(DEFAULT_CATEGORY)
    }
  }, [initialData])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.name) return
    onSubmit(form)
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__grid">
        <label className="form__field">
          <span>Name</span>
          <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Insurance" />
        </label>

        <label className="form__field">
          <span>Type</span>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>

        <label className="form__field">
          <span>Color</span>
          <input type="color" name="color" value={form.color} onChange={handleChange} />
        </label>
      </div>

      <div className="form__actions">
        {onCancel ? (
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
        <button className="btn" type="submit">
          {initialData ? 'Update Category' : 'Add Category'}
        </button>
      </div>
    </form>
  )
}

export default CategoryForm


import { useState, useEffect } from 'react'

const GoalForm = ({ initialData, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '',
    targetDate: '',
    description: '',
  })

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || '',
        targetAmount: initialData.targetAmount || '',
        currentAmount: initialData.currentAmount || '',
        targetDate: initialData.targetDate || '',
        description: initialData.description || '',
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      title: form.title,
      targetAmount: parseFloat(form.targetAmount),
      currentAmount: parseFloat(form.currentAmount) || 0,
      targetDate: form.targetDate,
      description: form.description,
    })
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form__field">
        <span>Goal Title</span>
        <input
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="e.g., Save ₹50,000 by Jan 2026"
          required
        />
      </label>

      <div className="form__row">
        <label className="form__field">
          <span>Target Amount (₹)</span>
          <input
            name="targetAmount"
            type="number"
            step="0.01"
            min="0"
            value={form.targetAmount}
            onChange={handleChange}
            placeholder="50000"
            required
          />
        </label>

        <label className="form__field">
          <span>Current Amount (₹)</span>
          <input
            name="currentAmount"
            type="number"
            step="0.01"
            min="0"
            value={form.currentAmount}
            onChange={handleChange}
            placeholder="0"
          />
        </label>
      </div>

      <label className="form__field">
        <span>Target Date</span>
        <input name="targetDate" type="date" value={form.targetDate} onChange={handleChange} required />
      </label>

      <label className="form__field">
        <span>Description (Optional)</span>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Add notes about this goal..."
          rows="3"
        />
      </label>

      <div className="form__actions">
        <button className="btn" type="submit">
          {initialData ? 'Update Goal' : 'Create Goal'}
        </button>
        {onCancel && (
          <button className="btn btn--ghost" type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}

export default GoalForm


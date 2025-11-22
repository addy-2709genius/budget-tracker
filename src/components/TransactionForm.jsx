import { useEffect, useState } from 'react'
import { format } from 'date-fns'

const defaultForm = {
  type: 'expense',
  amount: '',
  date: format(new Date(), 'yyyy-MM-dd'),
  categoryId: '',
  account: '',
  notes: '',
  isRecurring: false,
}

const normalizeNumber = (value) => (value === '' ? '' : Number(value))

const TransactionForm = ({ categories = [], onSubmit, onCancel, initialData }) => {
  const [form, setForm] = useState(defaultForm)

  useEffect(() => {
    if (initialData) {
      setForm({
        ...defaultForm,
        ...initialData,
        amount: String(initialData.amount),
        date: initialData.date ? initialData.date.slice(0, 10) : defaultForm.date,
      })
    } else {
      setForm(defaultForm)
    }
  }, [initialData])

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.categoryId || !form.amount) return
    onSubmit({ ...form, amount: normalizeNumber(form.amount) })
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__grid">
        <label className="form__field">
          <span>Type</span>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>

        <label className="form__field">
          <span>Amount</span>
          <input
            type="number"
            name="amount"
            value={form.amount}
            min="0"
            step="0.01"
            onChange={handleChange}
          />
        </label>

        <label className="form__field">
          <span>Date</span>
          <input type="date" name="date" value={form.date} onChange={handleChange} />
        </label>

        <label className="form__field">
          <span>Category</span>
          <select name="categoryId" value={form.categoryId} onChange={handleChange}>
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label className="form__field">
          <span>Account</span>
          <input type="text" name="account" value={form.account} onChange={handleChange} placeholder="e.g. Checking" />
        </label>

        <label className="form__field checkbox">
          <input type="checkbox" name="isRecurring" checked={form.isRecurring} onChange={handleChange} />
          <span>Recurring transaction</span>
        </label>
      </div>

      <label className="form__field">
        <span>Notes</span>
        <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="Optional notes" />
      </label>

      <div className="form__actions">
        {onCancel ? (
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            Cancel
          </button>
        ) : null}
        <button className="btn" type="submit">
          {initialData ? 'Update Transaction' : 'Add Transaction'}
        </button>
      </div>
    </form>
  )
}

export default TransactionForm


import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { parseISO, isAfter, isBefore } from 'date-fns'
import TransactionForm from '../components/TransactionForm'
import TransactionList from '../components/TransactionList'
import { api } from '../services/api'

const defaultFilters = {
  type: 'all',
  categoryId: '',
  sort: 'date-desc',
  startDate: '',
  endDate: '',
}

const Transactions = () => {
  const [transactions, setTransactions] = useState([])
  const [categories, setCategories] = useState([])
  const [filters, setFilters] = useState(defaultFilters)
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const attachCategoryName = (txn, cats = categories) => {
    const category = cats.find((cat) => cat.id === txn.categoryId)
    return {
      ...txn,
      categoryName: txn.categoryName || category?.name || 'Uncategorized',
    }
  }

  const loadData = async () => {
    setLoading(true)
    setError(null)
    try {
      const [transactionsResponse, categoriesResponse] = await Promise.all([
        api.getTransactions(),
        api.getCategories(),
      ])
      setCategories(categoriesResponse)
      setTransactions(transactionsResponse.map((txn) => attachCategoryName(txn, categoriesResponse)))
    } catch (err) {
      setError(err.message || 'Unable to load transactions.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleFilterChange = (event) => {
    const { name, value } = event.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreate = async (payload) => {
    try {
      const newTxn = await api.createTransaction(payload)
      setTransactions((prev) => [attachCategoryName(newTxn), ...prev])
      setShowForm(false)
    } catch (err) {
      setError(err.message || 'Unable to create transaction.')
    }
  }

  const handleUpdate = async (payload) => {
    try {
      const updated = await api.updateTransaction(editing.id, payload)
      setTransactions((prev) => prev.map((txn) => (txn.id === editing.id ? attachCategoryName(updated) : txn)))
      setEditing(null)
      setShowForm(false)
    } catch (err) {
      setError(err.message || 'Unable to update transaction.')
    }
  }

  const handleDelete = async (id) => {
    const confirmDelete = confirm('Remove this transaction?')
    if (!confirmDelete) return
    try {
      await api.deleteTransaction(id)
      setTransactions((prev) => prev.filter((txn) => txn.id !== id))
    } catch (err) {
      setError(err.message || 'Unable to delete transaction.')
    }
  }

  const handleSubmit = (payload) => {
    if (editing) {
      handleUpdate(payload)
    } else {
      handleCreate(payload)
    }
  }

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((txn) => {
        if (filters.type !== 'all' && txn.type !== filters.type) return false
        if (filters.categoryId && txn.categoryId !== filters.categoryId) return false
        if (filters.startDate && isBefore(parseISO(txn.date), parseISO(filters.startDate))) return false
        if (filters.endDate && isAfter(parseISO(txn.date), parseISO(filters.endDate))) return false
        return true
      })
      .sort((a, b) => {
        switch (filters.sort) {
          case 'date-asc':
            return new Date(a.date) - new Date(b.date)
          case 'amount-desc':
            return b.amount - a.amount
          case 'amount-asc':
            return a.amount - b.amount
          case 'date-desc':
          default:
            return new Date(b.date) - new Date(a.date)
        }
      })
  }, [transactions, filters])

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
          <h1>Transactions</h1>
          <p className="muted">Add, edit, and filter your transactions.</p>
        </div>
        <button className="btn" onClick={() => setShowForm((prev) => !prev)}>
          {showForm ? 'Hide Form' : 'Add Transaction'}
        </button>
      </div>

      {error ? <div className="card error-card">{error}</div> : null}

      {showForm || editing ? (
        <div className="card">
          <h3>{editing ? 'Edit transaction' : 'New transaction'}</h3>
          <TransactionForm
            categories={categories}
            onSubmit={handleSubmit}
            onCancel={() => {
              setEditing(null)
              setShowForm(false)
            }}
            initialData={editing}
          />
        </div>
      ) : null}

      <div className="card">
        <div className="filters">
          <label className="filters__field">
            <span className="filters__label">Type</span>
            <select name="type" value={filters.type} onChange={handleFilterChange} className="filters__input">
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </label>
          <label className="filters__field">
            <span className="filters__label">Category</span>
            <select name="categoryId" value={filters.categoryId} onChange={handleFilterChange} className="filters__input">
              <option value="">All</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>
          <label className="filters__field">
            <span className="filters__label">Start date</span>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="filters__input"
              placeholder="dd/mm/yyyy"
            />
          </label>
          <label className="filters__field">
            <span className="filters__label">End date</span>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="filters__input"
              placeholder="dd/mm/yyyy"
            />
          </label>
          <label className="filters__field">
            <span className="filters__label">Sort by</span>
            <select name="sort" value={filters.sort} onChange={handleFilterChange} className="filters__input">
              <option value="date-desc">Date (newest)</option>
              <option value="date-asc">Date (oldest)</option>
              <option value="amount-desc">Amount (high)</option>
              <option value="amount-asc">Amount (low)</option>
            </select>
          </label>
        </div>
      </div>

      {loading ? (
        <div className="card loading-card">
          <p>Loading transactions...</p>
        </div>
      ) : (
        <TransactionList
          transactions={filteredTransactions}
          onEdit={(txn) => {
            setEditing(txn)
            setShowForm(true)
          }}
          onDelete={handleDelete}
        />
      )}
    </motion.section>
  )
}

export default Transactions


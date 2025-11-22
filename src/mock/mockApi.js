import { addMonths, eachMonthOfInterval, endOfMonth, format, parseISO, startOfMonth } from 'date-fns'
import { mockCategories, mockTransactions, mockGoals } from './mockData'

let categories = [...mockCategories]
let transactions = [...mockTransactions]
let goals = [...mockGoals]

const delay = (data, ms = 400) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(JSON.parse(JSON.stringify(data))), ms)
  })

const upsertCategoryName = (categoryId) => {
  const cat = categories.find((c) => c.id === categoryId)
  return cat?.name ?? 'Other'
}

const computeSummary = () => {
  const totalIncome = transactions.filter((t) => t.type === 'income').reduce((acc, curr) => acc + Number(curr.amount), 0)
  const totalExpense = transactions.filter((t) => t.type === 'expense').reduce((acc, curr) => acc + Number(curr.amount), 0)
  const totalBalance = totalIncome - totalExpense

  const now = new Date()
  const startWindow = startOfMonth(addMonths(now, -5))
  const months = eachMonthOfInterval({ start: startWindow, end: endOfMonth(now) })

  const monthlyTrend = months.map((monthDate) => {
    const monthKey = format(monthDate, 'yyyy-MM')
    const monthTransactions = transactions.filter((txn) => format(parseISO(txn.date), 'yyyy-MM') === monthKey)
    const income = monthTransactions.filter((t) => t.type === 'income').reduce((acc, curr) => acc + Number(curr.amount), 0)
    const expense = monthTransactions.filter((t) => t.type === 'expense').reduce((acc, curr) => acc + Number(curr.amount), 0)
    return {
      month: format(monthDate, 'LLL yyyy'),
      income,
      expense,
    }
  })

  const categoryTotals = transactions.reduce((acc, txn) => {
    const key = txn.categoryId
    acc[key] = acc[key] || { categoryId: key, category: upsertCategoryName(key), amount: 0 }
    acc[key].amount += Number(txn.amount)
    return acc
  }, {})

  const monthKey = format(now, 'yyyy-MM')
  const monthTransactions = transactions.filter((txn) => format(parseISO(txn.date), 'yyyy-MM') === monthKey)
  const monthlyIncome = monthTransactions.filter((t) => t.type === 'income').reduce((acc, curr) => acc + Number(curr.amount), 0)
  const monthlyExpense = monthTransactions.filter((t) => t.type === 'expense').reduce((acc, curr) => acc + Number(curr.amount), 0)

  return {
    totalBalance,
    totalIncome,
    totalExpense,
    monthlyIncome,
    monthlyExpense,
    monthlyTrend,
    categoryBreakdown: Object.values(categoryTotals),
  }
}

const createId = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`

export const mockApi = {
  async login({ email }) {
    return delay({
      token: 'mock-token',
      user: {
        id: 'user-1',
        name: 'Demo User',
        email,
      },
    })
  },
  async register(payload) {
    return this.login(payload)
  },
  async getCategories() {
    return delay(categories)
  },
  async createCategory(payload) {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
    const newCategory = {
      id: createId('cat'),
      ...payload,
      color: payload.color || randomColor,
    }
    categories = [newCategory, ...categories]
    return delay(newCategory)
  },
  async updateCategory(id, payload) {
    categories = categories.map((cat) => (cat.id === id ? { ...cat, ...payload } : cat))
    return delay(categories.find((cat) => cat.id === id))
  },
  async deleteCategory(id) {
    categories = categories.filter((cat) => cat.id !== id)
    transactions = transactions.filter((txn) => txn.categoryId !== id)
    return delay({ success: true })
  },
  async getTransactions() {
    return delay(transactions)
  },
  async createTransaction(payload) {
    const newTransaction = {
      id: createId('txn'),
      ...payload,
      categoryName: upsertCategoryName(payload.categoryId),
    }
    transactions = [newTransaction, ...transactions]
    return delay(newTransaction)
  },
  async updateTransaction(id, payload) {
    transactions = transactions.map((txn) =>
      txn.id === id ? { ...txn, ...payload, categoryName: upsertCategoryName(payload.categoryId) } : txn,
    )
    return delay(transactions.find((txn) => txn.id === id))
  },
  async deleteTransaction(id) {
    transactions = transactions.filter((txn) => txn.id !== id)
    return delay({ success: true })
  },
  async getSummary() {
    return delay(computeSummary())
  },
  async getGoals() {
    return delay(goals)
  },
  async createGoal(payload) {
    const newGoal = {
      id: createId('goal'),
      ...payload,
      currentAmount: payload.currentAmount || 0,
    }
    goals = [newGoal, ...goals]
    return delay(newGoal)
  },
  async updateGoal(id, payload) {
    goals = goals.map((goal) => (goal.id === id ? { ...goal, ...payload } : goal))
    return delay(goals.find((goal) => goal.id === id))
  },
  async deleteGoal(id) {
    goals = goals.filter((goal) => goal.id !== id)
    return delay({ success: true })
  },
}


import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { api } from '../services/api'
import { BalanceCard } from '../components/BalanceCard'
import { IncomeExpenseCard } from '../components/IncomeExpenseCard'
import { CategoryChart } from '../components/CategoryChart'
import { IncomeExpenseChart } from '../components/IncomeExpenseChart'
import { NetBalanceChart } from '../components/NetBalanceChart'
import { RecentTransactions } from '../components/RecentTransactions'
import { SkeletonCard } from '../components/SkeletonCard'

const Dashboard = () => {
  const [summary, setSummary] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadDashboard = async () => {
    setLoading(true)
    setError(null)
    try {
      const [summaryResponse, transactionResponse] = await Promise.all([api.getSummary(), api.getTransactions()])
      setSummary(summaryResponse)
      setTransactions(transactionResponse.slice(0, 5))
    } catch (err) {
      setError(err.message || 'Unable to load dashboard data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboard()
  }, [])

  const monthlyTrend = useMemo(() => summary?.monthlyTrend ?? [], [summary])
  const categoryBreakdown = useMemo(() => summary?.categoryBreakdown ?? [], [summary])

  const content = () => {
    if (loading) {
      return (
        <>
          <div className="dashboard-grid dashboard-grid--metrics">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
          <div className="dashboard-grid dashboard-grid--charts">
            <SkeletonCard rows={4} />
            <SkeletonCard rows={4} />
            <SkeletonCard rows={4} />
          </div>
        </>
      )
    }

    if (error) {
      return <div className="card error-card">{error}</div>
    }

    return (
      <>
        <div className="dashboard-grid dashboard-grid--metrics">
          <BalanceCard label="Total Balance" value={summary?.totalBalance} accent="balance" />
          <IncomeExpenseCard title="Monthly Income" value={summary?.monthlyIncome} type="income" />
          <IncomeExpenseCard title="Monthly Expense" value={summary?.monthlyExpense} type="expense" />
        </div>

        <div className="dashboard-grid dashboard-grid--charts">
          <CategoryChart data={categoryBreakdown} />
          <IncomeExpenseChart data={monthlyTrend} />
          <NetBalanceChart data={monthlyTrend} />
        </div>

        <div className="dashboard-grid dashboard-grid--wide">
          <RecentTransactions transactions={transactions} />
        </div>
      </>
    )
  }

  return (
    <motion.section
      className="page dashboard-page"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.4 }}
    >
      <div className="page__header">
        <div>
          <h1>Dashboard</h1>
          <p className="muted">Track your finances with clarity.</p>
        </div>
        <button className="btn btn--ghost" onClick={loadDashboard}>
          Refresh
        </button>
      </div>
      {content()}
    </motion.section>
  )
}

export default Dashboard


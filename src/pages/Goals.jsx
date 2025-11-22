import { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { format, differenceInDays, parseISO } from 'date-fns'
import { api } from '../services/api'
import GoalForm from '../components/GoalForm'
import { GoalProgressRing } from '../components/GoalProgressRing'
import { formatCurrency } from '../utils/format'

const Goals = () => {
  const [goals, setGoals] = useState([])
  const [editing, setEditing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadGoals = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.getGoals()
      setGoals(data)
    } catch (err) {
      setError(err.message || 'Unable to load goals.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadGoals()
  }, [])

  const handleCreate = async (payload) => {
    try {
      const newGoal = await api.createGoal(payload)
      setGoals((prev) => [newGoal, ...prev])
      setEditing(null)
    } catch (err) {
      setError(err.message || 'Unable to create goal.')
    }
  }

  const handleUpdate = async (payload) => {
    try {
      const updated = await api.updateGoal(editing.id, payload)
      setGoals((prev) => prev.map((goal) => (goal.id === editing.id ? updated : goal)))
      setEditing(null)
    } catch (err) {
      setError(err.message || 'Unable to update goal.')
    }
  }

  const handleDelete = async (id) => {
    const confirmed = confirm('Delete this goal?')
    if (!confirmed) return
    try {
      await api.deleteGoal(id)
      setGoals((prev) => prev.filter((goal) => goal.id !== id))
    } catch (err) {
      setError(err.message || 'Unable to delete goal.')
    }
  }

  const handleSubmit = (payload) => {
    if (editing) {
      handleUpdate(payload)
    } else {
      handleCreate(payload)
    }
  }

  const goalsWithStats = useMemo(() => {
    return goals.map((goal) => {
      const targetDate = parseISO(goal.targetDate)
      const today = new Date()
      const daysRemaining = Math.max(0, differenceInDays(targetDate, today))
      const progress = (goal.currentAmount / goal.targetAmount) * 100
      const remaining = goal.targetAmount - goal.currentAmount
      const isOnTrack = progress >= 80 || daysRemaining > 30

      return {
        ...goal,
        daysRemaining,
        progress,
        remaining,
        isOnTrack,
      }
    })
  }, [goals])

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
          <h1>Savings Goals</h1>
          <p className="muted">Track your progress toward financial milestones.</p>
        </div>
      </div>

      {error ? <div className="card error-card">{error}</div> : null}

      <div className="card">
        <h3>{editing ? 'Edit Goal' : 'Create New Goal'}</h3>
        <GoalForm
          initialData={editing}
          onSubmit={handleSubmit}
          onCancel={editing ? () => setEditing(null) : undefined}
        />
      </div>

      {loading ? (
        <div className="card loading-card">
          <p>Loading goals...</p>
        </div>
      ) : (
        <div className="goals-grid">
          {goalsWithStats.map((goal) => (
            <motion.article
              key={goal.id}
              className="card goal-card"
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <div className="goal-card__header">
                <div className="goal-card__progress">
                  <GoalProgressRing goal={goal} size={100} />
                </div>
                <div className="goal-card__info">
                  <h4>{goal.title}</h4>
                  <p className="muted">{goal.description || 'No description'}</p>
                  <div className="goal-card__stats">
                    <div>
                      <span className="goal-card__label">Target:</span>
                      <span className="goal-card__value">{formatCurrency(goal.targetAmount)}</span>
                    </div>
                    <div>
                      <span className="goal-card__label">Remaining:</span>
                      <span className="goal-card__value goal-card__value--remaining">
                        {formatCurrency(goal.remaining)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="goal-card__footer">
                <div className="goal-card__meta">
                  <span className={`goal-card__status ${goal.isOnTrack ? 'goal-card__status--on-track' : ''}`}>
                    {goal.isOnTrack ? 'On Track' : 'Needs Attention'}
                  </span>
                  <span className="goal-card__date">
                    Target: {format(parseISO(goal.targetDate), 'MMM dd, yyyy')} ({goal.daysRemaining} days left)
                  </span>
                </div>
                <div className="goal-card__actions">
                  <button className="btn btn--ghost" onClick={() => setEditing(goal)}>
                    Edit
                  </button>
                  <button className="btn btn--danger" onClick={() => handleDelete(goal.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
          {!goals.length ? <p className="muted">No goals yet. Create your first savings goal!</p> : null}
        </div>
      )}
    </motion.section>
  )
}

export default Goals


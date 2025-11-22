import { useMemo } from 'react'
import { formatCurrency } from '../utils/format'

export const GoalProgressRing = ({ goal, size = 120, strokeWidth = 12 }) => {
  const { progress, remaining, daysRemaining, predictedCompletion, isOnTrack } = useMemo(() => {
    const progressPercent = Math.min(100, (goal.currentAmount / goal.targetAmount) * 100)
    const remaining = goal.targetAmount - goal.currentAmount
    const targetDate = new Date(goal.targetDate)
    const today = new Date()
    const daysRemaining = Math.max(0, Math.ceil((targetDate - today) / (1000 * 60 * 60 * 24)))
    const monthsRemaining = daysRemaining / 30

    // Calculate predicted completion based on current savings rate
    // For simplicity, assume user saves 20% of monthly income (mock calculation)
    const estimatedMonthlySavings = goal.targetAmount * 0.1 // Rough estimate
    const predictedMonths = remaining / estimatedMonthlySavings
    const predictedDate = new Date(today)
    predictedDate.setMonth(predictedDate.getMonth() + predictedMonths)

    const isOnTrack = predictedDate <= targetDate || progressPercent >= 80

    return {
      progress: progressPercent,
      remaining,
      daysRemaining,
      predictedCompletion: predictedDate.toISOString().split('T')[0],
      isOnTrack,
    }
  }, [goal])

  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  const color = isOnTrack ? '#10b981' : progress >= 80 ? '#f59e0b' : '#ef4444'

  return (
    <div className="goal-progress-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="goal-progress-ring__svg">
        <circle
          className="goal-progress-ring__bg"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          className="goal-progress-ring__progress"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ stroke: color }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="goal-progress-ring__content">
        <div className="goal-progress-ring__percent">{Math.round(progress)}%</div>
        <div className="goal-progress-ring__amount">{formatCurrency(goal.currentAmount)}</div>
      </div>
    </div>
  )
}


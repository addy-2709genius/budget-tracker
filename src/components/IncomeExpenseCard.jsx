import { motion } from 'framer-motion'
import { formatCurrency } from '../utils/format'

export const IncomeExpenseCard = ({ title, value, type = 'income' }) => (
  <motion.article
    className={`card metric-card metric-card--${type}`}
    whileHover={{ y: -4 }}
    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
  >
    <p>{title}</p>
    <p className="metric-card__value">{formatCurrency(value)}</p>
    <span className="metric-card__label">{type === 'income' ? 'Cash inflow' : 'Cash outflow'}</span>
  </motion.article>
)


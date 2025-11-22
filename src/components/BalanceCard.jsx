import { motion } from 'framer-motion'
import { formatCurrency } from '../utils/format'

export const BalanceCard = ({ label, value, accent = 'balance' }) => {
  return (
    <motion.article
      className={`card metric-card metric-card--${accent}`}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <header className="metric-card__header">
        <p>{label}</p>
      </header>
      <p className="metric-card__value">{formatCurrency(value)}</p>
    </motion.article>
  )
}


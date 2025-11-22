import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { formatCurrency } from '../utils/format'

const getTransactionIcon = (type) => {
  if (type === 'income') {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 2L2 10L10 18M2 10H18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  } else {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 18L18 10L10 2M18 10H2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
}

export const RecentTransactions = ({ transactions = [] }) => (
  <motion.article
    className="card chart-card recent-transactions-card"
    whileHover={{ y: -4 }}
    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
  >
    <div className="card__header">
      <h4>Recent Transactions</h4>
    </div>
    {transactions.length ? (
      <ul className="transactions-list">
        {transactions.slice(0, 5).map((txn, index) => {
          const label = txn.categoryName || txn.category?.name || txn.account || 'General'
          return (
            <motion.li
              key={txn.id}
              className={`transactions-list__item transactions-list__item--${txn.type}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <div className="transactions-list__icon" data-type={txn.type}>
                {getTransactionIcon(txn.type)}
              </div>
              <div className="transactions-list__details">
                <p className="transactions-list__title">{label}</p>
                <span className="transactions-list__date">{format(new Date(txn.date), 'dd MMM yyyy')}</span>
              </div>
              <span className={`transactions-list__amount transactions-list__amount--${txn.type}`}>
                {txn.type === 'expense' ? '-' : '+'}
                {formatCurrency(txn.amount)}
              </span>
            </motion.li>
          )
        })}
      </ul>
    ) : (
      <p className="muted">No transactions yet.</p>
    )}
  </motion.article>
)


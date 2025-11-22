import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'
import { motion } from 'framer-motion'
import { formatCurrency } from '../utils/format'

export const IncomeExpenseChart = ({ data = [] }) => (
  <motion.article
    className="card chart-card"
    whileHover={{ y: -4 }}
    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
  >
    <div className="card__header">
      <h4>Monthly Income vs Expense</h4>
    </div>
    {data.length ? (
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Legend />
          <Bar dataKey="income" fill="#22c55e" radius={[4, 4, 0, 0]} />
          <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} />
        </ComposedChart>
      </ResponsiveContainer>
    ) : (
      <p className="muted">Not enough data yet.</p>
    )}
  </motion.article>
)


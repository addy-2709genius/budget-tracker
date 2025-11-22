import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { motion } from 'framer-motion'
import { formatCurrency } from '../utils/format'

export const NetBalanceChart = ({ data = [] }) => (
  <motion.article
    className="card chart-card"
    whileHover={{ y: -4 }}
    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
  >
    <div className="card__header">
      <h4>Monthly Net Balance</h4>
    </div>
    {data.length ? (
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          data={data.map((month) => ({
            ...month,
            net: (month.income ?? 0) - (month.expense ?? 0),
          }))}
        >
          <defs>
            <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip formatter={(value) => formatCurrency(value)} />
          <Area type="monotone" dataKey="net" stroke="#3b82f6" fillOpacity={1} fill="url(#colorNet)" />
        </AreaChart>
      </ResponsiveContainer>
    ) : (
      <p className="muted">Not enough data yet.</p>
    )}
  </motion.article>
)


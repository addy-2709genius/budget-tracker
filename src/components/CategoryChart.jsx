import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { motion } from 'framer-motion'
import { formatCurrency } from '../utils/format'

const DEFAULT_COLOR = '#4C6EF5'

export const CategoryChart = ({ data = [] }) => {
  // Transform data to ensure proper structure for Recharts
  const chartData = data.map((entry) => ({
    name: entry.category || entry.categoryName || 'Uncategorized',
    value: Number(entry.amount) || 0,
    amount: Number(entry.amount) || 0,
    color: entry.color || DEFAULT_COLOR,
  }))

  return (
    <motion.article
      className="card chart-card"
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div className="card__header">
        <h4>Spending by Category</h4>
      </div>
      {chartData.length ? (
        <>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={4}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`${entry.name}-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name, props) => {
                  const categoryName = props.payload?.name || name || 'Category'
                  return [formatCurrency(value), categoryName]
                }}
                labelFormatter={(label) => label || 'Category'}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="category-chart__colors">
            {chartData.map((entry, index) => (
              <span
                key={`color-${index}`}
                className="category-chart__color-dot"
                style={{ backgroundColor: entry.color }}
                title={entry.name}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="muted">Not enough data yet.</p>
      )}
    </motion.article>
  )
}


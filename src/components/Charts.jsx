import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Cell,
} from 'recharts'
import { formatCurrency } from '../utils/format'

const COLORS = ['#4C6EF5', '#F06595', '#12B886', '#FF922B', '#845EF7', '#339AF0', '#51CF66', '#FCC419']

const Charts = ({ categoryBreakdown = [], monthlyTrend = [] }) => {
  return (
    <section className="charts-grid">
      <article className="card chart-card">
        <div className="card__header">
          <h4>Spending by Category</h4>
        </div>
        {categoryBreakdown.length ? (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                dataKey="amount"
                data={categoryBreakdown}
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ payload, percent }) => `${payload.category || payload.name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryBreakdown.map((entry, index) => (
                  <Cell key={`slice-${entry.categoryId || entry.name || index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => formatCurrency(value)} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="muted">Not enough data yet.</p>
        )}
      </article>

      <article className="card chart-card">
        <div className="card__header">
          <h4>Monthly Income vs Expense</h4>
        </div>
        {monthlyTrend.length ? (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#51CF66" />
              <Line type="monotone" dataKey="expense" stroke="#FF6B6B" />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="muted">Not enough data yet.</p>
        )}
      </article>

      <article className="card chart-card">
        <div className="card__header">
          <h4>Monthly Net Balance</h4>
        </div>
        {monthlyTrend.length ? (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={monthlyTrend.map((month) => ({
                ...month,
                net: (month.income ?? 0) - (month.expense ?? 0),
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Bar dataKey="net" fill="#228BE6" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="muted">Not enough data yet.</p>
        )}
      </article>
    </section>
  )
}

export default Charts


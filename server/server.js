import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'
import goalRoutes from './routes/goalRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Root route - API info
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Budget Tracker API is running',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login'
      },
      categories: 'GET, POST, PUT, DELETE /api/categories',
      transactions: 'GET, POST, PUT, DELETE /api/transactions',
      summary: 'GET /api/transactions/summary',
      goals: 'GET, POST, PUT, DELETE /api/goals'
    }
  })
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Budget Tracker API is running' })
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/transactions', transactionRoutes)
app.use('/api/goals', goalRoutes)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📊 API available at http://localhost:${PORT}/api`)
})


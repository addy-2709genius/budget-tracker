import express from 'express'
import { getGoals, createGoal, updateGoal, deleteGoal } from '../controllers/goalController.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

router.use(authenticate)

router.get('/', getGoals)
router.post('/', createGoal)
router.put('/:id', updateGoal)
router.delete('/:id', deleteGoal)

export default router


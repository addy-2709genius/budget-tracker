import axios from 'axios'
import { mockApi } from '../mock/mockApi'

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'
const mockEnv = import.meta.env.VITE_USE_MOCK
const useMock = mockEnv === undefined ? true : mockEnv === 'true'

const axiosInstance = axios.create({
  baseURL,
})

const resolve = async (promise) => {
  const response = await promise
  return response.data
}

const applyMock = (callback) => {
  if (!useMock) return null
  return callback()
}

export const api = {
  setToken: (token) => {
    if (token) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
    } else {
      delete axiosInstance.defaults.headers.common.Authorization
    }
  },
  clearToken: () => {
    delete axiosInstance.defaults.headers.common.Authorization
  },
  login: (payload) =>
    applyMock(() => mockApi.login(payload)) ??
    resolve(axiosInstance.post('/auth/login', payload)),
  register: (payload) =>
    applyMock(() => mockApi.register(payload)) ??
    resolve(axiosInstance.post('/auth/register', payload)),
  getCategories: () =>
    applyMock(() => mockApi.getCategories()) ??
    resolve(axiosInstance.get('/categories')),
  createCategory: (payload) =>
    applyMock(() => mockApi.createCategory(payload)) ??
    resolve(axiosInstance.post('/categories', payload)),
  updateCategory: (id, payload) =>
    applyMock(() => mockApi.updateCategory(id, payload)) ??
    resolve(axiosInstance.put(`/categories/${id}`, payload)),
  deleteCategory: (id) =>
    applyMock(() => mockApi.deleteCategory(id)) ??
    resolve(axiosInstance.delete(`/categories/${id}`)),
  getTransactions: () =>
    applyMock(() => mockApi.getTransactions()) ??
    resolve(axiosInstance.get('/transactions')),
  createTransaction: (payload) =>
    applyMock(() => mockApi.createTransaction(payload)) ??
    resolve(axiosInstance.post('/transactions', payload)),
  updateTransaction: (id, payload) =>
    applyMock(() => mockApi.updateTransaction(id, payload)) ??
    resolve(axiosInstance.put(`/transactions/${id}`, payload)),
  deleteTransaction: (id) =>
    applyMock(() => mockApi.deleteTransaction(id)) ??
    resolve(axiosInstance.delete(`/transactions/${id}`)),
  getSummary: () =>
    applyMock(() => mockApi.getSummary()) ??
    resolve(axiosInstance.get('/transactions/summary')),
  getGoals: () =>
    applyMock(() => mockApi.getGoals()) ??
    resolve(axiosInstance.get('/goals')),
  createGoal: (payload) =>
    applyMock(() => mockApi.createGoal(payload)) ??
    resolve(axiosInstance.post('/goals', payload)),
  updateGoal: (id, payload) =>
    applyMock(() => mockApi.updateGoal(id, payload)) ??
    resolve(axiosInstance.put(`/goals/${id}`, payload)),
  deleteGoal: (id) =>
    applyMock(() => mockApi.deleteGoal(id)) ??
    resolve(axiosInstance.delete(`/goals/${id}`)),
}


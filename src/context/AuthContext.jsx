import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { api } from '../services/api'

const AuthContext = createContext(null)

const STORAGE_KEY = 'budgettracker_auth'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        if (parsed?.token) {
          setToken(parsed.token)
          setUser(parsed.user)
          api.setToken(parsed.token)
        }
      } catch (error) {
        console.error('Failed to parse auth storage', error)
        localStorage.removeItem(STORAGE_KEY)
      }
    }
    setLoading(false)
  }, [])

  const persistSession = useCallback((authData) => {
    setToken(authData.token)
    setUser(authData.user)
    api.setToken(authData.token)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authData))
  }, [])

  const login = async (credentials) => {
    const data = await api.login(credentials)
    persistSession(data)
  }

  const register = async (payload) => {
    const data = await api.register(payload)
    persistSession(data)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    api.clearToken()
    localStorage.removeItem(STORAGE_KEY)
  }

  const value = {
    user,
    token,
    loading,
    isAuthenticated: Boolean(token),
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}


import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import Logo from './Logo'
import Avatar from './Avatar'

export const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="navbar">
      <div className="navbar__brand" onClick={() => navigate(isAuthenticated ? '/dashboard' : '/login')}>
        <Logo className="navbar__logo" size={42} />
        <div>
          <p className="navbar__title">Budget Tracker</p>
          <p className="navbar__subtitle">Stay on top of your money</p>
        </div>
      </div>

      {isAuthenticated ? (
        <nav className="navbar__links">
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/transactions">Transactions</NavLink>
          <NavLink to="/categories">Categories</NavLink>
          <NavLink to="/goals">Goals</NavLink>
        </nav>
      ) : null}

      <div className="navbar__actions">
        <button className="theme-toggle" onClick={toggleTheme} aria-pressed={theme === 'dark'}>
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
        {isAuthenticated && user ? (
          <div className="navbar__user-section" title={user.name}>
            <Avatar name={user.name} size={32} className="navbar__avatar" />
            <span className="navbar__user-tooltip">{user.name}</span>
          </div>
        ) : null}
        {isAuthenticated ? (
          <button className="btn btn--ghost" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <button className="btn btn--ghost" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="btn" onClick={() => navigate('/register')}>
              Register
            </button>
          </>
        )}
      </div>
    </header>
  )
}


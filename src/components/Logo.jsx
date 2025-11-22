import { useState } from 'react'

const Logo = ({ className = '', size = 42 }) => {
  const [imageError, setImageError] = useState(false)
  
  // Try to load from public folder
  const logoPath = '/logo.png'
  
  if (imageError) {
    // Fallback: Show a simple text logo if image fails
    return (
      <div
        className={className}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: `${size * 0.5}px`,
          fontWeight: 'bold',
          color: 'var(--text-primary)',
          borderRadius: '8px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
        }}
      >
        BT
      </div>
    )
  }
  
  return (
    <img
      src={logoPath}
      alt="Budget Tracker Logo"
      className={className}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        maxWidth: `${size}px`,
        maxHeight: `${size}px`,
        objectFit: 'contain',
        display: 'block',
      }}
      onError={() => {
        setImageError(true)
        console.warn('Logo image not found at /logo.png. Please add your logo image to the public folder.')
      }}
    />
  )
}

export default Logo


const Avatar = ({ name, size = 36, className = '' }) => {
  const getInitials = (name) => {
    if (!name) return 'U'
    const parts = name.trim().split(' ')
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  const initials = getInitials(name)
  
  // Generate consistent gradient based on name
  const gradients = [
    'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
  ]
  
  const colorIndex = name ? name.charCodeAt(0) % gradients.length : 0
  const bgGradient = gradients[colorIndex]

  return (
    <div
      className={`avatar ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${size * 0.4}px`,
      }}
    >
      <div 
        className="avatar__inner"
        style={{
          background: bgGradient,
        }}
      >
        {initials}
      </div>
    </div>
  )
}

export default Avatar

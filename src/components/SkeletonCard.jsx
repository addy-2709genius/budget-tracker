export const SkeletonCard = ({ rows = 2 }) => (
  <div className="card skeleton-card">
    {Array.from({ length: rows }).map((_, index) => (
      <div key={index} className="skeleton-card__line" />
    ))}
  </div>
)


import { formatCurrency } from '../utils/format'

const SummaryCards = ({ summary }) => {
  const cards = [
    {
      label: 'Total Balance',
      value: summary?.totalBalance ?? 0,
      accent: 'primary',
    },
    {
      label: 'Month Income',
      value: summary?.monthlyIncome ?? 0,
      accent: 'success',
    },
    {
      label: 'Month Expense',
      value: summary?.monthlyExpense ?? 0,
      accent: 'danger',
    },
  ]

  return (
    <section className="cards-grid">
      {cards.map((card) => (
        <article key={card.label} className={`card summary-card summary-card--${card.accent}`}>
          <p>{card.label}</p>
          <h3>{formatCurrency(card.value)}</h3>
        </article>
      ))}
    </section>
  )
}

export default SummaryCards


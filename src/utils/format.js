const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
})

export const formatCurrency = (value = 0) => {
  const numeric = Number(value) || 0
  return currencyFormatter.format(numeric)
}


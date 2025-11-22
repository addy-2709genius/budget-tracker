import { format } from 'date-fns'
import { formatCurrency } from '../utils/format'

const TransactionList = ({ transactions, onEdit, onDelete }) => {
  if (!transactions.length) {
    return (
      <div className="card empty-state">
        <p>No transactions match your filters yet.</p>
      </div>
    )
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Account</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Notes</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id}>
              <td>{format(new Date(txn.date), 'MMM dd, yyyy')}</td>
              <td>
                <span className="badge">{txn.categoryName}</span>
              </td>
              <td>{txn.account || '—'}</td>
              <td>
                <span className={`pill pill--${txn.type}`}>{txn.type}</span>
              </td>
              <td className="amount" data-type={txn.type}>
                {txn.type === 'expense' ? '-' : '+'}
                {formatCurrency(txn.amount)}
              </td>
              <td>{txn.notes || '—'}</td>
              <td className="table__actions">
                <button className="btn btn--ghost" onClick={() => onEdit(txn)}>
                  Edit
                </button>
                <button className="btn btn--danger" onClick={() => onDelete(txn.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TransactionList


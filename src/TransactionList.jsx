import { useState } from 'react'
import { CATEGORIES } from './constants.js'
import { formatCurrency } from './utils/format.js'

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [pendingDelete, setPendingDelete] = useState(null);

  const filtered = transactions.filter(t =>
    (filterType === "all" || t.type === filterType) &&
    (filterCategory === "all" || t.category === filterCategory)
  );

  return (
    <div className="transactions">
      <div className="transactions-header">
        <h2>Transactions</h2>
        <div className="filters">
          <select
            aria-label="Filter by type"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            aria-label="Filter by category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <table aria-label="Transaction history">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td colSpan={5} className="empty-state">No transactions match the selected filters.</td>
            </tr>
          ) : (
            filtered.map(t => (
              <tr key={t.id}>
                <td className="date-cell">{t.date}</td>
                <td>{t.description}</td>
                <td>
                  <span className={`category-pill cat-${t.category}`}>{t.category}</span>
                </td>
                <td className={`amount-cell ${t.type === "income" ? "income-amount" : "expense-amount"}`}>
                  {t.type === "income" ? "+" : "−"}{formatCurrency(t.amount)}
                </td>
                <td>
                  <button
                    className={`delete-btn${pendingDelete === t.id ? ' delete-btn--confirm' : ''}`}
                    aria-label={pendingDelete === t.id ? `Confirm delete: ${t.description}` : `Delete transaction: ${t.description}`}
                    onClick={() => {
                      if (pendingDelete === t.id) {
                        onDelete(t.id);
                        setPendingDelete(null);
                      } else {
                        setPendingDelete(t.id);
                      }
                    }}
                    onBlur={() => setPendingDelete(null)}
                  >
                    {pendingDelete === t.id ? "Confirm?" : "Delete"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList

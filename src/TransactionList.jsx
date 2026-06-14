import { useState } from 'react'

const categories = ["food", "housing", "utilities", "transport", "entertainment", "salary", "other"];

const fmt = (n) => '$' + parseFloat(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function TransactionList({ transactions, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  let filtered = transactions;
  if (filterType !== "all") {
    filtered = filtered.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filtered = filtered.filter(t => t.category === filterCategory);
  }

  return (
    <div className="transactions">
      <div className="transactions-header">
        <h2>Transactions</h2>
        <div className="filters">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <table>
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
          {filtered.map(t => (
            <tr key={t.id}>
              <td className="date-cell">{t.date}</td>
              <td>{t.description}</td>
              <td>
                <span className={`category-pill cat-${t.category}`}>{t.category}</span>
              </td>
              <td className={`amount-cell ${t.type === "income" ? "income-amount" : "expense-amount"}`}>
                {t.type === "income" ? "+" : "−"}{fmt(t.amount)}
              </td>
              <td>
                <button className="delete-btn" onClick={() => {
                  if (window.confirm("Delete this transaction?")) {
                    onDelete(t.id);
                  }
                }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList

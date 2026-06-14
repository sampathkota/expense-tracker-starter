import { useState } from 'react'
import { CATEGORIES } from './constants.js'

function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsed = parseFloat(amount);
    if (!description || !parsed || parsed <= 0) return;

    const today = new Date();
    const date = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, '0'),
      String(today.getDate()).padStart(2, '0'),
    ].join('-');

    onAdd({
      id: crypto.randomUUID(),
      description,
      amount: parsed,
      type,
      category,
      date,
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="desc" className="sr-only">Description</label>
        <input
          id="desc"
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="amount" className="sr-only">Amount</label>
        <input
          id="amount"
          type="number"
          placeholder="Amount"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <label htmlFor="type" className="sr-only">Type</label>
        <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <label htmlFor="category" className="sr-only">Category</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default TransactionForm

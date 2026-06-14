import { useMemo } from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from './utils/format.js'

const COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE', '#a855f7', '#ef4444', '#14b8a6'];

function buildChartData(transactions) {
  const totals = {};
  for (const t of transactions) {
    if (t.type !== 'expense') continue;
    totals[t.category] = (totals[t.category] ?? 0) + t.amount;
  }
  return Object.entries(totals).map(([name, value]) => ({ name, value }));
}

export default function SpendingChart({ transactions }) {
  const data = useMemo(() => buildChartData(transactions), [transactions]);

  if (data.length === 0) {
    return (
      <div className="spending-chart">
        <h2>Spending by Category</h2>
        <p className="chart-empty">No expense data to display.</p>
      </div>
    );
  }

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 8, right: 16, left: 16, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 13 }} />
          <YAxis tickFormatter={formatCurrency} tick={{ fontSize: 12 }} />
          <Tooltip formatter={formatCurrency} />
          <Bar dataKey="value" name="Amount" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

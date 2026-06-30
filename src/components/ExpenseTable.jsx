import { useState } from "react";
import { EXPENSES } from "../data/expenses";
import { convertToUSD } from "../utils/currency";


function ExpenseTable() {
  const [expenses] = useState(EXPENSES);
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");  
  
  const total = EXPENSES.reduce(
  (sum, expense) =>
    sum + convertToUSD(expense.amount, expense.currency),
  0  
   );
   const sortedExpenses = [...expenses].sort((a, b) => {
  if (sortField === "date") {
    return sortOrder === "asc"
      ? new Date(a.date) - new Date(b.date)
      : new Date(b.date) - new Date(a.date);
  }

  if (sortField === "usd") {
    const usdA = convertToUSD(a.amount, a.currency);
    const usdB = convertToUSD(b.amount, b.currency);

    return sortOrder === "asc"
      ? usdA - usdB
      : usdB - usdA;
  }

  return 0;
});
  return (
    <div className="container mt-4">
      <h3>Total Spend: ${total.toFixed(2)}</h3>
      <h2>Expense Table</h2>
      <div className="mb-3">
  <button
    className="btn btn-primary me-2"
    onClick={() => setSortField("date")}
  >
    Sort by Date
  </button>

  <button
    className="btn btn-success me-2"
    onClick={() => setSortField("usd")}
  >
    Sort by USD
  </button>

  <button
    className="btn btn-secondary"
    onClick={() =>
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    }
  >
    {sortOrder === "asc" ? "Ascending ↑" : "Descending ↓"}
  </button>
</div>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Date</th>
            <th>Merchant</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Category</th>
            <th>USD</th>
          </tr>
        </thead>

        <tbody>
          {sortedExpenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.date}</td>
              <td>{expense.merchant}</td>
              <td>{expense.amount}</td>
              <td>{expense.currency}</td>
              <td>{expense.category}</td>
              <td>${convertToUSD(expense.amount, expense.currency).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseTable;
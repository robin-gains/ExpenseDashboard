import { EXPENSES } from "../data/expenses";
import { convertToUSD } from "../utils/currency";


function Summary() {

  const categorySummary = EXPENSES.reduce((acc, expense) => {
  const usd = convertToUSD(expense.amount, expense.currency);

  if (!acc[expense.category]) {
    acc[expense.category] = {
      count: 0,
      total: 0,
      largest: 0,
    };
  }

  acc[expense.category].count++;
  acc[expense.category].total += usd;

  if (usd > acc[expense.category].largest) {
    acc[expense.category].largest = usd;
  }

  return acc;
}, {});
  
  const sortedCategories = Object.entries(categorySummary).sort(
  (a, b) => b[1].total - a[1].total
  
);
  const topMerchants = [...EXPENSES]
  .map((expense) => ({
    ...expense,
    usd: convertToUSD(expense.amount, expense.currency),
  }))
  .sort((a, b) => b.usd - a.usd)
  .slice(0, 3);

  return (
  <div className="container">
    <h2 className="mt-4">Top 3 Merchants</h2>

    <div className="row mb-4">
      {topMerchants.map((merchant) => (
        <div className="col-md-4" key={merchant.id}>
          <div className="card shadow-sm">
            <div className="card-body">
              <h5>{merchant.merchant}</h5>
              <p>
                <strong>Category:</strong> {merchant.category}
              </p>
              <p>
                <strong>USD Spend:</strong> ${merchant.usd.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>

    <h2>Category Totals</h2>

    <table className="table table-bordered table-striped mt-3">
      <thead>
        <tr>
          <th>Category</th>
          <th>Transactions</th>
          <th>Total (USD)</th>
          <th>Largest Transaction</th>
        </tr>
      </thead>

      <tbody>
        {sortedCategories.map(([category, data]) => (
          <tr key={category}>
            <td>{category}</td>
            <td>{data.count}</td>
            <td>${data.total.toFixed(2)}</td>
            <td>${data.largest.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}

export default Summary;
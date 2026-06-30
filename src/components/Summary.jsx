import { convertToUSD } from "../utils/currency";

function Summary({ expenses }) {
  // Overall total spend
  const overallTotal = expenses.reduce(
    (sum, expense) =>
      sum + convertToUSD(expense.amount, expense.currency),
    0
  );

  // Category summary
  const categorySummary = expenses.reduce((acc, expense) => {
    const usd = convertToUSD(
      expense.amount,
      expense.currency
    );

    if (!acc[expense.category]) {
      acc[expense.category] = {
        count: 0,
        total: 0,
        largest: 0,
      };
    }

    acc[expense.category].count += 1;
    acc[expense.category].total += usd;

    if (usd > acc[expense.category].largest) {
      acc[expense.category].largest = usd;
    }

    return acc;
  }, {});

  // Sort categories by total spend descending
  const sortedCategories = Object.entries(
    categorySummary
  ).sort(
    (a, b) => b[1].total - a[1].total
  );

  // Top 3 merchants by USD spend
  const topMerchants = [...expenses]
    .map((expense) => ({
      ...expense,
      usd: convertToUSD(
        expense.amount,
        expense.currency
      ),
    }))
    .sort((a, b) => b.usd - a.usd)
    .slice(0, 3);

  return (
    <div className="container">

      {/* Overall Total */}
      <div className="alert alert-success mb-4">
        <h4 className="mb-0">
          Overall Spend (USD): $
          {overallTotal.toFixed(2)}
        </h4>
      </div>

      {/* Top Merchants */}
      <h2 className="mb-3">Top 3 Merchants</h2>

      <div className="row g-3 mb-5">
        {topMerchants.map((merchant) => (
          <div
            className="col-md-4"
            key={merchant.id}
          >
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">
                  {merchant.merchant}
                </h5>

                <p className="card-text">
                  <strong>Category:</strong>{" "}
                  {merchant.category}
                </p>

                <p className="card-text">
                  <strong>USD Spend:</strong>{" "}
                  ${merchant.usd.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Category Summary */}
      <h2>Category Totals</h2>

      <div className="table-responsive">
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
            {sortedCategories.map(
              ([category, data]) => (
                <tr key={category}>
                  <td>{category}</td>

                  <td>{data.count}</td>

                  <td>
                    ${data.total.toFixed(2)}
                  </td>

                  <td>
                    ${data.largest.toFixed(2)}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Summary;
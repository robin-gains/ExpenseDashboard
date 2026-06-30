import { useState } from "react";
import { convertToUSD } from "../utils/currency";

function ExpenseTable({ expenses, setExpenses }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("asc");

  const [editId, setEditId] = useState(null);
  const [editMerchant, setEditMerchant] = useState("");
  const [editAmount, setEditAmount] = useState("");

  // Category filter
  const filteredExpenses =
    selectedCategory === "All"
      ? expenses
      : expenses.filter(
          (expense) =>
            expense.category === selectedCategory
        );

  // Sorting
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    let first;
    let second;

    if (sortField === "usd") {
      first = convertToUSD(a.amount, a.currency);
      second = convertToUSD(b.amount, b.currency);
    } else {
      first = new Date(a.date);
      second = new Date(b.date);
    }

    if (sortOrder === "asc") {
      return first > second ? 1 : -1;
    }

    return first < second ? 1 : -1;
  });

  // Delete expense
  const handleDelete = (id) => {
    setExpenses(
      expenses.filter(
        (expense) => expense.id !== id
      )
    );
  };

  // Start editing
  const startEdit = (expense) => {
    setEditId(expense.id);
    setEditMerchant(expense.merchant);
    setEditAmount(expense.amount);
  };

  // Save edited expense
  const saveEdit = (id) => {
    const merchantRegex = /^[A-Za-z\s]+$/;

    if (!editMerchant.trim()) {
      alert("Merchant name cannot be empty.");
      return;
    }

    if (!merchantRegex.test(editMerchant)) {
      alert(
        "Merchant name can only contain letters and spaces."
      );
      return;
    }

    if (Number(editAmount) <= 0) {
      alert(
        "Amount must be greater than zero."
      );
      return;
    }

    setExpenses(
      expenses.map((expense) =>
        expense.id === id
          ? {
              ...expense,
              merchant: editMerchant.trim(),
              amount: Number(editAmount),
            }
          : expense
      )
    );

    setEditId(null);
    setEditMerchant("");
    setEditAmount("");
  };

  return (
    <div className="mt-4">
      <h2>Expense Table</h2>

      <div className="d-flex gap-3 mb-3 flex-wrap">

        {/* Category Filter */}
        <div>
          <label className="form-label">
            Category
          </label>

          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) =>
              setSelectedCategory(e.target.value)
            }
          >
            <option value="All">All</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Software">Software</option>
            <option value="Entertainment">
              Entertainment
            </option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="form-label">
            Sort By
          </label>

          <select
            className="form-select"
            value={sortField}
            onChange={(e) =>
              setSortField(e.target.value)
            }
          >
            <option value="date">Date</option>
            <option value="usd">
              USD Amount
            </option>
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label className="form-label">
            Order
          </label>

          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value)
            }
          >
            <option value="asc">
              Ascending
            </option>
            <option value="desc">
              Descending
            </option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Date</th>
              <th>Merchant</th>
              <th>Original Amount</th>
              <th>Category</th>
              <th>USD Equivalent</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {sortedExpenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.date}</td>

                {/* Merchant */}
                <td>
                  {editId === expense.id ? (
                    <input
                      className="form-control"
                      value={editMerchant}
                      onChange={(e) =>
                        setEditMerchant(
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    expense.merchant
                  )}
                </td>

                {/* Amount */}
                <td>
                  {editId === expense.id ? (
                    <input
                      type="number"
                      className="form-control"
                      value={editAmount}
                      onChange={(e) =>
                        setEditAmount(
                          e.target.value
                        )
                      }
                    />
                  ) : (
                    <>
                      {expense.amount}{" "}
                      {expense.currency}
                    </>
                  )}
                </td>

                <td>{expense.category}</td>

                <td>
                  $
                  {convertToUSD(
                    expense.amount,
                    expense.currency
                  ).toFixed(2)}
                </td>

                {/* Actions */}
                <td>
                  {editId === expense.id ? (
                    <button
                      className="btn btn-success btn-sm me-2"
                      onClick={() =>
                        saveEdit(expense.id)
                      }
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() =>
                        startEdit(expense)
                      }
                    >
                      Edit
                    </button>
                  )}

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      handleDelete(expense.id)
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {sortedExpenses.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center"
                >
                  No expenses found for this category.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseTable;
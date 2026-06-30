import { useState } from "react";

function AddExpense({ expenses, setExpenses }) {
  const [merchant, setMerchant] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [category, setCategory] = useState("Travel");
  const [date, setDate] = useState("");

  const [merchantError, setMerchantError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [dateError, setDateError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Clear previous errors
    setMerchantError("");
    setAmountError("");
    setDateError("");

    const merchantRegex = /^[A-Za-z\s]+$/;

    // Merchant validation
    if (!merchant.trim()) {
      setMerchantError("Merchant name is required.");
      return;
    }

    if (!merchantRegex.test(merchant)) {
      setMerchantError(
        "Merchant name can only contain letters and spaces."
      );
      return;
    }

    // Amount validation
    if (!amount) {
      setAmountError("Amount is required.");
      return;
    }

    if (Number(amount) <= 0) {
      setAmountError(
        "Amount must be greater than zero."
      );
      return;
    }

    // Date validation
    if (!date) {
      setDateError("Please select a date.");
      return;
    }

    const newExpense = {
      id: Date.now(),
      merchant: merchant.trim(),
      amount: Number(amount),
      currency,
      category,
      date,
    };

    setExpenses([...expenses, newExpense]);

    // Reset form
    setMerchant("");
    setAmount("");
    setCurrency("USD");
    setCategory("Travel");
    setDate("");

    setMerchantError("");
    setAmountError("");
    setDateError("");
  };

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h3>Add Expense</h3>

        <form onSubmit={handleSubmit}>
          {/* Merchant */}
          <div className="mb-3">
            <label className="form-label">
              Merchant
            </label>

            <input
              className={`form-control ${
                merchantError ? "is-invalid" : ""
              }`}
              value={merchant}
              onChange={(e) => {
                setMerchant(e.target.value);
                setMerchantError("");
              }}
            />

            <div className="invalid-feedback">
              {merchantError}
            </div>
          </div>

          {/* Amount */}
          <div className="mb-3">
            <label className="form-label">
              Amount
            </label>

            <input
              type="number"
              className={`form-control ${
                amountError ? "is-invalid" : ""
              }`}
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setAmountError("");
              }}
            />

            <div className="invalid-feedback">
              {amountError}
            </div>
          </div>

          {/* Currency */}
          <div className="mb-3">
            <label className="form-label">
              Currency
            </label>

            <select
              className="form-select"
              value={currency}
              onChange={(e) =>
                setCurrency(e.target.value)
              }
            >
              <option>USD</option>
              <option>INR</option>
              <option>GBP</option>
              <option>EUR</option>
              <option>JPY</option>
              <option>AUD</option>
              <option>CAD</option>
              <option>SGD</option>
              <option>AED</option>
              <option>MXN</option>
            </select>
          </div>

          {/* Category */}
          <div className="mb-3">
            <label className="form-label">
              Category
            </label>

            <select
              className="form-select"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              <option>Travel</option>
              <option>Food</option>
              <option>Software</option>
              <option>Entertainment</option>
            </select>
          </div>

          {/* Date */}
          <div className="mb-3">
            <label className="form-label">
              Date
            </label>

            <input
              type="date"
              className={`form-control ${
                dateError ? "is-invalid" : ""
              }`}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setDateError("");
              }}
            />

            <div className="invalid-feedback">
              {dateError}
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddExpense;
import { useState } from "react";
import { EXPENSES } from "./data/expenses";

import Summary from "./components/Summary";
import ExpenseTable from "./components/ExpenseTable";
import AddExpense from "./components/AddExpense";
import Notes from "./components/Notes";

function App() {
  // Main expense state
  const [expenses, setExpenses] = useState(EXPENSES);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-5">
        Spendlens Dashboard
      </h1>

      {/* Summary Dashboard */}
      <Summary expenses={expenses} />

      {/* Add Expense Form */}
      <div className="my-5">
        <AddExpense
          expenses={expenses}
          setExpenses={setExpenses}
        />
      </div>

      {/* Expense Table */}
      <ExpenseTable
        expenses={expenses}
        setExpenses={setExpenses}
      />
      <Notes />
    </div>
  );
}

export default App;
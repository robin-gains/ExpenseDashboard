import ExpenseTable from "./components/ExpenseTable";
import Summary from "./components/Summary";

function App() {
  return (
    <div className="container">
      <h1 className="text-center my-4">
          Expense dashboard
      </h1>
      
       <Summary/>

      <ExpenseTable/>
    </div>
  );
}

export default App;
import { Routes, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { FinanceContext } from "./context/FinanceContext";

import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";

function Dashboard() {
  const { transactions } = useContext(FinanceContext);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + Number(t.amount), 0);

  const balance = income - expense;

  return (
    <div className="container">
      <h1 style={{textAlign: "center"}}>💰 Finance Dashboard</h1>

      <div className="card">
        <h3>Income: ₹{income}</h3>
        <h3>Expense: ₹{expense}</h3>
        <h3>Balance: ₹{balance}</h3>
      </div>

      <div className="dashboard-buttons">
        <Link to="/transactions/new">
          <button className="big-btn">Add Transaction</button>
        </Link>

        <Link to="/transactions">
          <button className="big-btn secondary">
            View Transactions
          </button>
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/transactions/new" element={<AddTransaction />} />
    </Routes>
  );
}
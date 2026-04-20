import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FinanceContext } from "../context/FinanceContext";

export default function Transactions() {
  const { transactions, deleteTransaction } = useContext(FinanceContext);
  const navigate = useNavigate();

  return (
    <div className="container">

      {/* Back to Dashboard */}
      <Link to="/">
        <button>⬅ Dashboard</button>
      </Link>

      <br /><br />

      <h2>Transactions</h2>

      {transactions.length === 0 ? (
        <p>No transactions yet</p>
      ) : (
        transactions.map((t, index) => (
          <div className="card" key={index}>
            <h4>{t.title}</h4>
            <p>₹{t.amount}</p>
            <p>{t.category}</p>

            <p style={{ color: t.type === "income" ? "green" : "red" }}>
              {t.type}
            </p>

            {/* Buttons */}
            <button onClick={() => deleteTransaction(index)}>
              Delete
            </button>

            <button
              style={{ marginLeft: "10px" }}
              onClick={() =>
                navigate("/transactions/new", {
                  state: { editData: t, index },
                })
              }
            >
              Edit
            </button>
          </div>
        ))
      )}
    </div>
  );
}
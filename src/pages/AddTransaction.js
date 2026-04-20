import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FinanceContext } from "../context/FinanceContext";

export default function AddTransaction() {
  const { addTransaction, deleteTransaction } = useContext(FinanceContext);
  const navigate = useNavigate();
  const location = useLocation();

  const editData = location.state?.editData;
  const editIndex = location.state?.index;

  const { register, handleSubmit, reset } = useForm({
    defaultValues: editData || {},
  });

  useEffect(() => {
    if (editData) {
      reset(editData);
    }
  }, [editData, reset]);

  const onSubmit = (data) => {
    const transaction = {
      ...data,
      amount: Number(data.amount),
      date: new Date(),
    };

    if (editData) {
      deleteTransaction(editIndex);
    }

    addTransaction(transaction);
    navigate("/transactions");
  };

  return (
    <div className="container">
      {/* Back button */}
      <Link to="/">
        <button>⬅ Dashboard</button>
      </Link>

      <div className="card">
        <h2>{editData ? "Edit Transaction" : "Add Transaction"}</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <input
              placeholder="Title"
              {...register("title", { required: true })}
            />

            <input
              type="number"
              placeholder="Amount"
              {...register("amount", { required: true })}
            />

            <input
              placeholder="Category"
              {...register("category", { required: true })}
            />

            <select {...register("type")}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <button type="submit">
              {editData ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
import { createContext, useState } from "react";

// 1. Create context (empty box)
export const FinanceContext = createContext();

// 2. Create provider (this holds data)
export const FinanceProvider = ({ children }) => {
  // 🔹 Store all transactions
  const [transactions, setTransactions] = useState([]);

  // 🔹 Add transaction
const addTransaction = (data) => {
  setTransactions((prev) => [...prev, data]);
};

  // 🔹 Delete transaction
  const deleteTransaction = (index) => {
    const updated = transactions.filter((_, i) => i !== index);
    setTransactions(updated);
  };

  // 3. Provide data to whole app
  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
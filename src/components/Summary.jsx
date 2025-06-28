// src/components/Summary.jsx
import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

export default function Summary() {
  const { transactions } = useContext(TransactionContext);

  const income = transactions
    .filter((tx) => tx.type === "income")
    .reduce((total, tx) => total + tx.amount, 0);

  const expense = transactions
    .filter((tx) => tx.type === "expense")
    .reduce((total, tx) => total + tx.amount, 0);

  const balance = income - expense;

  return (
    <div className="max-w-md mx-auto mt-6 bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-4">📊 Summary</h2>
      <div className="flex justify-between mb-2">
        <span className="text-green-600">Income:</span>
        <span className="font-medium">₦{income.toLocaleString()}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-red-600">Expense:</span>
        <span className="font-medium">₦{expense.toLocaleString()}</span>
      </div>
      <div className="flex justify-between border-t pt-2 mt-2">
        <span className="font-semibold">Balance:</span>
        <span
          className={`font-bold ${
            balance >= 0 ? "text-green-700" : "text-red-700"
          }`}
        >
          ₦{balance.toLocaleString()}
        </span>
      </div>
    </div>
  );
}


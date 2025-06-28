import { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";

export default function TransactionList() {
  const { transactions, deleteTransaction } = useContext(TransactionContext);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");

  // Get unique categories from transactions
  const categories = ["All", ...new Set(transactions.map((tx) => tx.category))];

  // Get unique months from transactions
  const months = ["All", ...new Set(transactions.map((tx) => {
    const date = new Date(tx.date);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
  }))];

  // Filter logic
  const filteredTransactions = transactions.filter((tx) => {
    const matchesCategory = selectedCategory === "All" || tx.category === selectedCategory;

    const txMonth = `${new Date(tx.date).getFullYear()}-${String(
      new Date(tx.date).getMonth() + 1
    ).padStart(2, "0")}`;

    const matchesMonth = selectedMonth === "All" || txMonth === selectedMonth;

    return matchesCategory && matchesMonth;
  });

  return (
    <div className="max-w-md mx-auto mt-6">
      <h2 className="text-lg font-semibold mb-4">📋 Transactions</h2>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        <select
          className="w-1/2 p-2 border rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        <select
          className="w-1/2 p-2 border rounded"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map((month) => (
            <option key={month}>{month}</option>
          ))}
        </select>
      </div>

      {/* Transactions */}
      {filteredTransactions.length === 0 ? (
        <div className="text-center text-gray-500">No transactions found.</div>
      ) : (
        filteredTransactions.map((tx) => (
          <div
            key={tx.id}
            className={`flex justify-between items-center p-3 mb-2 border-l-4 rounded shadow ${
              tx.type === "income" ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
            }`}
          >
            <div>
              <p className="font-medium">
                {tx.category} • {tx.type}
              </p>
              <p className="text-sm text-gray-600">
                {new Date(tx.date).toLocaleDateString()} — ₦{tx.amount.toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => deleteTransaction(tx.id)}
              className="text-red-600 hover:underline text-sm"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

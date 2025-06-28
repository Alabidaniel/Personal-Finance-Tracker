// src/components/AddTransactionForm.jsx
import { useState, useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { v4 as uuidv4 } from "uuid";

export default function AddTransactionForm() {
  const { addTransaction } = useContext(TransactionContext);

  const [form, setForm] = useState({
    amount: "",
    type: "income",
    category: "Other",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build the new transaction object
    const newTransaction = {
      id: uuidv4(),
      amount: parseFloat(form.amount),
      type: form.type,
      category: form.category,
      date: new Date().toISOString(),
    };

    addTransaction(newTransaction);

    // Clear form
    setForm({ amount: "", type: "income", category: "Other" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow max-w-md mx-auto mt-6"
    >
      <h2 className="text-xl font-bold mb-4">Add Transaction</h2>

      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        required
        className="w-full mb-3 p-2 border rounded"
      />

      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
        className="w-full mb-3 p-2 border rounded"
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <input
        type="text"
        placeholder="Category (e.g., Food, Rent)"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        required
        className="w-full mb-4 p-2 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Add Transaction
      </button>
    </form>
  );
}

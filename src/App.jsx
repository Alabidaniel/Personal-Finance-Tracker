// src/App.js
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./pages/Login";

import AddTransactionForm from "./components/AddTransactionForm";
import Summary from "./components/Summary";
import TransactionList from "./components/TransactionList";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <Login onLoginSuccess={() => {}} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">💸 Personal Finance Tracker</h1>
          <button
            onClick={() => signOut(auth)}
            className="text-red-500 text-sm hover:underline"
          >
            Logout
          </button>
        </div>

        <AddTransactionForm />
        <Summary />
        <TransactionList />
      </div>
    </div>
  );
}

export default App;

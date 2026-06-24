import React, { useState } from "react";

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [type, setType] = useState("Expense");

  const addTransaction = () => {
    if (!amount) return;

    const newTransaction = {
      id: Date.now(),
      amount: Number(amount),
      category,
      type,
      date: new Date().toLocaleDateString(),
    };

    setTransactions([newTransaction, ...transactions]);
    setAmount("");
  };

  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((a, b) => a + b.amount, 0);

  const balance = income - expense;

  const summary = {};
  transactions.forEach((t) => {
    if (t.type === "Expense") {
      summary[t.category] =
        (summary[t.category] || 0) + t.amount;
    }
  });

  const cardStyle = (bg) => ({
    background: bg,
    color: "white",
    padding: "20px",
    borderRadius: "20px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    textAlign: "center",
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Poppins, sans-serif",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(15px)",
          borderRadius: "25px",
          padding: "25px",
        }}
      >
        {/* Dashboard Homepage */}
        <h1
          style={{
            textAlign: "center",
            color: "#fff",
            fontSize: "3rem",
            textShadow: "3px 3px 10px black",
          }}
        >
          💰 Daily Expense Analytics Dashboard
        </h1>

        {/* Summary Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "15px",
          }}
        >
          <div
            style={cardStyle(
              "linear-gradient(135deg,#00c853,#69f0ae)"
            )}
          >
            <h3>Total Income</h3>
            <h1>₹{income}</h1>
          </div>

          <div
            style={cardStyle(
              "linear-gradient(135deg,#ff1744,#ff8a80)"
            )}
          >
            <h3>Total Expense</h3>
            <h1>₹{expense}</h1>
          </div>

          <div
            style={cardStyle(
              "linear-gradient(135deg,#2979ff,#82b1ff)"
            )}
          >
            <h3>Balance</h3>
            <h1>₹{balance}</h1>
          </div>
        </div>

        {/* Add Transaction Form */}
        <div
          style={{
            marginTop: "25px",
            background: "rgba(255,255,255,0.15)",
            padding: "20px",
            borderRadius: "20px",
            color: "white",
          }}
        >
          <h2
  style={{
    fontSize: "45px",
    fontWeight: "900",
    color: "#FFD700",
    textAlign: "center",
    textShadow: "3px 3px 10px black",
    marginBottom: "25px",
  }}
>
  ➕ Add Transaction
</h2>

<input
  type="number"
  placeholder="Amount"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
  style={{
    width: "100%",
    padding: "20px",
    marginBottom: "15px",
    borderRadius: "15px",
    fontSize: "28px",
    fontWeight: "700",
    border: "3px solid #00E5FF",
    outline: "none",
  }}
/>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
  width: "100%",
  padding: "20px",
  marginBottom: "15px",
  borderRadius: "15px",
  fontSize: "28px",
  fontWeight: "700",
  border: "3px solid #00C853",
}}
          >
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Entertainment</option>
          </select>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            style={{
  width: "100%",
  padding: "20px",
  marginBottom: "15px",
  borderRadius: "15px",
  fontSize: "28px",
  fontWeight: "700",
  border: "3px solid #FF1744",
}}
          >
            <option>Income</option>
            <option>Expense</option>
          </select>

          <button
            onClick={addTransaction}
           style={{
  width: "100%",
  padding: "22px",
  border: "none",
  borderRadius: "15px",
  color: "white",
  fontSize: "30px",
  fontWeight: "900",
  cursor: "pointer",
  background:
    "linear-gradient(135deg,#FF6F00,#FFD600,#FF1744)",
  boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
}}
          >
            Add Transaction
          </button>
        </div>

        {/* Transaction History */}
        <div
          style={{
            marginTop: "25px",
            background: "rgba(255,255,255,0.15)",
            padding: "20px",
            borderRadius: "20px",
            color: "white",
          }}
        >
          <h2
  style={{
    fontSize: "45px",
    fontWeight: "900",
    color: "#00E5FF",
    textAlign: "center",
    textShadow: "3px 3px 10px black",
    marginBottom: "20px",
  }}
>
  📜 Transaction History
</h2>

          {transactions.map((t) => (
            <div
              key={t.id}
              style={{
  background:
    "linear-gradient(135deg,#667eea,#764ba2)",
  padding: "20px",
  marginBottom: "15px",
  borderRadius: "15px",
  fontSize: "26px",
  fontWeight: "700",
  color: "white",
}}
            >
              <strong>{t.type}</strong> | {t.category} |
              ₹{t.amount}
              <br />
              <small
  style={{
    fontSize: "18px",
    color: "#FFD700",
  }}
>
  {t.date}
</small>
            </div>
          ))}
        </div>

        {/* Analytics / Category Summary */}
        <div
          style={{
            marginTop: "25px",
            background: "rgba(255,255,255,0.15)",
            padding: "20px",
            borderRadius: "20px",
            color: "white",
          }}
        >
          <h2
  style={{
    fontSize: "45px",
    fontWeight: "900",
    color: "#69F0AE",
    textAlign: "center",
    textShadow: "3px 3px 10px black",
    marginBottom: "25px",
  }}
>
  📊 Analytics / Category Summary
</h2>
          {Object.keys(summary).length === 0 ? (
            <p
  style={{
    fontSize: "30px",
    fontWeight: "900",
    color: "#FFD600",
    textAlign: "center",
  }}
>
  No Expense Data Available
</p>
          ) : (
            Object.keys(summary).map((cat) => (
              <div
                key={cat}
                style={{
  background:
    "linear-gradient(135deg,#7b1fa2,#ce93d8)",
  padding: "20px",
  marginBottom: "15px",
  borderRadius: "15px",
  fontSize: "28px",
  fontWeight: "800",
  color: "white",
  textAlign: "center",
}}
              >
                {cat} : ₹{summary[cat]}
              </div>
            ))
          )}
        </div>

        {/* Mobile Responsive View */}
        <div
         style={{
  marginTop: "30px",
  textAlign: "center",
  color: "#FFD700",
  fontWeight: "900",
  fontSize: "32px",
  textShadow: "2px 2px 8px black",
}}
        >
          📱 Fully Responsive for Mobile, Tablet & Desktop
        </div>
      </div>
    </div>
  );
}

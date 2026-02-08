import { useState } from "react";
import "../styles/login.css";

export default function Login({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🔐 Replace with your real date
  const CORRECT_PASSWORD = "11082024";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setError("");
      onSuccess();
    } else {
      setError("That doesn’t feel like *our* date 💔");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>💌 Hello, My Love</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            inputMode="numeric"
            placeholder="Enter the password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />

          <p className="hint">
            Hint: the date we will never forget ✨<br/>
            (Format: DDMMYYYY)
          </p>

          {error && <p className="error">{error}</p>}

          <button type="submit">Unlock ❤️</button>
        </form>
      </div>
    </div>
  );
}
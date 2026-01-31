import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Login({ switchPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get stored users from localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Find matching user
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Store logged in user
      localStorage.setItem("currentUser", JSON.stringify(user));
      // Redirect to main app
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="container">
      <div className="auth-box">
        <h2>Log in</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Log in</button>
        </form>

        <p className="switch-text">
          Don't have an account? <span onClick={switchPage}>Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Signup({ switchPage }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Get existing users or create empty array
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    // Check if email already exists
    if (users.find((u) => u.email === email)) {
      alert("Email already registered");
      return;
    }

    // Add new user
    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    
    // Auto login after signup
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    
    // Redirect to main app
    navigate("/");
  };

  return (
    <div className="container">
      <div className="auth-box">
        <h2>ForumX</h2>
        <p className="auth-subtitle">Create your account to get started</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

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

          <button type="submit">Create account</button>
        </form>

        <p className="switch-text">
          Already have an account? <span onClick={switchPage}>Log in</span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
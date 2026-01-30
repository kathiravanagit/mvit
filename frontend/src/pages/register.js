import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isStrongPassword = (password) => {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);
    return hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
  };

  const registerUser = async () => {
    if (!name || !email || !password) {
      setMsg("All fields are required");
      return;
    }

    if (!isValidEmail(email)) {
      setMsg("Invalid email format");
      return;
    }

    if (!isStrongPassword(password)) {
      setMsg("Password: min 8 chars, uppercase, lowercase, number, special char (!@#$%^&*)");
      return;
    }

    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    setMsg(data.message);

    if (res.status === 201) {
      setTimeout(() => navigate("/login"), 1000);
    }
  };

  return (
    <div className="page">
      <header className="header">
        <div className="brand">AuthKit</div>
        <nav className="nav">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </nav>
      </header>

      <main className="main">
        <section className="card">
          <h1>Create your account</h1>
          <p className="muted">
            Secure access with email + password and token-based sessions.
          </p>

          <div className="form">
            <label className="label">Name</label>
            <input
              className="input"
              placeholder="Your name"
              onChange={e => setName(e.target.value)}
            />

            <label className="label">Email</label>
            <input
              className="input"
              placeholder="you@example.com"
              onChange={e => setEmail(e.target.value)}
            />

            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              placeholder="Create a password"
              onChange={e => setPassword(e.target.value)}
            />

            <button className="button primary" onClick={registerUser}>
              Create account
            </button>
            <p className="status">{msg}</p>
          </div>

          <p className="muted small">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </section>

        <aside className="card soft">
          <h3>Why authenticate?</h3>
          <ul className="list">
            <li>Private components and APIs</li>
            <li>Team-based access control</li>
            <li>Usage analytics & licensing</li>
            <li>Secure token-based sessions</li>
          </ul>
        </aside>
      </main>
    </div>
  );
}

export default Register;

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [protectedMsg, setProtectedMsg] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/protected", {
          headers: { Authorization: token }
        });
        const data = await res.json();
        setProtectedMsg(data.message);
      } catch (error) {
        setProtectedMsg("Error accessing protected route");
      }
    };
    checkAccess();
  }, [token]);

  const updateProfile = async () => {
    const res = await fetch("http://localhost:5000/api/auth/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ name, email })
    });

    const data = await res.json();
    setMsg(data.message);
  };

  const deleteAccount = async () => {
    const res = await fetch("http://localhost:5000/api/auth/delete", {
      method: "DELETE",
      headers: { Authorization: token }
    });

    const data = await res.json();
    alert(data.message);
    localStorage.removeItem("token");
    navigate("/login");
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
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
          <h1>Dashboard</h1>
          <p className="muted">You have successfully authenticated.</p>

          <div className="callout">{protectedMsg || "Verifying access..."}</div>

          <div className="form">
            <label className="label">New name</label>
            <input
              className="input"
              placeholder="New name"
              onChange={e => setName(e.target.value)}
            />

            <label className="label">New email</label>
            <input
              className="input"
              placeholder="New email"
              onChange={e => setEmail(e.target.value)}
            />

            <div className="buttonRow">
              <button className="button primary" onClick={updateProfile}>
                Update profile
              </button>
              <button className="button danger" onClick={deleteAccount}>
                Delete account
              </button>
              <button className="button ghost" onClick={logout}>
                Logout
              </button>
            </div>
            <p className="status">{msg}</p>
          </div>
        </section>

        <aside className="card soft">
          <h3>Security status</h3>
          <ul className="list">
            <li>✓ Token stored in localStorage</li>
            <li>✓ Authorization header attached</li>
            <li>✓ Protected routes enforced</li>
            <li>✓ JWT-based authentication active</li>
          </ul>
        </aside>
      </main>
    </div>
  );
}

export default Dashboard;

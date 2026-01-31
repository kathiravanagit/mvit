import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");
	const navigate = useNavigate();

	const loginUser = async () => {
		const normalizedEmail = email.trim().toLowerCase();

		if (!normalizedEmail || !password) {
			setMsg("Email and password are required");
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(normalizedEmail)) {
			setMsg("Enter a single valid email");
			return;
		}

		const API_URL = process.env.REACT_APP_API_URL;
		const res = await fetch(`${API_URL}/api/auth/login`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: normalizedEmail, password })
		});

		const data = await res.json();
		setMsg(data.message || data.error || "");

		if (res.status === 200 && data.token) {
			localStorage.setItem("token", data.token);
			navigate("/dashboard");
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
					<h1>Welcome back</h1>
					<p className="muted">Sign in to access your dashboard.</p>

					<div className="form">
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
							placeholder="Your password"
							onChange={e => setPassword(e.target.value)}
						/>

						<button className="button primary" onClick={loginUser}>
							Sign in
						</button>
						<p className="status">{msg}</p>
					</div>

					<p className="muted small">
						Forgot password? <Link to="/forgot">Reset it</Link>
					</p>
					<p className="muted small">
						New here? <Link to="/register">Create an account</Link>
					</p>
				</section>

				<aside className="card soft">
					<h3>Token-based security</h3>
					<ul className="list">
						<li>Protected routes</li>
						<li>Role-based access</li>
						<li>Audit-friendly activity</li>
						<li>Sessions stored in bearer tokens</li>
					</ul>
				</aside>
			</main>
		</div>
	);
}

export default Login;

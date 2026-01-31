import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

function Forgot() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [step, setStep] = useState("request");
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(timer - 1), 1000);
    } else if (timer === 0 && step === "verify") {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, step]);

  const requestOtp = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!normalizedEmail) {
      setMsg("Email is required");
      return;
    }

    if (!emailRegex.test(normalizedEmail)) {
      setMsg("Enter a single valid email");
      return;
    }

    const API_URL = process.env.REACT_APP_API_URL;
    const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: normalizedEmail })
    });

    const data = await res.json();
    setMsg(data.message || "OTP sent");

    if (res.status === 200) {
      setStep("verify");
      setTimer(30);
      setCanResend(false);
    }
  };

  const resendOtp = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!normalizedEmail) {
      setMsg("Email is required");
      return;
    }

    if (!emailRegex.test(normalizedEmail)) {
      setMsg("Enter a single valid email");
      return;
    }

    const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: normalizedEmail })
    });

    const data = await res.json();
    setMsg(data.message || "OTP resent");

    if (res.status === 200) {
      setTimer(30);
      setCanResend(false);
    }
  };

  const verifyOtp = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !otp) {
      setMsg("Email and OTP are required");
      return;
    }

    const res = await fetch(`${API_URL}/api/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: normalizedEmail, otp })
    });

    const data = await res.json();
    setMsg(data.message || "");

    if (res.status === 200) {
      setStep("reset");
    }
  };

  const resetPassword = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !otp || !newPassword) {
      setMsg("Email, OTP, and new password are required");
      return;
    }

    const res = await fetch(`${API_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: normalizedEmail, otp, newPassword })
    });

    const data = await res.json();
    setMsg(data.message || "");

    if (res.status === 200) {
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
          <h1>Forgot password</h1>
          <p className="muted">
            Enter your email and we will send you a one-time OTP to reset your
            password.
          </p>

          <div className="form">
            <label className="label">Email (optional)</label>
            <input
              className="input"
              placeholder="you@example.com"
              onChange={e => setEmail(e.target.value)}
            />

            {step !== "request" && (
              <>
                <label className="label">OTP</label>
                <input
                  className="input"
                  placeholder="Enter the 6-digit code"
                  onChange={e => setOtp(e.target.value)}
                />
              </>
            )}

            {step === "reset" && (
              <>
                <label className="label">New password</label>
                <input
                  className="input"
                  type="password"
                  placeholder="Create a new password"
                  onChange={e => setNewPassword(e.target.value)}
                />
              </>
            )}

            {step === "request" && (
              <button className="button primary" onClick={requestOtp}>
                Send OTP
              </button>
            )}

            {step === "verify" && (
              <>
                <button className="button primary" onClick={verifyOtp}>
                  Verify OTP
                </button>
                {canResend ? (
                  <button className="button ghost" onClick={resendOtp}>
                    Resend OTP
                  </button>
                ) : (
                  <p className="muted small">
                    Resend OTP in {timer} seconds
                  </p>
                )}
              </>
            )}

            {step === "reset" && (
              <button className="button primary" onClick={resetPassword}>
                Reset password
              </button>
            )}

            <p className="status">{msg}</p>
          </div>

          <p className="muted small">
            Remembered it? <Link to="/login">Back to login</Link>
          </p>
        </section>

        <aside className="card soft">
          <h3>How it works</h3>
          <ul className="list">
            <li>We send a 6-digit OTP to your registered email</li>
            <li>You verify the OTP</li>
            <li>Set a new password securely</li>
          </ul>
        </aside>
      </main>
    </div>
  );
}

export default Forgot;


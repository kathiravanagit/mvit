import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ConfirmEmail = () => {
  const [message, setMessage] = useState("Confirming your email...");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (!token) {
      setMessage("Invalid confirmation link.");
      return;
    }
    fetch(`${process.env.REACT_APP_API_URL || "http://localhost:5000"}/api/auth/confirm-email?token=${token}`)
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          setMessage("Your email is authenticated! You can now log in.");
        } else {
          setMessage(data.message || "Confirmation failed.");
        }
      })
      .catch(() => setMessage("An error occurred. Please try again later."));
  }, [location.search]);

  return (
    <div style={{ maxWidth: 400, margin: "60px auto", textAlign: "center" }}>
      <h2>Email Confirmation</h2>
      <p>{message}</p>
    </div>
  );
};

export default ConfirmEmail;

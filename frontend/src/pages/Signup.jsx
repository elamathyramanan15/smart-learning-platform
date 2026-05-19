import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [error, setError] = useState("");

  const handleSignup = () => {
    setError("");

    if (!username || !password || !confirmPassword) {
      setError("Please fill in all fields to continue.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please recheck.");
      return;
    }

    let users =
      JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
      (user) => user.username === username
    );

    if (existingUser) {
      setError("Username already exists. Try another one.");
      return;
    }

    users.push({ username, password });

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("username", username);

    navigate("/preferences");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(to right, #064e3b, #10b981)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          backgroundColor: "white",
          borderRadius: "25px",
          padding: "45px",
          boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
        }}
      >
        {/* LOGO */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "20px",
              margin: "auto",
              background:
                "linear-gradient(to right, #10b981, #34d399)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              fontSize: "32px",
              fontWeight: "bold",
            }}
          >
            S
          </div>
        </div>

        {/* TITLE */}
        <h1
          style={{
            textAlign: "center",
            color: "#064e3b",
            marginBottom: "10px",
            fontSize: "32px",
          }}
        >
          Create Your Account 🚀
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginBottom: "35px",
            lineHeight: "1.5",
          }}
        >
          Join Smart Learning and start your personalized AI-powered learning journey.
        </p>

        {/* USERNAME */}
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Username</label>
          <input
            type="text"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* PASSWORD */}
        <div style={{ marginBottom: "20px" }}>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            placeholder="Create a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* CONFIRM PASSWORD */}
        <div style={{ marginBottom: "25px" }}>
          <label style={labelStyle}>Confirm Password</label>
          <input
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            style={inputStyle}
          />
        </div>

        {/* ERROR */}
        {error && (
          <p
            style={{
              color: "#ef4444",
              marginBottom: "20px",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {error}
          </p>
        )}

        {/* BUTTON */}
        <button
          onClick={handleSignup}
          style={{
            width: "100%",
            padding: "15px",
            background:
              "linear-gradient(to right, #10b981, #059669)",
            border: "none",
            borderRadius: "12px",
            color: "white",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 8px 15px rgba(16,185,129,0.3)",
          }}
        >
          Create Account
        </button>

        {/* LOGIN LINK */}
        <p
          style={{
            marginTop: "25px",
            textAlign: "center",
            color: "#6b7280",
          }}
        >
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            style={{
              color: "#10b981",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle = {
  display: "block",
  marginBottom: "8px",
  color: "#064e3b",
  fontWeight: "600",
};

export default Signup;
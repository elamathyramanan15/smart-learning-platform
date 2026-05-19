import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    const loggedIn =
      localStorage.getItem("loggedIn");

    if (loggedIn === "true") {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = () => {
    setError("");

    let users =
      JSON.parse(localStorage.getItem("users")) ||
      [];

    const validUser = users.find(
      (user) =>
        user.username === username &&
        user.password === password
    );

    if (validUser) {
      localStorage.setItem(
        "loggedIn",
        "true"
      );

      localStorage.setItem(
        "username",
        username
      );

      navigate("/preferences");
    } else {
      setError(
        "Invalid username or password"
      );
    }
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
          maxWidth: "420px",
          backgroundColor: "white",
          borderRadius: "25px",
          padding: "45px",
          boxShadow:
            "0 15px 35px rgba(0,0,0,0.2)",
        }}
      >
        {/* LOGO */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "70px",
              height: "70px",
              borderRadius: "20px",
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
          Smart Learning
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            marginBottom: "35px",
            lineHeight: "1.5",
          }}
        >
          Login to continue your personalized
          AI-powered learning experience.
        </p>

        {/* USERNAME */}

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#064e3b",
              fontWeight: "600",
            }}
          >
            Username
          </label>

          <input
            type="text"
            placeholder="Enter username"

            value={username}

            onChange={(e) =>
              setUsername(e.target.value)
            }

            style={inputStyle}
          />
        </div>

        {/* PASSWORD */}

        <div style={{ marginBottom: "25px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              color: "#064e3b",
              fontWeight: "600",
            }}
          >
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"

            value={password}

            onChange={(e) =>
              setPassword(e.target.value)
            }

            style={inputStyle}
          />
        </div>

        {/* ERROR */}

        {error && (
          <p
            style={{
              color: "red",
              marginBottom: "20px",
              fontSize: "14px",
            }}
          >
            {error}
          </p>
        )}

        {/* LOGIN BUTTON */}

        <button
          onClick={handleLogin}
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
            boxShadow:
              "0 8px 15px rgba(16,185,129,0.3)",
          }}
        >
          Login
        </button>

        {/* SIGNUP LINK */}

        <p
          style={{
            marginTop: "25px",
            textAlign: "center",
            color: "#6b7280",
          }}
        >
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{
              color: "#10b981",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Create Account
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

export default Login;
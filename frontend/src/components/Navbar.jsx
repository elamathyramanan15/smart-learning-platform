import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");

    navigate("/");
  };

  return (
    <div
      style={{
        backgroundColor: "#064e3b",
        padding: "18px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      {/* LOGO */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "12px",
            background:
              "linear-gradient(to right, #10b981, #34d399)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          S
        </div>

        <div>
          <h2
            style={{
              margin: 0,
              color: "white",
              fontSize: "22px",
            }}
          >
            Smart Learning
          </h2>

          <p
            style={{
              margin: 0,
              color: "#a7f3d0",
              fontSize: "13px",
            }}
          >
            AI-Powered Learning Experience
          </p>
        </div>
      </div>

      {/* NAVIGATION */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          style={buttonStyle}
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/saved")}
          style={buttonStyle}
        >
          My Learning
        </button>

        <button
          onClick={() => navigate("/trending")}
          style={buttonStyle}
        >
          Trending Skills
        </button>

        <button
          onClick={() => navigate("/courses")}
          style={buttonStyle}
        >
          Course Library
        </button>

        <button
          onClick={handleLogout}
          style={{
            padding: "10px 18px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#ef4444",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "10px 18px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#065f46",
  color: "white",
  cursor: "pointer",
  fontWeight: "500",
};

export default Navbar;
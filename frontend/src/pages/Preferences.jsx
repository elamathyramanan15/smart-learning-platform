import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Preferences() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState([]);

  const interests = [
    "AI",
    "Programming",
    "Web Development",
    "Data Science",
    "Cybersecurity",
    "Cloud Computing",
    "Machine Learning",
    "DevOps",
  ];

  const handleSelect = (interest) => {
    if (selected.includes(interest)) {
      setSelected(
        selected.filter(
          (item) => item !== interest
        )
      );
    } else {
      setSelected([...selected, interest]);
    }
  };

  const handleContinue = () => {
    localStorage.setItem(
      "interests",
      JSON.stringify(selected)
    );

    navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0fdf4",
        padding: "50px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "auto",
          backgroundColor: "white",
          borderRadius: "25px",
          padding: "50px",
          boxShadow:
            "0 15px 35px rgba(0,0,0,0.08)",
        }}
      >
        {/* TITLE */}

        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <h1
            style={{
              color: "#064e3b",
              marginBottom: "10px",
              fontSize: "38px",
            }}
          >
            Choose Your Learning Interests
          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "17px",
            }}
          >
            Help our AI engine recommend the best courses based on your interests and career goals.
          </p>
        </div>

        {/* INTEREST BUTTONS */}

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "18px",
            justifyContent: "center",
          }}
        >
          {interests.map((interest) => (
            <button
              key={interest}
              onClick={() =>
                handleSelect(interest)
              }
              style={{
                padding: "16px 28px",
                borderRadius: "40px",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
                transition: "0.3s",

                backgroundColor:
                  selected.includes(interest)
                    ? "#10b981"
                    : "#d1fae5",

                color:
                  selected.includes(interest)
                    ? "white"
                    : "#064e3b",

                boxShadow:
                  selected.includes(interest)
                    ? "0 8px 18px rgba(16,185,129,0.3)"
                    : "none",
              }}
            >
              {interest}
            </button>
          ))}
        </div>

        {/* SELECTED COUNT */}

        <div
          style={{
            marginTop: "35px",
            textAlign: "center",
            color: "#047857",
            fontWeight: "600",
            fontSize: "16px",
          }}
        >
          {selected.length} learning interests selected
        </div>

        {/* CONTINUE BUTTON */}

        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
          }}
        >
          <button
            onClick={handleContinue}
            style={{
              padding: "16px 40px",
              background:
                "linear-gradient(to right, #10b981, #059669)",
              color: "white",
              border: "none",
              borderRadius: "14px",
              cursor: "pointer",
              fontSize: "17px",
              fontWeight: "bold",
              boxShadow:
                "0 10px 20px rgba(16,185,129,0.3)",
            }}
          >
            Generate My Learning Path
          </button>
        </div>
      </div>
    </div>
  );
}

export default Preferences;
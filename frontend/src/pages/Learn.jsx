import { useLocation, useNavigate } from "react-router-dom";

function Learn() {
  const location = useLocation();
  const navigate = useNavigate();

  const course = location.state;

  if (!course) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Course not found</h2>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "10px 16px",
            background: "#10b981",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0fdf4",
        padding: "30px",
      }}
    >
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginBottom: "20px",
          padding: "10px 14px",
          borderRadius: "10px",
          border: "none",
          background: "#064e3b",
          color: "white",
          cursor: "pointer",
        }}
      >
        ← Back to Dashboard
      </button>

      {/* MAIN LAYOUT */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "25px",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        {/* LEFT SECTION */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <h1 style={{ color: "#064e3b", marginBottom: "10px" }}>
            {course.title}
          </h1>

          <p style={{ color: "#64748b", lineHeight: "1.7" }}>
            This course has been recommended based on your selected interests, skill preferences, and learning goals. Continue building your personalized AI-driven learning journey.
          </p>

          {/* PROGRESS UI */}
          <div style={{ marginTop: "25px" }}>
            <h3 style={{ color: "#064e3b" }}>Learning Progress</h3>

            <div
              style={{
                width: "100%",
                height: "12px",
                background: "#e2e8f0",
                borderRadius: "10px",
                marginTop: "10px",
              }}
            >
              <div
                style={{
                  width: "35%",
                  height: "12px",
                  background: "#10b981",
                  borderRadius: "10px",
                }}
              />
            </div>

            <p style={{ fontSize: "13px", color: "#64748b" }}>
              35% course completion achieved
            </p>
          </div>

          {/* ACTION BUTTON */}
          <div style={{ marginTop: "25px" }}>
            <a
              href={course.url}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              <button
                style={{
                  padding: "14px 20px",
                  background:
                    "linear-gradient(to right, #10b981, #059669)",
                  color: "white",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Launch Course
              </button>
            </a>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* INFO CARD 1 */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "18px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
            }}
          >
            <h3 style={{ color: "#064e3b" }}>Course Overview</h3>
            <p><b>Category:</b> {course.category}</p>
            <p><b>Level:</b> {course.level}</p>
            <p><b>Rating:</b> ⭐ {course.rating}</p>
          </div>

          {/* INFO CARD 2 */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "18px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
            }}
          >
            <h3 style={{ color: "#064e3b" }}>Learning Experience</h3>
            <p>Self-paced learning</p>
            <p>AI-curated learning path</p>
            <p>Skill-focused progression</p>
          </div>

          {/* INFO CARD 3 */}
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "18px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
            }}
          >
            <h3 style={{ color: "#064e3b" }}>Suggested Activities</h3>
            <p>Complete interactive modules</p>
            <p>Work on practical exercises</p>
            <p>Track learning milestones</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Learn;
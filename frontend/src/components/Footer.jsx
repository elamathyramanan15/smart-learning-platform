function Footer() {
  return (
    <div
      style={{
        backgroundColor: "#064e3b",
        color: "white",
        padding: "40px 30px",
        marginTop: "60px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        {/* BRAND */}

        <div>
          <h2
            style={{
              marginBottom: "15px",
            }}
          >
            Smart Learning
          </h2>

          <p
            style={{
              color: "#d1fae5",
              lineHeight: "1.7",
            }}
          >
            An intelligent learning platform that delivers personalized course recommendations, skill-based learning paths, and modern educational experiences powered by AI.
          </p>
        </div>

        {/* QUICK LINKS */}

        <div>
          <h3
            style={{
              marginBottom: "15px",
            }}
          >
            Navigation
          </h3>

          <p>Dashboard</p>
          <p>Saved Courses</p>
          <p>Trending Courses</p>
          <p>Preferences</p>
        </div>

        {/* FEATURES */}

        <div>
          <h3
            style={{
              marginBottom: "15px",
            }}
          >
            Platform Features
          </h3>

          <p>Personalized AI Recommendations</p>
          <p>Intelligent Course Discovery</p>
          <p>Trending Courses</p>
          <p>Adaptive Learning Paths</p>
        </div>
      </div>

      {/* BOTTOM */}

      <div
        style={{
          textAlign: "center",
          marginTop: "40px",
          borderTop:
            "1px solid rgba(255,255,255,0.2)",
          paddingTop: "20px",
          color: "#d1fae5",
        }}
      >
        © 2026 Smart Learning Platform •
        AI-Powered Learning Recommendation System
      </div>
    </div>
  );
}

export default Footer;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";
import Footer from "../components/Footer";

import { FaHeart, FaBookmark, FaListUl, FaRobot } from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  const [recommendations, setRecommendations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("recommended");
  const [loading, setLoading] = useState(true);

  const [levelFilter, setLevelFilter] = useState("all");
  const [sortOption, setSortOption] = useState("none");

  const interests =
    JSON.parse(localStorage.getItem("interests")) || [];

  const savedCourses =
    JSON.parse(localStorage.getItem("saved")) || [];

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn !== "true") {
      navigate("/");
      return;
    }

    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);

      const interest =
        interests.length > 0 ? interests[0] : "";

      const response = await axios.post(
        "http://127.0.0.1:5000/recommend",
        {
          interest: interest,
          saved: savedCourses,
        }
      );

      setRecommendations(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const fetchAllCourses = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://127.0.0.1:5000/courses/all"
      );

      setRecommendations(response.data);
      setViewMode("all");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const saveCourse = (course) => {
    let saved =
      JSON.parse(localStorage.getItem("saved")) || [];

    const exists = saved.find(
      (item) => item.title === course.title
    );

    if (exists) {
      alert("Course already saved!");
      return;
    }

    saved.push(course);

    localStorage.setItem("saved", JSON.stringify(saved));

    alert("Course Saved Successfully!");
  };

  let filtered = recommendations.filter((course) =>
    course.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (levelFilter !== "all") {
    filtered = filtered.filter(
      (course) => course.level === levelFilter
    );
  }

  if (sortOption === "ratingHighLow") {
    filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  }

  if (sortOption === "ratingLowHigh") {
    filtered = [...filtered].sort((a, b) => a.rating - b.rating);
  }

  if (sortOption === "alpha") {
    filtered = [...filtered].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  const aiScore =
    interests.length === 0
      ? 50
      : Math.min(95, 60 + interests.length * 5);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f0fdf4" }}>
      <Navbar />

      <div style={{ padding: "40px" }}>

        {/* HERO SECTION */}
        <div
          style={{
            background: "linear-gradient(to right, #10b981, #065f46)",
            borderRadius: "24px",
            padding: "50px",
            color: "white",
            marginBottom: "25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: "42px" }}>
              Welcome Back 👋
            </h1>
            <p style={{ marginTop: "10px", fontSize: "18px", opacity: 0.9 }}>
              Continue your personalized learning journey and explore AI-powered course recommendations.
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
            <button
              onClick={fetchAllCourses}
              style={{
                padding: "10px 16px",
                borderRadius: "10px",
                border: "none",
                background: "white",
                color: "#065f46",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Explore Courses
            </button>
          </div>
        </div>

        {/* STATS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <div style={cardStyle}>
            <div style={row}>
              <FaHeart color="#10b981" />
              <span>Learning Interests</span>
            </div>
            <h2 style={value}>{interests.length}</h2>
          </div>

          <div style={cardStyle}>
            <div style={row}>
              <FaBookmark color="#10b981" />
              <span>Saved Courses</span>
            </div>
            <h2 style={value}>{savedCourses.length}</h2>
          </div>

          <div style={cardStyle}>
            <div style={row}>
              <FaListUl color="#10b981" />
              <span>Recommended Courses</span>
            </div>
            <h2 style={value}>{recommendations.length}</h2>
          </div>

          <div style={cardStyle}>
            <div style={row}>
              <FaRobot color="#10b981" />
              <span>AI Match Score</span>
            </div>
            <h2 style={value}>{aiScore}%</h2>
          </div>
        </div>

        {/* VIEW BUTTONS */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <button
            onClick={() => {
              setViewMode("recommended");
              fetchRecommendations();
            }}
            style={btn(viewMode === "recommended")}
          >
            AI Recommended
          </button>
        </div>

        {/* SEARCH */}
        <input
          placeholder="Search courses, technologies, or skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={searchBox}
        />

        {/* FILTER + SORT */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            style={dropdownStyle}
          >
            <option value="all">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={dropdownStyle}
          >
            <option value="none">Sort By</option>
            <option value="ratingHighLow">Rating: High → Low</option>
            <option value="ratingLowHigh">Rating: Low → High</option>
            <option value="alpha">Alphabetical (A → Z)</option>
          </select>
        </div>

        {/* COURSES */}
        {loading ? (
          <p style={{ color: "#065f46", fontWeight: "600" }}>
            Loading personalized recommendations...
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {filtered.map((course, index) => (
              <CourseCard
                key={index}
                course={course}
                onSave={saveCourse}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

/* STYLES */
const cardStyle = {
  background: "white",
  padding: "18px",
  borderRadius: "16px",
  boxShadow: "0 6px 14px rgba(0,0,0,0.08)",
};

const row = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "8px",
  color: "#6b7280",
};

const value = {
  margin: 0,
  color: "#065f46",
};

const btn = (active) => ({
  padding: "10px 15px",
  borderRadius: "10px",
  border: "none",
  cursor: "pointer",
  background: active ? "#10b981" : "#d1fae5",
  color: active ? "white" : "#064e3c",
  fontWeight: "bold",
});

const searchBox = {
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  marginBottom: "15px",
};

const dropdownStyle = {
  padding: "10px",
  borderRadius: "10px",
  border: "1px solid #d1d5db",
  fontWeight: "500",
};

export default Dashboard;
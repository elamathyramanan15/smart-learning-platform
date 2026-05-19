import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";

import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";

function Trending() {
  const [trendingCourses, setTrendingCourses] =
    useState([]);

  useEffect(() => {
    fetchTrendingCourses();
  }, []);

  const fetchTrendingCourses = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:5000/trending"
      );

      setTrendingCourses(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveCourse = (course) => {
    let savedCourses =
      JSON.parse(localStorage.getItem("saved")) || [];

    savedCourses.push(course);

    localStorage.setItem(
      "saved",
      JSON.stringify(savedCourses)
    );

    alert("Course Saved Successfully!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0fdf4",
      }}
    >
      <Navbar />

      <div
        style={{
          padding: "40px",
        }}
      >
        {/* HERO SECTION */}

        <div
          style={{
            background:
              "linear-gradient(to right, #10b981, #065f46)",
            borderRadius: "20px",
            padding: "40px",
            color: "white",
            marginBottom: "40px",
            boxShadow:
              "0 10px 25px rgba(0,0,0,0.12)",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "40px",
            }}
          >
            Trending Skills & Courses 🔥
          </h1>

          <p
            style={{
              marginTop: "12px",
              fontSize: "18px",
              opacity: 0.9,
            }}
          >
            Discover the most in-demand courses and top-rated learning paths chosen by learners worldwide.
          </p>
        </div>

        {/* STATS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginBottom: "35px",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "18px",
              boxShadow:
                "0 5px 15px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: "#064e3b",
              }}
            >
              {trendingCourses.length}
            </h2>

            <p
              style={{
                color: "#6b7280",
              }}
            >
              Popular Courses
            </p>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "18px",
              boxShadow:
                "0 5px 15px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: "#064e3b",
              }}
            >
              ⭐ 4.8
            </h2>

            <p
              style={{
                color: "#6b7280",
              }}
            >
              Average Learner Rating
            </p>
          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "18px",
              boxShadow:
                "0 5px 15px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                margin: 0,
                color: "#064e3b",
              }}
            >
              AI-Based Recommendation System
            </h2>

            <p
              style={{
                color: "#6b7280",
              }}
            >
              Smart Learning Engine
            </p>
          </div>
        </div>

        {/* COURSE GRID */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "25px",
          }}
        >
          {trendingCourses.map(
            (course, index) => (
              <CourseCard
                key={index}
                course={course}
                onSave={saveCourse}
              />
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Trending;
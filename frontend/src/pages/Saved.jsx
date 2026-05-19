import { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Saved() {
  const [savedCourses, setSavedCourses] =
    useState(
      JSON.parse(localStorage.getItem("saved")) || []
    );

  const removeCourse = (indexToRemove) => {
    const updated = savedCourses.filter(
      (_, index) => index !== indexToRemove
    );

    setSavedCourses(updated);
    localStorage.setItem("saved", JSON.stringify(updated));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0fdf4",
      }}
    >
      <Navbar />

      <div style={{ padding: "40px" }}>
        {/* HEADER */}
        <div style={{ marginBottom: "30px" }}>
          <h1
            style={{
              color: "#064e3b",
              fontSize: "34px",
              marginBottom: "6px",
            }}
          >
            My Learning Collection
          </h1>

          <p style={{ color: "#6b7280", fontSize: "15px" }}>
            Access your saved courses and continue learning anytime.
          </p>
        </div>

        {/* EMPTY STATE */}
        {savedCourses.length === 0 ? (
          <div
            style={{
              backgroundColor: "white",
              padding: "50px",
              borderRadius: "18px",
              textAlign: "center",
              boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
            }}
          >
            <h2 style={{ color: "#065f46", marginBottom: "8px" }}>
              No Courses Saved Yet
            </h2>

            <p style={{ color: "#6b7280" }}>
              Bookmark courses from recommendations or trending sections to access them later.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {savedCourses.map((course, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "white",
                  borderRadius: "16px",
                  padding: "16px",
                  boxShadow:
                    "0 8px 18px rgba(0,0,0,0.08)",
                  border: "1px solid #e5e7eb",

                  height: "230px",

                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* TOP */}
                <div>
                  {/* TITLE + LEVEL */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "6px",
                      gap: "10px",
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "17px",
                        color: "#064e3b",
                        lineHeight: "1.2",

                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {course.title}
                    </h3>

                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "bold",
                        padding: "5px 9px",
                        borderRadius: "10px",
                        backgroundColor: "#d1fae5",
                        color: "#047857",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {course.level}
                    </span>
                  </div>

                  {/* CATEGORY */}
                  <p
                    style={{
                      margin: "0 0 4px 0",
                      fontSize: "13px",
                      color: "#6b7280",
                    }}
                  >
                    📚 {course.category}
                  </p>

                  {/* DESCRIPTION */}
                  <p
                    style={{
                      margin: "0 0 6px 0",
                      fontSize: "12px",
                      color: "#64748b",
                      lineHeight: "1.35",

                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    Saved to your personalized learning collection for future access.
                  </p>

                  {/* RATING */}
                  <p
                    style={{
                      margin: 0,
                      fontSize: "13px",
                      color: "#f59e0b",
                      fontWeight: "bold",
                    }}
                  >
                    ⭐ {course.rating}
                  </p>
                </div>

                {/* BUTTONS */}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "8px",
                  }}
                >
                  <a
                    href={course.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ flex: 1 }}
                  >
                    <button
                      style={{
                        width: "100%",
                        height: "36px",
                        fontSize: "13px",
                        fontWeight: "bold",
                        borderRadius: "9px",
                        border: "none",
                        cursor: "pointer",
                        color: "white",
                        background:
                          "linear-gradient(to right, #10b981, #059669)",
                      }}
                    >
                      Open Course
                    </button>
                  </a>

                  <button
                    onClick={() => removeCourse(index)}
                    style={{
                      flex: 1,
                      height: "36px",
                      fontSize: "13px",
                      fontWeight: "bold",
                      borderRadius: "9px",
                      border: "none",
                      cursor: "pointer",
                      color: "white",
                      backgroundColor: "#ef4444",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default Saved;
import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CourseCard from "../components/CourseCard";

function AllCourses() {

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchCategories();
    fetchAllCourses();

  }, []);

  // FETCH ALL COURSES

  const fetchAllCourses = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:5000/courses/all"
      );

      setCourses(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // FETCH CATEGORIES

  const fetchCategories = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:5000/categories"
      );

      setCategories(response.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);
    }
  };

  // FETCH CATEGORY COURSES

  const fetchCourses = async (category) => {

    try {

      if (selectedCategory === category) {

        setSelectedCategory("");

        fetchAllCourses();

        return;
      }

      setSelectedCategory(category);

      const response = await axios.get(
        `http://127.0.0.1:5000/courses/${category}`
      );

      setCourses(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // SAVE COURSE

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

    localStorage.setItem(
      "saved",
      JSON.stringify(saved)
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

      <div style={{ padding: "40px" }}>

        {/* HERO */}

        <div
          style={{
            background:
              "linear-gradient(to right, #10b981, #065f46)",
            borderRadius: "24px",
            padding: "40px",
            color: "white",
            marginBottom: "30px",
          }}
        >
          <h1 style={{ margin: 0 }}>
            Explore the Course Library
          </h1>

          <p style={{ marginTop: "10px" }}>
            Discover curated learning resources across multiple technology domains.
          </p>
        </div>

        {/* LOADING */}

        {loading ? (
          <p
            style={{
              color: "#065f46",
              fontWeight: "bold",
            }}
          >
            Loading course catalog...
          </p>
        ) : (
          <>
            {/* CATEGORY BUTTONS */}

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "15px",
                marginBottom: "30px",
              }}
            >
              {categories.map((category, index) => (

                <button
                  key={index}
                  onClick={() =>
                    fetchCourses(category)
                  }
                  style={{
                    padding: "12px 22px",
                    borderRadius: "30px",
                    border: "none",
                    cursor: "pointer",
                    fontWeight: "bold",

                    background:
                      selectedCategory === category
                        ? "#10b981"
                        : "#d1fae5",

                    color:
                      selectedCategory === category
                        ? "white"
                        : "#064e3b",
                  }}
                >
                  {category}
                </button>

              ))}
            </div>

            {/* COURSE GRID */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              {courses.map((course, index) => (

                <CourseCard
                  key={index}
                  course={course}
                  onSave={saveCourse}
                />

              ))}
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default AllCourses;
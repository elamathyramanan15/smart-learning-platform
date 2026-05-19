import React from "react";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course, onSave }) => {
  const navigate = useNavigate();

  // Category-based unique descriptions
  const generateDescription = (course) => {
    if (!course) return "";

    const title = course.title;
    const category = course.category;
    const tags = course.tags || "";

    const tagList = tags.split(" ").slice(0, 3).join(", ");

    const descriptions = {
      "AI": [
        `${title} helps you understand real-world AI systems through practical examples and modern use cases.`,
        `Explore how ${tagList} concepts power intelligent systems in today’s tech industry.`,
        `A hands-on AI track focused on building smart applications using real industry workflows.`
      ],
      "Machine Learning": [
        `Build strong ML foundations with ${title}, focusing on real datasets and model training.`,
        `Understand core machine learning concepts through practical implementation and projects.`,
        `A structured ML path covering algorithms, evaluation, and real-world problem solving.`
      ],
      "Data Science": [
        `${title} helps you turn raw data into meaningful insights using modern analytics tools.`,
        `Work with real datasets and learn how data drives business decisions.`,
        `A practical data science journey focused on analysis, visualization, and insights.`
      ],
      "Web Development": [
        `Master modern web development with ${title}, focusing on real project building.`,
        `Learn how developers build scalable and responsive web applications.`,
        `A project-driven web dev course covering frontend and backend essentials.`
      ],
      "Programming": [
        `${title} strengthens your problem-solving skills with hands-on coding practice.`,
        `Build strong programming logic through real-world coding challenges.`,
        `A structured coding path designed to improve algorithmic thinking and development skills.`
      ],
      "Cloud Computing": [
        `Understand cloud infrastructure through ${title} with real deployment scenarios.`,
        `Learn how modern cloud systems are built and managed at scale.`,
        `A practical cloud computing course focused on AWS, Azure, and GCP concepts.`
      ],
      "DevOps": [
        `${title} teaches automation, CI/CD, and modern deployment practices.`,
        `Learn how DevOps engineers streamline development and operations workflows.`,
        `A hands-on DevOps track focused on real-world infrastructure automation.`
      ],
      "Cybersecurity": [
        `Learn how to secure systems and networks with ${title}.`,
        `Understand real-world cyber threats and defense techniques.`,
        `A practical cybersecurity course focused on ethical hacking and defense strategies.`
      ]
    };

    const fallback = [
      `Learn ${title} with practical, real-world examples and hands-on projects.`,
      `A structured course designed to build industry-ready skills.`,
      `Gain practical knowledge and build real applications through guided learning.`
    ];

    const pool = descriptions[category] || fallback;
    return pool[Math.floor(Math.random() * pool.length)];
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        padding: "16px",
        boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
        border: "1px solid #e5e7eb",
        height: "230px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* TOP CONTENT */}
      <div>
        {/* TITLE + LEVEL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
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

        {/* DESCRIPTION (NOW TRULY UNIQUE) */}
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
          {generateDescription(course)}
        </p>

        {/* RATING */}
        <p
          style={{
            margin: "0",
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
        <button
          onClick={() => navigate("/learn", { state: course })}
          style={{
            flex: 1,
            padding: "12px",
            background: "linear-gradient(to right, #10b981, #059669)",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Begin Course
        </button>

        <button
          onClick={() => onSave(course)}
          style={{
            flex: 1,
            height: "36px",
            fontSize: "13px",
            fontWeight: "bold",
            borderRadius: "9px",
            border: "none",
            cursor: "pointer",
            color: "white",
            backgroundColor: "#064e3b",
          }}
        >
          Save Course
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
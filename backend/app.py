from flask import Flask, request, jsonify
from flask_cors import CORS

from recommender import (
    get_recommendations,
    get_trending_courses,
    get_all_categories,
    get_courses_by_category,
    get_all_courses
)

app = Flask(__name__)
CORS(app)


@app.route("/")
def home():
    return "Smart Learning Backend Running"


# -------------------------
# RECOMMENDATIONS
# -------------------------

@app.route("/recommend", methods=["POST"])
def recommend():

    data = request.json

    interest = data.get("interest", "")
    saved = data.get("saved", [])

    print("INTEREST:", interest)

    recommendations = get_recommendations(
        interest,
        saved
    )

    return jsonify(recommendations)


# -------------------------
# TRENDING
# -------------------------

@app.route("/trending", methods=["GET"])
def trending():

    trending_courses = get_trending_courses()

    return jsonify(trending_courses)


# -------------------------
# ALL CATEGORIES
# -------------------------

@app.route("/categories", methods=["GET"])
def categories():

    return jsonify(
        get_all_categories()
    )


# -------------------------
# COURSES BY CATEGORY
# -------------------------

@app.route("/courses/<category>", methods=["GET"])
def courses_by_category(category):

    return jsonify(
        get_courses_by_category(category)
    )


# -------------------------
# ALL COURSES
# -------------------------

@app.route("/courses/all", methods=["GET"])
def all_courses():

    return jsonify(
        get_all_courses()
    )


if __name__ == "__main__":
    app.run(debug=True)
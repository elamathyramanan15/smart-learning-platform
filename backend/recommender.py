import pandas as pd
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity


courses = pd.read_csv("../dataset/courses.csv")

courses = courses.reset_index(drop=True)


courses["combined_features"] = (
    courses["title"].fillna("") + " " +
    courses["category"].fillna("") + " " +
    courses["tags"].fillna("")
)


model = SentenceTransformer('all-MiniLM-L6-v2')

course_embeddings = model.encode(
    courses["combined_features"].tolist()
)


def get_recommendations(user_interest, saved_courses):

    try:

        if not user_interest:
            return get_trending_courses()

        # CATEGORY MAPPING
        interest_mapping = {
            "AI": ["AI"],
            "Machine Learning": ["Machine Learning"],
            "Programming": ["Programming"],
            "Web Development": ["Web Development"],
            "Data Science": ["Data Science"],
            "Cloud Computing": ["Cloud Computing"],
            "Cybersecurity": ["Cybersecurity"],
            "DevOps": ["DevOps"]
        }

        relevant_categories = interest_mapping.get(
            user_interest,
            [user_interest]
        )

        # FILTER COURSES BY CATEGORY
        filtered_courses = courses[
            courses["category"].isin(relevant_categories)
        ].copy()

        if filtered_courses.empty:
            return get_trending_courses()

        # USER PROFILE TEXT
        user_text = user_interest

        for saved in saved_courses:
            user_text += " " + (
                saved.get("title", "") + " " +
                saved.get("category", "") + " " +
                saved.get("tags", "")
            )

        # -------------------------
        # ML EMBEDDING FOR USER
        # -------------------------
        user_embedding = model.encode([user_text])

        # -------------------------
        # FIXED ALIGNMENT LOGIC
        # -------------------------

        filtered_indices = filtered_courses.index.to_list()

        filtered_embeddings = course_embeddings[filtered_indices]

        # -------------------------
        # COSINE SIMILARITY
        # -------------------------
        similarity_scores = cosine_similarity(
            user_embedding,
            filtered_embeddings
        ).flatten()

        filtered_courses["score"] = similarity_scores

        # BOOST BY RATING
        filtered_courses["score"] = (
            filtered_courses["score"] * 0.8 +
            filtered_courses["rating"] * 0.2
        )

        # SORT
        recommended = filtered_courses.sort_values(
            by="score",
            ascending=False
        )

        # REMOVE DUPLICATES
        recommended = recommended.drop_duplicates(subset=["title"])

        return recommended.head(12).to_dict(orient="records")

    except Exception as error:
        print("Recommendation Error:", error)
        return get_trending_courses()


# -------------------------
# TRENDING COURSES
# -------------------------

def get_trending_courses():
    trending = courses.sort_values(
        by="rating",
        ascending=False
    )
    return trending.head(12).to_dict(orient="records")


# -------------------------
# GET ALL CATEGORIES
# -------------------------

def get_all_categories():
    return sorted(courses["category"].unique().tolist())


# -------------------------
# GET COURSES BY CATEGORY
# -------------------------

def get_courses_by_category(category):
    filtered = courses[
        courses["category"].str.lower() == category.lower()
    ]
    return filtered.to_dict(orient="records")


# -------------------------
# GET ALL COURSES
# -------------------------

def get_all_courses():
    return courses.to_dict(orient="records")
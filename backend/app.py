from flask import Flask, jsonify, request
import psycopg2
import os

app = Flask(__name__)

# Database Connection (Render PostgreSQL)
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://cinemagic_db_user:password@dpg-cv7evuij1k6c73ecogd0-a/cinemagic_db")

# Connect to PostgreSQL
conn = psycopg2.connect(DATABASE_URL)

@app.route("/")
def home():
    return jsonify({"message": "Backend is working!"})

# Example API to store user signup details
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    with conn.cursor() as cursor:
        cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", (name, email, password))
        conn.commit()

    return jsonify({"message": "User signed up successfully!"})

if __name__ == "__main__":
    app.run(debug=True)

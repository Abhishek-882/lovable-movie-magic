from flask import Flask, request, jsonify
import psycopg2
import os

app = Flask(__name__)

# Load Database URL from Environment Variable
DATABASE_URL = os.getenv("DATABASE_URL")

# Connect to Database
conn = psycopg2.connect(DATABASE_URL)
cursor = conn.cursor()

@app.route("/")
def home():
    return "CineMagic Backend Running!"

# User Signup API
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", (name, email, password))
    conn.commit()
    
    return jsonify({"message": "User registered successfully"}), 201

# User Login API
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    cursor.execute("SELECT * FROM users WHERE email=%s AND password=%s", (email, password))
    user = cursor.fetchone()

    if user:
        return jsonify({"message": "Login successful", "user": user[1]}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

if __name__ == "__main__":
    app.run(debug=True)

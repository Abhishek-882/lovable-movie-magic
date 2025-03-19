
from flask import Flask, request, jsonify
import psycopg2
import os
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import random
import string

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load Database URL from Environment Variable
DATABASE_URL = os.getenv("DATABASE_URL")

# Function to get database connection
def get_db_connection():
    conn = psycopg2.connect(DATABASE_URL)
    return conn

@app.route("/")
def home():
    return "CineMagic Backend Running!"

# Initialize Database
@app.route("/init-db", methods=["GET"])
def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()
    
    # Create users table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            phone TEXT,
            email_verified BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    ''')
    
    # Create bookings table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS bookings (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            movie_id TEXT NOT NULL,
            showtime_id TEXT NOT NULL,
            seats TEXT[] NOT NULL,
            snacks JSONB,
            total_amount NUMERIC NOT NULL,
            booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            status TEXT DEFAULT 'confirmed'
        );
    ''')
    
    # Create verification_codes table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS verification_codes (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            code TEXT NOT NULL,
            purpose TEXT NOT NULL,
            expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '10 minutes'),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    ''')
    
    conn.commit()
    cursor.close()
    conn.close()
    
    return jsonify({"message": "Database initialized successfully"}), 200

# User Signup API
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"error": "All fields are required"}), 400
    
    # Hash the password
    hashed_password = generate_password_hash(password)
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s) RETURNING id", 
                       (name, email, hashed_password))
        user_id = cursor.fetchone()[0]
        conn.commit()
        
        return jsonify({
            "message": "User registered successfully",
            "user": {
                "id": user_id,
                "name": name,
                "email": email
            }
        }), 201
    except psycopg2.IntegrityError:
        conn.rollback()
        return jsonify({"error": "Email already exists"}), 400
    finally:
        cursor.close()
        conn.close()

# User Login API
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, email, password, email_verified FROM users WHERE email=%s", (email,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if user and check_password_hash(user[3], password):
        return jsonify({
            "message": "Login successful", 
            "user": {
                "id": user[0], 
                "name": user[1], 
                "email": user[2],
                "email_verified": user[4]
            }
        }), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401

# Update User Profile API
@app.route("/profile", methods=["PUT"])
def update_profile():
    data = request.json
    user_id = data.get("userId")
    name = data.get("name")
    phone = data.get("phone")
    
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute("UPDATE users SET name=%s, phone=%s WHERE id=%s", (name, phone, user_id))
        conn.commit()
        
        return jsonify({"message": "Profile updated successfully"}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# Generate and Send Email Verification Code
@app.route("/send-verification", methods=["POST"])
def send_verification():
    data = request.json
    user_id = data.get("userId")
    email = data.get("email")
    
    if not user_id or not email:
        return jsonify({"error": "User ID and Email are required"}), 400
    
    # Generate 6-digit verification code
    verification_code = ''.join(random.choices(string.digits, k=6))
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        # Delete any existing verification codes for this user
        cursor.execute("DELETE FROM verification_codes WHERE user_id=%s AND purpose='email_verification'", (user_id,))
        
        # Insert new verification code
        cursor.execute(
            "INSERT INTO verification_codes (user_id, code, purpose) VALUES (%s, %s, 'email_verification')",
            (user_id, verification_code)
        )
        conn.commit()
        
        # In a real application, you would send an email here
        # For demo purposes, we'll just return the code directly
        return jsonify({
            "message": "Verification code sent successfully", 
            "code": verification_code  # In production, don't send this back!
        }), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# Verify Email with Code
@app.route("/verify-email", methods=["POST"])
def verify_email():
    data = request.json
    user_id = data.get("userId")
    code = data.get("code")
    
    if not user_id or not code:
        return jsonify({"error": "User ID and verification code are required"}), 400
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        # Check if code is valid and not expired
        cursor.execute(
            "SELECT id FROM verification_codes WHERE user_id=%s AND code=%s AND purpose='email_verification' AND expires_at > NOW()",
            (user_id, code)
        )
        verification = cursor.fetchone()
        
        if not verification:
            return jsonify({"error": "Invalid or expired verification code"}), 400
        
        # Update user's email_verified status
        cursor.execute("UPDATE users SET email_verified=TRUE WHERE id=%s", (user_id,))
        
        # Delete used verification code
        cursor.execute("DELETE FROM verification_codes WHERE id=%s", (verification[0],))
        
        conn.commit()
        
        return jsonify({"message": "Email verified successfully"}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# Create Booking API
@app.route("/bookings", methods=["POST"])
def create_booking():
    data = request.json
    user_id = data.get("userId")
    movie_id = data.get("movieId")
    showtime_id = data.get("showtimeId")
    seats = data.get("seats")
    snacks = data.get("snacks")
    total_amount = data.get("totalAmount")
    
    if not user_id or not movie_id or not showtime_id or not seats or not total_amount:
        return jsonify({"error": "Missing required booking information"}), 400
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute(
            "INSERT INTO bookings (user_id, movie_id, showtime_id, seats, snacks, total_amount) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
            (user_id, movie_id, showtime_id, seats, psycopg2.extras.Json(snacks) if snacks else None, total_amount)
        )
        booking_id = cursor.fetchone()[0]
        conn.commit()
        
        return jsonify({
            "message": "Booking created successfully",
            "bookingId": booking_id
        }), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# Get User's Bookings API
@app.route("/bookings/<int:user_id>", methods=["GET"])
def get_bookings(user_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute(
            "SELECT id, movie_id, showtime_id, seats, snacks, total_amount, booking_date, status FROM bookings WHERE user_id=%s ORDER BY booking_date DESC",
            (user_id,)
        )
        bookings_data = cursor.fetchall()
        
        bookings = []
        for booking in bookings_data:
            bookings.append({
                "id": booking[0],
                "movieId": booking[1],
                "showtimeId": booking[2],
                "seats": booking[3],
                "snacks": booking[4],
                "totalAmount": float(booking[5]),
                "bookingDate": booking[6].strftime('%Y-%m-%d %H:%M:%S'),
                "status": booking[7]
            })
        
        return jsonify({"bookings": bookings}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    app.run(debug=True)


from flask import Flask, request, jsonify
import psycopg2
import psycopg2.extras
import os
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import random
import string
from datetime import datetime, timedelta
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load Database URL from Environment Variable
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://cinemagic_db_user:6Hm3HrEfgq0SXoU9FoPwXfIakfoD2Zcz@dpg-cv7evuij1k6c73ecogd0-a/cinemagic_db")

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
            profile_image TEXT,
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
    
    # Create payments table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS payments (
            id SERIAL PRIMARY KEY,
            booking_id INTEGER REFERENCES bookings(id),
            amount NUMERIC NOT NULL,
            payment_method TEXT NOT NULL,
            transaction_id TEXT,
            status TEXT DEFAULT 'completed',
            payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    ''')

    # Create user_preferences table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS user_preferences (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            favorite_genres TEXT[],
            preferred_languages TEXT[],
            preferred_theaters TEXT[],
            notification_enabled BOOLEAN DEFAULT TRUE
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
        
        # Create default user preferences
        cursor.execute(
            "INSERT INTO user_preferences (user_id, favorite_genres, preferred_languages) VALUES (%s, %s, %s)",
            (user_id, ["Action", "Comedy", "Drama"], ["English", "Telugu", "Hindi"])
        )
        conn.commit()
        
        return jsonify({
            "message": "User registered successfully",
            "user": {
                "id": user_id,
                "name": name,
                "email": email,
                "isEmailVerified": False,
                "isProfileComplete": False
            }
        }), 201
    except psycopg2.IntegrityError:
        conn.rollback()
        return jsonify({"error": "Email already exists"}), 400
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
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
    cursor.execute("SELECT id, name, email, password, email_verified, phone FROM users WHERE email=%s", (email,))
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
                "isEmailVerified": user[4],
                "isProfileComplete": bool(user[5]),
                "phone": user[5] or ""
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
        cursor.execute("UPDATE users SET name=%s, phone=%s WHERE id=%s RETURNING id, name, email, email_verified, phone", 
                       (name, phone, user_id))
        updated_user = cursor.fetchone()
        conn.commit()
        
        if not updated_user:
            return jsonify({"error": "User not found"}), 404
            
        return jsonify({
            "message": "Profile updated successfully",
            "user": {
                "id": updated_user[0],
                "name": updated_user[1],
                "email": updated_user[2],
                "isEmailVerified": updated_user[3],
                "isProfileComplete": bool(updated_user[4]),
                "phone": updated_user[4] or ""
            }
        }), 200
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
        # Convert seats list to PostgreSQL array format
        seats_array = '{' + ','.join(seats) + '}'
        
        # Insert booking record
        cursor.execute(
            "INSERT INTO bookings (user_id, movie_id, showtime_id, seats, snacks, total_amount) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
            (user_id, movie_id, showtime_id, seats_array, json.dumps(snacks) if snacks else None, total_amount)
        )
        booking_id = cursor.fetchone()[0]
        
        # Create mock payment record
        cursor.execute(
            "INSERT INTO payments (booking_id, amount, payment_method, transaction_id) VALUES (%s, %s, %s, %s)",
            (booking_id, total_amount, "card", f"TXN-{booking_id}-{int(datetime.now().timestamp())}")
        )
        
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
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    
    try:
        cursor.execute(
            """
            SELECT b.id, b.movie_id, b.showtime_id, b.seats, b.snacks, b.total_amount, 
                   b.booking_date, b.status, p.payment_method, p.transaction_id
            FROM bookings b
            LEFT JOIN payments p ON p.booking_id = b.id
            WHERE b.user_id = %s
            ORDER BY b.booking_date DESC
            """,
            (user_id,)
        )
        bookings_data = cursor.fetchall()
        
        bookings = []
        for booking in bookings_data:
            booking_dict = dict(booking)
            # Convert datetime to string format
            booking_dict['booking_date'] = booking_dict['booking_date'].strftime('%Y-%m-%d %H:%M:%S')
            # Convert PostgreSQL array to Python list
            booking_dict['seats'] = booking_dict['seats'].replace('{', '').replace('}', '').split(',')
            bookings.append(booking_dict)
        
        return jsonify({"bookings": bookings}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# Cancel Booking API
@app.route("/bookings/<int:booking_id>/cancel", methods=["PUT"])
def cancel_booking(booking_id):
    data = request.json
    user_id = data.get("userId")
    
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        # Verify booking belongs to user
        cursor.execute("SELECT id FROM bookings WHERE id=%s AND user_id=%s", (booking_id, user_id))
        if not cursor.fetchone():
            return jsonify({"error": "Booking not found or does not belong to user"}), 404
            
        # Update booking status
        cursor.execute("UPDATE bookings SET status='cancelled' WHERE id=%s", (booking_id,))
        conn.commit()
        
        return jsonify({"message": "Booking cancelled successfully"}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# Get User Preferences API
@app.route("/preferences/<int:user_id>", methods=["GET"])
def get_preferences(user_id):
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    
    try:
        cursor.execute(
            "SELECT * FROM user_preferences WHERE user_id=%s",
            (user_id,)
        )
        preferences = cursor.fetchone()
        
        if not preferences:
            return jsonify({"error": "User preferences not found"}), 404
            
        return jsonify({
            "preferences": {
                "favoriteGenres": preferences['favorite_genres'],
                "preferredLanguages": preferences['preferred_languages'],
                "preferredTheaters": preferences['preferred_theaters'],
                "notificationEnabled": preferences['notification_enabled']
            }
        }), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# Update User Preferences API
@app.route("/preferences", methods=["PUT"])
def update_preferences():
    data = request.json
    user_id = data.get("userId")
    favorite_genres = data.get("favoriteGenres")
    preferred_languages = data.get("preferredLanguages")
    preferred_theaters = data.get("preferredTheaters")
    notification_enabled = data.get("notificationEnabled")
    
    if not user_id:
        return jsonify({"error": "User ID is required"}), 400
    
    conn = get_db_connection()
    cursor = conn.cursor()
    
    try:
        cursor.execute(
            """
            UPDATE user_preferences 
            SET favorite_genres=%s, preferred_languages=%s, preferred_theaters=%s, notification_enabled=%s
            WHERE user_id=%s
            """,
            (favorite_genres, preferred_languages, preferred_theaters, notification_enabled, user_id)
        )
        conn.commit()
        
        return jsonify({"message": "Preferences updated successfully"}), 200
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    app.run(debug=True)

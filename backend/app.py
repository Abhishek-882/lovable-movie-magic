
from flask import Flask, request, jsonify
import os
from flask_cors import CORS
from datetime import datetime
import json
from dotenv import load_dotenv
from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///moviebooking.db")
engine = create_engine(DATABASE_URL)
Base = declarative_base()
Session = sessionmaker(bind=engine)

# Define database models
class User(Base):
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(100), nullable=False)
    phone = Column(String(20))
    email_verified = Column(Boolean, default=False)
    profile_image = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)
    
    bookings = relationship("Booking", back_populates="user")

class Movie(Base):
    __tablename__ = 'movies'
    
    id = Column(Integer, primary_key=True)
    title = Column(String(255), nullable=False)
    release_date = Column(String(20))
    runtime = Column(Integer)
    overview = Column(Text)
    poster_url = Column(String(255))
    backdrop_url = Column(String(255))
    rating = Column(Float)
    status = Column(String(20))
    trailer_url = Column(String(255))
    
    showtimes = relationship("Showtime", back_populates="movie")

class Showtime(Base):
    __tablename__ = 'showtimes'
    
    id = Column(Integer, primary_key=True)
    movie_id = Column(Integer, ForeignKey('movies.id'))
    date = Column(String(20))
    time = Column(String(10))
    theater = Column(String(100))
    price = Column(Float)
    
    movie = relationship("Movie", back_populates="showtimes")
    bookings = relationship("Booking", back_populates="showtime")

class Booking(Base):
    __tablename__ = 'bookings'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    movie_id = Column(Integer, ForeignKey('movies.id'))
    showtime_id = Column(Integer, ForeignKey('showtimes.id'))
    seats = Column(String(255))  # Store as JSON string
    snacks = Column(Text)  # Store as JSON string
    total_amount = Column(Float)
    booking_date = Column(DateTime, default=datetime.utcnow)
    status = Column(String(20), default='confirmed')
    
    user = relationship("User", back_populates="bookings")
    showtime = relationship("Showtime", back_populates="bookings")

# Create tables
Base.metadata.create_all(engine)

# API Routes
@app.route("/")
def home():
    return "Movie Booking API is running!"

@app.route("/api/movies", methods=["GET"])
def get_movies():
    session = Session()
    movies = session.query(Movie).all()
    result = [{
        "id": movie.id,
        "title": movie.title,
        "releaseDate": movie.release_date,
        "runtime": movie.runtime,
        "overview": movie.overview,
        "posterUrl": movie.poster_url,
        "backdropUrl": movie.backdrop_url,
        "rating": movie.rating,
        "status": movie.status,
        "trailerUrl": movie.trailer_url
    } for movie in movies]
    session.close()
    return jsonify(result)

@app.route("/api/movies/<movie_id>", methods=["GET"])
def get_movie(movie_id):
    session = Session()
    movie = session.query(Movie).filter(Movie.id == movie_id).first()
    if not movie:
        session.close()
        return jsonify({"error": "Movie not found"}), 404
    
    showtimes = session.query(Showtime).filter(Showtime.movie_id == movie_id).all()
    showtimes_data = [{
        "id": showtime.id,
        "date": showtime.date,
        "time": showtime.time,
        "theater": showtime.theater,
        "price": showtime.price
    } for showtime in showtimes]
    
    result = {
        "id": movie.id,
        "title": movie.title,
        "releaseDate": movie.release_date,
        "runtime": movie.runtime,
        "overview": movie.overview,
        "posterUrl": movie.poster_url,
        "backdropUrl": movie.backdrop_url,
        "rating": movie.rating,
        "status": movie.status,
        "trailerUrl": movie.trailer_url,
        "showtimes": showtimes_data
    }
    session.close()
    return jsonify(result)

@app.route("/api/auth/register", methods=["POST"])
def register():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    
    session = Session()
    existing_user = session.query(User).filter(User.email == email).first()
    if existing_user:
        session.close()
        return jsonify({"error": "Email already registered"}), 400
    
    new_user = User(name=name, email=email, password=password)
    session.add(new_user)
    session.commit()
    
    user_data = {
        "id": new_user.id,
        "name": new_user.name,
        "email": new_user.email,
        "isEmailVerified": new_user.email_verified
    }
    session.close()
    return jsonify({"message": "Registration successful", "user": user_data}), 201

@app.route("/api/auth/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    
    session = Session()
    user = session.query(User).filter(User.email == email).first()
    
    if not user or user.password != password:
        session.close()
        return jsonify({"error": "Invalid credentials"}), 401
    
    user_data = {
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "isEmailVerified": user.email_verified,
        "phone": user.phone or ""
    }
    session.close()
    return jsonify({"message": "Login successful", "user": user_data})

@app.route("/api/bookings", methods=["POST"])
def create_booking():
    data = request.json
    user_id = data.get("userId")
    movie_id = data.get("movieId")
    showtime_id = data.get("showtimeId")
    seats = data.get("seats")
    snacks = data.get("snacks")
    total_amount = data.get("totalAmount")
    
    if not all([user_id, movie_id, showtime_id, seats, total_amount]):
        return jsonify({"error": "Missing required fields"}), 400
    
    session = Session()
    new_booking = Booking(
        user_id=user_id,
        movie_id=movie_id,
        showtime_id=showtime_id,
        seats=json.dumps(seats),
        snacks=json.dumps(snacks) if snacks else None,
        total_amount=total_amount
    )
    
    session.add(new_booking)
    session.commit()
    
    result = {
        "id": new_booking.id,
        "message": "Booking successful"
    }
    session.close()
    return jsonify(result), 201

@app.route("/api/bookings/<user_id>", methods=["GET"])
def get_user_bookings(user_id):
    session = Session()
    bookings = session.query(Booking).filter(Booking.user_id == user_id).all()
    
    result = []
    for booking in bookings:
        showtime = session.query(Showtime).filter(Showtime.id == booking.showtime_id).first()
        movie = session.query(Movie).filter(Movie.id == booking.movie_id).first()
        
        result.append({
            "id": booking.id,
            "movieId": booking.movie_id,
            "showtimeId": booking.showtime_id,
            "seats": json.loads(booking.seats),
            "snacks": json.loads(booking.snacks) if booking.snacks else [],
            "totalAmount": booking.total_amount,
            "bookingDate": booking.booking_date.strftime("%Y-%m-%d %H:%M:%S"),
            "status": booking.status,
            "movieTitle": movie.title if movie else "Unknown Movie",
            "theaterName": showtime.theater if showtime else "Unknown Theater",
            "showDate": showtime.date if showtime else "",
            "showTime": showtime.time if showtime else "",
            "posterUrl": movie.poster_url if movie else ""
        })
    
    session.close()
    return jsonify({"bookings": result})

@app.route("/api/bookings/<booking_id>/cancel", methods=["PUT"])
def cancel_booking(booking_id):
    data = request.json
    user_id = data.get("userId")
    
    session = Session()
    booking = session.query(Booking).filter(Booking.id == booking_id, Booking.user_id == user_id).first()
    
    if not booking:
        session.close()
        return jsonify({"error": "Booking not found or does not belong to user"}), 404
    
    booking.status = "cancelled"
    session.commit()
    session.close()
    
    return jsonify({"message": "Booking cancelled successfully"})

# Seed database with initial data if needed
def seed_database():
    session = Session()
    
    # Check if movies already exist
    if session.query(Movie).count() == 0:
        # Sample movies
        movies = [
            {
                "title": "KGF: Chapter 2",
                "release_date": "2022-04-14",
                "runtime": 168,
                "overview": "Presented in two chapters, K.G.F, is a period action film that revolves around Raja Krishnappa Bairya, known as 'Rocky'.",
                "poster_url": "https://example.com/kgf2.jpg",
                "backdrop_url": "https://example.com/kgf2-backdrop.jpg",
                "rating": 8.4,
                "status": "now_showing",
                "trailer_url": "https://www.youtube.com/watch?v=qXQqmZy3q_g"
            },
            {
                "title": "Kantara",
                "release_date": "2022-09-30",
                "runtime": 150,
                "overview": "Kantara is a 2022 Indian Kannada-language action thriller film.",
                "poster_url": "https://example.com/kantara.jpg",
                "backdrop_url": "https://example.com/kantara-backdrop.jpg",
                "rating": 8.8,
                "status": "now_showing",
                "trailer_url": "https://www.youtube.com/watch?v=592mZW-SUgg"
            }
        ]
        
        for movie_data in movies:
            movie = Movie(**movie_data)
            session.add(movie)
        
        session.commit()
    
    # Check if showtimes already exist
    if session.query(Showtime).count() == 0:
        # Sample showtimes for first movie
        showtimes = [
            {
                "movie_id": 1,
                "date": "2023-10-29",
                "time": "10:00",
                "theater": "PVR: Orion Mall",
                "price": 250
            },
            {
                "movie_id": 1,
                "date": "2023-10-29",
                "time": "13:30",
                "theater": "INOX: Garuda Mall",
                "price": 200
            },
            {
                "movie_id": 2,
                "date": "2023-10-29",
                "time": "10:00",
                "theater": "PVR: Orion Mall",
                "price": 200
            }
        ]
        
        for showtime_data in showtimes:
            showtime = Showtime(**showtime_data)
            session.add(showtime)
        
        session.commit()
    
    session.close()

if __name__ == "__main__":
    # Seed database
    seed_database()
    
    # Start application
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)

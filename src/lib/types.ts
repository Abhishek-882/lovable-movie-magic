
// Movie related types
export type Genre = "Action" | "Adventure" | "Animation" | "Comedy" | "Crime" | "Documentary" | "Drama" | "Family" | "Fantasy" | "Historical" | "Horror" | "Musical" | "Mystery" | "Romance" | "Science Fiction" | "Sci-Fi" | "Thriller" | "War" | "Western";

export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  releaseDate: string;
  runtime: number;
  rating: number;
  language: string;
  overview: string;
  director: string;
  genres: Genre[];
  cast: string[];
  status: 'now_showing' | 'coming_soon';
}

export interface Showtime {
  id: string;
  movieId: string;
  theater: string;
  date: string;
  time: string;
  price: number;
  available?: boolean;
}

export interface Review {
  id: string;
  movieId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  isEmailVerified: boolean;
  isProfileComplete: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  movieId: string;
  showtimeId: string;
  seats: string[];
  totalAmount: number;
  bookingDate: string;
  status: 'confirmed' | 'cancelled' | 'pending';
}

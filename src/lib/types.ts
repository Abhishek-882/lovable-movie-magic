// Movie related types
export type Genre = 
  | "Action" 
  | "Drama" 
  | "Comedy" 
  | "Horror" 
  | "Thriller" 
  | "Romance" 
  | "Fantasy" 
  | "Sci-Fi" 
  | "Crime" 
  | "Historical" 
  | "Political"
  | "Period"
  | "Adventure"
  | "Mystery"
  | "Animation"
  | "Family"
  | "Documentary"
  | "Biography"
  | "Musical"
  | "War";

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
  trailerUrl?: string; // Added trailerUrl as optional property
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

// Add new types for snacks
export interface Snack {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "Popcorn" | "Beverage" | "Combo" | "Snack";
}

// Update the Booking interface to include snacks
export interface Booking {
  id: string;
  userId: string;
  movieId: string;
  showtimeId: string;
  seats: string[];
  snacks?: SnackOrder[];
  totalAmount: number;
  bookingDate: string;
  status: "confirmed" | "cancelled" | "pending";
}

export interface SnackOrder {
  snackId: string;
  quantity: number;
  price: number;
}

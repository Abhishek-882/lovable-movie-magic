
export type Genre = 
  | 'Action' 
  | 'Adventure' 
  | 'Comedy' 
  | 'Crime' 
  | 'Drama' 
  | 'Fantasy' 
  | 'Historical' 
  | 'Horror' 
  | 'Mystery' 
  | 'Political' 
  | 'Romance' 
  | 'Sci-Fi' 
  | 'Thriller' 
  | 'Western'
  | 'Period';

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
  trailerUrl?: string;
}

export interface Showtime {
  id: string;
  movieId: string;
  theater: string;
  date: string;
  time: string;
  price: number;
  available: boolean;
}

export interface Review {
  id: string;
  movieId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

// Added missing types
export interface Snack {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface SnackOrder {
  snackId: string;
  quantity: number;
  price: number;
}

export interface Booking {
  id: string;
  userId: string;
  movieId: string;
  showtimeId: string;
  seats: string[];
  totalAmount: number;
  bookingDate: string;
  snacks?: SnackOrder[];
  status: 'confirmed' | 'cancelled' | 'pending';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  isEmailVerified?: boolean;
}


export interface Movie {
  id: string;
  title: string;
  overview: string;
  posterUrl: string;
  backdropUrl: string;
  releaseDate: string;
  runtime: number;
  genres: string[];
  rating: number;
  director: string;
  cast: string[];
  language: string;
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
  seatsAvailable: number;
  seatsTotal?: number;
}

export interface Review {
  id: string;
  movieId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export type Genre = 
  | 'Action'
  | 'Adventure'
  | 'Animation'
  | 'Comedy'
  | 'Crime'
  | 'Documentary'
  | 'Drama'
  | 'Family'
  | 'Fantasy'
  | 'History'
  | 'Horror'
  | 'Music'
  | 'Mystery'
  | 'Romance'
  | 'Science Fiction'
  | 'Thriller'
  | 'War'
  | 'Western';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  isVerified: boolean;
  profileComplete: boolean;
}

export interface Seat {
  id: string;
  row: string;
  number: number;
  category: 'Regular' | 'Premium' | 'VIP' | 'Recliner';
  price: number;
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  movieId: string;
  showtimeId: string;
  seats: string[];
  totalAmount: number;
  bookingDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  qrCode?: string;
}

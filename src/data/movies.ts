import { Movie, Showtime, Review } from "@/lib/types";

const currentDate = new Date();

const getRecentDate = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  return date.toISOString().split('T')[0];
};

export const movies: Movie[] = [
  {
    id: "kgf2",
    title: "K.G.F: Chapter 2",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYjE2ZTJjZGQtZDRlYy00MGY1LWE5ZDEtN2U2MDY3ZjBmMTcxXkEyXkFqcGc@._V1_.jpg",
    backdropUrl: "https://www.koimoi.com/wp-content/new-galleries/2022/04/kgf-chapter-2-box-office-day-5-early-trends-yash-starrer-continues-to-dominate-001.jpg",
    releaseDate: getRecentDate(),
    runtime: 168,
    rating: 8.4,
    language: "Kannada",
    overview: "In the blood-soaked Kolar Gold Fields, Rocky's name strikes fear into his foes.",
    director: "Prashanth Neel",
    genres: ["Action", "Crime", "Drama"],
    cast: ["Yash", "Sanjay Dutt", "Raveena Tandon"],
    status: "now_showing",
    trailerUrl: "https://www.youtube.com/embed/Qah9sSIXJqk"
  },
  {
    id: "rrr",
    title: "RRR",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNjE5NTMwMzItYjExNS00NzJjLWJlM2ItN2ZjZDU0NjE0NjZiXkEyXkFqcGc@._V1_.jpg",
    backdropUrl: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202203/RRR_11_1200x768.jpeg",
    releaseDate: getRecentDate(),
    runtime: 187,
    rating: 8.0,
    language: "Telugu",
    overview: "A tale of two legendary revolutionaries and their journey far away from home.",
    director: "S.S. Rajamouli",
    genres: ["Action", "Drama", "Historical"],
    cast: ["N.T. Rama Rao Jr.", "Ram Charan", "Alia Bhatt"],
    status: "now_showing",
    trailerUrl: "https://www.youtube.com/embed/f_vbAtFSEc0"
  },
  {
    id: "arjun",
    title: "Arjun Reddy",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BODUzYzJlZTctODNmMS00MWU4LWI0ZjUtMGEzMTc2ODhlMTI5XkEyXkFqcGc@._V1_.jpg",
    backdropUrl: "https://static.moviecrow.com/gallery/20170825/141580-1-A.png",
    releaseDate: getRecentDate(),
    runtime: 187,
    rating: 8.1,
    language: "Telugu",
    overview: "A short-tempered house surgeon gets used to drugs and drinks.",
    director: "Sandeep Reddy Vanga",
    genres: ["Drama", "Romance"],
    cast: ["Vijay Deverakonda", "Shalini Pandey"],
    status: "now_showing",
    trailerUrl: "https://www.youtube.com/embed/aozErj9NqeE"
  },
  // ... (keep all your other existing movies exactly as they were)
  {
    id: "pushpa2",
    title: "Pushpa 2: The Rule",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNWU1ZWFhNGQtZDhlZC00ZWFlLTlmNmEtN2VmYmZiN2Y5ZmQ2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    // ... (rest of the properties)
    status: "coming_soon"
  },
  // ... (all other movies)
];

// ... (keep all your existing theater, showtime, and review data)
// ... (keep all your existing utility functions)

export const getAllMovies = (): Movie[] => movies;
export const getMoviesByStatus = (status: 'now_showing' | 'coming_soon'): Movie[] => 
  movies.filter(movie => movie.status === status);
export const getMovieById = (id: string): Movie | null => 
  movies.find(movie => movie.id === id) || null;

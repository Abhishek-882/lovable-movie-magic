
import { Movie, Showtime, Review } from "@/lib/types";

export const moviesData: Movie[] = [
  {
    id: "1",
    title: "Eternal Reflections",
    overview: "A journey through time as a historian discovers ancient artifacts that connect to their own past life, blurring the lines between present and history.",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2225&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1498354178607-a79df2916198?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
    releaseDate: "2023-09-15",
    runtime: 142,
    genres: ["Drama", "Mystery", "History"],
    rating: 8.5,
    director: "Claire Dawson",
    cast: ["Sophia Reynolds", "Michael Chen", "Leo Faria", "Amara Wilson"],
    language: "English",
    status: "now_showing",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "2",
    title: "Whispers in the Void",
    overview: "When a deep space mission discovers signals from an unknown civilization, a linguist must decode the message before a potential first contact changes humanity forever.",
    posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2184&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    releaseDate: "2023-07-28",
    runtime: 133,
    genres: ["Science Fiction", "Drama", "Thriller"],
    rating: 9.0,
    director: "Marcus Zhang",
    cast: ["Elena Ivanova", "Daniel Washington", "Aisha Patel", "James Mercer"],
    language: "English",
    status: "now_showing",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "3",
    title: "The Last Symphony",
    overview: "A renowned composer loses his hearing and must find a way to create his final masterpiece while reconciling with his estranged daughter.",
    posterUrl: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    releaseDate: "2023-08-04",
    runtime: 147,
    genres: ["Drama", "Music"],
    rating: 8.7,
    director: "Isabella Rossi",
    cast: ["Julian Moore", "Zoe Yamamoto", "Carlos Vega", "Emma Thompson"],
    language: "English",
    status: "now_showing",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "4",
    title: "Beneath the Surface",
    overview: "When a marine biologist discovers an unknown species in the deepest part of the ocean, she must protect it from those who would exploit it, while uncovering its extraordinary potential.",
    posterUrl: "https://images.unsplash.com/photo-1582034986517-30d9b9413a08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2193&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1551244072-5d12893278ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2835&q=80",
    releaseDate: "2023-10-20",
    runtime: 125,
    genres: ["Adventure", "Science Fiction", "Thriller"],
    rating: 7.9,
    director: "Oliver Wright",
    cast: ["Nora Diaz", "Thomas Park", "Gabrielle Anderson", "Khalid Abadi"],
    language: "English",
    status: "coming_soon",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "5",
    title: "Echoes of Tomorrow",
    overview: "In a world where memories can be transferred between people, a detective who specializes in solving crimes by experiencing victims' memories encounters a case that will make him question everything.",
    posterUrl: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1568283644777-446f0959fe07?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    releaseDate: "2023-11-03",
    runtime: 138,
    genres: ["Science Fiction", "Mystery", "Thriller"],
    rating: 8.2,
    director: "Liam Foster",
    cast: ["Rachel Kim", "André Laurent", "Maya Johnson", "David Zhou"],
    language: "English",
    status: "coming_soon",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "6",
    title: "The Art of Letting Go",
    overview: "A celebrated artist facing a creative block returns to her childhood home, where she must confront the past she's been running from to rediscover her passion and move forward.",
    posterUrl: "https://images.unsplash.com/photo-1617503752587-97d2103a96ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2786&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2160&q=80",
    releaseDate: "2023-09-29",
    runtime: 120,
    genres: ["Drama", "Romance"],
    rating: 7.8,
    director: "Alejandro Reyes",
    cast: ["Sophie Martin", "Benjamin Okafor", "Olivia Wong", "Isaac Miller"],
    language: "English",
    status: "now_showing",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "7",
    title: "Beyond the Horizon",
    overview: "An expedition to explore an uncharted island becomes a fight for survival when the team discovers ancient creatures thought to be extinct for millions of years.",
    posterUrl: "https://images.unsplash.com/photo-1596370743446-6a7ef43a36f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2148&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
    releaseDate: "2023-12-08",
    runtime: 131,
    genres: ["Adventure", "Action", "Fantasy"],
    rating: 7.5,
    director: "Nathan Johnson",
    cast: ["Victor Leung", "Freya Nilsson", "Jamal Williams", "Lucia Ferrara"],
    language: "English",
    status: "coming_soon",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "8",
    title: "Midnight Serenade",
    overview: "In 1950s New York, a talented jazz pianist and a classical violinist from different worlds fall in love against the backdrop of racial tension and musical revolution.",
    posterUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1551197600-d3f7b94ae9f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2264&q=80",
    releaseDate: "2023-10-13",
    runtime: 145,
    genres: ["Romance", "Drama", "Music"],
    rating: 8.8,
    director: "Vanessa Thompson",
    cast: ["Miles Rodriguez", "Ella Greene", "Robert Jackson", "Samantha Lee"],
    language: "English",
    status: "coming_soon",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "9",
    title: "The Shadow Protocol",
    overview: "When a covert intelligence agency is compromised, a disavowed agent must go off the grid to expose a conspiracy that reaches the highest levels of government.",
    posterUrl: "https://images.unsplash.com/photo-1623563028222-ad0cc434330c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1536599424071-0b215a388ba7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
    releaseDate: "2023-08-18",
    runtime: 127,
    genres: ["Action", "Thriller", "Mystery"],
    rating: 8.0,
    director: "Dominic Chen",
    cast: ["Jason Reed", "Naomi Campbell", "Alejandro Diaz", "Evelyn Clarke"],
    language: "English",
    status: "now_showing",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    id: "10",
    title: "Labyrinth of Lies",
    overview: "A brilliant psychologist specializing in memory disorders begins to question reality when her new patient claims to be someone from her forgotten past.",
    posterUrl: "https://images.unsplash.com/photo-1590513899522-33e63c282883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2218&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80",
    releaseDate: "2023-07-14",
    runtime: 134,
    genres: ["Thriller", "Mystery", "Drama"],
    rating: 8.3,
    director: "Simon Blackwood",
    cast: ["Elizabeth Stone", "Marcus Rivera", "Helen Park", "Oliver Schmidt"],
    language: "English",
    status: "now_showing",
    trailerUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  }
];

// Sample showtimes data
export const showtimesData: Showtime[] = [
  { id: "st1", movieId: "1", theater: "Grand Cinema", date: "2023-09-15", time: "18:30", price: 15, seatsAvailable: 48 },
  { id: "st2", movieId: "1", theater: "Grand Cinema", date: "2023-09-15", time: "21:00", price: 15, seatsAvailable: 62 },
  { id: "st3", movieId: "1", theater: "Majestic Theater", date: "2023-09-15", time: "19:15", price: 18, seatsAvailable: 34 },
  { id: "st4", movieId: "2", theater: "Grand Cinema", date: "2023-09-15", time: "17:00", price: 15, seatsAvailable: 27 },
  { id: "st5", movieId: "2", theater: "Majestic Theater", date: "2023-09-15", time: "20:00", price: 18, seatsAvailable: 53 },
  { id: "st6", movieId: "3", theater: "Royal Cineplex", date: "2023-09-15", time: "18:00", price: 16, seatsAvailable: 41 },
  { id: "st7", movieId: "3", theater: "Royal Cineplex", date: "2023-09-15", time: "20:30", price: 16, seatsAvailable: 70 },
  { id: "st8", movieId: "6", theater: "Grand Cinema", date: "2023-09-15", time: "19:30", price: 15, seatsAvailable: 38 },
  { id: "st9", movieId: "9", theater: "Majestic Theater", date: "2023-09-15", time: "17:30", price: 18, seatsAvailable: 22 },
  { id: "st10", movieId: "10", theater: "Royal Cineplex", date: "2023-09-15", time: "19:00", price: 16, seatsAvailable: 45 }
];

// Sample reviews data
export const reviewsData: Review[] = [
  {
    id: "r1",
    movieId: "1",
    author: "MovieLover42",
    rating: 9,
    comment: "Absolutely breathtaking cinematography and storytelling. The way the past and present intertwine is masterfully executed.",
    date: "2023-09-16"
  },
  {
    id: "r2",
    movieId: "1",
    author: "FilmCritic",
    rating: 8,
    comment: "A compelling narrative with outstanding performances, though the pacing in the middle act could have been tighter.",
    date: "2023-09-17"
  },
  {
    id: "r3",
    movieId: "2",
    author: "SciFiFan",
    rating: 10,
    comment: "One of the most thought-provoking science fiction films I've seen in years. The linguistic aspects were handled with such care and intelligence.",
    date: "2023-08-02"
  },
  {
    id: "r4",
    movieId: "3",
    author: "ClassicalMusic",
    rating: 9,
    comment: "As a musician, I was moved to tears by the authentic portrayal of hearing loss and the artistic process. The score deserves an award.",
    date: "2023-08-10"
  }
];

export const getNowShowingMovies = () => {
  return moviesData.filter(movie => movie.status === 'now_showing');
};

export const getComingSoonMovies = () => {
  return moviesData.filter(movie => movie.status === 'coming_soon');
};

export const getMovieById = (id: string) => {
  return moviesData.find(movie => movie.id === id);
};

export const getShowtimesForMovie = (movieId: string) => {
  return showtimesData.filter(showtime => showtime.movieId === movieId);
};

export const getReviewsForMovie = (movieId: string) => {
  return reviewsData.filter(review => review.movieId === movieId);
};

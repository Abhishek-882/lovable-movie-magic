
import { Movie, Showtime, Review } from "@/lib/types";

// Get current date for checking upcoming movies
const currentDate = new Date();

// Helper function to get a recent date (within the last 4 months)
const getRecentDate = () => {
  const date = new Date();
  const monthsAgo = Math.floor(Math.random() * 4); // 0-3 months ago
  date.setMonth(date.getMonth() - monthsAgo);
  date.setDate(Math.floor(Math.random() * 28) + 1); // Random day 1-28
  return date.toISOString().split('T')[0];
};

// Movie data with updated high-quality images and more options
export const movies: Movie[] = [
  {
    id: "1",
    title: "RRR",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BODUwNDNjYzctODUxNy00ZTA2LWIyYTEtMDc5Y2E5ZjBmNTMzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_FMjpg_UX1000_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BZmYzMzU4NjctNDI0Mi00MGExLWI3ZDQtYzQzYThmYzc2ZmNjXkEyXkFqcGdeQXVyMTEyMjM2NDc2._V1_.jpg",
    releaseDate: getRecentDate(),
    runtime: 187,
    rating: 8.0,
    language: "Telugu",
    overview: "A tale of two legendary revolutionaries and their journey far away from home. After their journey they return home to start fighting back against British colonialists in the 1920s.",
    director: "S.S. Rajamouli",
    genres: ["Action", "Drama", "Historical"],
    cast: ["N.T. Rama Rao Jr.", "Ram Charan", "Ajay Devgn", "Alia Bhatt", "Olivia Morris"],
    status: "now_showing",
    trailerUrl: "https://www.youtube.com/embed/f_vbAtFSEc0"
  },
  {
    id: "3",
    title: "Pushpa 2: The Rule",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNWU1ZWFhNGQtZDhlZC00ZWFlLTlmNmEtN2VmYmZiN2Y5ZmQ2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    backdropUrl: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202306/pushpa_2-sixteen_nine.jpg?VersionId=VXzx5NLPc5rRe1vqOq0WrIypB5zU9pGV",
    releaseDate: (new Date(currentDate.getFullYear(), currentDate.getMonth() + 3, 15)).toISOString().split('T')[0],
    runtime: 175,
    rating: 0,
    language: "Telugu",
    overview: "The sequel to the blockbuster Pushpa: The Rise continues the story of Pushpa Raj as he battles new enemies while expanding his sandalwood smuggling empire.",
    director: "Sukumar",
    genres: ["Action", "Crime", "Drama"],
    cast: ["Allu Arjun", "Rashmika Mandanna", "Fahadh Faasil", "Prakash Raj", "Jagapathi Babu"],
    status: "coming_soon",
    trailerUrl: "https://www.youtube.com/embed/gLlhXM0gOdI"
  },
  {
    id: "4",
    title: "Arjun Reddy",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZWYxOGUwODUtZmMwNi00YzQxLTliZDYtMjFkM2E2OWU5ZjhhXkEyXkFqcGdeQXVyOTA3MTM0MTM@._V1_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BOGJlM2QyNjgtZTRmOS00ZThkLWFiOTctNDEwYThiYzViNGE0XkEyXkFqcGc@._V1_.jpg",
    releaseDate: getRecentDate(),
    runtime: 187,
    rating: 8.1,
    language: "Telugu",
    overview: "A short-tempered house surgeon gets used to drugs and drinks when his girlfriend is forced to marry another person.",
    director: "Sandeep Reddy Vanga",
    genres: ["Drama", "Romance"],
    cast: ["Vijay Deverakonda", "Shalini Pandey", "Rahul Ramakrishna", "Jia Sharma", "Sanjay Swaroop"],
    status: "now_showing",
    trailerUrl: "https://www.youtube.com/embed/aozErj9NqeE"
  },
  {
    id: "5",
    title: "K.G.F: Chapter 2",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMjMwMDgyOGQtMWZjNC00MDUwLTllZDYtZWM3NDBmN2YzNmZmXkEyXkFqcGdeQXVyMTQzNTA5MzYz._V1_FMjpg_UX1000_.jpg",
    backdropUrl: "https://m.media-amazon.com/images/M/MV5BNWQwMGJmYTItNjA0Ny00MWE1LTlkOWMtOTQ5YjA1ZTk4ZGY0XkEyXkFqcGdeQXVyMTQzNTA5MzYz._V1_.jpg",
    releaseDate: getRecentDate(),
    runtime: 168,
    rating: 8.4,
    language: "Kannada",
    overview: "In the blood-soaked Kolar Gold Fields, Rocky's name strikes fear into his foes. While his allies look up to him, the government sees him as a threat to law and order. Rocky must battle threats from all sides for unchallenged supremacy.",
    director: "Prashanth Neel",
    genres: ["Action", "Crime", "Drama"],
    cast: ["Yash", "Sanjay Dutt", "Raveena Tandon", "Srinidhi Shetty", "Prakash Raj"],
    status: "now_showing",
    trailerUrl: "https://www.youtube.com/embed/Qah9sSIXJqk"
  },
  {
    id: "6",
    title: "Kalki 2898 AD",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTM3ZGUwYTEtZTI5NS00ZmMyLTk2YmQtMWU4YjlhZTI3NjRjXkEyXkFqcGc@._V1_.jpg",
    backdropUrl: "https://www.filmibeat.com/img/2023/10/kalkiposterfbbb-1697088070.jpg",
    releaseDate: (new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 27)).toISOString().split('T')[0],
    runtime: 165,
    rating: 0,
    language: "Telugu",
    overview: "Set in a dystopian future, Kalki 2898 AD is a sci-fi epic that combines Indian mythology with futuristic elements, featuring an all-star cast and groundbreaking visual effects.",
    director: "Nag Ashwin",
    genres: ["Sci-Fi", "Action", "Fantasy"],
    cast: ["Prabhas", "Deepika Padukone", "Amitabh Bachchan", "Kamal Haasan", "Disha Patani"],
    status: "coming_soon",
    trailerUrl: "https://www.youtube.com/embed/BPDc-77IpKk"
  },
  {
    id: "7",
    title: "Game Changer",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZTQ3NGM3MTgtZGNiZi00YzZmLWI5YzktOGVmMTE0YjQyMDg4XkEyXkFqcGc@._V1_.jpg",
    backdropUrl: "https://assets.thehansindia.com/h-upload/2023/07/22/1358276-game-changer.webp",
    releaseDate: (new Date(currentDate.getFullYear(), currentDate.getMonth() + 4, 5)).toISOString().split('T')[0],
    runtime: 155,
    rating: 0,
    language: "Telugu",
    overview: "A political action thriller featuring Ram Charan in a dual role as father and son, both IAS officers with different ideologies fighting against corruption.",
    director: "S. Shankar",
    genres: ["Action", "Thriller", "Political"],
    cast: ["Ram Charan", "Kiara Advani", "S.J. Suryah", "Anjali", "Jayaram"],
    status: "coming_soon",
    trailerUrl: "https://www.youtube.com/embed/hJWWCmtW3CE"
  },
  {
    id: "8",
    title: "Devara: Part 1",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZWEwNmYwYTAtMmQxYS00ZTgwLWE0NmUtNGIwZDEyZmYwN2EwXkEyXkFqcGc@._V1_.jpg",
    backdropUrl: "https://www.behindwoods.com/news/tamil-nadu/jr-ntr-saif-ali-khan-in-devara-movie-shooting-wrapped/jr-ntr-saif-ali-khan-in-devara-movie-shooting-wrapped.jpg",
    releaseDate: (new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 10)).toISOString().split('T')[0],
    runtime: 170,
    rating: 0,
    language: "Telugu",
    overview: "A high-octane action drama set in a coastal region, featuring Jr NTR in a powerful role as a man who protects his village from external threats.",
    director: "Koratala Siva",
    genres: ["Action", "Drama", "Thriller"],
    cast: ["Jr NTR", "Janhvi Kapoor", "Saif Ali Khan", "Prakash Raj", "Srikanth"],
    status: "coming_soon",
    trailerUrl: "https://www.youtube.com/embed/VoGI8FXCwI8"
  },
  {
    id: "9",
    title: "Kanguva",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYTQyMzQ3ZTQtNTFlZS00ZmVmLWEzYjMtZTFhZjU1NjYxZDVjXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    backdropUrl: "https://igimages.gumlet.io/tamil/home/surya-kcbv-31114.jpg",
    releaseDate: (new Date(currentDate.getFullYear(), currentDate.getMonth() + 5, 20)).toISOString().split('T')[0],
    runtime: 160,
    rating: 0,
    language: "Tamil",
    overview: "An epic period action drama featuring Suriya in multiple roles across different time periods, showcasing a battle between ancient tribes and modern forces.",
    director: "Siva",
    genres: ["Action", "Period", "Drama"],
    cast: ["Suriya", "Bobby Deol", "Disha Patani", "Natarajan Subramaniam", "Yogi Babu"],
    status: "coming_soon",
    trailerUrl: "https://www.youtube.com/embed/1NMpGx-5_WE"
  }
];

// Generate showtimes for the movies that are now showing
export const generateShowtimes = (): Showtime[] => {
  const nowShowingMovies = movies.filter(movie => movie.status === 'now_showing');
  const showtimes: Showtime[] = [];
  
  // Theaters in Hyderabad
  const theaters = [
    "PVR ICON: GVK One Mall",
    "INOX: Hyderabad Central",
    "Cinepolis: Sudha Multiplex",
    "AMB Cinemas: Gachibowli",
    "Prasads Multiplex: Tank Bund"
  ];
  
  // Times
  const times = ["10:00 AM", "1:00 PM", "4:30 PM", "7:45 PM", "10:30 PM"];
  
  // Generate showtimes for next 7 days
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    
    nowShowingMovies.forEach(movie => {
      theaters.forEach(theater => {
        // Add 2-3 random showtimes for each movie at each theater
        const numShowtimes = Math.floor(Math.random() * 2) + 2; // 2-3 showtimes
        const shuffledTimes = [...times].sort(() => 0.5 - Math.random());
        
        for (let j = 0; j < numShowtimes; j++) {
          const time = shuffledTimes[j];
          const price = Math.floor(Math.random() * 100) + 200; // Price between 200-300
          
          showtimes.push({
            id: `${movie.id}-${theater.split(':')[0]}-${dateStr}-${j}`,
            movieId: movie.id,
            date: dateStr,
            time: time,
            theater: theater,
            price: price,
            seatsTotal: 120,
            seatsBooked: Math.floor(Math.random() * 80) // Random number of seats booked
          });
        }
      });
    });
  }
  
  return showtimes;
};

// Generate reviews for some movies
export const generateReviews = (): Review[] => {
  const reviews: Review[] = [
    {
      id: "r1",
      movieId: "1",
      author: "MovieBuff123",
      rating: 9,
      comment: "RRR is a visual spectacle with outstanding performances by Jr NTR and Ram Charan. S.S. Rajamouli has once again proven his directorial genius.",
      date: "2023-04-15"
    },
    {
      id: "r2",
      movieId: "1",
      author: "CinemaLover",
      rating: 8,
      comment: "The action sequences are breathtaking. The chemistry between the leads is phenomenal. A must-watch!",
      date: "2023-04-20"
    },
    {
      id: "r3",
      movieId: "4",
      author: "FilmCritic22",
      rating: 7,
      comment: "Arjun Reddy is raw and intense. Vijay Deverakonda delivers a powerful performance that stays with you.",
      date: "2023-05-10"
    },
    {
      id: "r4",
      movieId: "4",
      author: "MovieWatcher",
      rating: 9,
      comment: "A bold film that breaks conventions. The direction and music are exceptional.",
      date: "2023-05-22"
    },
    {
      id: "r5",
      movieId: "5",
      author: "ActionFan",
      rating: 10,
      comment: "KGF Chapter 2 takes everything great about the first part and elevates it. Yash's Rocky is an iconic character.",
      date: "2023-06-05"
    },
    {
      id: "r6",
      movieId: "5",
      author: "CineMaster",
      rating: 8,
      comment: "Brilliant cinematography and background score. The action scenes are extraordinary.",
      date: "2023-06-12"
    }
  ];
  
  return reviews;
};

export const showtimes = generateShowtimes();
export const reviews = generateReviews();


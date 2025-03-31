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

// Movie data with updated working image URLs
export const movies: Movie[] = [
  {
    id: "1",
    title: "RRR",
    posterUrl: "https://resizing.flixster.com/WAHXGKleT3QvhqHUlFGIRgcQAjU=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzljZDVhZjgxLTYxZjItNDRkMy1hMjU5LWEwZWJmYTlmYjg2MS5qcGc=",
    backdropUrl: "https://static.toiimg.com/photo/89879242.cms",
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
    id: "4",
    title: "Arjun Reddy",
    posterUrl: "https://www.filmiforest.com/img/movie/profile/arjun-reddy-m51.jpg",
    backdropUrl: "https://stat5.bollywoodhungama.in/wp-content/uploads/2016/09/Arjun-Reddy-1.jpg",
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
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNzY5NzZiNTgtMTA4Yy00NzY0LThmMDUtOWUwZjNkZWYwZTYzXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg",
    backdropUrl: "https://c.ndtvimg.com/2022-04/5qruvs8o_yash-kgf-chapter-2_625x300_07_April_22.jpg",
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
    posterUrl: "https://www.koimoi.com/wp-content/new-galleries/2023/10/kalki-2898-ad-is-bigger-than-baahubali-prabhas-deepika-padukone-starrer-took-4-times-the-investment-of-ss-rajamoulis-epic-saga-001.jpg",
    backdropUrl: "https://images.hindustantimes.com/tech/img/2023/07/20/1600x900/kalki_1689833025162_1689833030624.jpg",
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
    id: "10",
    title: "Ala Vaikunthapurramuloo",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BOGFjYjFjYTItMmQwMC00OWZhLWFiZTAtYzI5MzJmN2YxNTAxXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg",
    backdropUrl: "https://www.telugu360.com/wp-content/uploads/2020/01/Ala-Vaikuntapuramlo-2.jpg",
    releaseDate: getRecentDate(),
    runtime: 163,
    rating: 7.3,
    language: "Telugu",
    overview: "After growing up enduring criticism from his father, a young man finds his world shaken upon learning he was switched at birth with a millionaire's son.",
    director: "Trivikram Srinivas",
    genres: ["Action", "Comedy", "Drama"],
    cast: ["Allu Arjun", "Pooja Hegde", "Tabu", "Jayaram", "Sushanth"],
    status: "now_showing",
    trailerUrl: "https://www.youtube.com/embed/SkENAjfVoFI"
  },
  {
    id: "12",
    title: "Kantara",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNjQzNDI1YjMtMzEwMS00OGM2LWFmY2YtZmRiYjNjNjNkMGQ0XkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_.jpg",
    backdropUrl: "https://www.pinkvilla.com/images/2022-10/kantara_review_main_1_1666267802.jpg",
    releaseDate: getRecentDate(),
    runtime: 150,
    rating: 8.3,
    language: "Kannada",
    overview: "A small community living in the forest of Kadamba is faced with a conflict when a corporate company tries to take away the land that they consider sacred.",
    director: "Rishab Shetty",
    genres: ["Action", "Adventure", "Drama"],
    cast: ["Rishab Shetty", "Sapthami Gowda", "Kishore", "Achyuth Kumar", "Pramod Shetty"],
    status: "now_showing",
    trailerUrl: "https://www.youtube.com/embed/8mrVmf239L4"
  },
  {
    id: "13",
    title: "Tumbbad",
    posterUrl: "https://assets.gadgets360cdn.com/pricee/assets/product/202206/tumbbad_1655468240.jpg",
    backdropUrl: "https://static.toiimg.com/photo/66247182.cms",
    releaseDate: getRecentDate(),
    runtime: 104,
    rating: 8.3,
    language: "Hindi",
    overview: "In 20th-century rural India, a decaying palace and a mythological entity hidden in its basement symbolize the link between human greed and the supernatural.",
    director: "Rahi Anil Barve",
    genres: ["Horror", "Mystery", "Thriller"],
    cast: ["Sohum Shah", "Jyoti Malshe", "Anita Date", "Ronjini Chakraborty", "Deepak Damle"],
    status: "now_showing",
    trailerUrl: "https://www.youtube.com/embed/sN75MPxgvX8"
  },
  {
    id: "14",
    title: "Master",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYTJmZmE5N2QtZWYyMi00YTdhLWIxMGEtODJiNWNiNDFiOGNlXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_.jpg",
    backdropUrl: "https://static.toiimg.com/photo/80245813.cms",
    releaseDate: getRecentDate(),
    runtime: 178,
    rating: 7.3,
    language: "Tamil",
    overview: "An alcoholic professor is sent to a juvenile school, where he clashes with a gangster who uses the school children for criminal activities.",
    director: "Lokesh Kanagaraj",
    genres: ["Action", "Thriller"],
    cast: ["Vijay", "Vijay Sethupathi", "Malavika Mohanan", "Andrea Jeremiah", "Arjun Das"],
    status: "now_showing",
    trailerUrl: "https://www.youtube.com/embed/UTiXQcrLlv4"
  }
];

// Generate theaters based on popular chains in India
const theaters = {
  "Hyderabad": [
    "PVR ICON: GVK One Mall",
    "INOX: Hyderabad Central",
    "Cinepolis: Sudha Multiplex",
    "AMB Cinemas: Gachibowli",
    "Prasads Multiplex: Tank Bund",
    "Asian Mukta Cinemas: Miyapur",
    "Sudarshan 35MM: RTC X Roads",
    "Devi 70MM: RTC X Roads",
    "Sandhya 70MM: RTC X Roads",
    "PVR: Irrum Manzil"
  ],
  "Bengaluru": [
    "PVR: Forum Mall",
    "INOX: Garuda Mall",
    "Cinepolis: Orion Mall",
    "PVR Gold: Phoenix Mall",
    "Innovative Multiplex: Marathahalli",
    "Swagath Cinemas: Indira Nagar",
    "Gopalan Cinemas: Bannerghatta Road",
    "Rockline Cinemas: JP Nagar",
    "Cinepolis: ETA Mall Binnypet",
    "Vaishnavi Sapphire Mall: Yeshwanthpur"
  ],
  "Mumbai": [
    "PVR ICON: Phoenix Palladium",
    "INOX: R-City Mall",
    "Cinepolis: Andheri West",
    "PVR: Juhu",
    "Carnival Cinemas: IMAX Wadala",
    "PVR: Infiniti Mall Malad",
    "Movietime: The Hub Mall Goregaon",
    "INOX: Megaplex Inorbit Mall",
    "Cinepolis: Viviana Mall Thane",
    "PVR: Market City Kurla"
  ],
  "Chennai": [
    "PVR: VR Mall",
    "SPI Cinemas: Sathyam",
    "INOX: Phoenix Market City",
    "Palazzo Cinemas: Forum Vijaya Mall",
    "AGS Cinemas: T. Nagar",
    "Rohini Silver Screens: Koyambedu",
    "Kamala Cinemas: Vadapalani",
    "SPI Cinemas: Escape",
    "PVR: Grand Mall Velachery",
    "Jazz Cinemas: Phoenix Mall"
  ],
  "Delhi": [
    "PVR: Select Citywalk",
    "PVR Director's Cut: Ambience Mall",
    "INOX: Nehru Place",
    "Cinepolis: DLF Place",
    "Wave Cinemas: Raja Garden",
    "PVR: Pacific Mall Subhash Nagar",
    "PVR: ECX Chanakyapuri",
    "Cinepolis: Unity One Mall",
    "PVR: Promenade Vasant Kunj",
    "M2K Cinemas: Pitampura"
  ],
  "Kolkata": [
    "INOX: Forum Mall",
    "PVR: Avani Riverside Mall",
    "Cinepolis: Lake Mall",
    "INOX: City Centre Salt Lake",
    "Miraj Cinemas: Newtown",
    "PVR: Diamond Plaza",
    "INOX: Quest Mall",
    "Cinepolis: Acropolis Mall",
    "PVR: Mani Square Mall",
    "INOX: South City Mall"
  ],
  "Pune": [
    "PVR: Phoenix MarketCity",
    "INOX: Amanora Town Centre",
    "Cinepolis: Seasons Mall",
    "PVR: Kumar Pacific Mall",
    "INOX: Bund Garden Road",
    "Cinepolis: Westend Mall",
    "PVR ICON: Pavillion Mall",
    "INOX: Jyoti Square",
    "E-Square Multiplex: University Road",
    "Carnival Cinemas: Pineville Mall"
  ]
};

// Generate sample showtimes for each movie
export const showtimes: Showtime[] = [];

// Function to generate random times
const generateTimes = () => {
  const times = ["10:15 AM", "12:45 PM", "3:30 PM", "6:45 PM", "9:30 PM", "11:00 PM"];
  const selectedTimes = [];
  const numTimes = Math.floor(Math.random() * 3) + 3; // 3-5 show times
  
  for (let i = 0; i < numTimes; i++) {
    const randomIndex = Math.floor(Math.random() * times.length);
    selectedTimes.push(times[randomIndex]);
    times.splice(randomIndex, 1);
  }
  
  return selectedTimes.sort();
};

// Generate dates for the next 7 days
const generateDates = () => {
  const dates = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  return dates;
};

const dates = generateDates();

// Get user location from localStorage (defaults to Hyderabad if not set)
const getUserLocation = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('userLocation') || 'Hyderabad';
  }
  return 'Hyderabad';
};

// Generate showtimes for each movie
let showtimeId = 1;
movies.forEach(movie => {
  if (movie.status === 'now_showing') {
    // Create theaters for each movie based on city
    const userLocation = getUserLocation();
    const selectedTheaters = theaters[userLocation as keyof typeof theaters] || theaters.Hyderabad;
    
    // Use 3-5 random theaters for each movie
    const numTheaters = Math.floor(Math.random() * 3) + 3; // Increased to ensure more theaters
    const movieTheaters = [];
    
    for (let i = 0; i < numTheaters; i++) {
      const randomTheaterIndex = Math.floor(Math.random() * selectedTheaters.length);
      const theater = selectedTheaters[randomTheaterIndex];
      
      if (!movieTheaters.includes(theater)) {
        movieTheaters.push(theater);
        
        // Generate showtimes for each date
        dates.forEach(date => {
          const times = generateTimes();
          
          times.forEach(time => {
            // Generate random price between ₹120 and ₹350 (in rupees)
            const basePrice = Math.floor(Math.random() * 250) + 120;
            
            showtimes.push({
              id: showtimeId.toString(),
              movieId: movie.id,
              theater,
              date,
              time,
              price: basePrice, // Price in rupees
              available: Math.random() > 0.1 // 90% of showtimes are available
            });
            
            showtimeId++;
          });
        });
      }
    }
  }
});

// Generate sample reviews for movies
export const reviews: Review[] = [
  {
    id: "1",
    movieId: "1",
    author: "MovieBuff123",
    rating: 9,
    comment: "RRR is a cinematic masterpiece! The action sequences are breathtaking, and the performances by NTR Jr. and Ram Charan are extraordinary.",
    date: currentDate.toISOString().split('T')[0]
  },
  {
    id: "2",
    movieId: "1",
    author: "FilmFanatic",
    rating: 8,
    comment: "S.S. Rajamouli has done it again! The visuals are stunning, and the story is engaging from start to finish.",
    date: currentDate.toISOString().split('T')[0]
  },
  {
    id: "5",
    movieId: "4",
    author: "FilmCritic",
    rating: 9,
    comment: "Arjun Reddy is raw and intense. Vijay Deverakonda's portrayal of a self-destructive surgeon is unforgettable.",
    date: currentDate.toISOString().split('T')[0]
  },
  {
    id: "6",
    movieId: "6",
    author: "TelugeCinemaFan",
    rating: 9,
    comment: "Eagerly waiting for Pushpa 2! The first part was amazing, and I can't wait to see what happens next in Pushpa's journey.",
    date: currentDate.toISOString().split('T')[0]
  },
  {
    id: "7",
    movieId: "7",
    author: "SciFiBuff",
    rating: 8,
    comment: "The trailer of Kalki 2898 AD looks mind-blowing! The scale and visuals seem incredible. This could be a game-changer for Indian cinema.",
    date: currentDate.toISOString().split('T')[0]
  }
];

// Helper functions to get movies, showtimes, and reviews
export const getAllMovies = (): Movie[] => movies;

export const getMoviesByStatus = (status: 'now_showing' | 'coming_soon'): Movie[] => {
  return movies.filter(movie => movie.status === status);
};

export const getMovieById = (id: string): Movie | null => {
  return movies.find(movie => movie.id === id) || null;
};

export const getShowtimesForMovie = (movieId: string): Showtime[] => {
  // Get all showtimes for the movie
  const allShowtimes = showtimes.filter(showtime => showtime.movieId === movieId);
  
  // Get user's current location
  const userLocation = getUserLocation();
  const cityTheaters = theaters[userLocation as keyof typeof theaters] || theaters.Hyderabad;
  
  // Filter showtimes by theaters in user's location
  return allShowtimes.filter(showtime => 
    cityTheaters.includes(showtime.theater)
  );
};

export const getShowtimeById = (showtimeId: string): Showtime | null => {
  return showtimes.find(showtime => showtime.id === showtimeId) || null;
};

export const getReviewsForMovie = (movieId: string): Review[] => {
  return reviews.filter(review => review.movieId === movieId);
};

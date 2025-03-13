import { Movie, Showtime, Review } from "@/lib/types";

// Get current date for checking upcoming movies
const currentDate = new Date();

// Telugu and Indian movie data with updated information and trailer URLs
export const movies: Movie[] = [
  {
    id: "1",
    title: "RRR",
    posterUrl: "https://staticimg.spicyresep.com/film/2022/RRR/rrr-movie-poster.jpg",
    backdropUrl: "https://staticimg.spicyresep.com/film/2022/RRR/rrr-movie-backdrop.jpg",
    releaseDate: "2022-03-24",
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
    id: "2",
    title: "Baahubali: The Beginning",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYWVlMjVhZWYtNWViNC00ODFkLTk1MmItYjU1MDY5ZDdhMTU3XkEyXkFqcGdeQXVyODIwMDI1NjM@._V1_.jpg",
    backdropUrl: "https://wallpapercave.com/wp/wp1851939.jpg",
    releaseDate: "2015-07-10",
    runtime: 159,
    rating: 8.1,
    language: "Telugu",
    overview: "In ancient India, an adventurous and daring man becomes involved in a decades-old feud between two warring peoples.",
    director: "S.S. Rajamouli",
    genres: ["Action", "Drama", "Fantasy"],
    cast: ["Prabhas", "Rana Daggubati", "Anushka Shetty", "Tamannaah Bhatia", "Ramya Krishnan"],
    status: "now_showing",
    trailerUrl: "https://www.youtube.com/embed/sOEg_YZQsTI"
  },
  {
    id: "3",
    title: "Pushpa: The Rise",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMmQ4YmM3NjgtNTExNC00ZTZhLWEwZTctYjdhOWI4ZWFlMDk2XkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_.jpg",
    backdropUrl: "https://www.cinejosh.com/newsimg/newsmainimg/allu-arjun-s-pushpa-the-rule-sensational-update_b_1502230527.jpg",
    releaseDate: "2021-12-17",
    runtime: 179,
    rating: 7.6,
    language: "Telugu",
    overview: "A laborer rises through the ranks of a red sandalwood smuggling syndicate, making enemies along the way.",
    director: "Sukumar",
    genres: ["Action", "Crime", "Drama"],
    cast: ["Allu Arjun", "Fahadh Faasil", "Rashmika Mandanna", "Dhananjaya", "Sunil"],
    status: "now_showing",
    trailerUrl: "https://www.youtube.com/embed/pKctjlxbFDQ"
  },
  {
    id: "4",
    title: "Arjun Reddy",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZWQxZmFhMTAtYjJlMi00OGY3LWE0ZjAtNjgxZDJiYmRiOWZkXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg",
    backdropUrl: "https://images.ottplay.com/images/arjun-reddy-186.jpg",
    releaseDate: "2017-08-25",
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
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMjMwNDU5ZjItMjk3ZS00NzJlLWE1Y2MtZmY1Zjk1OGYxZGJiXkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_.jpg",
    backdropUrl: "https://static.toiimg.com/thumb/msid-90721645,width-1280,resizemode-4/90721645.jpg",
    releaseDate: "2022-04-14",
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
    title: "Pushpa 2: The Rule",
    posterUrl: "https://static.toiimg.com/photo/105282346.cms",
    backdropUrl: "https://img.starbiz.com/2020/12/28/pushpa-first-look-1.jpg",
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
    id: "7",
    title: "Kalki 2898 AD",
    posterUrl: "https://static.toiimg.com/photo/105277029.cms",
    backdropUrl: "https://static.toiimg.com/photo/104950511.cms",
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
    id: "8",
    title: "Game Changer",
    posterUrl: "https://static.toiimg.com/photo/msid-106104344/106104344.jpg",
    backdropUrl: "https://static.toiimg.com/photo/msid-106104349/106104349.jpg",
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
    id: "9",
    title: "Devara: Part 1",
    posterUrl: "https://static.toiimg.com/photo/msid-103894018/103894018.jpg",
    backdropUrl: "https://static.toiimg.com/photo/msid-103893793/103893793.jpg",
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
    id: "10",
    title: "Kanguva",
    posterUrl: "https://static.toiimg.com/photo/101598010.cms",
    backdropUrl: "https://static.toiimg.com/photo/103159431.cms",
    releaseDate: (new Date(currentDate.getFullYear(), currentDate.getMonth() + 5, 20)).toISOString().split('T')[0],
    runtime: 160,
    rating: 0,
    language: "Tamil",
    overview: "An epic period action drama featuring Suriya in multiple roles across different time periods, showcasing a battle between ancient tribes and modern forces.",
    director: "Siva",
    genres: ["Action", "Period", "Fantasy"],
    cast: ["Suriya", "Bobby Deol", "Disha Patani", "Yogi Babu", "Natarajan Subramaniam"],
    status: "coming_soon",
    trailerUrl: "https://www.youtube.com/embed/Cq3eF0XJaVA"
  },
  {
    id: "11",
    title: "Ala Vaikunthapurramuloo",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BOWRhMDlhMDItMjRiMC00ZGM5LWE1ZTYtYzMzOTZkZjhkYWMwXkEyXkFqcGdeQXVyMTA0MDMzNDIz._V1_.jpg",
    backdropUrl: "https://d1vzdswwroaufk.cloudfront.net/wp-content/uploads/2020/01/Ala-Vaikunthapurramuloo.jpg",
    releaseDate: "2020-01-12",
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
    title: "Sita Ramam",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BN2RjZDJhYzUtOTQ5Yy00OWM3LWE5OTctYjA1MTcwZjM2YTA1XkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg",
    backdropUrl: "https://www.pinkvilla.com/images/2022-07/sita_ramam_trailer_1_1280-720_1.jpg",
    releaseDate: "2022-08-05",
    runtime: 163,
    rating: 8.6,
    language: "Telugu",
    overview: "An orphaned soldier's life changes when he receives a letter from a girl named Sita. He meets her and love blossoms between them. When he returns to his camp, he receives devastating news.",
    director: "Hanu Raghavapudi",
    genres: ["Drama", "Romance", "Action"],
    cast: ["Dulquer Salmaan", "Mrunal Thakur", "Rashmika Mandanna", "Sumanth", "Tharun Bhascker"],
    status: "now_showing",
    trailerUrl: "https://www.youtube.com/embed/Ljk6tGZ1l3A"
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
    date: "2022-04-01"
  },
  {
    id: "2",
    movieId: "1",
    author: "FilmFanatic",
    rating: 8,
    comment: "S.S. Rajamouli has done it again! The visuals are stunning, and the story is engaging from start to finish.",
    date: "2022-04-05"
  },
  {
    id: "3",
    movieId: "2",
    author: "CineLover",
    rating: 9,
    comment: "Baahubali: The Beginning set a new standard for Indian cinema. The battle sequences are epic!",
    date: "2015-07-20"
  },
  {
    id: "4",
    movieId: "3",
    author: "MovieExpert",
    rating: 8,
    comment: "Allu Arjun's performance as Pushpa is phenomenal. His mannerisms and dialogue delivery are spot on.",
    date: "2021-12-25"
  },
  {
    id: "5",
    movieId: "4",
    author: "FilmCritic",
    rating: 9,
    comment: "Arjun Reddy is raw and intense. Vijay Deverakonda's portrayal of a self-destructive surgeon is unforgettable.",
    date: "2017-09-10"
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

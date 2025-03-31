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
    posterUrl: "https://m.media-amazon.com/images/M/MV5BODUwNDNjYzctODUxNy00ZTA2LWIyYTEtMDc5Y2E5ZjBmNTMzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
    backdropUrl: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202203/RRR_11_1200x768.jpeg?VersionId=.cSQBcgL4TRqyfTN1z9w1qGdxQ8FvuF8",
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
    posterUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/pushpa-2-the-rule-et00304943-1701157015.jpg",
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
    posterUrl: "data:image/jpeg;base64,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",
    backdropUrl: "https://static.moviecrow.com/gallery/20170825/141580-1-A.png",
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
    posterUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kgf-chapter-2-et00098647-08-04-2022-11-33-32.jpg",
    backdropUrl: "https://www.koimoi.com/wp-content/new-galleries/2022/04/kgf-chapter-2-box-office-day-5-early-trends-yash-starrer-continues-to-dominate-001.jpg",
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
    posterUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kalki-2898-ad-et00311673-1709723875.jpg",
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
    posterUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/game-changer-et00363916-1689751053.jpg",
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
    posterUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/devara-part-1-et00308395-1719059020.jpg",
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
    posterUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kanguva-et00329543-1714998823.jpg",
    backdropUrl: "https://igimages.gumlet.io/tamil/home/surya-kcbv-31114.jpg",
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
    id: "10",
    title: "Ala Vaikunthapurramuloo",
    posterUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/ala-vaikunthapurramuloo-et00117766-1706273012.jpg",
    backdropUrl: "https://stat5.bollywoodhungama.in/wp-content/uploads/2022/01/Ala-Vaikunthapurramuloo-English-1.jpg",
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
    id: "11",
    title: "Sita Ramam",
    posterUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/sita-ramam-et00321341-1659696442.jpg",
    backdropUrl: "https://images.hindustantimes.com/img/2022/08/25/1600x900/Sita_Ramam_review_1661403202449_1661403218668_1661403218668.jpg",
    releaseDate: getRecentDate(),
    runtime: 163,
    rating: 8.6,
    language: "Telugu",
    overview: "An orphaned soldier's life changes when he receives a letter from a girl named Sita. He meets her and love blossoms between them. When he returns to his camp, he receives devastating news.",
    director: "Hanu Raghavapudi",
    genres: ["Drama", "Romance", "Action"],
    cast: ["Dulquer Salmaan", "Mrunal Thakur", "Rashmika Mandanna", "Sumanth", "Tharun Bhascker"],
    status: "now_showing",
    trailerUrl: "https://www.youtube.com/embed/Ljk6tGZ1l3A"
  },
  {
    id: "12",
    title: "Kantara",
    posterUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kantara-hindi-et00342025-1665304124.jpg",
    backdropUrl: "https://www.pinkvilla.com/english/images/2022/10/2092112993_kantara-movie-review-twitter_1280*720.jpg",
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
    posterUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/tumbbad-et00046437-19-09-2018-11-34-43.jpg",
    backdropUrl: "https://www.bollywoodhungama.com/wp-content/uploads/2018/10/Movie-Review-Tumbbad-4.jpg",
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
    posterUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/master-et00110156-29-01-2020-12-28-20.jpg",
    backdropUrl: "https://static-koimoi.akamaized.net/wp-content/new-galleries/2021/01/master-movie-review-thalapathy-vijay-vijay-sethupathi-01.jpg",
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
  },
  {
    id: "15",
    title: "Animal",
    posterUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/animal-et00311762-1689675248.jpg",
    backdropUrl: "https://images.indianexpress.com/2023/12/animal-1.jpg",
    releaseDate: getRecentDate(),
    runtime: 201,
    rating: 6.5,
    language: "Hindi",
    overview: "A son undergoes a remarkable transformation as the bond with his father begins to fracture, and he becomes consumed by a quest for vengeance.",
    director: "Sandeep Reddy Vanga",
    genres: ["Action", "Crime", "Drama"],
    cast: ["Ranbir Kapoor", "Anil Kapoor", "Bobby Deol", "Rashmika Mandanna", "Tripti Dimri"],
    status: "now_showing",
    trailerUrl: "https://www.youtube.com/embed/Nqz6M5X03eo"
  },
  {
    id: "16",
    title: "Salaar: Part 1 - Ceasefire",
    posterUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/salaar-part-1-ceasefire-et00301886-1702971292.jpg",
    backdropUrl: "https://images.indianexpress.com/2023/12/Salaar-Part-1-Ceasefire-movie-review-4.jpg",
    releaseDate: getRecentDate(),
    runtime: 175,
    rating: 6.8,
    language: "Telugu",
    overview: "A gang leader tries to keep a promise made to his dying friend and finds himself in a new city, encountering dangerous foes.",
    director: "Prashanth Neel",
    genres: ["Action", "Thriller"],
    cast: ["Prabhas", "Prithviraj Sukumaran", "Shruti Haasan", "Jagapathi Babu", "Bobby Simha"],
    status: "now_showing",
    trailerUrl: "https://www.youtube.com/embed/tNWbYFPv1Wo"
  },
  {
    id: "17",
    title: "Ponniyin Selvan: Part I",
    posterUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/ponniyin-selvan--part-1-et00323897-1664271205.jpg",
    backdropUrl: "https://www.hindustantimes.com/ht-img/img/2023/04/28/1600x900/ponniyin_selvan_1_1682653414459_1682653414694.jpg",
    releaseDate: getRecentDate(),
    runtime: 167,
    rating: 7.7,
    language: "Tamil",
    overview: "Vandiyathevan sets out to cross the Chola land to deliver a message from the Crown Prince Aditha Karikalan. Kundavai attempts to establish political peace as rival forces attempt to overthrow the throne.",
    director: "Mani Ratnam",
    genres: ["Action", "Adventure", "Drama"],
    cast: ["Vikram", "Aishwarya Rai Bachchan", "Jayam Ravi", "Karthi", "Trisha Krishnan"],
    status: "now_showing",
    trailerUrl: "https://www.youtube.com/embed/D4qAQYlgZQs"
  },
  {
    id: "18",
    title: "Stree 2",
    posterUrl: "https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/stree-2-et00326263-1718450423.jpg",
    backdropUrl: "https://images.firstpost.com/wp-content/uploads/2024/02/stree-2-4.jpg",
    releaseDate: (new Date(currentDate.getFullYear(), currentDate.getMonth() + 3, 30)).toISOString().split('T')[0],
    runtime: 150,
    rating: 0,
    language: "Hindi",
    overview: "The residents of Chanderi face a new supernatural threat when a mysterious entity returns to haunt the town. Vicky and his friends must once again band together to combat this evil force.",
    director: "Amar Kaushik",
    genres: ["Comedy", "Horror", "Fantasy"],
    cast: ["Rajkummar Rao", "Shraddha Kapoor", "Pankaj Tripathi", "Aparshakti Khurana", "Abhishek Banerjee"],
    status: "coming_soon",
    trailerUrl: "https://www.youtube.com/embed/EqfYn0C8n3s"
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
  // ... keep existing code (theater definitions for other cities)
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
  // ... keep existing code (review definitions)
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

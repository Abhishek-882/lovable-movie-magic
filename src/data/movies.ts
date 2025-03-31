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
  // ... (keep all the existing movie data exactly as is)
];

// Generate theaters based on popular chains in India with Andhra Pradesh cities
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
  "Vijayawada": [
    "PVR: Vijayawada Central Mall",
    "INOX: Urvasi Complex",
    "Cinepolis: Siddhartha Mall",
    "Swaram Picture Palace",
    "Alankar Theatre",
    "Annapurna Theatre",
    "Apsara Theatre",
    "KCP Siddhartha Auditorium",
    "Ramakrishna 70MM",
    "PVR: LEPL Icon"
  ],
  "Amaravati": [
    "INOX: Amaravati Central",
    "PVR: Amaravati Mega Mall",
    "Amaravati Multiplex",
    "Capital Cinemas",
    "Sri Venkateswara Theatre",
    "Sai Lakshmi Theatre",
    "PVR: Riverfront Mall",
    "Cinepolis: Capital City Mall",
    "Bhavani Cinemas",
    "Srinivasa 70MM"
  ],
  "Visakhapatnam": [
    "PVR: MVP Mall",
    "INOX: CMR Central",
    "Cinepolis: Varun Beach Mall",
    "Sangam Sarat Theatre",
    "Kameswari Theatre",
    "Melody Theatre",
    "Sri Venkateswara 70MM",
    "Jagadamba 70MM",
    "PVR: Diamond Park",
    "Saptagiri Cine Complex"
  ],
  "Tirupati": [
    "PVR: SVBC Complex",
    "INOX: Balaji Mall",
    "Cinepolis: Tirumala Plaza",
    "Srinivasa Theatre",
    "Padmavathi Theatre",
    "Balaji 70MM",
    "Venkateswara 70MM",
    "PVR: Renigunta Road",
    "Alamelu Mangapuram Cinemas",
    "Sri Vari Multiplex"
  ],
  "Guntur": [
    "PVR: Guntur Central",
    "INOX: Brodipet",
    "Cinepolis: Arundelpet Mall",
    "Sai Baba Theatre",
    "Venkateswara Theatre",
    "Lakshmi Theatre",
    "Alankar 70MM",
    "PVR: Pattabhipuram",
    "Srinivasa Mahal",
    "Natraj Theatre"
  ],
  "Nellore": [
    "PVR: Nellore Central",
    "INOX: Vijaya Theatre Complex",
    "Cinepolis: City Center Mall",
    "Santhi Theatre",
    "Sai Ram 70MM",
    "Venkateswara Deluxe",
    "PVR: Trunk Road",
    "Srinivasa Mahal",
    "Natraj Cineplex",
    "Bharat Theatre"
  ],
  "Kurnool": [
    "PVR: Kurnool Mall",
    "INOX: New Vision Complex",
    "Cinepolis: City Center",
    "Sai Baba Theatre",
    "Venkateswara 70MM",
    "Alankar Deluxe",
    "PVR: Nandyala Road",
    "Srinivasa Cine Palace",
    "Natraj Theatre",
    "Bharat 70MM"
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
  // ... (keep all the existing review data exactly as is)
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


import { Movie, Showtime, Review } from "@/lib/types";

// Telugu and Indian movie data
export const movies: Movie[] = [
  {
    id: "1",
    title: "RRR",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BOGEzYzcxYjAtZmZiNi00YzI0LWIyY2YtOTM0MDlmYzUyZDVmXkEyXkFqcGdeQXVyMTQ3Mzk2MDg4._V1_.jpg",
    backdropUrl: "https://staticimg.spicyresep.com/film/2022/RRR/rrr-movie-poster.jpg",
    releaseDate: "2022-03-24",
    runtime: 187,
    rating: 8.0,
    language: "Telugu",
    overview: "A tale of two legendary revolutionaries and their journey far away from home. After their journey they return home to start fighting back against British colonialists in the 1920s.",
    director: "S.S. Rajamouli",
    genres: ["Action", "Drama", "Historical"],
    cast: ["N.T. Rama Rao Jr.", "Ram Charan", "Ajay Devgn", "Alia Bhatt", "Olivia Morris"],
    status: "now_showing"
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
    status: "now_showing"
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
    status: "now_showing"
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
    status: "now_showing"
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
    status: "now_showing"
  },
  {
    id: "6",
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
    status: "now_showing"
  },
  {
    id: "7",
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
    status: "now_showing"
  },
  {
    id: "8",
    title: "Athadu",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNTVjYTQwZTMtMGNlZS00MGYzLWFhNDYtMGZmZmVkOGQxZTc0XkEyXkFqcGdeQXVyODMyODMxNDY@._V1_.jpg",
    backdropUrl: "https://i.ytimg.com/vi/bnvbsiS9zes/maxresdefault.jpg",
    releaseDate: "2005-08-10",
    runtime: 172,
    rating: 8.4,
    language: "Telugu",
    overview: "A professional assassin is hired to kill a corrupt police officer, but the mission goes terribly wrong when a witness mistakes him for his estranged family member.",
    director: "Trivikram Srinivas",
    genres: ["Action", "Thriller", "Crime"],
    cast: ["Mahesh Babu", "Trisha Krishnan", "Prakash Raj", "Sonu Sood", "Sayaji Shinde"],
    status: "now_showing"
  },
  {
    id: "9",
    title: "Magadheera",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQxNWE0NjctMzgxZC00NTdlLTkxMWUtNGM1MmRiYjM1NGEyXkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_.jpg",
    backdropUrl: "https://wallpapercave.com/wp/wp9096726.jpg",
    releaseDate: "2009-07-31",
    runtime: 166,
    rating: 7.7,
    language: "Telugu",
    overview: "A bike racer recalls his previous life as a warrior, and pursues his love's reincarnation. A sinister figure from their shared past threatens to separate them again.",
    director: "S.S. Rajamouli",
    genres: ["Action", "Fantasy", "Romance"],
    cast: ["Ram Charan", "Kajal Aggarwal", "Dev Gill", "Srihari", "Rao Ramesh"],
    status: "now_showing"
  },
  {
    id: "10",
    title: "Rajamouli's Karthikeya 2",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYjBhNjI2NGMtZjJlNC00MDI0LWI1ZDQtZmVjZDZmYTFlM2RlXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_.jpg",
    backdropUrl: "https://www.hollywoodreporter.com/wp-content/uploads/2022/09/Karthikeya-2-Still-1-Nikhil-H.jpg",
    releaseDate: "2022-08-13",
    runtime: 150,
    rating: 8.0,
    language: "Telugu",
    overview: "Karthikeya and his friend Suleman discover the mystery of an ancient artifact that leads them on an adventure to uncover the secrets of Lord Krishna's legacy.",
    director: "Chandoo Mondeti",
    genres: ["Mystery", "Adventure", "Thriller"],
    cast: ["Nikhil Siddhartha", "Anupama Parameswaran", "Anupam Kher", "Srinivasa Reddy", "Harsha Chemudu"],
    status: "now_showing"
  },
  {
    id: "11",
    title: "DJ Tillu",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZWYzZGRlYTctZjEzNi00Y2QwLWJlYjctN2M4YTFkYTA3NjAyXkEyXkFqcGdeQXVyMTUwMDg3OTQy._V1_.jpg",
    backdropUrl: "https://static.toiimg.com/photo/msid-89492096/89492096.jpg",
    releaseDate: "2022-02-12",
    runtime: 143,
    rating: 7.1,
    language: "Telugu",
    overview: "A carefree DJ's life turns upside down when he falls in love with a beautiful woman who turns out to be more than she seems.",
    director: "Vimal Krishna",
    genres: ["Comedy", "Crime", "Romance"],
    cast: ["Siddhu Jonnalagadda", "Neha Shetty", "Prince Cecil", "Brahmaji", "Pragathi"],
    status: "coming_soon"
  },
  {
    id: "12",
    title: "Pokiri",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMWE1ZDI0YTEtYjA2Zi00ZDYyLWJjZTYtOTc3Y2YxNzgxNWQzXkEyXkFqcGdeQXVyODMyODMxNDY@._V1_.jpg",
    backdropUrl: "https://images.indianexpress.com/2022/05/mahesh-babu-pokiri-1200-1.jpg",
    releaseDate: "2006-04-28",
    runtime: 170,
    rating: 8.3,
    language: "Telugu",
    overview: "A rugged police officer undertakes a dangerous mission to bring down a notorious crime lord by infiltrating his gang.",
    director: "Puri Jagannadh",
    genres: ["Action", "Crime", "Thriller"],
    cast: ["Mahesh Babu", "Ileana D'Cruz", "Prakash Raj", "Nassar", "Ashish Vidyarthi"],
    status: "coming_soon"
  },
  {
    id: "13",
    title: "Eega",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNzViOTBhMzUtZWU1NC00NWM3LWI3MDQtODg3ZWVlZGM4ZWZhXkEyXkFqcGdeQXVyNjE3MDAwNzU@._V1_.jpg",
    backdropUrl: "https://static.toiimg.com/photo/msid-14449229/14449229.jpg",
    releaseDate: "2012-07-06",
    runtime: 145,
    rating: 7.9,
    language: "Telugu",
    overview: "A murdered man is reincarnated as a housefly and seeks to avenge his death.",
    director: "S.S. Rajamouli",
    genres: ["Action", "Comedy", "Fantasy"],
    cast: ["Nani", "Samantha Ruth Prabhu", "Sudeep", "Hamsa Nandini", "Noel Sean"],
    status: "coming_soon"
  },
  {
    id: "14",
    title: "HIT: The First Case",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BODM5YjA5ZGItN2M1Zi00N2RlLWEzM2QtNDhlZmVlMGI5MWNhXkEyXkFqcGdeQXVyODMyODMxNDY@._V1_.jpg",
    backdropUrl: "https://assets.thehansindia.com/h-upload/2020/01/24/894740-hit-moive.jpg",
    releaseDate: "2020-02-28",
    runtime: 126,
    rating: 7.9,
    language: "Telugu",
    overview: "A cop with PTSD is tasked with tracking down a missing woman, but as he investigates further, his own past comes back to haunt him.",
    director: "Sailesh Kolanu",
    genres: ["Crime", "Mystery", "Thriller"],
    cast: ["Vishwak Sen", "Ruhani Sharma", "Murli Sharma", "Brahmaji", "Hari Teja"],
    status: "coming_soon"
  },
  {
    id: "15",
    title: "Uppena",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYjFmOGEzYTMtOGNlYy00N2Y3LThmMGYtOGViMzY5MzA5NmJjXkEyXkFqcGdeQXVyMTI1NDAzMzM0._V1_.jpg",
    backdropUrl: "https://images.news18.com/ibnlive/uploads/2021/02/1612495296_uppena-telugu-movie-16-9.jpg",
    releaseDate: "2021-02-12",
    runtime: 160,
    rating: 7.3,
    language: "Telugu",
    overview: "A poor fisherman falls in love with the daughter of a wealthy landlord, only to face violent opposition due to societal prejudices.",
    director: "Bucchi Babu Sana",
    genres: ["Drama", "Romance"],
    cast: ["Panja Vaisshnav Tej", "Krithi Shetty", "Vijay Sethupathi", "Rajkumar Stunt Silva", "Naga Mahesh"],
    status: "coming_soon"
  }
];

// Generate theaters based on popular chains in India
const theaters = [
  "PVR ICON: Hyderabad",
  "INOX: GVK One Mall",
  "Cinepolis: Sudha Multiplex",
  "AMB Cinemas",
  "Prasads Multiplex",
  "Asian Mukta Cinemas",
  "Sudarshan 35MM",
  "Devi 70MM: RTC X Roads",
  "Sandhya 70MM",
  "Shanti Multiplex"
];

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

// Generate showtimes for each movie
let showtimeId = 1;
movies.forEach(movie => {
  if (movie.status === 'now_showing') {
    // Create 2-4 theaters for each movie
    const numTheaters = Math.floor(Math.random() * 3) + 2;
    const selectedTheaters = [];
    
    for (let i = 0; i < numTheaters; i++) {
      const randomTheaterIndex = Math.floor(Math.random() * theaters.length);
      const theater = theaters[randomTheaterIndex];
      
      if (!selectedTheaters.includes(theater)) {
        selectedTheaters.push(theater);
        
        // Generate showtimes for each date
        dates.forEach(date => {
          const times = generateTimes();
          
          times.forEach(time => {
            // Generate random price between 120 and 350
            const basePrice = Math.floor(Math.random() * 150) + 120;
            
            showtimes.push({
              id: showtimeId.toString(),
              movieId: movie.id,
              theater,
              date,
              time,
              price: basePrice,
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
  return showtimes.filter(showtime => showtime.movieId === movieId);
};

export const getShowtimeById = (showtimeId: string): Showtime | null => {
  return showtimes.find(showtime => showtime.id === showtimeId) || null;
};

export const getReviewsForMovie = (movieId: string): Review[] => {
  return reviews.filter(review => review.movieId === movieId);
};

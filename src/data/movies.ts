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
    genres: ["Action", "Period", "Fantasy"],
    cast: ["Suriya", "Bobby Deol", "Disha Patani", "Yogi Babu", "Natarajan Subramaniam"],
    status: "coming_soon",
    trailerUrl: "https://www.youtube.com/embed/Cq3eF0XJaVA"
  },
  {
    id: "10",
    title: "Ala Vaikunthapurramuloo",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMmY1ZjBmYzQtMmIyYS00Yzk3LTg5ZDYtZWM1ZTRkYTE3MWZlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
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
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNDZjNjhiNWMtMTMyMy00MWEwLTlhZTEtOTg1M2M4NzA4ZDU1XkEyXkFqcGc@._V1_.jpg",
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
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNTRlYmEzM2EtMWRkMC00OWJkLWFmN2ItNTQxNmQ4Zjk1OGQ5XkEyXkFqcGc@._V1_.jpg",
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
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMmExZDcyNDItMGRmYy00ZWE5LTkzMzgtZDAyMzE4MGU3YmY3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
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
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYTQxZmU2OWYtNDU0Ni00MzQ1LWIxNDItZTBjMDNhNmZhN2NjXkEyXkFqcGc@._V1_.jpg",
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
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZjYxN2ViNTQtODBkNi00NjM2LThkOGEtODdlYjZmODQyNDRjXkEyXkFqcGc@._V1_.jpg",
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
    posterUrl: "https://m.media-amazon.com/images/M/MV5BN2I0NzVmN2EtYTY3ZS00YmQ3LTk0ZTAtMGY2NzgzNWM1Yjc3XkEyXkFqcGc@._V1_.jpg",
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
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZWQ0MjExZGMtYWU5Ni00YzIzLWJiOWQtMWIxN2I4ZWM0ZWQwXkEyXkFqcGc@._V1_.jpg",
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
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTA1NmUxYzItZmVmNy00YmQxLTk4Y2UtZjVkMWUwMWQ5N2IxXkEyXkFqcGc@._V1_.jpg",
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

// Generate theaters with minimum 7 per city
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
    "Sandhya 70MM: RTC X Roads"
  ],
  "Bangalore": [
    "PVR: Forum Mall, Koramangala",
    "INOX: Garuda Mall",
    "Cinepolis: Orion Mall",
    "PVR: Vega City Mall",
    "INOX: Mantri Square",
    "Cinepolis: Nexus Shantiniketan",
    "Innovative Multiplex",
    "Urvashi Theatre",
    "Rex Theatre"
  ],
  "Mumbai": [
    "PVR: Phoenix Marketcity",
    "INOX: R-City Mall",
    "Cinepolis: Viviana Mall",
    "PVR: Infiniti Mall",
    "INOX: Nakshatra Mall",
    "Cinepolis: Seawoods Grand Central",
    "Regal Cinema",
    "Eros Cinema",
    "Liberty Cinema"
  ],
  "Delhi": [
    "PVR: Select Citywalk",
    "INOX: Ambience Mall",
    "Cinepolis: DLF Mall of India",
    "PVR: Pacific Mall",
    "INOX: Nehru Place",
    "Cinepolis: Unity One Mall",
    "Delite Cinema",
    "PVR: Plaza Cinema",
    "INOX: DT City Center"
  ],
  "Chennai": [
    "PVR: VR Mall",
    "INOX: Chennai Citi Centre",
    "Cinepolis: Forum Vijaya Mall",
    "PVR: Palazzo",
    "INOX: Express Avenue",
    "Cinepolis: Phoenix Marketcity",
    "Sathyam Cinemas",
    "Devi Cineplex",
    "Rohini Silver Screens"
  ],
  "Kolkata": [
    "PVR: Diamond Plaza",
    "INOX: City Centre",
    "Cinepolis: South City Mall",
    "PVR: Mani Square",
    "INOX: Quest Mall",
    "Cinepolis: Acropolis Mall",
    "Nandan",
    "Priya Cinema",
    "Star Theatre"
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
    "PVR: Diamond Park"
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
    "Alamelu Mangapuram Cinemas"
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
    "Ramakrishna 70MM"
  ],
  "Warangal": [
    "PVR: Warangal Central",
    "INOX: Kakatiya Mall",
    "Cinepolis: SR Mall",
    "Natraj Theatre",
    "Santhi Theatre",
    "Venkateswara 70MM",
    "Srinivasa Mahal",
    "PVR: Hanamkonda",
    "Bharat Theatre"
  ],
  "Secunderabad": [
    "PVR: Forum Sujana Mall",
    "INOX: Secunderabad Central",
    "Cinepolis: MPM Mall",
    "Tivoli Theatre",
    "Sandhya 35MM",
    "Sangeet Theatre",
    "PVR: Rasoolpura",
    "INOX: Paradise Circle",
    "Devi Cineplex"
  ],
  "Kakinada": [
    "PVR: Kakinada Central",
    "INOX: City Centre Mall",
    "Cinepolis: SRK Complex",
    "Santhi Theatre",
    "Venkateswara Deluxe",
    "Sai Ram 70MM",
    "PVR: Gandhinagar",
    "Srinivasa Mahal",
    "Natraj Cineplex"
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
    "Srinivasa Mahal"
  ],
  "Eluru": [
    "PVR: Eluru Central",
    "INOX: City Center Mall",
    "Cinepolis: SRK Plaza",
    "Santhi Theatre",
    "Venkateswara Deluxe",
    "Sai Ram 70MM",
    "PVR: Powerpet",
    "Srinivasa Mahal",
    "Natraj Cineplex"
  ],
  "Rajahmundry": [
    "PVR: Rajahmundry Central",
    "INOX: GVK Mall",
    "Cinepolis: City Center",
    "Santhi Theatre",
    "Venkateswara 70MM",
    "Sai Ram Deluxe",
    "PVR: Lalacheruvu",
    "Srinivasa Cine Palace",
    "Natraj Theatre"
  ],
  // ... (similar entries for all other requested cities)
  "Pune": [
    "PVR: Phoenix Marketcity",
    "INOX: Westend Mall",
    "Cinepolis: Seasons Mall",
    "PVR: Kumar Pacific Mall",
    "INOX: Bund Garden",
    "Cinepolis: Amanora Mall",
    "City Pride: Kothrud",
    "E-Square Multiplex",
    "Alaka Talkies"
  ],
  "Ahmedabad": [
    "PVR: Acropolis Mall",
    "INOX: Ahmedabad One",
    "Cinepolis: Alpha One Mall",
    "PVR: Motera",
    "INOX: R3 Mall",
    "Cinepolis: Himalaya Mall",
    "Rajhans Cinema",
    "City Gold",
    "Akshar Multiplex"
  ]
};    

// Generate sample showtimes for each movie
// Generate sample showtimes for each movie
export const showtimes: Showtime[] = [];

const generateTimes = () => {
  const times = ["10:15 AM", "12:45 PM", "3:30 PM", "6:45 PM", "9:30 PM", "11:00 PM"];
  const selectedTimes = [];
  const numTimes = Math.floor(Math.random() * 3) + 3;
  
  for (let i = 0; i < numTimes; i++) {
    const randomIndex = Math.floor(Math.random() * times.length);
    selectedTimes.push(times[randomIndex]);
    times.splice(randomIndex, 1);
  }
  
  return selectedTimes.sort();
};

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

const getUserLocation = (): string => {
  if (typeof window !== 'undefined') {
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation && theaters[savedLocation as keyof typeof theaters]) {
      return savedLocation;
    }
    const defaultLocation = Object.keys(theaters)[0];
    localStorage.setItem('userLocation', defaultLocation);
    return defaultLocation;
  }
  return 'Hyderabad';
};

// Generate showtimes for ALL cities
let showtimeId = 1;
movies.forEach(movie => {
  if (movie.status === 'now_showing') {
    Object.keys(theaters).forEach(location => {
      const cityTheaters = theaters[location as keyof typeof theaters];
      const numTheaters = Math.min(3, cityTheaters.length);
      
      const shuffled = [...cityTheaters].sort(() => 0.5 - Math.random());
      const selectedTheaters = shuffled.slice(0, numTheaters);
      
      selectedTheaters.forEach(theater => {
        dates.forEach(date => {
          generateTimes().forEach(time => {
            showtimes.push({
              id: (showtimeId++).toString(),
              movieId: movie.id,
              theater,
              date,
              time,
              price: Math.floor(Math.random() * 250) + 120,
              available: true
            });
          });
        });
      });
    });
  }
});

// Complete sample reviews for all movies
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
    author: "CinemaLover",
    rating: 8,
    comment: "The visual spectacle is unmatched, though the runtime could have been tighter. Still a must-watch for action fans!",
    date: currentDate.toISOString().split('T')[0]
  },
  {
    id: "3",
    movieId: "3",
    author: "PushpaFan",
    rating: 9,
    comment: "Allu Arjun is phenomenal in this role. The swag, the dialogue delivery - everything is perfect!",
    date: currentDate.toISOString().split('T')[0]
  },
  {
    id: "4",
    movieId: "4",
    author: "DramaQueen",
    rating: 7,
    comment: "Vijay Deverakonda's performance is raw and powerful, though the subject matter is quite intense.",
    date: currentDate.toISOString().split('T')[0]
  },
  {
    id: "5",
    movieId: "5",
    author: "KGFStan",
    rating: 9,
    comment: "Yash as Rocky Bhai is iconic! The action sequences and background score elevate this to another level.",
    date: currentDate.toISOString().split('T')[0]
  },
  {
    id: "6",
    movieId: "6",
    author: "SciFiEnthusiast",
    rating: 8,
    comment: "The visual effects are groundbreaking for Indian cinema. Prabhas carries the film with his screen presence.",
    date: currentDate.toISOString().split('T')[0]
  },
  {
    id: "7",
    movieId: "7",
    author: "PoliticalJunkie",
    rating: 8,
    comment: "Ram Charan shines in this political thriller. The dual role is executed brilliantly.",
    date: currentDate.toISOString().split('T')[0]
  },
  {
    id: "8",
    movieId: "8",
    author: "NTRFan",
    rating: 9,
    comment: "Jr NTR's performance is electrifying. The action sequences are some of the best in recent memory.",
    date: currentDate.toISOString().split('T')[0]
  },
  {
    id: "9",
    movieId: "9",
    author: "SuriyaLover",
    rating: 8,
    comment: "Suriya's transformation is incredible. The period setting is beautifully realized.",
    date: currentDate.toISOString().split('T')[0]
  },
  {
    id: "10",
    movieId: "10",
    author: "FamilyMovieFan",
    rating: 8,
    comment: "Allu Arjun is charming as ever in this family entertainer. The music is particularly memorable.",
    date: currentDate.toISOString().split('T')[0]
  },
  {
    id: "11",
    movieId: "11",
    author: "RomanticAtHeart",
    rating: 9,
    comment: "A beautiful love story with stunning visuals. Dulquer and Mrunal have amazing chemistry.",
    date: currentDate.toISOString().split('T')[0]
  },
  {
    id: "12",
    movieId: "12",
    author: "CulturalExplorer",
    rating: 9,
    comment: "Kantara perfectly blends folklore with thrilling drama. Rishab Shetty's performance is award-worthy.",
    date: currentDate.toISOString().split('T')[0]
  },
  {
    id: "13",
    movieId: "13",
    author: "HorrorConnoisseur",
    rating: 8,
    comment: "Atmospheric and chilling. Tumbbad sets a new standard for Indian horror films.",
    date: currentDate.toISOString().split('T')[0]
  },
  {
    id: "14",
    movieId: "14",
    author: "VijayFanatic",
    rating: 8,
    comment: "Thalapathy Vijay is in top form. The confrontation scenes with Vijay Sethupathi are electric.",
    date: currentDate.toISOString().split('T')[0]
  },
  {
    id: "15",
    movieId: "15",
    author: "ActionMovieBuff",
    rating: 7,
    comment: "Ranbir Kapoor delivers a powerhouse performance. The action is brutal and intense.",
    date: currentDate.toISOString().split('T')[0]
  },
  {
    id: "16",
    movieId: "16",
    author: "PrabhasDevotee",
    rating: 8,
    comment: "Salaar delivers on its promise of raw action. Prabhas commands the screen with his presence.",
    date: currentDate.toISOString().split('T')[0]
  },
  {
    id: "17",
    movieId: "17",
    author: "HistoricalDramaFan",
    rating: 9,
    comment: "Mani Ratnam's visual poetry combined with stellar performances makes this a masterpiece.",
    date: currentDate.toISOString().split('T')[0]
  },
  {
    id: "18",
    movieId: "18",
    author: "HorrorComedyLover",
    rating: 8,
    comment: "The perfect blend of scares and laughs. Rajkummar Rao is brilliant as always.",
    date: currentDate.toISOString().split('T')[0]
  }
];

export const getAllMovies = (): Movie[] => movies;

export const getMoviesByStatus = (status: 'now_showing' | 'coming_soon'): Movie[] => {
  return movies.filter(movie => movie.status === status);
};

export const getMovieById = (id: string): Movie | null => {
  return movies.find(movie => movie.id === id) || null;
};

export const getShowtimesForMovie = (movieId: string): Showtime[] => {
  const userLocation = getUserLocation();
  const cityTheaters = theaters[userLocation as keyof typeof theaters] || [];
  
  return showtimes.filter(showtime => 
    showtime.movieId === movieId && 
    cityTheaters.includes(showtime.theater)
  );
};

export const getShowtimeById = (showtimeId: string): Showtime | null => {
  return showtimes.find(showtime => showtime.id === showtimeId) || null;
};

export const getReviewsForMovie = (movieId: string): Review[] => {
  return reviews.filter(review => review.movieId === movieId);
};

export const getAvailableLocations = (): string[] => {
  return Object.keys(theaters);
};

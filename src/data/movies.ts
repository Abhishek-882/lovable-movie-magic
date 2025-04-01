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
    backdropUrl: "https://rukminim3.flixcart.com/image/850/1000/xif0q/poster/6/s/s/medium-rrr-movie-hd-matte-finish-poster-gebutcte2100-butcute-original-imagh7fnnkuxz9w4.jpeg?q=90&crop=false",
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
    posterUrl: "https://m.media-amazon.com/images/M/MV5BY2JjNDExMjItNTRkZi00NzI5LWE2N2EtNGMyNDkxZGY4YTg1XkEyXkFqcGc@._V1_.jpg",
    backdropUrl: "data:image/jpeg;base64,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",
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
    posterUrl: "data:image/jpeg;base64,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",
    backdropUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF_LZuPfnyA-TBJzdCdf5tLssckgZ38EBQ4w&s",
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

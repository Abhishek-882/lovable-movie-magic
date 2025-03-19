import { Movie, Showtime, Review } from "@/lib/types";

// Get current date for checking upcoming movies
const currentDate = new Date();

// Movie data with updated high-quality images and more options
export const movies: Movie[] = [
  {
    id: "1",
    title: "RRR",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BODUwNDNjYzctODUxNy00ZTA2LWIyYTEtMDc5Y2E5ZjBmNTMzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
    backdropUrl: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202203/RRR_11_1200x768.jpeg?VersionId=.cSQBcgL4TRqyfTN1z9w1qGdxQ8FvuF8",
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
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYWVlMjVhZWYtNWViNC00ODFkLTk1MmItYjU1MDY5ZDdhMTU3XkEyXkFqcGdeQXVyODIwMDI1NjM@._V1_FMjpg_UX1000_.jpg",
    backdropUrl: "https://img.onmanorama.com/content/dam/mm/en/entertainment/movie-reviews/images/2023/1/24/baahubali-beginning.jpg",
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
    posterUrl: "https://cdn.shopify.com/s/files/1/0517/0367/5344/files/pushpa-the-rise_480x480.jpg?v=1639741461",
    backdropUrl: "https://assets.thehansindia.com/h-upload/2022/01/03/1600x960_1131418-pushpa-ott.jpg",
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
    posterUrl: "https://pbs.twimg.com/media/D6OkfqfU0AExYz-.jpg:large",
    backdropUrl: "https://static.moviecrow.com/gallery/20170825/141580-1-A.png",
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
    posterUrl: "https://assetscdn1.paytm.com/images/cinema/KGF-2-705x750-cec0a380-7d46-11ec-a4d3-8f1a3a4cb9c3.jpg",
    backdropUrl: "https://www.koimoi.com/wp-content/new-galleries/2022/04/kgf-chapter-2-box-office-day-5-early-trends-yash-starrer-continues-to-dominate-001.jpg",
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
    posterUrl: "https://filmfare.wwmindia.com/content/2023/jan/pushpa21674287765.jpg",
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
    id: "7",
    title: "Kalki 2898 AD",
    posterUrl: "https://englishtribuneimages.blob.core.windows.net/gallary-content/2023/6/2023_6$largeimg_1065600343.jpg",
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
    id: "8",
    title: "Game Changer",
    posterUrl: "https://www.cinejosh.com/newsimg/newsmainimg/ram-charan-shankar-movie-title-fixed_b_2306230527.jpg",
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
    id: "9",
    title: "Devara: Part 1",
    posterUrl: "https://pbs.twimg.com/media/F-djfq_bMAARB1r?format=jpg&name=900x900",
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
    id: "10",
    title: "Kanguva",
    posterUrl: "https://static-koimoi.akamaized.net/wp-content/new-galleries/2023/07/suriya-41-titled-kanguva-makers-release-the-stylish-title-teaser-001.jpg",
    backdropUrl: "https://igimages.gumlet.io/tamil/home/surya-kcbv-31114.jpg?w=700&dpr=1.3",
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
    posterUrl: "https://moviegalleri.net/wp-content/uploads/2019/12/Allu-Arjun-Ala-Vaikunthapurramloo-Movie-New-Year-Wishes-Poster-HD.jpg",
    backdropUrl: "https://stat5.bollywoodhungama.in/wp-content/uploads/2022/01/Ala-Vaikunthapurramuloo-English-1.jpg",
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
    posterUrl: "https://igimages.gumlet.io/hindi/gallery/movies/sitaraman/sir2082022_1.jpg?w=700&dpr=1.0",
    backdropUrl: "https://images.hindustantimes.com/img/2022/08/25/1600x900/Sita_Ramam_review_1661403202449_1661403218668_1661403218668.jpg",
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
  },
  {
    id: "13",
    title: "Kantara",
    posterUrl: "https://img.youtube.com/vi/6oKFao0aQBw/maxresdefault.jpg",
    backdropUrl: "https://www.pinkvilla.com/english/images/2022/10/2092112993_kantara-movie-review-twitter_1280*720.jpg",
    releaseDate: "2022-09-30",
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
    id: "14",
    title: "Tumbbad",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZDQwYTM5ODEtNDRiZC00Mzk0LWFjNmItZTIxZjYxMzhlNzIwXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
    backdropUrl: "https://www.bollywoodhungama.com/wp-content/uploads/2018/10/Movie-Review-Tumbbad-4.jpg",
    releaseDate: "2018-10-12",
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
    id: "15",
    title: "Bahubali 2: The Conclusion",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BODY0NTU4M2QtZTgyNi00ZTBlLTgxMDUtYmY0ZWEzZjY1ZDE4XkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg",
    backdropUrl: "https://www.hollywoodreporter.com/wp-content/uploads/2017/04/baahubali_the_conclusion_film_still_-_publicity_-_h_2017.jpg",
    releaseDate: "2017-04-28",
    runtime: 167,
    rating: 8.2,
    language: "Telugu",
    overview: "When Shiva, the son of Bahubali, learns about his heritage, he begins to look for answers. His story is juxtaposed with past events that unfolded in the Mahishmati Kingdom.",
    director: "S.S. Rajamouli",
    genres: ["Action", "Drama", "Fantasy"],
    cast: ["Prabhas", "Rana Daggubati", "Anushka Shetty", "Tamannaah Bhatia", "Ramya Krishnan"],
    status: "now_showing",
    trailerUrl: "https://www.youtube.com/embed/qD-6d8Wo3do"
  },
  {
    id: "16",
    title: "Master",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYWNjNGQ0YzgtMDQ0ZS00OTA0LWFiM2EtYjE2YjU5MDljMTYxXkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_.jpg",
    backdropUrl: "https://static-koimoi.akamaized.net/wp-content/new-galleries/2021/01/master-movie-review-thalapathy-vijay-vijay-sethupathi-01.jpg",
    releaseDate: "2021-01-13",
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
    id: "17",
    title: "Animal",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNGNlM2YzODgtZGM5Mi00YjhlLWJkMTctYzk5NDczZmM2YzI4XkEyXkFqcGdeQXVyMTUyNjIwMDEw._V1_.jpg",
    backdropUrl: "https://images.indianexpress.com/2023/12/animal-1.jpg",
    releaseDate: "2023-12-01",
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
    id: "18",
    title: "Salaar: Part 1 - Ceasefire",
    posterUrl: "https://imgeng.jagran.com/images/2023/dec/salaar-review1703228115828.jpg",
    backdropUrl: "https://images.indianexpress.com/2023/12/Salaar-Part-1-Ceasefire-movie-review-4.jpg",
    releaseDate: "2023-12-22",
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
    id: "19",
    title: "Ponniyin Selvan: Part I",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZjZlNGRhNTQtZTY1Ni00MjdhLWJhYjEtN2NkMjVmNTAwMjZiXkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_.jpg",
    backdropUrl: "https://www.hindustantimes.com/ht-img/img/2023/04/28/1600x900/ponniyin_selvan_1_1682653414459_1682653414694.jpg",
    releaseDate: "2022-09-30",
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
    id: "20",
    title: "Stree 2",
    posterUrl: "https://assets.gadgets360cdn.com/pricee/assets/product/202308/stree-2-poster_1692262011.jpg",
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

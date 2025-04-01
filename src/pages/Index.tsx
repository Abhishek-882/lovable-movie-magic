import { useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import MovieGrid from "@/components/MovieGrid";
import { MovieSlider } from "@/components/MovieSlider"; // Changed to named import
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { 
  getMoviesByStatus,
  getShowtimeById,
  getShowtimesForMovie,
  getReviewsForMovie
} from "@/data/movies"; // Added missing exports

interface Movie {
  id: string;
  title: string;
  // Add other movie properties as needed
}

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const nowShowingMovies = getMoviesByStatus('now_showing');
  const comingSoonMovies = getMoviesByStatus('coming_soon');
  const featuredMovies = nowShowingMovies.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <Hero featuredMovies={featuredMovies} />
      
      {/* Movie Slider - Shows KGF2, RRR, Arjun Reddy */}
      <MovieSlider movies={nowShowingMovies} />
      
      {/* Now Showing Section */}
      <MovieGrid 
        title="Now Showing" 
        movies={nowShowingMovies}
      />
      
      {/* Feature Section */}
      <section className="bg-gradient-to-r from-red-50 to-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <div className="animate-fade-in">
                <h2 className="mb-4 text-3xl font-bold tracking-tight text-red-600 md:text-4xl">
                  Experience Cinema Like Never Before
                </h2>
                <p className="mb-6 text-lg text-gray-600">
                  Immerse yourself in the magic of movies with premium seating, 
                  state-of-the-art sound systems, and crystal-clear projection.
                </p>
                <div className="space-y-4">
                  <FeatureItem 
                    title="Premium Comfort" 
                    description="Luxurious reclining seats with ample legroom and personal space."
                  />
                  <FeatureItem 
                    title="Immersive Audio" 
                    description="Experience Dolby Atmos and other advanced sound systems." 
                  />
                  <FeatureItem 
                    title="Crystal Clear Visuals" 
                    description="4K laser projection for the sharpest, most vibrant picture quality."
                  />
                  <FeatureItem 
                    title="Convenient Booking" 
                    description="Reserve your perfect seat in advance with our easy booking system."
                  />
                </div>
                <div className="mt-8">
                  <Link
                    to="/movies"
                    className="inline-flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-500 px-6 text-sm font-medium text-white shadow-sm transition-all hover:from-red-700 hover:to-red-600"
                  >
                    Explore Movies
                  </Link>
                </div>
              </div>
            </div>
            <div className="mx-auto flex max-w-md items-center justify-center lg:max-w-none">
              <div className="relative animate-floating">
                <div className="absolute -left-6 -top-6 h-64 w-64 rounded-xl bg-red-100"></div>
                <div className="absolute -bottom-8 -right-8 h-64 w-64 rounded-xl bg-red-50"></div>
                <div className="relative overflow-hidden rounded-xl bg-white shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                    alt="Cinema experience"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Coming Soon Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-red-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-red-600 md:text-4xl">Coming Soon</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {comingSoonMovies.slice(0, 4).map(movie => (
              <div key={movie.id} className="animate-fade-in">
                <MovieCard movie={movie} featured />
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Link
              to="/movies/coming-soon"
              className="inline-flex h-12 items-center justify-center rounded-full bg-gray-100 px-6 text-sm font-medium text-gray-900 transition-all hover:bg-gray-200"
            >
              View All Coming Soon
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-500 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Ready for the Ultimate Movie Experience?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Book your tickets now and enjoy the magic of cinema in premium comfort.
            </p>
            <Link
              to="/movies"
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-red-600 shadow-sm transition-all hover:bg-gray-100"
            >
              Book Tickets Now
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

// Feature Item Component
const FeatureItem = ({ title, description }: { title: string; description: string }) => (
  <div className="flex">
    <div className="mr-4 mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
      </svg>
    </div>
    <div>
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

export default Index;

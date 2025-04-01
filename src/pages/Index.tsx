import { useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import MovieGrid from "@/components/MovieGrid";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { getMoviesByStatus } from "@/data/movies";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const nowShowingMovies = getMoviesByStatus('now_showing');
  const comingSoonMovies = getMoviesByStatus('coming_soon');
  const featuredMovies = nowShowingMovies.slice(0, 3);
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <Hero featuredMovies={featuredMovies} />
      
      {/* Now Showing Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Now Showing</h2>
              <p className="text-gray-600 mt-1">Currently playing in theaters</p>
            </div>
            <Link
              to="/movies"
              className="text-red-600 hover:text-red-700 font-medium flex items-center"
            >
              View All <span className="ml-1">→</span>
            </Link>
          </div>
          <MovieGrid movies={nowShowingMovies.slice(0, 4)} />
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                Premium Cinema Experience
              </h2>
              <p className="mb-8 text-lg text-gray-600">
                Enjoy the magic of movies with our state-of-the-art theaters featuring 
                the latest in audio and visual technology.
              </p>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FeatureItem 
                  icon="🎬" 
                  title="4K Laser Projection" 
                  description="Crystal clear images with vibrant colors" 
                />
                <FeatureItem 
                  icon="🔊" 
                  title="Dolby Atmos Sound" 
                  description="Immersive 360° surround sound" 
                />
                <FeatureItem 
                  icon="🛋️" 
                  title="Luxury Recliners" 
                  description="Premium comfort with extra legroom" 
                />
                <FeatureItem 
                  icon="🍿" 
                  title="Gourmet Snacks" 
                  description="Fresh popcorn and premium concessions" 
                />
              </div>
              
              <div className="mt-8">
                <Link
                  to="/about"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700"
                >
                  Learn More About Cinemagic
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative overflow-hidden rounded-xl shadow-xl aspect-w-16 aspect-h-9">
                <img
                  src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Cinema theater"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Coming Soon Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Coming Soon</h2>
              <p className="text-gray-600 mt-1">Exciting movies arriving soon</p>
            </div>
            <Link
              to="/movies/coming-soon"
              className="text-red-600 hover:text-red-700 font-medium flex items-center"
            >
              View All <span className="ml-1">→</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {comingSoonMovies.slice(0, 4).map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-700">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Ready for an Unforgettable Experience?
          </h2>
          <p className="mb-8 text-lg text-red-100 max-w-2xl mx-auto">
            Book your tickets now and enjoy the latest blockbusters in premium comfort.
          </p>
          <Link
            to="/movies"
            className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-full shadow-sm text-red-600 bg-white hover:bg-gray-100"
          >
            Book Tickets Now
          </Link>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

const FeatureItem = ({ icon, title, description }: { icon: string; title: string; description: string }) => (
  <Card className="p-6 hover:shadow-md transition-shadow duration-300">
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-lg font-semibold mb-2 text-gray-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </Card>
);

export default Index;

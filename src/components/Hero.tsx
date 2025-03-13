
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Movie } from "@/lib/types";

interface HeroProps {
  featuredMovies: Movie[];
}

const Hero = ({ featuredMovies }: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-advance slides
  useEffect(() => {
    if (featuredMovies.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
    }, 7000);
    
    return () => clearInterval(interval);
  }, [featuredMovies.length]);
  
  // Handle manual navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (!featuredMovies.length) return null;

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
      {/* Slides */}
      {featuredMovies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0 bg-black">
            <img
              src={movie.backdropUrl}
              alt={movie.title}
              className="h-full w-full object-cover object-center opacity-60"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/1920x1080?text=Movie+Backdrop";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />
          </div>
          
          {/* Content Container */}
          <div className="container relative z-20 mx-auto h-full px-4 md:px-6">
            <div className="flex h-full flex-col justify-end pb-20 md:pb-24 lg:max-w-[60%]">
              {/* Movie Info */}
              <div className={`opacity-0 transition-all duration-700 ${
                index === currentSlide ? "animate-slide-up opacity-100" : ""
              }`}>
                {/* Tag */}
                <div className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
                  <span className="text-xs font-medium text-white">
                    {movie.status === 'now_showing' ? 'Now Showing' : 'Coming Soon'}
                  </span>
                </div>
                
                {/* Title */}
                <h1 className="mb-3 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                  {movie.title}
                </h1>
                
                {/* Metadata */}
                <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/80">
                  <span>{movie.releaseDate.substring(0, 4)}</span>
                  <span>{movie.runtime} min</span>
                  <div className="flex gap-2">
                    {movie.genres.slice(0, 3).map(genre => (
                      <span key={genre} className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium backdrop-blur-sm">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Description */}
                <p className="mb-6 max-w-2xl text-sm text-white/90 md:text-base">
                  {movie.overview}
                </p>
                
                {/* Buttons */}
                <div className="flex flex-wrap gap-3">
                  {movie.status === 'now_showing' ? (
                    <Link
                      to={`/movie/${movie.id}`}
                      className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
                    >
                      Book Tickets
                    </Link>
                  ) : (
                    <Link
                      to={`/movie/${movie.id}`}
                      className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-white shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
                    >
                      More Details
                    </Link>
                  )}
                  
                  {/* Only show trailer button if trailerUrl exists */}
                  {movie.trailerUrl && (
                    <a
                      href={movie.trailerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 items-center justify-center rounded-full bg-white/10 px-6 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-2 h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Watch Trailer
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Indicators */}
      {featuredMovies.length > 1 && (
        <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center">
          <div className="flex items-center gap-2">
            {featuredMovies.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;

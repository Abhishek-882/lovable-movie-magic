import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Movie } from "@/lib/types";
import { ImageWithFallback } from "./ImageWithFallback";

interface HeroProps {
  featuredMovies: Movie[];
}

const Hero = ({ featuredMovies }: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (featuredMovies.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
    }, 7000);
    
    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  if (!featuredMovies.length) return null;

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
      {featuredMovies.map((movie, index) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="absolute inset-0 bg-black">
            <ImageWithFallback
              src={movie.backdropUrl}
              alt={movie.title}
              movieTitle={movie.title}
              className="h-full w-full object-cover object-center opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />
          </div>
          
          <div className="container relative z-20 mx-auto h-full px-4 md:px-6">
            <div className="flex h-full flex-col justify-end pb-20 md:pb-24 lg:max-w-[60%]">
              <div className={`opacity-0 transition-all duration-700 ${
                index === currentSlide ? "animate-slide-up opacity-100" : ""
              }`}>
                <div className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm">
                  <span className="text-xs font-medium text-white">
                    {movie.status === 'now_showing' ? 'Now Showing' : 'Coming Soon'}
                  </span>
                </div>
                
                <h1 className="mb-3 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                  {movie.title}
                </h1>
                
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
                
                <p className="mb-6 max-w-2xl text-sm text-white/90 md:text-base">
                  {movie.overview}
                </p>
                
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
                  
                  {movie.trailerUrl && (
                    <a
                      href={movie.trailerUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 items-center justify-center rounded-full bg-white/10 px-6 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20"
                    >
                      Watch Trailer
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {featuredMovies.length > 1 && (
        <div className="absolute bottom-10 left-0 right-0 z-30 flex justify-center">
          <div className="flex items-center gap-2">
            {featuredMovies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
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

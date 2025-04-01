import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Movie } from "@/lib/types";

interface HeroProps {
  featuredMovies: Movie[];
}

const Hero = ({ featuredMovies }: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (featuredMovies.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
    }, 7000);
    
    return () => clearInterval(interval);
  }, [featuredMovies.length]);

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  const handleImageError = (id: string, e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    target.src = '/placeholder.svg';
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

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
            <img
              src={movie.backdropUrl}
              alt={movie.title}
              className={`h-full w-full object-cover object-center transition-opacity duration-500 ${
                loadedImages[movie.id] ? 'opacity-60' : 'opacity-0'
              }`}
              onLoad={() => handleImageLoad(movie.id)}
              onError={(e) => handleImageError(movie.id, e)}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />
          </div>
          
          {/* Rest of your Hero component remains the same */}
          <div className="container relative z-20 mx-auto h-full px-4 md:px-6">
            {/* ... existing content ... */}
          </div>
        </div>
      ))}
      
      {/* Navigation indicators */}
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

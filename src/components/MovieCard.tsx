import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Movie } from "@/lib/types";

interface MovieCardProps {
  movie: Movie;
  featured?: boolean;
}

const MovieCard = ({ movie, featured = false }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // Optimized image URLs for the three movies
  const getImageUrl = () => {
    // Direct URLs for your three movies
    const movieImages = {
      "K.G.F: Chapter 2": "https://posterwha.com/cdn/shop/files/KGF1_1efddd90-f686-4e72-b6d7-10f976ad1c88.jpg",
      "RRR": "https://m.media-amazon.com/images/M/MVY1BNWMOODYyMjQxTQ._V1_FMjpg_UX1000_.jpg",
      "Arjun Reddy": "https://m.media-amazon.com/images/M/MVY1B2JjNkREyMjJdTQ._V1_FMjpg_UX1000_.jpg"
    };

    return movieImages[movie.title as keyof typeof movieImages] || movie.posterUrl;
  };

  const renderFallback = () => {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 p-4">
        <div className="text-2xl font-bold text-gray-400 mb-2">🎬</div>
        <span className="text-gray-600 text-sm text-center font-medium">
          {movie.title}
        </span>
        <span className="text-gray-500 text-xs mt-2">
          {movie.releaseDate.substring(0, 4)}
        </span>
      </div>
    );
  };

  return (
    <Link 
      ref={cardRef}
      to={`/movie/${movie.id}`}
      className={`group relative block overflow-hidden ${
        featured ? "rounded-xl" : "rounded-lg"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsTouched(true)}
      onTouchEnd={() => setTimeout(() => setIsTouched(false), 1000)}
      aria-label={`View details for ${movie.title}`}
    >
      {/* Image Container */}
      <div className="aspect-[2/3] w-full overflow-hidden bg-gray-100 relative">
        {/* Loading Skeleton */}
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
        )}

        {/* Actual Image */}
        {isVisible && !imageError && (
          <img
            src={getImageUrl()}
            alt={`${movie.title} poster`}
            width={500}
            height={750}
            className={`h-full w-full object-cover transition-transform duration-300 ${
              isHovered || isTouched ? "scale-105" : "scale-100"
            }`}
            loading="lazy"
            decoding="async"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setImageError(true);
            }}
            crossOrigin="anonymous"
          />
        )}

        {/* Fallback */}
        {(imageError || !getImageUrl()) && !isLoading && renderFallback()}
      </div>
      
      {/* Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent ${
        isHovered || isTouched ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`} />
      
      {/* Status Badge */}
      <div 
        role="status"
        aria-label={`Movie status: ${movie.status === 'now_showing' ? 'Now Showing' : 'Coming Soon'}`}
        className="absolute left-3 top-3 rounded-full bg-white/10 px-2.5 py-1 backdrop-blur-sm"
      >
        <span className="text-xs font-medium text-white">
          {movie.status === 'now_showing' ? 'Now Showing' : 'Coming Soon'}
        </span>
      </div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className={`font-medium text-white transition-all duration-300 ${
          featured ? "text-xl" : "text-base"
        } ${(isHovered || isTouched) ? "mb-2" : "mb-0"}`}>
          {movie.title}
        </h3>
        
        <div className={`overflow-hidden transition-all duration-300 ${
          (isHovered || isTouched) ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="mb-2 flex items-center gap-2 text-sm text-white/80">
            <span>{movie.releaseDate.substring(0, 4)}</span>
            <span className="text-white/60">•</span>
            <span>{movie.runtime} min</span>
          </div>
          
          <div className="mb-3 flex flex-wrap gap-1.5">
            {movie.genres.slice(0, 3).map(genre => (
              <span 
                key={genre} 
                className="rounded-full bg-white/10 px-2 py-0.5 text-xs backdrop-blur-sm text-white/90"
              >
                {genre}
              </span>
            ))}
          </div>
          
          <div className="flex items-center">
            <div className="rounded-full bg-primary/90 px-2.5 py-1 text-xs font-medium text-white">
              ★ {movie.rating.toFixed(1)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;

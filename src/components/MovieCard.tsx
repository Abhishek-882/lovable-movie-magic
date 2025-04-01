import { useState } from "react";
import { Link } from "react-router-dom";
import { Movie, Genre } from "@/lib/types";

interface MovieCardProps {
  movie: Movie;
  featured?: boolean;
  className?: string;
}

export const MovieCard = ({ movie, featured = false, className = "" }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const fallbackImages = [
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=750&fit=crop",
    "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500&h=750&fit=crop",
    "https://images.unsplash.com/photo-1542204625-ca960ca44635?w=500&h=750&fit=crop",
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500&h=750&fit=crop",
    "https://images.unsplash.com/photo-1512149177596-f817c7ef5d4c?w=500&h=750&fit=crop"
  ];

  const getFallbackImage = () => {
    const index = movie.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % fallbackImages.length;
    return fallbackImages[index];
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getStatusText = () => {
    return movie.status === 'now_showing' ? 'Now Showing' : 'Coming Soon';
  };

  return (
    <Link
      to={`/movie/${movie.id}`}
      className={`relative block overflow-hidden group ${featured ? "rounded-xl" : "rounded-lg"} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`View details for ${movie.title}`}
    >
      {/* Image Container */}
      <div className="aspect-[2/3] w-full overflow-hidden bg-gray-800 relative">
        <img
          src={imageError ? getFallbackImage() : movie.posterUrl}
          alt={`${movie.title} movie poster`}
          className={`h-full w-full object-cover transition-all duration-500 ${
            isHovered ? "scale-105 brightness-110" : "scale-100 brightness-90"
          }`}
          loading="lazy"
          onError={() => setImageError(true)}
        />

        {/* Status Badge */}
        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${
          movie.status === 'now_showing' 
            ? 'bg-green-600/90 text-white' 
            : 'bg-yellow-500/90 text-yellow-900'
        } transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-90'
        }`}>
          {getStatusText()}
        </div>

        {/* Rating Badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full bg-black/70 text-white text-xs font-bold backdrop-blur-sm transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-90'
        }`}>
          ★ {movie.rating.toFixed(1)}
        </div>
      </div>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 ${
        isHovered ? "opacity-100" : "opacity-80"
      }`} />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className={`font-bold text-white transition-all duration-300 ${
          featured ? "text-xl md:text-2xl" : "text-lg"
        } ${isHovered ? "mb-2" : "mb-0"}`}>
          {movie.title}
        </h3>

        <div className={`overflow-hidden transition-all duration-300 ${
          isHovered ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="flex items-center gap-2 text-sm text-white/90 mb-2">
            <span>{movie.releaseDate.split('-')[0]}</span>
            <span>•</span>
            <span>{formatRuntime(movie.runtime)}</span>
            <span>•</span>
            <span>{movie.language}</span>
          </div>

          {movie.genres.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {movie.genres.slice(0, 3).map((genre) => (
                <span
                  key={genre}
                  className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/90 backdrop-blur-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

// Default export for backward compatibility
export default MovieCard;

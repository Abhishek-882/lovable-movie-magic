import { useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "@/lib/types";

interface MovieCardProps {
  movie: Movie;
  featured?: boolean;
}

const MovieCard = ({ movie, featured = false }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Link 
      to={`/movie/${movie.id}`}
      className={`group relative block overflow-hidden ${
        featured ? "rounded-xl" : "rounded-lg"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[2/3] w-full overflow-hidden bg-gray-100">
        <img
          src={imageError ? '/placeholder.svg' : movie.posterUrl}
          alt={movie.title}
          className={`h-full w-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
          loading="lazy"
          onError={() => setImageError(true)}
        />
      </div>
      
      {/* Rest of your MovieCard component remains the same */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-300 ${
        isHovered ? "opacity-100" : ""
      }`} />
      
      <div className="absolute left-3 top-3 rounded-full bg-white/10 px-2.5 py-1 backdrop-blur-sm">
        <span className="text-xs font-medium text-white">
          {movie.status === 'now_showing' ? 'Now Showing' : 'Coming Soon'}
        </span>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className={`font-medium text-white transition-all duration-300 ${
          featured ? "text-xl" : "text-base"
        } ${isHovered ? "mb-2" : "mb-0"}`}>
          {movie.title}
        </h3>
        
        {/* ... rest of the content ... */}
      </div>
    </Link>
  );
};

export default MovieCard;

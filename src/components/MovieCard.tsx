
import { useState } from "react";
import { Link } from "react-router-dom";
import { Movie } from "@/lib/types";

interface MovieCardProps {
  movie: Movie;
  featured?: boolean;
}

const MovieCard = ({ movie, featured = false }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      to={`/movie/${movie.id}`}
      className={`group relative block overflow-hidden ${
        featured ? "rounded-xl" : "rounded-lg"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="aspect-[2/3] w-full overflow-hidden bg-gray-100">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className={`h-full w-full object-cover transition-transform duration-700 ${
            isHovered ? "scale-105" : "scale-100"
          }`}
          loading="lazy"
        />
      </div>
      
      {/* Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 transition-opacity duration-300 ${
        isHovered ? "opacity-100" : ""
      }`} />
      
      {/* Status Badge */}
      <div className="absolute left-3 top-3 rounded-full bg-white/10 px-2.5 py-1 backdrop-blur-sm">
        <span className="text-xs font-medium text-white">
          {movie.status === 'now_showing' ? 'Now Showing' : 'Coming Soon'}
        </span>
      </div>
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        {/* Basic Info always visible */}
        <h3 className={`font-medium text-white transition-all duration-300 ${
          featured ? "text-xl" : "text-base"
        } ${isHovered ? "mb-2" : "mb-0"}`}>
          {movie.title}
        </h3>
        
        {/* Extended Info on hover */}
        <div className={`overflow-hidden transition-all duration-300 ${
          isHovered ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
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

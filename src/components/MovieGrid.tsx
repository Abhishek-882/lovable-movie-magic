
import { useState } from "react";
import MovieCard from "./MovieCard";
import { Movie, Genre } from "@/lib/types";

interface MovieGridProps {
  title: string;
  movies: Movie[];
  showFilters?: boolean;
}

const MovieGrid = ({ title, movies, showFilters = true }: MovieGridProps) => {
  const [selectedGenre, setSelectedGenre] = useState<Genre | "All">("All");
  
  // Extract all unique genres from movies
  const allGenres = Array.from(
    new Set(movies.flatMap(movie => movie.genres))
  ) as Genre[];
  
  // Filter movies by selected genre
  const filteredMovies = selectedGenre === "All" 
    ? movies 
    : movies.filter(movie => movie.genres.includes(selectedGenre));
  
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            {title}
          </h2>
          
          {showFilters && allGenres.length > 0 && (
            <div className="mt-4 sm:mt-0">
              <div className="flex flex-wrap gap-2">
                <button
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                    selectedGenre === "All"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setSelectedGenre("All")}
                >
                  All
                </button>
                
                {allGenres.slice(0, 5).map(genre => (
                  <button
                    key={genre}
                    className={`rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                      selectedGenre === genre
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedGenre(genre)}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Grid */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredMovies.map(movie => (
              <div key={movie.id} className="animate-fade-in">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">
              No movies found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MovieGrid;

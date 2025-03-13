
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { Movie, Genre } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MovieGridProps {
  title: string;
  movies: Movie[];
  showFilters?: boolean;
}

const MovieGrid = ({ title, movies, showFilters = true }: MovieGridProps) => {
  const [selectedGenre, setSelectedGenre] = useState<Genre | "All">("All");
  const [selectedLanguage, setSelectedLanguage] = useState<string | "All">("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(movies);
  
  // Extract all unique genres from movies
  const allGenres = Array.from(
    new Set(movies.flatMap(movie => movie.genres))
  ) as Genre[];
  
  // Extract all unique languages from movies
  const allLanguages = Array.from(
    new Set(movies.map(movie => movie.language))
  );
  
  // Filter movies based on genre, language, and search query
  useEffect(() => {
    let result = movies;
    
    // Filter by genre
    if (selectedGenre !== "All") {
      result = result.filter(movie => movie.genres.includes(selectedGenre));
    }
    
    // Filter by language
    if (selectedLanguage !== "All") {
      result = result.filter(movie => movie.language === selectedLanguage);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(movie => 
        movie.title.toLowerCase().includes(query) || 
        movie.director.toLowerCase().includes(query) ||
        movie.cast.some(actor => actor.toLowerCase().includes(query))
      );
    }
    
    setFilteredMovies(result);
  }, [selectedGenre, selectedLanguage, searchQuery, movies]);
  
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white to-red-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-red-600 md:text-4xl">
            {title}
          </h2>
        </div>
        
        {/* Search and Filters */}
        {showFilters && (
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Input
                placeholder="Search movies, directors, actors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-red-100 focus-visible:ring-red-400"
              />
              <Search className="absolute left-3 top-3 h-4 w-4 text-red-400" />
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 text-sm text-red-600">
                <Filter className="h-4 w-4" />
                <span>Filters:</span>
              </div>
              
              {/* Genre filters */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${
                    selectedGenre === "All"
                      ? "bg-red-100 text-red-600 border-red-200"
                      : "bg-white text-gray-700 hover:bg-red-50 border-red-100"
                  }`}
                  onClick={() => setSelectedGenre("All")}
                >
                  All Genres
                </Button>
                
                {allGenres.slice(0, 6).map(genre => (
                  <Button
                    key={genre}
                    variant="outline"
                    size="sm"
                    className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${
                      selectedGenre === genre
                        ? "bg-red-100 text-red-600 border-red-200"
                        : "bg-white text-gray-700 hover:bg-red-50 border-red-100"
                    }`}
                    onClick={() => setSelectedGenre(genre)}
                  >
                    {genre}
                  </Button>
                ))}
              </div>
              
              {/* Language filters */}
              <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${
                    selectedLanguage === "All"
                      ? "bg-red-100 text-red-600 border-red-200"
                      : "bg-white text-gray-700 hover:bg-red-50 border-red-100"
                  }`}
                  onClick={() => setSelectedLanguage("All")}
                >
                  All Languages
                </Button>
                
                {allLanguages.map(language => (
                  <Button
                    key={language}
                    variant="outline"
                    size="sm"
                    className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${
                      selectedLanguage === language
                        ? "bg-red-100 text-red-600 border-red-200"
                        : "bg-white text-gray-700 hover:bg-red-50 border-red-100"
                    }`}
                    onClick={() => setSelectedLanguage(language)}
                  >
                    {language}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
        
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
          <div className="rounded-lg border border-red-100 bg-white p-12 text-center">
            <p className="text-lg text-gray-500">
              No movies found matching your criteria.
            </p>
            <Button 
              className="mt-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
              onClick={() => {
                setSearchQuery("");
                setSelectedGenre("All");
                setSelectedLanguage("All");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MovieGrid;

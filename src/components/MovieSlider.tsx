import { MovieCard } from "./MovieCard";
import { Movie } from "@/lib/types";


interface MovieSliderProps {
  movies: Movie[];
}

export const MovieSlider = ({ movies }: MovieSliderProps) => {
  // Filter for the 3 specific movies
  const sliderMovies = movies.filter(movie => 
    ['K.G.F: Chapter 2', 'RRR', 'Arjun Reddy'].includes(movie.title)
  );

  return (
    <section className="py-8 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-gray-900">Featured Movies</h2>
        
        {/* Responsive grid as a Swiper alternative */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sliderMovies.map(movie => (
            <div 
              key={movie.id} 
              className="animate-fade-in transition-transform hover:scale-105"
            >
              <MovieCard movie={movie} featured />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

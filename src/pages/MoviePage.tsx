
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieDetail from "@/components/MovieDetail";
import { getMovieById, getShowtimesForMovie, getReviewsForMovie } from "@/data/movies";
import { Movie, Showtime, Review } from "@/lib/types";
import NotFound from "./NotFound";

const MoviePage = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
    
    // Simulate data loading
    const loadData = async () => {
      setLoading(true);
      
      if (!id) {
        setLoading(false);
        return;
      }
      
      try {
        // In a real app, these would be API calls
        const movieData = getMovieById(id);
        
        if (movieData) {
          setMovie(movieData);
          setShowtimes(getShowtimesForMovie(id));
          setReviews(getReviewsForMovie(id));
        }
      } catch (error) {
        console.error("Error loading movie data:", error);
      } finally {
        // Add a slight delay to simulate loading
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };
    
    loadData();
  }, [id]);
  
  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary/20 border-t-primary mx-auto"></div>
          <p className="text-gray-500">Loading movie details...</p>
        </div>
      </div>
    );
  }
  
  // 404 state
  if (!movie) {
    return <NotFound />;
  }
  
  return (
    <main className="min-h-screen pt-24">
      <MovieDetail movie={movie} showtimes={showtimes} reviews={reviews} />
    </main>
  );
};

export default MoviePage;

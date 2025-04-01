
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Movie, Showtime, Review } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import { useToast } from "@/hooks/use-toast";
import CastMember from "./CastMember";

interface MovieDetailProps {
  movie: Movie;
  showtimes?: Showtime[];
  reviews?: Review[];
}

const MovieDetail = ({ movie, showtimes = [], reviews = [] }: MovieDetailProps) => {
  const { isAuthenticated, isProfileComplete } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<string | null>(
    showtimes.length > 0 ? showtimes[0].date : null
  );
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);
  
  // Get unique dates from showtimes
  const uniqueDates = Array.from(new Set(showtimes.map(st => st.date)));
  
  // Filter showtimes by selected date
  const filteredShowtimes = selectedDate
    ? showtimes.filter(st => st.date === selectedDate)
    : [];
  
  // Group showtimes by theater
  const showtimesByTheater = filteredShowtimes.reduce((acc, showtime) => {
    if (!acc[showtime.theater]) {
      acc[showtime.theater] = [];
    }
    acc[showtime.theater].push(showtime);
    return acc;
  }, {} as Record<string, Showtime[]>);
  
  const handleShowtimeClick = (showtimeId: string) => {
    if (!isAuthenticated) {
      setSelectedShowtime(showtimeId);
      setIsAuthModalOpen(true);
      toast({
        title: "Sign in required",
        description: "Please sign in to book tickets",
        duration: 3000,
      });
    } else if (!isProfileComplete) {
      toast({
        title: "Profile incomplete",
        description: "Please complete your profile before booking tickets",
        variant: "destructive",
        duration: 3000,
      });
      navigate("/profile");
    } else {
      navigate(`/booking/${movie.id}/${showtimeId}`);
    }
  };
  
  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    if (selectedShowtime) {
      // Check if profile is complete before navigating
      if (isProfileComplete) {
        navigate(`/booking/${movie.id}/${selectedShowtime}`);
      } else {
        toast({
          title: "Profile incomplete",
          description: "Please complete your profile before booking tickets",
          variant: "destructive",
          duration: 3000,
        });
        navigate("/profile");
      }
    }
  };
  
  // Format the date properly
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric'
    });
  };
  
  return (
    <div className="mx-auto max-w-screen-xl px-4 md:px-6">
      {/* Hero Section */}
      <div className="relative -mx-4 mb-8 h-[60vh] min-h-[400px] overflow-hidden md:-mx-6 md:h-[70vh]">
        {/* Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/1200x600?text=Movie+Backdrop";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
        </div>
        
        {/* Content */}
        <div className="container relative z-10 mx-auto flex h-full items-end">
          <div className="flex flex-col pb-12 md:flex-row md:gap-8">
            {/* Poster */}
            <div className="mb-6 h-[280px] w-[200px] shrink-0 overflow-hidden rounded-lg shadow-xl md:mb-0 md:h-[360px] md:w-[240px]">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/400x600?text=Movie+Poster";
                }}
              />
            </div>
            
            {/* Details */}
            <div className="max-w-2xl">
              <div className="mb-2 flex flex-wrap gap-2">
                {movie.genres.map(genre => (
                  <span
                    key={genre}
                    className="rounded-full bg-red-600/10 px-3 py-1 text-xs font-medium text-red-600"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              
              <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl text-red-600">
                {movie.title}
              </h1>
              
              <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                <span>{new Date(movie.releaseDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span>{movie.runtime} minutes</span>
                <span>{movie.language}</span>
                <div className="flex items-center gap-1 rounded-full bg-red-600/10 px-2 py-0.5 text-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{movie.rating.toFixed(1)}</span>
                </div>
              </div>
              
              <p className="mb-6 text-gray-700">{movie.overview}</p>
              
              <div className="mb-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                <div>
                  <h4 className="text-xs font-semibold uppercase text-gray-500">Director</h4>
                  <p className="text-sm text-gray-800">{movie.director}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase text-gray-500">Language</h4>
                  <p className="text-sm text-gray-800">{movie.language}</p>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase text-gray-500">Status</h4>
                  <p className="text-sm capitalize text-gray-800">
                    {movie.status === 'now_showing' ? 'Now Showing' : 'Coming Soon'}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {movie.status === 'now_showing' && (
                  <a
                    href="#showtimes"
                    className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-500 px-6 py-3 text-sm font-medium text-white transition-all hover:from-red-700 hover:to-red-600"
                  >
                    View Showtimes
                  </a>
                )}
                
                {movie.trailerUrl && (
                  <a
                    href={movie.trailerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-white border border-red-200 px-6 py-3 text-sm font-medium text-red-600 transition-all hover:bg-red-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mr-2 h-5 w-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Watch Trailer
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cast Section */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold text-red-600">Cast & Crew</h2>
        
        <div className="flex overflow-x-auto pb-4 gap-4">
          {movie.cast.map((actor, index) => (
            <CastMember key={index} name={actor} />
          ))}
        </div>
      </section>
      
      {/* Showtimes Section */}
      {movie.status === 'now_showing' && showtimes.length > 0 && (
        <section id="showtimes" className="mb-12 scroll-mt-24">
          <h2 className="mb-6 text-2xl font-bold text-red-600">Showtimes</h2>
          
          {/* Date Selection */}
          {uniqueDates.length > 0 && (
            <div className="mb-6 flex overflow-x-auto pb-2">
              <div className="flex gap-2">
                {uniqueDates.map(date => (
                  <button
                    key={date}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all whitespace-nowrap ${
                      selectedDate === date
                        ? "bg-red-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedDate(date)}
                  >
                    {formatDate(date)}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Showtimes by Theater */}
          <div className="space-y-6">
            {Object.entries(showtimesByTheater).map(([theater, times]) => (
              <div key={theater} className="rounded-lg border border-red-100 bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold">{theater}</h3>
                
                <div className="flex flex-wrap gap-3">
                  {times.map(time => (
                    <button
                      key={time.id}
                      className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition-all hover:bg-gray-50 hover:shadow"
                      onClick={() => handleShowtimeClick(time.id)}
                    >
                      {time.time}
                      <span className="ml-2 text-xs text-gray-500">₹{time.price.toFixed(0)}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            
            {filteredShowtimes.length === 0 && selectedDate && (
              <div className="rounded-lg border bg-white p-6 text-center shadow-sm">
                <p className="text-gray-500">No showtimes available for the selected date.</p>
              </div>
            )}
          </div>
        </section>
      )}
      
      {/* Reviews Section */}
      {reviews.length > 0 && (
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-red-600">Reviews</h2>
          
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review.id} className="rounded-lg border bg-white p-6 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-medium">{review.author}</h4>
                  <div className="flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{review.rating}</span>
                    <span className="text-xs text-gray-500">/10</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{review.comment}</p>
                <div className="mt-2 text-xs text-gray-500">
                  {new Date(review.date).toLocaleDateString('en-IN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* Movie Trailer */}
      {movie.trailerUrl && (
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold text-red-600">Trailer</h2>
          
          <div className="aspect-video overflow-hidden rounded-lg bg-black shadow-md">
            <iframe
              width="100%"
              height="100%"
              src={movie.trailerUrl}
              title={`${movie.title} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      )}
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default MovieDetail;

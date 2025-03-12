
import { useState } from "react";
import { Link } from "react-router-dom";
import { Movie, Showtime, Review } from "@/lib/types";

interface MovieDetailProps {
  movie: Movie;
  showtimes?: Showtime[];
  reviews?: Review[];
}

const MovieDetail = ({ movie, showtimes = [], reviews = [] }: MovieDetailProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(
    showtimes.length > 0 ? showtimes[0].date : null
  );
  
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
              />
            </div>
            
            {/* Details */}
            <div className="max-w-2xl">
              <div className="mb-2 flex flex-wrap gap-2">
                {movie.genres.map(genre => (
                  <span
                    key={genre}
                    className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              
              <h1 className="mb-2 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
                {movie.title}
              </h1>
              
              <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                <span>{new Date(movie.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span>{movie.runtime} minutes</span>
                <span>{movie.language}</span>
                <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-primary">
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
              
              {movie.status === 'now_showing' && (
                <div className="flex">
                  <a
                    href="#showtimes"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-all hover:bg-primary/90"
                  >
                    View Showtimes
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Cast Section */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">Cast & Crew</h2>
        
        <div className="flex flex-wrap gap-4">
          {movie.cast.map((actor, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-2 h-24 w-24 overflow-hidden rounded-full bg-gray-200">
                <div className="flex h-full w-full items-center justify-center bg-gray-100 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-12 w-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
              </div>
              <span className="text-center text-sm font-medium">{actor}</span>
            </div>
          ))}
        </div>
      </section>
      
      {/* Showtimes Section */}
      {movie.status === 'now_showing' && showtimes.length > 0 && (
        <section id="showtimes" className="mb-12 scroll-mt-24">
          <h2 className="mb-6 text-2xl font-bold">Showtimes</h2>
          
          {/* Date Selection */}
          {uniqueDates.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {uniqueDates.map(date => {
                const formattedDate = new Date(date).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                });
                
                return (
                  <button
                    key={date}
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      selectedDate === date
                        ? "bg-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onClick={() => setSelectedDate(date)}
                  >
                    {formattedDate}
                  </button>
                );
              })}
            </div>
          )}
          
          {/* Showtimes by Theater */}
          <div className="space-y-6">
            {Object.entries(showtimesByTheater).map(([theater, times]) => (
              <div key={theater} className="rounded-lg border bg-white p-6 shadow-sm">
                <h3 className="mb-4 text-lg font-semibold">{theater}</h3>
                
                <div className="flex flex-wrap gap-3">
                  {times.map(time => (
                    <Link
                      key={time.id}
                      to={`/booking/${movie.id}/${time.id}`}
                      className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-sm transition-all hover:bg-gray-50 hover:shadow"
                    >
                      {time.time}
                      <span className="ml-2 text-xs text-gray-500">${time.price}</span>
                    </Link>
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
          <h2 className="mb-6 text-2xl font-bold">Reviews</h2>
          
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review.id} className="rounded-lg border bg-white p-6 shadow-sm">
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-medium">{review.author}</h4>
                  <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">{review.rating}</span>
                    <span className="text-xs text-gray-500">/10</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{review.comment}</p>
                <div className="mt-2 text-xs text-gray-500">
                  {new Date(review.date).toLocaleDateString('en-US', { 
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
      
      {/* Related Movies Section */}
      <section className="mb-12">
        <h2 className="mb-6 text-2xl font-bold">You Might Also Like</h2>
        
        {/* This would be populated with actual related movies data */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          <div className="rounded-lg border bg-white p-4 text-center shadow-sm">
            <p className="text-gray-500">Related movies would appear here</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MovieDetail;

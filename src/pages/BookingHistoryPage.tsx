
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Booking, Movie } from "@/lib/types";
import { getMovieById } from "@/data/movies";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ClockIcon, MapPinIcon, TicketIcon } from "lucide-react";

interface ExtendedBooking extends Booking {
  movie: Movie | null;
}

const BookingHistoryPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<ExtendedBooking[]>([]);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      // Simulate fetching bookings from a database
      // In a real app, this would be an API call to get the user's bookings
      const mockBookings: Booking[] = [
        {
          id: "booking1",
          userId: user?.id || "",
          movieId: "1",
          showtimeId: "st1",
          seats: ["A3", "A4"],
          totalAmount: 30,
          bookingDate: new Date().toISOString(),
          status: "confirmed",
          qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAABhElEQVR4nO3dsW3CUBiF0UtYIQMwAiN4hIzgDTxCRmAER/AIjJABsgKl4ZdQoEiJkM7pI/n7pHfv+2y5s+24bR1utr2B7OMPAAAAAAAAAFhNdxpmdx7vY9R0y17TY5z77bq7yGrarc599tp1jHp6mW/+sNv2Jl5d1j8/3f+8dzYdB/FsfA4CAAAAAAAAKyuZslpuOg7iZMpK5GTKHZ1METKZcjc9dTJFyCRTjA4AAAAAAAAAZZRMWa1wIhMymbJSOZlyRydThEwm0+7mZIqQSaYYHQAAAAAAAADKKJmyWn0PJ2RKJlPu5mSKkMlkipMpQiaZYnQAAAAAAAAAKKNkymqt78GETKbczckUIZPJlLs5mSJkMpliAQEAAAAAAAAoo2TKavU9nJDJlLs5mSJkkil3czJFyGQyxegAAAAAAAAAUEbJlNXqezAhkyl3czJFyGQyxckUIZNMMQAAAAAAAADwP/wCFT1SWzQG/QcAAAAASUVORK5CYII="
        },
        {
          id: "booking2",
          userId: user?.id || "",
          movieId: "2",
          showtimeId: "st5",
          seats: ["B5", "B6", "B7"],
          totalAmount: 54,
          bookingDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          status: "confirmed",
          qrCode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAABmJLR0QA/wD/AP+gvaeTAAABhElEQVR4nO3dsW3CUBiF0UtYIQMwAiN4hIzgDTxCRmAER/AIjJABsgKl4ZdQoEiJkM7pI/n7pHfv+2y5s+24bR1utr2B7OMPAAAAAAAAAFhNdxpmdx7vY9R0y17TY5z77bq7yGrarc599tp1jHp6mW/+sNv2Jl5d1j8/3f+8dzYdB/FsfA4CAAAAAAAAKyuZslpuOg7iZMpK5GTKHZ1METKZcjc9dTJFyCRTjA4AAAAAAAAAZZRMWa1wIhMymbJSOZlyRydThEwm0+7mZIqQSaYYHQAAAAAAAADKKJmyWn0PJ2RKJlPu5mSKkMlkipMpQiaZYnQAAAAAAAAAKKNkymqt78GETKbczckUIZPJlLs5mSJkMpliAQEAAAAAAAAoo2TKavU9nJDJlLs5mSJkkil3czJFyGQyxegAAAAAAAAAUEbJlNXqezAhkyl3czJFyGQyxckUIZNMMQAAAAAAAADwP/wCFT1SWzQG/QcAAAAASUVORK5CYII="
        }
      ];
      
      // Attach movie details to each booking
      const bookingsWithMovies = mockBookings.map(booking => ({
        ...booking,
        movie: getMovieById(booking.movieId)
      }));
      
      setBookings(bookingsWithMovies);
    }
    
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, [isAuthenticated, navigate, user?.id]);
  
  if (!isAuthenticated) return null;
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 md:px-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">My Bookings</h1>
          
          {bookings.length > 0 ? (
            <div className="space-y-6">
              {bookings.map(booking => (
                <Card key={booking.id} className="overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    {booking.movie && (
                      <div className="h-48 w-full md:h-auto md:w-1/3">
                        <img 
                          src={booking.movie.posterUrl} 
                          alt={booking.movie.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1 p-6">
                      <CardHeader className="p-0 pb-4">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-xl">
                            {booking.movie?.title || "Unknown Movie"}
                          </CardTitle>
                          <Badge 
                            className={booking.status === 'confirmed' ? 'bg-green-500' : 'bg-amber-500'}
                          >
                            {booking.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <CalendarIcon className="h-4 w-4 text-primary" />
                              <span>
                                {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <ClockIcon className="h-4 w-4 text-primary" />
                              <span>Showtime details</span>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm">
                              <MapPinIcon className="h-4 w-4 text-primary" />
                              <span>Theater details</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <TicketIcon className="h-4 w-4 text-primary" />
                              <span>Seats: {booking.seats.join(", ")}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-lg font-semibold">
                            Total: ${booking.totalAmount.toFixed(2)}
                          </div>
                          
                          <div className="flex space-x-2">
                            <button 
                              className="rounded-md bg-primary px-3 py-1 text-sm font-medium text-white hover:bg-primary/90"
                              onClick={() => window.open(`#view-ticket-${booking.id}`, '_blank')}
                            >
                              View Ticket
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border bg-card p-6 shadow-sm">
              <p className="text-center text-gray-500 py-8">You don't have any bookings yet.</p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingHistoryPage;


import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getMovieById, getShowtimeById } from "@/data/movies";
import { Booking } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Calendar, Clock, MapPin, CreditCard } from "lucide-react";

const BookingHistoryPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<(Booking & {
    movieTitle: string;
    theaterName: string;
    showDate: string;
    showTime: string;
    posterUrl: string;
    qrCode: string;
  })[]>([]);
  
  // Mock bookings data
  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate("/");
      return;
    }
    
    // For demo purposes, create mock booking history
    const mockBookings: (Booking & {
      movieTitle: string;
      theaterName: string;
      showDate: string;
      showTime: string;
      posterUrl: string;
      qrCode: string;
    })[] = [
      {
        id: "1",
        userId: user?.id || "",
        movieId: "1",
        showtimeId: "1",
        seats: ["B2", "B3"],
        totalAmount: 750,
        bookingDate: "2023-07-15",
        status: "confirmed",
        movieTitle: "RRR",
        theaterName: "PVR ICON: GVK One Mall",
        showDate: "2023-07-20",
        showTime: "6:45 PM",
        posterUrl: "https://m.media-amazon.com/images/M/MV5BOGEzYzcxYjAtZmZiNi00YzI0LWIyY2YtOTM0MDlmYzUyZDVmXkEyXkFqcGdeQXVyMTQ3Mzk2MDg4._V1_.jpg",
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BOOKING-1-RRR-PVR"
      },
      {
        id: "2",
        userId: user?.id || "",
        movieId: "2",
        showtimeId: "5",
        seats: ["C5", "C6", "C7"],
        totalAmount: 900,
        bookingDate: "2023-08-05",
        status: "confirmed",
        movieTitle: "Baahubali: The Beginning",
        theaterName: "INOX: Hyderabad Central",
        showDate: "2023-08-10",
        showTime: "3:30 PM",
        posterUrl: "https://m.media-amazon.com/images/M/MV5BYWVlMjVhZWYtNWViNC00ODFkLTk1MmItYjU1MDY5ZDdhMTU3XkEyXkFqcGdeQXVyODIwMDI1NjM@._V1_.jpg",
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BOOKING-2-BAAHUBALI-INOX"
      }
    ];
    
    setBookings(mockBookings);
  }, [isAuthenticated, navigate, user]);
  
  if (!isAuthenticated) return null;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 md:px-6">
        <h1 className="mb-8 text-3xl font-bold text-red-600">My Bookings</h1>
        
        {bookings.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map(booking => {
              const movie = getMovieById(booking.movieId);
              const showtime = getShowtimeById(booking.showtimeId);
              
              return (
                <Card key={booking.id} className="overflow-hidden bg-white/80 backdrop-blur-sm border-red-100">
                  <div className="aspect-[2/1] relative">
                    <img
                      src={movie?.backdropUrl || booking.posterUrl}
                      alt={booking.movieTitle}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/800x400?text=Movie+Backdrop";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-3 left-4 text-white">
                      <h3 className="text-lg font-bold">{booking.movieTitle}</h3>
                      <p className="text-sm opacity-80">{new Date(booking.showDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                    </div>
                    <div className="absolute right-3 top-3 rounded-full bg-white/20 px-2 py-1 text-xs font-medium text-white backdrop-blur-md">
                      {booking.status === 'confirmed' ? 'Confirmed' : booking.status}
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="mb-4 space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                        <span className="text-sm">{booking.theaterName}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Calendar className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                        <span className="text-sm">{new Date(booking.showDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                        <span className="text-sm">{booking.showTime}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5h14a2 2 0 011.997 1.923l.003.077v4a2 2 0 01-1.854 1.995L19 13H5a2 2 0 01-1.997-1.923L3 11V7a2 2 0 011.854-1.995L5 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13v2a2 2 0 01-1.85 1.995L17 17H7a2 2 0 01-1.995-1.85L5 15v-2" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12v5" />
                        </svg>
                        <span className="text-sm">{booking.seats.join(", ")}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CreditCard className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                        <span className="text-sm font-semibold">₹{booking.totalAmount.toFixed(0)}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <div className="text-center">
                        <div className="flex justify-center">
                          <img
                            src={booking.qrCode}
                            alt="QR Code"
                            className="h-24 w-24 rounded-lg border border-gray-200 p-1"
                          />
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Scan QR at theater</p>
                      </div>
                      
                      <div className="flex flex-col items-end justify-between">
                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                          {booking.status === 'confirmed' ? 'Confirmed' : booking.status}
                        </span>
                        <a
                          href={`#download-${booking.id}`}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Ticket
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-red-100 bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-red-50 flex items-center justify-center">
              <QrCode className="h-8 w-8 text-red-400" />
            </div>
            <h3 className="mb-1 text-xl font-semibold">No bookings yet</h3>
            <p className="mb-4 text-gray-500">You haven't booked any movie tickets yet.</p>
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-red-600 to-red-500 px-6 py-2 text-sm font-medium text-white hover:from-red-700 hover:to-red-600"
            >
              Browse Movies
            </a>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingHistoryPage;

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getMovieById, getShowtimeById } from "@/data/movies";
import { Booking, SnackOrder } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode, Calendar, Clock, MapPin, CreditCard, Popcorn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

type EnhancedBooking = Booking & {
  movieTitle: string;
  theaterName: string;
  showDate: string;
  showTime: string;
  posterUrl: string;
  qrCode: string;
  snackDetails?: { name: string; quantity: number; price: number }[];
};

const BookingHistoryPage = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<EnhancedBooking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
      return;
    }
    
    const fetchBookings = async () => {
      if (!user) return;
      
      setIsLoading(true);
      
      try {
        const storedBookings = localStorage.getItem("userBookings");
        
        if (storedBookings) {
          const parsedBookings = JSON.parse(storedBookings);
          
          const enhancedBookings = parsedBookings.map((booking: any) => {
            const movie = getMovieById(booking.movieId);
            const showtime = getShowtimeById(booking.showtimeId);
            
            const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BOOKING-${booking.id}-${movie?.title}-${showtime?.theater || 'THEATER'}`;
            
            const snackDetails = booking.snacks ? booking.snacks.map((snack: SnackOrder) => {
              const snackNames: Record<string, string> = {
                "1": "Large Popcorn",
                "2": "Medium Popcorn",
                "3": "Small Popcorn",
                "4": "Cola (Large)",
                "5": "Cola (Medium)",
                "6": "Water Bottle",
                "7": "Nachos",
                "8": "Combo 1 (Popcorn + Cola)",
                "9": "Combo 2 (Nachos + Cola)"
              };
              
              return {
                name: snackNames[snack.snackId] || `Snack #${snack.snackId}`,
                quantity: snack.quantity,
                price: snack.price
              };
            }) : undefined;
            
            // Mark as confirmed if payment is completed
            const validStatus = booking.paymentCompleted ? "confirmed" : 
              (booking.status === "cancelled" ? "cancelled" : "confirmed");
            
            return {
              ...booking,
              status: validStatus,
              movieTitle: movie?.title || "Unknown Movie",
              theaterName: showtime?.theater || "Unknown Theater",
              showDate: showtime?.date || booking.bookingDate.split("T")[0],
              showTime: showtime?.time || "Unknown Time",
              posterUrl: movie?.posterUrl || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=400&fit=crop",
              qrCode: qrCodeUrl,
              snackDetails
            };
          });
          
          setBookings(enhancedBookings);
        } else {
          setBookings(getMockBookings(user.id));
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast({
          title: "Failed to fetch bookings",
          description: "Using sample booking data instead.",
          variant: "destructive"
        });
        setBookings(getMockBookings(user.id));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBookings();
  }, [isAuthenticated, navigate, user, toast]);
  
  const getMockBookings = (userId: string): EnhancedBooking[] => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000); // 5 days from now
    
    return [
      {
        id: "1",
        userId: userId,
        movieId: "1",
        showtimeId: "1",
        seats: ["B2", "B3"],
        snacks: [
          { snackId: "1", quantity: 1, price: 250 },
          { snackId: "4", quantity: 2, price: 180 }
        ],
        totalAmount: 1160,
        bookingDate: currentDate.toISOString(),
        paymentCompleted: true,
        status: "confirmed",
        movieTitle: "Interstellar",
        theaterName: "PVR ICON: GVK One Mall",
        showDate: futureDate.toISOString().split('T')[0],
        showTime: "6:45 PM",
        posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BOOKING-1-Interstellar-PVR-ICON",
        snackDetails: [
          { name: "Large Popcorn", quantity: 1, price: 250 },
          { name: "Cola (Large)", quantity: 2, price: 360 }
        ]
      },
      {
        id: "2",
        userId: userId,
        movieId: "5",
        showtimeId: "8",
        seats: ["D12", "D13", "D14"],
        snacks: [
          { snackId: "8", quantity: 2, price: 450 }
        ],
        totalAmount: 1800,
        bookingDate: currentDate.toISOString(),
        paymentCompleted: true,
        status: "confirmed",
        movieTitle: "Inception",
        theaterName: "INOX: Hyderabad Central",
        showDate: futureDate.toISOString().split('T')[0],
        showTime: "3:30 PM",
        posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BOOKING-2-Inception-INOX",
        snackDetails: [
          { name: "Combo 1 (Popcorn + Cola)", quantity: 2, price: 900 }
        ]
      },
      {
        id: "3",
        userId: userId,
        movieId: "3",
        showtimeId: "15",
        seats: ["A1", "A2"],
        snacks: [],
        totalAmount: 600,
        bookingDate: currentDate.toISOString(),
        paymentCompleted: true,
        status: "cancelled",
        movieTitle: "The Dark Knight",
        theaterName: "PVR: Forum Mall",
        showDate: futureDate.toISOString().split('T')[0],
        showTime: "9:30 PM",
        posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        qrCode: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BOOKING-3-Dark-Knight-PVR",
        snackDetails: []
      }
    ];
  };
  
  const handleDownloadTicket = (booking: EnhancedBooking) => {
    toast({
      title: "Ticket Download",
      description: "This feature will be available soon!",
    });
  };
  
  const handleCancelBooking = async (bookingId: string) => {
    try {
      toast({
        title: "Processing",
        description: "Cancelling your booking...",
      });
      
      setBookings(prevBookings => {
        const updatedBookings = prevBookings.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: "cancelled" } 
            : booking
        );
        
        localStorage.setItem("userBookings", JSON.stringify(updatedBookings));
        
        return updatedBookings;
      });
      
      setTimeout(() => {
        toast({
          title: "Success",
          description: "Booking cancelled successfully. Refund will be processed in 5-7 business days.",
        });
      }, 1000);
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel booking. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  if (!isAuthenticated) return null;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 md:px-6">
        <h1 className="mb-8 text-3xl font-bold text-red-600">My Bookings</h1>
        
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <Card key={item} className="overflow-hidden bg-white/80 backdrop-blur-sm border-red-100">
                <div className="aspect-[2/1] relative">
                  <Skeleton className="h-full w-full" />
                </div>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/4" />
                    <div className="flex justify-between">
                      <Skeleton className="h-24 w-24" />
                      <div className="space-y-2">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : bookings.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map(booking => (
              <Card key={booking.id} className="overflow-hidden bg-white/80 backdrop-blur-sm border-red-100">
                <div className="aspect-[2/1] relative">
                  <img
                    src={booking.posterUrl}
                    alt={booking.movieTitle}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=400&fit=crop";
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
                    
                    {booking.snackDetails && booking.snackDetails.length > 0 && (
                      <div className="flex items-start gap-2">
                        <Popcorn className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                        <div className="text-sm flex flex-col">
                          {booking.snackDetails.map((snack, idx) => (
                            <span key={idx}>{snack.quantity}x {snack.name}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    
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
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${
                        booking.status === 'confirmed' 
                          ? 'bg-green-100 text-green-700' 
                          : booking.status === 'cancelled'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-amber-100 text-amber-700'
                      }`}>
                        {booking.status === 'confirmed' ? 'Confirmed' : booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                      
                      <div className="mt-2 flex flex-col gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadTicket(booking)}
                          className="inline-flex h-8 items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Ticket
                        </Button>
                        
                        {booking.status === 'confirmed' && new Date(booking.showDate) > new Date() && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCancelBooking(booking.id)}
                            className="inline-flex h-8 items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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

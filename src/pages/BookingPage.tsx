
import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getMovieById, getShowtimeById } from "@/data/movies";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { SnackOrder } from "@/lib/types";
import SnackSelector from "@/components/SnackSelector";
import { ChevronLeft, ChevronRight, Ticket, Coffee } from "lucide-react";

const BookingPage = () => {
  const { movieId, showtimeId } = useParams<{ movieId: string; showtimeId: string }>();
  const { isAuthenticated, isProfileComplete, isEmailVerified, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedSnacks, setSelectedSnacks] = useState<SnackOrder[]>([]);
  const [bookingStep, setBookingStep] = useState<'seats' | 'snacks' | 'payment'>('seats');
  const [isLoading, setIsLoading] = useState(false);
  
  const movie = movieId ? getMovieById(movieId) : null;
  const showtime = showtimeId ? getShowtimeById(showtimeId) : null;
  
  // Check authentication status immediately
  const checkAuth = useCallback(() => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login to book tickets",
        variant: "destructive",
      });
      navigate("/");
      return false;
    }
    
    if (!isProfileComplete) {
      toast({
        title: "Profile completion required",
        description: "Please complete your profile before booking tickets",
        variant: "destructive",
      });
      navigate("/profile");
      return false;
    }
    
    return true;
  }, [isAuthenticated, isProfileComplete, navigate, toast]);
  
  // Check on component mount and when auth status changes
  useEffect(() => {
    // Call the checkAuth function and store its result
    const isAuthValid = checkAuth();
    
    // Only run the scroll logic if authentication is valid
    if (isAuthValid) {
      window.scrollTo(0, 0);
    }
  }, [checkAuth]);
  
  // If no movie or showtime, show nothing
  if (!movie || !showtime) {
    return null;
  }
  
  const handleSeatClick = (seatId: string) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatId)) {
        return prev.filter(id => id !== seatId);
      } else {
        return [...prev, seatId];
      }
    });
  };
  
  const handleSnacksSelected = (snacks: SnackOrder[]) => {
    setSelectedSnacks(snacks);
    setBookingStep('payment');
  };
  
  const handleBooking = () => {
    if (!isEmailVerified) {
      toast({
        title: "Email verification required",
        description: "Please verify your email before proceeding to payment",
        variant: "destructive",
      });
      navigate("/profile");
      return;
    }
    
    setIsLoading(true);
    
    // Create a booking object with the correct status type
    const newBooking = {
      id: Date.now().toString(),
      userId: user?.id || "",
      movieId: movieId || "",
      showtimeId: showtimeId || "",
      seats: selectedSeats,
      snacks: selectedSnacks,
      totalAmount: totalAmount,
      bookingDate: new Date().toISOString(),
      status: "confirmed" as "confirmed" | "cancelled" | "pending"
    };

    console.log("Creating new booking:", newBooking);
    
    // Mock successful booking process
    setTimeout(() => {
      setIsLoading(false);
      
      // Save booking to local storage for retrieval in BookingHistoryPage
      const existingBookings = JSON.parse(localStorage.getItem("userBookings") || "[]");
      localStorage.setItem("userBookings", JSON.stringify([newBooking, ...existingBookings]));
      
      toast({
        title: "Booking successful!",
        description: "Your tickets have been booked successfully",
      });
      navigate("/bookings");
    }, 1500);
  };
  
  // Calculate snacks total
  const snacksTotal = selectedSnacks.reduce((total, snack) => {
    return total + (snack.price * snack.quantity);
  }, 0);
  
  // Mock seats for demonstration
  const rows = ["A", "B", "C", "D", "E", "F", "G"];
  const seatCategories = {
    "A": { name: "Premium", price: showtime.price + 150 },
    "B": { name: "Premium", price: showtime.price + 150 },
    "C": { name: "Regular", price: showtime.price },
    "D": { name: "Regular", price: showtime.price },
    "E": { name: "Regular", price: showtime.price },
    "F": { name: "Budget", price: showtime.price - 50 },
    "G": { name: "Budget", price: showtime.price - 50 },
  };
  
  const ticketsTotal = selectedSeats.reduce((total, seat) => {
    const row = seat.charAt(0);
    return total + (seatCategories[row as keyof typeof seatCategories]?.price || showtime.price);
  }, 0);
  
  const totalAmount = ticketsTotal + snacksTotal;
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold md:text-3xl text-red-600">{movie.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
              <span className="bg-red-100 px-3 py-1 rounded-full text-red-600">{showtime.theater}</span>
              <span>{new Date(showtime.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
              <span className="font-semibold">{showtime.time}</span>
            </div>
            
            {/* Booking steps */}
            <div className="mt-6 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  bookingStep === 'seats' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-600'
                }`}>
                  <Ticket className="h-4 w-4" />
                </div>
                <span className={`text-sm font-medium ${
                  bookingStep === 'seats' ? 'text-red-600' : 'text-gray-500'
                }`}>Select Seats</span>
              </div>
              
              <div className="h-[2px] flex-1 mx-4 bg-gray-200">
                <div className={`h-full bg-red-500 transition-all ${
                  bookingStep === 'seats' ? 'w-0' : bookingStep === 'snacks' ? 'w-1/2' : 'w-full'
                }`}></div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  bookingStep === 'snacks' ? 'bg-red-600 text-white' : 
                  bookingStep === 'payment' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  <Coffee className="h-4 w-4" />
                </div>
                <span className={`text-sm font-medium ${
                  bookingStep === 'snacks' ? 'text-red-600' : 
                  bookingStep === 'payment' ? 'text-gray-500' : 'text-gray-400'
                }`}>Add Snacks</span>
              </div>
              
              <div className="h-[2px] flex-1 mx-4 bg-gray-200">
                <div className={`h-full bg-red-500 transition-all ${
                  bookingStep === 'payment' ? 'w-full' : 'w-0'
                }`}></div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  bookingStep === 'payment' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-400'
                }`}>
                  <span className="text-sm font-bold">₹</span>
                </div>
                <span className={`text-sm font-medium ${
                  bookingStep === 'payment' ? 'text-red-600' : 'text-gray-400'
                }`}>Payment</span>
              </div>
            </div>
          </div>
          
          {/* Seat selection */}
          {bookingStep === 'seats' && (
            <div className="mb-8 bg-white/90 backdrop-blur-sm rounded-xl border border-red-100 p-6 shadow-lg">
              <div className="mb-6 flex items-center justify-center">
                <div className="w-full max-w-md rounded-lg bg-gradient-to-b from-gray-900 to-gray-800 px-4 py-8 text-center text-white">
                  <p className="mb-6 text-sm font-medium">SCREEN</p>
                  <div className="space-y-3">
                    {rows.map(row => (
                      <div key={row} className="flex items-center justify-center gap-1">
                        <div className="w-6 text-xs font-medium">{row}</div>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map(num => {
                          const seatId = `${row}${num}`;
                          const isSelected = selectedSeats.includes(seatId);
                          // Simulate some seats as unavailable
                          const isAvailable = !((row === "D" && num === 5) || (row === "E" && num === 6) || (row === "A" && num === 2));
                          
                          return (
                            <button
                              key={seatId}
                              className={`h-7 w-7 rounded-t-md text-xs font-medium transition-colors ${
                                isSelected
                                  ? "bg-red-600 text-white animate-pulse"
                                  : isAvailable
                                  ? "bg-gray-600 text-white hover:bg-gray-500"
                                  : "bg-gray-400 cursor-not-allowed"
                              }`}
                              onClick={() => isAvailable && handleSeatClick(seatId)}
                              disabled={!isAvailable}
                            >
                              {num}
                            </button>
                          );
                        })}
                        <div className="w-6 text-xs font-medium">{row}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mb-4 flex justify-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-red-600"></div>
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-gray-600"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded bg-gray-400"></div>
                  <span>Booked</span>
                </div>
              </div>
              
              <div className="space-y-2 text-center">
                <p className="text-sm text-gray-600">
                  Premium: ₹{(seatCategories.A.price).toFixed(0)} | Regular: ₹{showtime.price.toFixed(0)} | Budget: ₹{(seatCategories.F.price).toFixed(0)}
                </p>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={() => setBookingStep('snacks')} 
                  disabled={selectedSeats.length === 0}
                  className="w-full md:w-auto bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
                >
                  Continue to Snacks <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Snack selection */}
          {bookingStep === 'snacks' && (
            <>
              <SnackSelector 
                onSnacksSelected={handleSnacksSelected} 
                selectedSnacks={selectedSnacks}
              />
              <div className="mt-4 flex justify-between">
                <Button 
                  variant="outline"
                  onClick={() => setBookingStep('seats')}
                  className="border-red-200 text-red-600"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back to Seats
                </Button>
              </div>
            </>
          )}
          
          {/* Payment */}
          {bookingStep === 'payment' && (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-red-100 p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-bold text-red-600">Booking Summary</h2>
              
              <div className="mb-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Movie</span>
                  <span className="font-medium">{movie.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Theater</span>
                  <span>{showtime.theater}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time</span>
                  <span>{new Date(showtime.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {showtime.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Seats</span>
                  <span>
                    {selectedSeats.length > 0 
                      ? selectedSeats.sort().join(", ") 
                      : "No seats selected"}
                  </span>
                </div>
                
                {/* Display selected snacks */}
                {selectedSnacks.length > 0 && (
                  <div>
                    <div className="flex justify-between pt-2">
                      <span className="text-gray-600">Snacks & Beverages</span>
                      <span></span>
                    </div>
                    {selectedSnacks.map((snackOrder, index) => (
                      <div key={index} className="flex justify-between pl-4 text-sm">
                        <span>{`${snackOrder.quantity}x Item #${snackOrder.snackId}`}</span>
                        <span>₹{(snackOrder.quantity * snackOrder.price).toFixed(0)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="mb-4 border-t py-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tickets Subtotal</span>
                  <span>₹{ticketsTotal.toFixed(0)}</span>
                </div>
                {snacksTotal > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Snacks Subtotal</span>
                    <span>₹{snacksTotal.toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold mt-2 pt-2 border-t">
                  <span>Total Amount</span>
                  <span className="text-red-600">₹{totalAmount.toFixed(0)}</span>
                </div>
                {!isEmailVerified && (
                  <p className="mt-2 text-sm text-amber-500">
                    Email verification is required before proceeding to payment.
                  </p>
                )}
              </div>
              
              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline"
                  onClick={() => setBookingStep('snacks')}
                  className="border-red-200 text-red-600"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button 
                  onClick={handleBooking} 
                  disabled={selectedSeats.length === 0 || isLoading}
                  className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
                >
                  {isLoading ? "Processing..." : "Confirm & Pay"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingPage;

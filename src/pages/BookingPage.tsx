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
import { ChevronLeft, ChevronRight, Ticket, Coffee, CreditCard } from "lucide-react";

const BookingPage = () => {
  const { movieId, showtimeId } = useParams<{ movieId: string; showtimeId: string }>();
  const { isAuthenticated, isProfileComplete, isEmailVerified, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedSnacks, setSelectedSnacks] = useState<SnackOrder[]>([]);
  const [bookingStep, setBookingStep] = useState<'seats' | 'snacks' | 'payment'>('seats');
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState<any>(null);
  const [showtime, setShowtime] = useState<any>(null);
  const [isDataLoading, setIsDataLoading] = useState(true);
  
  // Calculate totals first to avoid reference before definition
  const ticketPrice = 150; // Base ticket price
  const ticketsTotal = selectedSeats.length * ticketPrice;
  
  const snacksTotal = selectedSnacks.reduce((total, snack) => {
    return total + snack.quantity * snack.price;
  }, 0);
  
  const totalAmount = ticketsTotal + snacksTotal;
  
  // Fetch movie and showtime data
  useEffect(() => {
    if (movieId && showtimeId) {
      const fetchedMovie = getMovieById(movieId);
      const fetchedShowtime = getShowtimeById(showtimeId);
      
      setMovie(fetchedMovie);
      setShowtime(fetchedShowtime);
      setIsDataLoading(false);
    }
  }, [movieId, showtimeId]);
  
  // Check authentication status immediately
  const checkAuth = useCallback(() => {
    if (!isAuthenticated) {
      toast({
        title: "Sign in required",
        description: "Please sign in to book tickets",
        variant: "destructive",
      });
      navigate("/");
      return false;
    }
    
    if (!isProfileComplete) {
      toast({
        title: "Complete your profile",
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
    checkAuth();
  }, [checkAuth, isAuthenticated, isProfileComplete]);
  
  // If still loading data, show loading indicator
  if (isDataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-red-50">
        <div className="text-center">
          <p className="text-xl text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }
  
  // If no movie or showtime data found after loading
  if (!movie || !showtime) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-red-50">
        <div className="text-center">
          <p className="text-xl text-red-600">Movie or showtime not found</p>
          <Button 
            onClick={() => navigate("/")}
            className="mt-4 bg-red-600 hover:bg-red-700"
          >
            Return to Home
          </Button>
        </div>
      </div>
    );
  }
  
  const handleSeatClick = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatId));
    } else {
      // Limit to 10 seats per booking
      if (selectedSeats.length >= 10) {
        toast({
          title: "Maximum seats reached",
          description: "You can select up to 10 seats per booking",
          variant: "destructive",
        });
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };
  
  const handleSnacksSelected = (snacks: SnackOrder[]) => {
    setSelectedSnacks(snacks);
    setBookingStep('payment');
  };
  
  const handleProceedToPayment = () => {
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
    
    // Create a booking object with explicit typing for status
    const newBooking = {
      id: Date.now().toString(),
      userId: user?.id || "",
      movieId: movieId || "",
      showtimeId: showtimeId || "",
      seats: selectedSeats,
      snacks: selectedSnacks,
      totalAmount: totalAmount,
      theater: showtime.theater,
      date: new Date(showtime.date).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }),
      time: showtime.time,
      bookingDate: new Date().toISOString(),
      status: "pending" as "confirmed" | "cancelled" | "pending"
    };

    console.log("Creating new booking:", newBooking);
    
    // Safely store booking data in localStorage
    try {
      localStorage.setItem("currentBooking", JSON.stringify(newBooking));
      
      // Navigate to payment page
      setTimeout(() => {
        setIsLoading(false);
        if (movieId && showtimeId) {
          navigate(`/payment/${movieId}/${showtimeId}`);
        } else {
          toast({
            title: "Navigation error",
            description: "Could not navigate to payment page",
            variant: "destructive",
          });
        }
      }, 1000);
    } catch (error) {
      console.error("Error saving booking data:", error);
      toast({
        title: "Booking error",
        description: "Could not save booking data",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };
  
  // Mock seats for demonstration
  const seatRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const seatsPerRow = 12;
  
  // Generate seats based on rows and columns
  const generateSeats = () => {
    // Create categories with different sections
    const categories = [
      { name: 'SILVER', rows: ['A', 'B', 'C', 'D'], price: ticketPrice },
      { name: 'GOLD', rows: ['E', 'F'], price: ticketPrice + 50 },
      { name: 'PLATINUM', rows: ['G', 'H'], price: ticketPrice + 100 },
    ];
    
    // Generate all seats with unavailable ones
    const unavailableSeats = new Set();
    // Randomly mark some seats as unavailable
    for (let i = 0; i < 20; i++) {
      const row = seatRows[Math.floor(Math.random() * seatRows.length)];
      const seatNum = Math.floor(Math.random() * seatsPerRow) + 1;
      unavailableSeats.add(`${row}${seatNum}`);
    }
    
    return { categories, unavailableSeats };
  };
  
  const { categories, unavailableSeats } = generateSeats();
  
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
                  <CreditCard className="h-4 w-4" />
                </div>
                <span className={`text-sm font-medium ${
                  bookingStep === 'payment' ? 'text-red-600' : 'text-gray-400'
                }`}>Payment</span>
              </div>
            </div>
          </div>
          
          {/* Seat selection */}
          {bookingStep === 'seats' && (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-red-100 p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-bold text-red-600">Select Your Seats</h2>
              
              <div className="mb-8 py-4 px-2 bg-gray-100 rounded-lg">
                <div className="w-full h-4 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded mb-6"></div>
                <p className="text-center text-sm text-gray-500 mb-2">SCREEN</p>
              </div>
              
              <div className="space-y-6">
                {categories.map((category) => (
                  <div key={category.name} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-600">{category.name}</h3>
                      <span className="text-sm text-red-600 font-medium">₹{category.price}</span>
                    </div>
                    
                    <div className="grid gap-y-3">
                      {category.rows.map((row) => (
                        <div key={row} className="flex items-center gap-1">
                          <div className="w-6 text-center text-sm font-medium text-gray-500">{row}</div>
                          <div className="flex-1 flex justify-center gap-1">
                            {Array.from({ length: seatsPerRow }, (_, i) => {
                              const seatId = `${row}${i + 1}`;
                              const isUnavailable = unavailableSeats.has(seatId);
                              const isSelected = selectedSeats.includes(seatId);
                              
                              return (
                                <button
                                  key={seatId}
                                  disabled={isUnavailable}
                                  onClick={() => handleSeatClick(seatId)}
                                  className={`w-7 h-7 rounded-t-md text-xs font-medium
                                    ${isUnavailable 
                                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                      : isSelected
                                        ? 'bg-red-600 text-white'
                                        : 'bg-white border border-gray-300 hover:border-red-400 text-gray-700'
                                    }`}
                                >
                                  {i + 1}
                                </button>
                              );
                            })}
                          </div>
                          <div className="w-6"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 flex justify-between items-center">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 rounded-t-md bg-white border border-gray-300"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 rounded-t-md bg-red-600"></div>
                    <span>Selected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 rounded-t-md bg-gray-200"></div>
                    <span>Unavailable</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-gray-600">Selected: {selectedSeats.length} seats</p>
                  <p className="font-medium">Subtotal: ₹{ticketsTotal}</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button 
                  onClick={() => selectedSeats.length > 0 ? setBookingStep('snacks') : null}
                  disabled={selectedSeats.length === 0}
                  className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
                >
                  Continue <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          {/* Snack selection */}
          {bookingStep === 'snacks' && (
            <div className="bg-white/90 backdrop-blur-sm rounded-xl border border-red-100 p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-bold text-red-600">Add Snacks & Beverages</h2>
              
              <SnackSelector onSnacksSelected={handleSnacksSelected} />
              
              <div className="flex justify-between mt-6">
                <Button 
                  variant="outline"
                  onClick={() => setBookingStep('seats')}
                  className="border-red-200 text-red-600"
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button 
                  onClick={() => setBookingStep('payment')}
                  className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
                >
                  Continue <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
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
                        <span>{`${snackOrder.quantity}x ${snackOrder.name || `Item #${snackOrder.snackId}`}`}</span>
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
                  onClick={handleProceedToPayment} 
                  disabled={selectedSeats.length === 0 || isLoading}
                  className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
                >
                  {isLoading ? "Processing..." : "Proceed to Payment"}
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

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getMovieById } from "@/data/movies";
import { CheckCircle, XCircle, Wallet, QrCode, CreditCard, Loader2, Calendar, MapPin, Ticket, Popcorn } from "lucide-react";
import { Card } from "@/components/ui/card";

const PaymentPage = () => {
  const { movieId, showtimeId, bookingId } = useParams<{ 
    movieId: string; 
    showtimeId: string; 
    bookingId: string;
  }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'success' | 'failure'>('idle');
  
  const movie = movieId ? getMovieById(movieId) : null;
  
  // Get booking details from localStorage
  const bookingData = localStorage.getItem('currentBooking') 
    ? JSON.parse(localStorage.getItem('currentBooking') || '{}')
    : null;
  
  useEffect(() => {
    if (!bookingData) {
      toast({
        title: "No booking found",
        description: "Please start the booking process again",
        variant: "destructive",
      });
      navigate("/");
    }
    
    // Auto-scroll to top
    window.scrollTo(0, 0);
  }, [bookingData, navigate, toast]);
  
  const handlePayment = () => {
    setIsProcessing(true);
    
    // Validate payment method
    if (paymentMethod === 'upi' && (!upiId || !upiId.includes('@'))) {
      toast({
        title: "Invalid UPI ID",
        description: "Please enter a valid UPI ID (e.g., name@upi)",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }
    
    if (paymentMethod === 'card') {
      if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
        toast({
          title: "Invalid Card Number",
          description: "Please enter a valid 16-digit card number",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }
      
      if (!cardName) {
        toast({
          title: "Invalid Name",
          description: "Please enter the name on your card",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }
      
      if (!cardExpiry || !cardExpiry.includes('/')) {
        toast({
          title: "Invalid Expiry Date",
          description: "Please enter a valid expiry date (MM/YY)",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }
      
      if (!cardCvv || cardCvv.length < 3) {
        toast({
          title: "Invalid CVV",
          description: "Please enter a valid CVV code",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }
    }
    
    // Simulate payment processing
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // 80% chance of success
      
      if (isSuccess) {
        setPaymentStatus('success');
        
        // Create a transaction ID
        const transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        
        // Update the booking with payment information
        if (bookingData) {
          const updatedBooking = {
            ...bookingData,
            paymentMethod: paymentMethod,
            transactionId: transactionId,
            paymentDate: new Date().toISOString(),
            paymentStatus: 'confirmed'
          };
          
          // Save updated booking to localStorage
          localStorage.setItem('currentBooking', JSON.stringify(updatedBooking));
          
          // Save to booking history
          const existingBookings = JSON.parse(localStorage.getItem("userBookings") || "[]");
          localStorage.setItem("userBookings", JSON.stringify([updatedBooking, ...existingBookings]));
        }
        
        // Show success notification
        toast({
          title: "Payment Successful!",
          description: `Transaction ID: ${transactionId}`,
        });
        
        // Redirect to booking confirmation after 2 seconds
        setTimeout(() => {
          navigate("/bookings");
        }, 2000);
      } else {
        setPaymentStatus('failure');
        toast({
          title: "Payment Failed",
          description: "Please try again or use a different payment method",
          variant: "destructive",
        });
      }
      
      setIsProcessing(false);
    }, 2000);
  };

  const getSnackName = (snackId: string) => {
    const snacks: Record<string, string> = {
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
    return snacks[snackId] || `Snack #${snackId}`;
  };
  
  if (!movie || !bookingData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Complete Your Payment</h1>
            <p className="mt-2 text-gray-600">Secure checkout for your movie tickets</p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Booking Summary */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-0 shadow-sm">
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <img 
                      src={movie.posterUrl} 
                      alt={movie.title} 
                      className="w-20 h-28 rounded-lg object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-movie.jpg";
                      }}
                    />
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{movie.title}</h2>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-red-500" />
                          <span>{bookingData.date} at {bookingData.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-red-500" />
                          <span>{bookingData.theater}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Ticket className="h-4 w-4 text-red-500" />
                          <span>Seats: {bookingData.seats?.join(", ")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {bookingData.snacks && bookingData.snacks.length > 0 && (
                    <div className="mt-6 pt

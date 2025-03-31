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
import { CheckCircle, XCircle, Wallet, QrCode, CreditCard } from "lucide-react";

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
      if (!cardNumber || cardNumber.length < 16) {
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
  
  if (!movie || !bookingData) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold md:text-3xl text-red-600">Payment</h1>
            <p className="mt-2 text-gray-600">
              Complete your payment for <span className="font-semibold">{movie.title}</span>
            </p>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <h2 className="font-medium text-gray-800">Booking Summary</h2>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Movie</span>
                  <span className="font-medium">{movie.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date & Time</span>
                  <span>{bookingData.date} at {bookingData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Seats</span>
                  <span>{bookingData.seats?.join(", ")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Theater</span>
                  <span>{bookingData.theater}</span>
                </div>
                {bookingData.snacks && bookingData.snacks.length > 0 && (
                  <>
                    <div className="flex justify-between pt-2">
                      <span className="text-gray-600">Snacks & Beverages</span>
                      <span></span>
                    </div>
                    {bookingData.snacks.map((snack: any, index: number) => (
                      <div key={index} className="flex justify-between pl-4 text-sm">
                        <span>{`${snack.quantity}x Item #${snack.snackId}`}</span>
                        <span>₹{(snack.quantity * snack.price).toFixed(0)}</span>
                      </div>
                    ))}
                  </>
                )}
                <div className="pt-2 border-t mt-2">
                  <div className="flex justify-between font-medium">
                    <span>Total Amount</span>
                    <span className="text-red-600">₹{bookingData.totalAmount.toFixed(0)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Options */}
            <div className="mt-8">
              <Tabs defaultValue="upi" onValueChange={(value) => setPaymentMethod(value as 'upi' | 'card')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upi" className="flex items-center gap-2">
                    <Wallet className="h-4 w-4" />
                    UPI Payment
                  </TabsTrigger>
                  <TabsTrigger value="card" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Card Payment
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="upi" className="mt-4">
                  <div className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="upi-id">UPI ID</Label>
                          <Input
                            id="upi-id"
                            placeholder="yourname@upi"
                            className="mt-1"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                          />
                          <p className="mt-1 text-xs text-gray-500">
                            Example: name@okhdfcbank, name@ybl
                          </p>
                        </div>
                        
                        <Button 
                          onClick={handlePayment} 
                          disabled={isProcessing || paymentStatus === 'success'}
                          className="mt-4 w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
                        >
                          {isProcessing ? "Processing..." : "Pay ₹" + bookingData.totalAmount.toFixed(0)}
                        </Button>
                      </div>
                      
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="relative bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
                          <QrCode className="mx-auto h-52 w-52 text-gray-300" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <img 
                              src="https://cdn.pixabay.com/photo/2021/06/17/08/45/upi-6342471_1280.png" 
                              alt="UPI QR Code" 
                              className="h-48 w-48 object-contain"
                            />
                          </div>
                        </div>
                        <p className="text-sm text-center text-gray-600">
                          Scan this QR code with any UPI app to pay
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="card" className="mt-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="card-number">Card Number</Label>
                      <Input
                        id="card-number"
                        placeholder="1234 5678 9012 3456"
                        className="mt-1"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').substring(0, 16))}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="card-name">Name on Card</Label>
                      <Input
                        id="card-name"
                        placeholder="John Doe"
                        className="mt-1"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          className="mt-1"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          className="mt-1"
                          type="password"
                          maxLength={3}
                          value={cardCvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handlePayment} 
                      disabled={isProcessing || paymentStatus === 'success'}
                      className="mt-4 w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
                    >
                      {isProcessing ? "Processing..." : "Pay ₹" + bookingData.totalAmount.toFixed(0)}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Payment status */}
            {paymentStatus === 'success' && (
              <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-lg flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <div>
                  <h3 className="font-medium text-green-800">Payment Successful!</h3>
                  <p className="text-sm text-green-600">Redirecting you to your bookings...</p>
                </div>
              </div>
            )}
            
            {paymentStatus === 'failure' && (
              <div className="mt-6 p-4 bg-red-50 border border-red-100 rounded-lg flex items-center gap-3">
                <XCircle className="h-6 w-6 text-red-500" />
                <div>
                  <h3 className="font-medium text-red-800">Payment Failed</h3>
                  <p className="text-sm text-red-600">Please try again or use a different payment method.</p>
                </div>
              </div>
            )}
            
            <div className="mt-6 text-xs text-gray-500">
              <p>* This is a simulated payment system for demonstration purposes.</p>
              <p>* No actual payment will be processed.</p>
              <p>* For UPI payments, any text with '@' will be considered valid.</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentPage;

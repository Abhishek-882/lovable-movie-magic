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
import { CheckCircle, XCircle, Wallet, QrCode, CreditCard, Loader2, Ticket, Popcorn } from "lucide-react";
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
                    <div className="mt-6 pt-6 border-t">
                      <h3 className="flex items-center gap-2 font-medium text-gray-900">
                        <Popcorn className="h-5 w-5 text-red-500" />
                        Snacks & Beverages
                      </h3>
                      <div className="mt-3 space-y-2">
                        {bookingData.snacks.map((snack: any, index: number) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              {snack.quantity}x {getSnackName(snack.snackId)}
                            </span>
                            <span className="font-medium">₹{(snack.quantity * snack.price).toFixed(0)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">Total Amount</span>
                      <span className="text-2xl font-bold text-red-600">₹{bookingData.totalAmount.toFixed(0)}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Payment Options */}
              <Card className="border-0 shadow-sm">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
                  
                  <Tabs defaultValue="upi" onValueChange={(value) => setPaymentMethod(value as 'upi' | 'card')}>
                    <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                      <TabsTrigger value="upi" className="flex items-center gap-2 data-[state=active]:bg-white">
                        <Wallet className="h-4 w-4" />
                        UPI
                      </TabsTrigger>
                      <TabsTrigger value="card" className="flex items-center gap-2 data-[state=active]:bg-white">
                        <CreditCard className="h-4 w-4" />
                        Credit/Debit Card
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="upi" className="mt-6">
                      <div className="space-y-6">
                        <div>
                          <Label htmlFor="upi-id" className="text-gray-700">UPI ID</Label>
                          <Input
                            id="upi-id"
                            placeholder="yourname@upi"
                            className="mt-2 h-12"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                          />
                          <p className="mt-2 text-xs text-gray-500">
                            Example: name@okhdfcbank, name@ybl
                          </p>
                        </div>
                        
                        <div className="flex flex-col items-center space-y-4">
                          <div className="relative bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                            <QrCode className="mx-auto h-48 w-48 text-gray-300" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" 
                                alt="UPI QR Code" 
                                className="h-44 w-44 object-contain"
                              />
                            </div>
                          </div>
                          <p className="text-sm text-center text-gray-600">
                            Scan this QR code with any UPI app to pay
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="card" className="mt-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="card-number" className="text-gray-700">Card Number</Label>
                          <Input
                            id="card-number"
                            placeholder="1234 5678 9012 3456"
                            className="mt-2 h-12"
                            value={cardNumber}
                            onChange={(e) => {
                              const value = e.target.value.replace(/\D/g, '');
                              const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
                              setCardNumber(formatted.substring(0, 19));
                            }}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="card-name" className="text-gray-700">Name on Card</Label>
                          <Input
                            id="card-name"
                            placeholder="John Doe"
                            className="mt-2 h-12"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry" className="text-gray-700">Expiry Date</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              className="mt-2 h-12"
                              value={cardExpiry}
                              onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, '');
                                if (value.length > 2) {
                                  value = value.substring(0, 2) + '/' + value.substring(2, 4);
                                }
                                setCardExpiry(value.substring(0, 5));
                              }}
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="cvv" className="text-gray-700">CVV</Label>
                            <Input
                              id="cvv"
                              placeholder="•••"
                              className="mt-2 h-12"
                              type="password"
                              maxLength={3}
                              value={cardCvv}
                              onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 3))}
                            />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  {/* Payment Button */}
                  <Button 
                    onClick={handlePayment} 
                    disabled={isProcessing || paymentStatus === 'success'}
                    className="mt-8 w-full h-12 text-lg bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 shadow-md"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Pay ₹${bookingData.totalAmount.toFixed(0)}`
                    )}
                  </Button>
                  
                  {/* Payment status */}
                  {paymentStatus === 'success' && (
                    <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                      <CheckCircle className="h-6 w-6 text-green-500" />
                      <div>
                        <h3 className="font-medium text-green-800">Payment Successful!</h3>
                        <p className="text-sm text-green-600">Redirecting you to your bookings...</p>
                      </div>
                    </div>
                  )}
                  
                  {paymentStatus === 'failure' && (
                    <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
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
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Payment Security Info */}
            <div className="space-y-6">
              <Card className="border-0 shadow-sm">
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Secure Payment</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">100% Secure Payments</p>
                        <p className="mt-1">All transactions are encrypted and secure</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">PCI DSS Compliant</p>
                        <p className="mt-1">We adhere to the highest security standards</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">Multiple Payment Options</p>
                        <p className="mt-1">Credit/Debit Cards, UPI, Net Banking</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="border-0 shadow-sm">
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Need Help?</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>For any payment related queries, please contact our customer support.</p>
                    <div className="flex items-center gap-2 text-red-600 font-medium">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <span>1800-123-4567</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-600 font-medium">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>support@cinemagic.com</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentPage;

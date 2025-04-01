import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { useNavigate } from "react-router-dom"
import { getMovieById, getShowtimeById } from "@/data/movies"
import { Booking, SnackOrder } from "@/lib/types"
import { QrCode, Calendar, Clock, MapPin, CreditCard, Popcorn, Download } from "lucide-react"
import { EmptyState } from "@/components/EmptyState"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

type EnhancedBooking = Booking & {
  movieTitle: string
  theaterName: string
  showDate: string
  showTime: string
  posterUrl: string
  qrCode: string
  snackDetails?: { name: string; quantity: number; price: number }[]
}

export const BookingHistoryPage = () => {
  const { isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [bookings, setBookings] = useState<EnhancedBooking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
      return
    }
    
    const fetchBookings = async () => {
      if (!user) return
      
      setIsLoading(true)
      
      try {
        const storedBookings = localStorage.getItem("userBookings")
        
        if (storedBookings) {
          const parsedBookings = JSON.parse(storedBookings)
          
          const enhancedBookings = await Promise.all(parsedBookings.map(async (booking: any) => {
            const movie = getMovieById(booking.movieId)
            const showtime = getShowtimeById(booking.showtimeId)
            
            const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
              `Booking\nID: ${booking.id}\nMovie: ${movie?.title || ''}\nTheater: ${showtime?.theater || ''}`
            )}`
            
            const snackDetails = booking.snacks?.map((snack: SnackOrder) => ({
              name: getSnackName(snack.snackId),
              quantity: snack.quantity,
              price: snack.price
            }))
            
            return {
              ...booking,
              status: booking.status === "pending" ? "confirmed" : booking.status,
              movieTitle: movie?.title || "Unknown Movie",
              theaterName: showtime?.theater || "Unknown Theater",
              showDate: showtime?.date || booking.bookingDate.split("T")[0],
              showTime: showtime?.time || "Unknown Time",
              posterUrl: movie?.posterUrl || "/placeholder-movie.jpg",
              qrCode: qrCodeUrl,
              snackDetails
            }
          })
          
          setBookings(enhancedBookings)
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load bookings",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchBookings()
  }, [isAuthenticated, navigate, user, toast])

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
    }
    return snacks[snackId] || `Snack #${snackId}`
  }

  const handleDownloadTicket = (bookingId: string) => {
    toast({
      title: "Download Started",
      description: "Your ticket will be downloaded shortly",
    })
  }

  const handleCancelBooking = async (bookingId: string) => {
    try {
      setBookings(prev => 
        prev.map(b => 
          b.id === bookingId 
            ? { ...b, status: "cancelled" } 
            : b
        )
      )
      
      const updatedBookings = bookings.map(b => 
        b.id === bookingId ? { ...b, status: "cancelled" } : b
      )
      localStorage.setItem("userBookings", JSON.stringify(updatedBookings))
      
      toast({
        title: "Booking Cancelled",
        description: "Refund will be processed in 5-7 business days",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel booking",
        variant: "destructive"
      })
    }
  }

  if (!isAuthenticated) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 md:px-6">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
            <p className="text-gray-600 mt-1">View and manage your bookings</p>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate("/movies")}
            className="border-red-500 text-red-500 hover:bg-red-50"
          >
            Book More Tickets
          </Button>
        </div>
        
        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="overflow-hidden border border-gray-200">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex justify-between">
                    <Skeleton className="h-24 w-24 rounded-md" />
                    <Skeleton className="h-10 w-20 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : bookings.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {bookings.map(booking => (
              <Card key={booking.id} className="overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  <img
                    src={booking.posterUrl}
                    alt={booking.movieTitle}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder-movie.jpg"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{booking.movieTitle}</h3>
                    <p className="text-sm opacity-90">
                      {new Date(booking.showDate).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant={booking.status === 'confirmed' ? 'success' : 'destructive'}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-4 space-y-4">
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-red-500" />
                      <span>{booking.theaterName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-red-500" />
                      <span>
                        {new Date(booking.showDate).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-red-500" />
                      <span>{booking.showTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5h14a2 2 0 011.997 1.923l.003.077v4a2 2 0 01-1.854 1.995L19 13H5a2 2 0 01-1.997-1.923L3 11V7a2 2 0 011.854-1.995L5 5z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13v2a2 2 0 01-1.85 1.995L17 17H7a2 2 0 01-1.995-1.85L5 15v-2" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12v5" />
                      </svg>
                      <span>Seats: {booking.seats.join(", ")}</span>
                    </div>
                    
                    {booking.snackDetails?.length > 0 && (
                      <div className="flex items-start gap-2 pt-1">
                        <Popcorn className="h-4 w-4 text-red-500 mt-0.5" />
                        <div className="space-y-1">
                          {booking.snackDetails.map((snack, idx) => (
                            <div key={idx} className="text-sm">
                              {snack.quantity}x {snack.name} (₹{snack.price})
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 pt-2">
                      <CreditCard className="h-4 w-4 text-red-500" />
                      <span className="font-medium">Total: ₹{booking.totalAmount.toFixed(0)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex flex-col items-center">
                      <img 
                        src={booking.qrCode} 
                        alt="Booking QR Code" 
                        className="h-20 w-20 border border-gray-200 rounded-md"
                      />
                      <span className="text-xs text-gray-500 mt-1">Scan at theater</span>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        className="gap-1 text-sm"
                        onClick={() => handleDownloadTicket(booking.id)}
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                      
                      {booking.status === 'confirmed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 text-sm border-red-500 text-red-500 hover:bg-red-50"
                          onClick={() => handleCancelBooking(booking.id)}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<QrCode className="h-10 w-10 text-gray-400" />}
            title="No bookings yet"
            description="You haven't booked any movie tickets yet."
            action="Browse Movies"
            actionProps={{
              onClick: () => navigate("/movies"),
              className: "bg-red-600 hover:bg-red-700"
            }}
          />
        )}
      </main>
      
      <Footer />
    </div>
  )
}

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import MoviePage from "./pages/MoviePage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import BookingPage from "./pages/BookingPage";
import BookingHistoryPage from "./pages/BookingHistoryPage";
import PaymentPage from "./pages/PaymentPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider delayDuration={300}>
        <Toaster />
        <Sonner position="top-center" richColors />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/movie/:id" element={<MoviePage />} />
            <Route path="/movies/coming-soon" element={<Index showComingSoon />} />
            <Route path="/movies" element={<Index />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route 
              path="/booking/:movieId/:showtimeId" 
              element={<BookingPage />} 
            />
            <Route 
              path="/payment/:movieId/:showtimeId" 
              element={<PaymentPage />} 
            />
            <Route path="/bookings" element={<BookingHistoryPage />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

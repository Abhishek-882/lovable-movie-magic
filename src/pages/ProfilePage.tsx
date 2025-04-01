import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserProfile from "@/components/UserProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProfilePage = () => {
  const { isAuthenticated, isProfileComplete, isEmailVerified } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
    
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated) return null;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">My Account</h1>
            <p className="text-gray-600 mt-2">Manage your profile and preferences</p>
          </div>
          
          {(!isProfileComplete || !isEmailVerified) && (
            <Alert variant="warning" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Account Setup Required</AlertTitle>
              <AlertDescription>
                {!isProfileComplete && "Please complete your profile information. "}
                {!isEmailVerified && "Email verification is required before you can make bookings."}
              </AlertDescription>
            </Alert>
          )}
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="mt-0">
              <UserProfile />
            </TabsContent>
            
            <TabsContent value="preferences" className="mt-0">
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold">My Preferences</h2>
                
                <div className="space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">Email notifications</p>
                          <p className="text-sm text-gray-600">Receive updates about bookings and promotions</p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input type="checkbox" checked className="peer sr-only" />
                          <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">SMS notifications</p>
                          <p className="text-sm text-gray-600">Get booking confirmations via SMS</p>
                        </div>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input type="checkbox" className="peer sr-only" />
                          <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-600 peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Movie Preferences</h3>
                    <div className="space-y-6">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <label className="mb-2 block font-medium">Favorite Genres</label>
                        <div className="flex flex-wrap gap-3">
                          {["Action", "Comedy", "Drama", "Thriller", "Sci-Fi", "Romance"].map(genre => (
                            <Button
                              key={genre}
                              variant="outline"
                              className="rounded-full"
                            >
                              {genre}
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <label className="mb-2 block font-medium">Preferred Language</label>
                        <div className="flex flex-wrap gap-3">
                          {["English", "Hindi", "Telugu", "Tamil", "Malayalam", "Kannada"].map(lang => (
                            <Button
                              key={lang}
                              variant="outline"
                              className="rounded-full"
                            >
                              {lang}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;

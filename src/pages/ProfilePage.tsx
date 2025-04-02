import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserProfile from "@/components/UserProfile";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-24 md:px-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-3xl font-bold tracking-tight md:text-4xl">My Account</h1>
          
          {(!isProfileComplete || !isEmailVerified) && (
            <Alert variant="destructive" className="mb-6 bg-amber-50 text-amber-800 border-amber-200">
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
              <div className="rounded-lg border bg-card p-6 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold">My Preferences</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-3 text-lg font-medium">Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Email notifications</span>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input type="checkbox" checked className="peer sr-only" />
                          <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>SMS notifications</span>
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input type="checkbox" className="peer sr-only" />
                          <div className="h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="mb-3 text-lg font-medium">Movie Preferences</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="mb-1 block text-sm font-medium">Favorite Genres</label>
                        <div className="flex flex-wrap gap-2">
                          {["Action", "Comedy", "Drama", "Thriller", "Sci-Fi", "Romance"].map(genre => (
                            <div key={genre} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`genre-${genre}`}
                                className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                              />
                              <label htmlFor={`genre-${genre}`} className="ml-2 text-sm">{genre}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="mb-1 block text-sm font-medium">Preferred Language</label>
                        <div className="flex flex-wrap gap-4">
                          {["English", "Hindi", "Telugu", "Tamil", "Malayalam", "Kannada"].map(lang => (
                            <div key={lang} className="flex items-center">
                              <input
                                type="radio"
                                name="language"
                                id={`lang-${lang}`}
                                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                              />
                              <label htmlFor={`lang-${lang}`} className="ml-2 text-sm">{lang}</label>
                            </div>
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

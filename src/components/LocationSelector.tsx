
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

// Popular cities in India for movie bookings
const popularCities = [
  { id: "hyd", name: "Hyderabad" },
  { id: "ban", name: "Bangalore" },
  { id: "mum", name: "Mumbai" },
  { id: "del", name: "Delhi" },
  { id: "che", name: "Chennai" },
  { id: "kol", name: "Kolkata" },
  { id: "viz", name: "Visakhapatnam" },
  { id: "tir", name: "Tirupati" },
  { id: "vij", name: "Vijayawada" },
  { id: "war", name: "Warangal" },
  { id: "sec", name: "Secunderabad" },
  { id: "kak", name: "Kakinada" },
  { id: "gun", name: "Guntur" },
  { id: "ell", name: "Eluru" },
  { id: "raj", name: "Rajahmundry" },
  { id: "pun", name: "Pune" },
  { id: "ahm", name: "Ahmedabad" },
  { id: "noi", name: "Noida" },
  { id: "luc", name: "Lucknow" },
  { id: "koc", name: "Kochi" }
];

const LocationSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter cities based on search query
  const filteredCities = popularCities.filter(city => 
    city.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Load saved location from localStorage on component mount
  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      setCurrentLocation(savedLocation);
    } else {
      // Default to Hyderabad if no location is saved
      setCurrentLocation("Hyderabad");
      localStorage.setItem("userLocation", "Hyderabad");
    }
  }, []);
  
  const handleCitySelect = (cityName: string) => {
    setCurrentLocation(cityName);
    localStorage.setItem("userLocation", cityName);
    setIsOpen(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-1 text-sm">
          <MapPin className="h-4 w-4" />
          <span>{currentLocation || "Select Location"}</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Choose your location</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <Input
            placeholder="Search for your city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4"
          />
          
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {filteredCities.map(city => (
              <Button
                key={city.id}
                variant="outline"
                className={`justify-start ${
                  currentLocation === city.name ? "border-primary bg-primary/10" : ""
                }`}
                onClick={() => handleCitySelect(city.name)}
              >
                {city.name}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationSelector;

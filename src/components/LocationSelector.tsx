import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";

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
  { id: "koc", name: "Kochi" },
  { id: "jus", name: "Jamshedpur" },
  { id: "pat", name: "Patna" },
  { id: "jai", name: "Jaipur" },
  { id: "ind", name: "Indore" },
  { id: "bho", name: "Bhopal" },
  { id: "nag", name: "Nagpur" },
  { id: "tvm", name: "Thiruvananthapuram" },
  { id: "coi", name: "Coimbatore" },
  { id: "mad", name: "Madurai" },
  { id: "kan", name: "Kanpur" }
];

// Cinema theater chains in India
const theaterChains = {
  "Hyderabad": [
    "PVR ICON: GVK One Mall",
    "INOX: Hyderabad Central",
    "Cinepolis: Sudha Multiplex",
    "AMB Cinemas: Gachibowli",
    "Prasads Multiplex: Tank Bund",
    "Asian Mukta Cinemas: Miyapur",
    "Sudarshan 35MM: RTC X Roads",
    "Devi 70MM: RTC X Roads",
    "Sandhya 70MM: RTC X Roads",
    "PVR: Irrum Manzil",
    "Miraj Cinemas: Balanagar",
    "Asian M Cube: Attapur"
  ],
  "Bangalore": [
    "PVR: Forum Mall",
    "INOX: Garuda Mall",
    "Cinepolis: Orion Mall",
    "PVR Gold: Phoenix Mall",
    "Innovative Multiplex: Marathahalli",
    "Urvashi Theatre: Lalbagh Road",
    "INOX: Mantri Square Mall",
    "PVR: GT World Mall",
    "Cinepolis: Nexus Mall"
  ],
  "Mumbai": [
    "PVR ICON: Phoenix Palladium",
    "INOX: R-City Mall",
    "Cinepolis: Andheri West",
    "PVR: Juhu",
    "Carnival Cinemas: IMAX Wadala",
    "Regal Cinema: Colaba",
    "PVR: Goregaon",
    "PVR ICON: Versova",
    "Metro INOX: Marine Lines"
  ],
  "Delhi": [
    "PVR: Select Citywalk",
    "PVR Director's Cut: Ambience Mall",
    "INOX: Nehru Place",
    "Cinepolis: DLF Place",
    "Wave Cinemas: Raja Garden"
  ],
  "Chennai": [
    "PVR: VR Mall",
    "SPI Cinemas: Sathyam",
    "INOX: Phoenix Market City",
    "Palazzo Cinemas: Forum Vijaya Mall",
    "AGS Cinemas: T. Nagar"
  ],
  "Kolkata": [
    "INOX: South City Mall",
    "PVR: Diamond Plaza",
    "Cinepolis: Acropolis Mall",
    "INOX: City Centre Salt Lake",
    "PVR: Avani Mall"
  ],
  "Visakhapatnam": [
    "INOX: Varun Inox",
    "Cinepolis: CMR Central",
    "PVR: Dutt Island",
    "INOX: Chitralaya Mall",
    "SVC Cinemas: Jagadamba"
  ],
  "Tirupati": [
    "INOX: Leela Mahal",
    "PVR: Tirupati Central",
    "Cinepolis: SV Mall",
    "INOX: Reliance Trends",
    "SRS Cinemas: RTC Complex"
  ],
  "Vijayawada": [
    "INOX: Trendset Mall",
    "Cinepolis: PVP Square",
    "PVR: MVR Mall",
    "INOX: Ripples Mall",
    "SRS Cinemas: Besant Road"
  ],
  "Warangal": [
    "INOX: Hunter Road",
    "Cinepolis: Vasantha Mall",
    "PVR: Warangal Central",
    "INOX: MGM Mall",
    "SRS Cinemas: Cinema Road"
  ],
  "Secunderabad": [
    "PVR: MGB Mall",
    "INOX: Secunderabad Club",
    "Cinepolis: CCM Mall",
    "PVR: Paradise Circle",
    "SRS Cinemas: SD Road"
  ],
  "Kakinada": [
    "INOX: Surys Grand",
    "Cinepolis: Kakinada Central",
    "PVR: Kakinada Mall",
    "INOX: Main Road",
    "SRS Cinemas: Cinema Hall Road"
  ],
  "Guntur": [
    "INOX: Brodipet",
    "Cinepolis: Guntur Central",
    "PVR: Arundalpet",
    "INOX: JKC College Road",
    "SRS Cinemas: Lakshmipuram"
  ],
  "Eluru": [
    "INOX: Eluru City",
    "Cinepolis: RCM Mall",
    "PVR: Eluru Central",
    "INOX: Ashok Nagar",
    "SRS Cinemas: Powerpet"
  ],
  "Rajahmundry": [
    "INOX: Rajahmundry City",
    "Cinepolis: Innis Grand Mall",
    "PVR: Rajahmundry Central",
    "INOX: Gokavaram Bus Stand Road",
    "SRS Cinemas: Danavaipeta"
  ],
  "Pune": [
    "PVR ICON: Pavilion Mall",
    "INOX: Bund Garden Road",
    "Cinepolis: Seasons Mall",
    "PVR: Kumar Pacific Mall",
    "E-Square: University Road"
  ],
  "Ahmedabad": [
    "PVR: Acropolis Mall",
    "INOX: Alpha One Mall",
    "Cinepolis: Ahmedabad One",
    "PVR: Himalaya Mall",
    "Wide Angle: S.G. Highway"
  ],
  "Noida": [
    "PVR: Logix City Center",
    "INOX: The Great India Place",
    "Cinepolis: Grand Venice Mall",
    "PVR: Mall of India",
    "SRS Cinemas: Sector 18"
  ],
  "Lucknow": [
    "INOX: Fun Republic Mall",
    "Cinepolis: One Awadh Center",
    "PVR: Phoenix United Mall",
    "INOX: Wave Mall",
    "SRS Cinemas: Alambagh"
  ],
  "Kochi": [
    "PVR: Lulu Mall",
    "INOX: Centre Square Mall",
    "Cinepolis: Oberon Mall",
    "PVR: Gold Souk Grande",
    "SRS Cinemas: MG Road"
  ],
  "Jamshedpur": [
    "INOX: P&M Mall",
    "Cinepolis: City Centre",
    "PVR: Jamshedpur Central",
    "INOX: Bistupur",
    "SRS Cinemas: Sakchi"
  ],
  "Patna": [
    "INOX: Patna Central",
    "Cinepolis: P&M Mall",
    "PVR: Patna One Mall",
    "INOX: Regent Fun City Mall",
    "SRS Cinemas: Dak Bungalow Chauraha"
  ],
  "Jaipur": [
    "INOX: Crystal Palm Mall",
    "Cinepolis: World Trade Park",
    "PVR: Pink Square Mall",
    "INOX: Elements Mall",
    "SRS Cinemas: MI Road"
  ],
  "Indore": [
    "INOX: C21 Mall",
    "Cinepolis: Treasure Island Mall",
    "PVR: Phoenix Citadel",
    "INOX: Central Mall",
    "SRS Cinemas: MG Road"
  ],
  "Bhopal": [
    "INOX: DB City Mall",
    "Cinepolis: Aura Mall",
    "PVR: Bhopal Central",
    "INOX: Aashima Mall",
    "SRS Cinemas: MP Nagar"
  ],
  "Nagpur": [
    "INOX: Empress Mall",
    "Cinepolis: Eternity Mall",
    "PVR: Nagpur Central",
    "INOX: Jaswant Tuli Mall",
    "SRS Cinemas: Sitabuldi"
  ],
  "Thiruvananthapuram": [
    "PVR: Mall of Travancore",
    "INOX: Thiruvananthapuram Central",
    "Cinepolis: Space Mall",
    "PVR: Pothys Hyper",
    "SRS Cinemas: Statue Junction"
  ],
  "Coimbatore": [
    "INOX: Prozone Mall",
    "Cinepolis: Brookefields Mall",
    "PVR: Fun Republic Mall",
    "INOX: Coimbatore Central",
    "SRS Cinemas: Gandhipuram"
  ],
  "Madurai": [
    "INOX: Vishaal de Mall",
    "Cinepolis: Madurai Central",
    "PVR: Madurai Mall",
    "INOX: Anna Nagar",
    "SRS Cinemas: Town Hall Road"
  ],
  "Kanpur": [
    "INOX: Z Square Mall",
    "Cinepolis: Rave 3",
    "PVR: Kanpur Central",
    "INOX: Rave @ Moti Jheel",
    "SRS Cinemas: Swaroop Nagar"
  ]
};

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
        <Button variant="ghost" className="flex items-center gap-1 text-sm bg-gradient-to-r from-red-600/20 to-red-500/10 hover:from-red-600/30 hover:to-red-500/20 text-red-600">
          <MapPin className="h-4 w-4 text-red-600" />
          <span className="font-medium">{currentLocation || "Select Location"}</span>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md bg-gradient-to-b from-white to-red-50">
        <DialogHeader>
          <DialogTitle className="text-red-600 font-bold text-xl">Choose your location</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="relative mb-4">
            <Input
              placeholder="Search for your city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/80 backdrop-blur-sm border-red-100 focus-visible:ring-red-400"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-red-400" />
          </div>
          
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {filteredCities.map(city => (
              <Button
                key={city.id}
                variant="outline"
                className={`justify-start transition-all hover:scale-105 ${
                  currentLocation === city.name 
                    ? "border-red-500 bg-red-50 text-red-600 font-medium" 
                    : "bg-white/80 backdrop-blur-sm hover:border-red-200 hover:bg-red-50/50"
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

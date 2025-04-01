import { useEffect, useState } from "react";
import { getAvailableLocations } from "@/data/movies";

export const LocationSelector = () => {
  const [location, setLocation] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userLocation') || 'Hyderabad';
    }
    return 'Hyderabad';
  });

  const locations = getAvailableLocations();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocation = e.target.value;
    localStorage.setItem('userLocation', newLocation);
    setLocation(newLocation);
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <select 
      value={location} 
      onChange={handleChange}
      className="border rounded px-3 py-1 bg-white text-gray-800"
    >
      {locations.map(loc => (
        <option key={loc} value={loc}>{loc}</option>
      ))}
    </select>
  );
};

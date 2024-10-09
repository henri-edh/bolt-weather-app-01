import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useWeather } from '../contexts/WeatherContext';
import SearchBar from '../components/SearchBar';
import WeatherDisplay from '../components/WeatherDisplay';
import { MapPin, Plus, X } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { fetchWeather } = useWeather();
  const [savedLocations, setSavedLocations] = useState<string[]>([]);
  const [newLocation, setNewLocation] = useState('');

  useEffect(() => {
    const storedLocations = localStorage.getItem(`savedLocations_${user?.id}`);
    if (storedLocations) {
      setSavedLocations(JSON.parse(storedLocations));
    }
  }, [user]);

  const saveLocation = () => {
    if (newLocation && !savedLocations.includes(newLocation)) {
      const updatedLocations = [...savedLocations, newLocation];
      setSavedLocations(updatedLocations);
      localStorage.setItem(`savedLocations_${user?.id}`, JSON.stringify(updatedLocations));
      setNewLocation('');
    }
  };

  const removeLocation = (location: string) => {
    const updatedLocations = savedLocations.filter(loc => loc !== location);
    setSavedLocations(updatedLocations);
    localStorage.setItem(`savedLocations_${user?.id}`, JSON.stringify(updatedLocations));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Saved Locations</h2>
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
            placeholder="Add new location"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={saveLocation}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {savedLocations.map((location) => (
            <div key={location} className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
              <button
                onClick={() => fetchWeather(location)}
                className="flex items-center text-blue-500 hover:text-blue-700"
              >
                <MapPin size={16} className="mr-2" />
                {location}
              </button>
              <button
                onClick={() => removeLocation(location)}
                className="text-red-500 hover:text-red-700"
                aria-label={`Remove ${location}`}
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <SearchBar />
      <WeatherDisplay />
    </div>
  );
};

export default Dashboard;
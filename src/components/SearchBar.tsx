import React, { useState } from 'react';
import { useWeather } from '../contexts/WeatherContext';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [location, setLocation] = useState('');
  const { fetchWeather } = useWeather();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (location.trim()) {
      fetchWeather(location);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mb-6">
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter city name"
        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Search location"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Search"
      >
        <Search size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
import React from 'react';
import SearchBar from '../components/SearchBar';
import WeatherDisplay from '../components/WeatherDisplay';

const Home: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Welcome to Weather App</h1>
      <SearchBar />
      <WeatherDisplay />
    </div>
  );
};

export default Home;
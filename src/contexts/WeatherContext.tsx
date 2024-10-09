import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

interface WeatherContextType {
  currentWeather: any;
  forecast: any;
  fetchWeather: (location: string) => Promise<void>;
  error: string | null;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

const API_KEY = '865c4ad58c1d5dcbc43c83ca1d624bd8';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (location: string) => {
    try {
      const [currentResponse, forecastResponse] = await Promise.all([
        axios.get(`${BASE_URL}/weather?q=${location}&appid=${API_KEY}&units=metric`),
        axios.get(`${BASE_URL}/forecast?q=${location}&appid=${API_KEY}&units=metric`)
      ]);

      setCurrentWeather(currentResponse.data);
      setForecast(forecastResponse.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
      console.error('Error fetching weather data:', err);
    }
  };

  return (
    <WeatherContext.Provider value={{ currentWeather, forecast, fetchWeather, error }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
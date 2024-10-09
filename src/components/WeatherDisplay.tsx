import React from 'react';
import { useWeather } from '../contexts/WeatherContext';
import { Cloud, Droplet, Wind } from 'lucide-react';

const WeatherDisplay: React.FC = () => {
  const { currentWeather, forecast, error } = useWeather();

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!currentWeather) {
    return <div>Search for a location to see weather information.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Current Weather in {currentWeather.name}</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-4xl font-bold">{Math.round(currentWeather.main.temp)}°C</p>
            <p className="text-gray-600">{currentWeather.weather[0].description}</p>
          </div>
          <img
            src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
            alt={currentWeather.weather[0].description}
            className="w-20 h-20"
          />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="flex items-center">
            <Droplet className="mr-2" />
            <span>{currentWeather.main.humidity}% Humidity</span>
          </div>
          <div className="flex items-center">
            <Wind className="mr-2" />
            <span>{currentWeather.wind.speed} m/s Wind</span>
          </div>
          <div className="flex items-center">
            <Cloud className="mr-2" />
            <span>{currentWeather.clouds.all}% Clouds</span>
          </div>
        </div>
      </div>

      {forecast && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">5-Day Forecast</h2>
          <div className="grid grid-cols-5 gap-4">
            {forecast.list.filter((item: any, index: number) => index % 8 === 0).map((item: any) => (
              <div key={item.dt} className="text-center">
                <p>{new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                  alt={item.weather[0].description}
                  className="mx-auto"
                />
                <p className="font-bold">{Math.round(item.main.temp)}°C</p>
                <p className="text-sm">{item.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
'use client';

import { useState } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city: any, startDate: any, endDate: any, units: any, lang: any) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ city, startDate, endDate, units, lang });
      const response = await fetch(`/api/weather?${params}`);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setError('');
      } else {
        setError(data.error || 'Failed to fetch weather data');
      }
    } catch (err) {
      setError('An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-4">
      <h1 className="text-3xl font-bold text-center mb-6">🌦️ Open Weather App</h1>
      <SearchBar onSearch={handleSearch} loading={loading} />
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {weatherData && <WeatherDisplay data={weatherData} />}
    </div>
  );
}

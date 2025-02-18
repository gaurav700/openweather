'use client';

import { useState, useEffect } from 'react';
import { Search, Loader2 } from 'lucide-react';

export default function SearchBar({ onSearch, loading }) {

  useEffect(() => {

  }, []);

  const [city, setCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [units, setUnits] = useState('metric');
  const [lang, setLang] = useState('en');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city, startDate, endDate, units, lang);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-wrap lg:flex-nowrap md:flex-row items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg w-full max-w-4xxl mx-auto"
    >
      <div className="flex flex-col w-full md:w-1/3">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-3 border rounded w-full text-black dark:text-white dark:bg-gray-700"
          required
        />
      </div>
      <div className="flex flex-col w-full md:w-1/5">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-3 border rounded w-full text-black dark:text-white dark:bg-gray-700"
          suppressHydrationWarning={true}
        />
      </div>
      <div className="flex flex-col w-full md:w-1/5">
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-3 border rounded w-full text-black dark:text-white dark:bg-gray-700"
          suppressHydrationWarning={true}
        />
      </div>
      <div className="flex flex-col w-full md:w-1/6">
        <select
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          className="p-4 border rounded w-full text-black dark:text-white dark:bg-gray-700"
        >
          <option value="metric">Celsius (°C)</option>
          <option value="imperial">Fahrenheit (°F)</option>
        </select>
      </div>
      <div className="flex flex-col w-full md:w-1/4">
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="p-4 border rounded w-full text-black dark:text-white dark:bg-gray-700"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full md:w-auto p-4 bg-blue-500 hover:bg-blue-700 text-white rounded flex items-center justify-center gap-2"
      >
        {loading ? <Loader2 className="animate-spin" /> : <Search />}
        Search
      </button>
    </form>
  );
}

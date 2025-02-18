import { NextResponse } from 'next/server';

const cache = new Map();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const city = searchParams.get('city');
  const start = searchParams.get('startDate');
  const end = searchParams.get('endDate');
  const units = searchParams.get('units') || 'metric';
  const lang = searchParams.get('lang') || 'en';

  if (!city) {
    return NextResponse.json({ error: 'City is required' }, { status: 400 });
  }

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;

    if (!cache.has(geoUrl)) {
      const geoResponse = await fetch(geoUrl);
      if (!geoResponse.ok) {
        return NextResponse.json({ error: `Failed to fetch city coordinates: ${geoResponse.statusText}` }, { status: geoResponse.status });
      }
      const geoData = await geoResponse.json();
      cache.set(geoUrl, geoData);
    }

    const geoData = cache.get(geoUrl);
    if (!geoData.length) {
      return NextResponse.json({ error: `Invalid city: ${city}` }, { status: 400 });
    }

    const { lat, lon } = geoData[0];

    // Fetch Current Weather
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=${lang}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=${lang}`;

    const [currentWeatherResponse, forecastResponse] = await Promise.all([
      fetch(currentWeatherUrl),
      fetch(forecastUrl),
    ]);

    if (!currentWeatherResponse.ok || !forecastResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
    }

    const currentWeatherData = await currentWeatherResponse.json();
    const forecastData = await forecastResponse.json();

    let historicalData = null;
    if (start && end) {
      const startTime = Math.floor(new Date(start).getTime() / 1000);
      const endTime = Math.floor(new Date(end).getTime() / 1000);
      if (isNaN(startTime) || isNaN(endTime) || startTime <= 0 || endTime <= 0) {
        return NextResponse.json({ error: 'Invalid start or end timestamp' }, { status: 400 });
      }

      const historicalUrl = `https://history.openweathermap.org/data/2.5/history/city?lat=${lat}&lon=${lon}&type=hour&start=${startTime}&end=${endTime}&appid=${apiKey}`;
      const historicalResponse = await fetch(historicalUrl);
      if (historicalResponse.ok) {
        historicalData = await historicalResponse.json();
      }
    }

    return NextResponse.json({ currentWeatherData, forecastData, historicalData });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}

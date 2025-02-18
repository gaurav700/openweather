export default function WeatherDisplay({ data }) {
    if (!data) return null;
  
    const { currentWeatherData, forecastData, historicalData } = data;
  
    return (
      <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-black dark:text-white">
        {/* Current Weather */}
        <h2 className="text-2xl font-bold">{currentWeatherData.name}</h2>
        <p className="text-lg">Current Temperature: <strong>{currentWeatherData.main.temp}°</strong></p>
        <p>Humidity: {currentWeatherData.main.humidity}%</p>
        <p>Wind Speed: {currentWeatherData.wind.speed} m/s</p>
  
        {/* 5-Day Forecast */}
        <h3 className="mt-4 text-lg font-bold">5-Day Forecast</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {forecastData.list
            .filter((_, index) => index % 8 === 0)
            .map((forecast, index) => (
              <div
                key={index}
                className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg flex flex-col items-center"
              >
                <p className="text-sm">{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`}
                  alt="Weather icon"
                  className="w-12 h-12"
                />
                <p>{forecast.main.temp}°</p>
                <p className="text-sm">{forecast.weather[0].description}</p>
              </div>
            ))}
        </div>
  
        {/* Historical Data (if available) */}
        {historicalData && historicalData.list.length > 0 && (
          <>
            <h3 className="mt-4 text-lg font-bold">Historical Weather Data</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {historicalData.list.map((entry, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-300 dark:bg-gray-700 rounded-lg flex flex-col items-center"
                >
                  <p className="text-sm">{new Date(entry.dt * 1000).toLocaleDateString()}</p>
                  <img
                    src={`https://openweathermap.org/img/wn/${entry.weather[0].icon}.png`}
                    alt="Weather icon"
                    className="w-12 h-12"
                  />
                  <p>{entry.main.temp}°</p>
                  <p className="text-sm">{entry.weather[0].description}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
  
  
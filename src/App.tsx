import  React, { useEffect, useState } from 'react';
import { Globe } from 'lucide-react';
import { useWeatherStore } from './store/weatherStore';
import CityCard from './components/CityCard';
import CitySearch from './components/CitySearch';
import { Weather } from './types/weather';
import { getWeather } from './services/weather';

function App() {
  const { cities, addCity, removeCity, updateCityUnits } = useWeatherStore();
  const [weatherData, setWeatherData] = useState<Record<string, Weather>>({});

  useEffect(() => {
    const fetchWeatherData = async () => {
      const newWeatherData: Record<string, Weather> = {};
      
      for (const city of cities) {
        try {
          const weather = await getWeather(city.lat, city.lon, city.units);
          newWeatherData[city.id] = weather;
        } catch (error) {
          console.error(`Failed to fetch weather for ${city.name}:`, error);
        }
      }
      
      setWeatherData(newWeatherData);
    };

    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 300000); // Update every 5 minutes
    
    return () => clearInterval(interval);
  }, [cities]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Globe className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-800">Weather Dashboard</h1>
          </div>
          <CitySearch onCityAdd={addCity} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city) => (
            <CityCard
              key={city.id}
              city={city}
              weather={weatherData[city.id] || {
                temp: 0,
                feels_like: 0,
                humidity: 0,
                wind_speed: 0,
                description: 'Loading...',
                icon: '03d'
              }}
              onRemove={removeCity}
              onUnitToggle={updateCityUnits}
            />
          ))}
          
          {cities.length === 0 && (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 mb-2">No cities added yet</div>
              <div className="text-sm text-gray-500">
                Use the search bar above to add your first city
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
 
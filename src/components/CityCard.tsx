import  React from 'react';
import { format } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { MapPin, Thermometer, Wind, Droplets, Clock, Map as MapIcon, Trash2 } from 'lucide-react';
import { City, Weather } from '../types/weather';
import Map from './Map';

interface CityCardProps {
  city: City;
  weather: Weather;
  onRemove: (id: string) => void;
  onUnitToggle: (id: string, units: 'metric' | 'imperial') => void;
}

const CityCard: React.FC<CityCardProps> = ({ city, weather, onRemove, onUnitToggle }) => {
  const [showMap, setShowMap] = React.useState(false);

  const cityTime = formatInTimeZone(new Date(), city.timezone, 'HH:mm');
  const tempUnit = city.units === 'metric' ? '°C' : '°F';
  const speedUnit = city.units === 'metric' ? 'm/s' : 'mph';

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-semibold">{city.name}</h2>
            <span className="text-sm text-gray-500">{city.country}</span>
          </div>
          <div className="flex items-center mt-1 text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            <span>{cityTime}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowMap(!showMap)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <MapIcon className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => onRemove(city.id)}
            className="p-2 hover:bg-red-100 rounded-full"
          >
            <Trash2 className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>

      {showMap && (
        <div className="h-48 rounded-lg overflow-hidden">
          <Map lat={city.lat} lon={city.lon} />
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.description}
            className="w-16 h-16"
          />
          <div>
            <div className="text-3xl font-bold">
              {Math.round(weather.temp)}
              {tempUnit}
            </div>
            <div className="text-gray-500 capitalize">{weather.description}</div>
          </div>
        </div>
        <button
          onClick={() => onUnitToggle(city.id, city.units === 'metric' ? 'imperial' : 'metric')}
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full"
        >
          {city.units === 'metric' ? 'Switch to °F' : 'Switch to °C'}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center space-x-2">
          <Thermometer className="w-5 h-5 text-orange-500" />
          <div>
            <div className="text-sm text-gray-500">Feels like</div>
            <div>{Math.round(weather.feels_like)}{tempUnit}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Wind className="w-5 h-5 text-blue-500" />
          <div>
            <div className="text-sm text-gray-500">Wind</div>
            <div>{Math.round(weather.wind_speed)} {speedUnit}</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Droplets className="w-5 h-5 text-blue-400" />
          <div>
            <div className="text-sm text-gray-500">Humidity</div>
            <div>{weather.humidity}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityCard;
 
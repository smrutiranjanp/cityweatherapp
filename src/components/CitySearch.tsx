import  React, { useState, useCallback, useRef } from 'react';
import { Search, Plus, Loader } from 'lucide-react';
import { City } from '../types/weather';
import { searchCities } from '../services/weather';

interface CitySearchProps {
  onCityAdd: (city: City) => void;
}

const CitySearch: React.FC<CitySearchProps> = ({ onCityAdd }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchTimeoutRef = useRef<number>();

  const handleSearch = useCallback(async (search: string) => {
    if (!search.trim() || search.length < 2) {
      setResults([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const cities = await searchCities(search);
      setResults(cities);
      if (cities.length === 0) {
        setError('No cities found. Please try a different search term.');
      }
    } catch (err) {
      console.error('Failed to search cities:', err);
      setError('Failed to search cities. Please try again.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (searchTimeoutRef.current) {
      window.clearTimeout(searchTimeoutRef.current);
    }

    if (value.trim()) {
      searchTimeoutRef.current = window.setTimeout(() => {
        handleSearch(value);
      }, 300);
    } else {
      setResults([]);
      setError(null);
    }
  };

  return (
    <div className="relative w-96">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          {loading ? (
            <Loader className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500 animate-spin" />
          ) : (
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          )}
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for a city..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoComplete="off"
          />
        </div>
      </div>

      {(results.length > 0 || error || loading) && query.trim() && (
        <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border max-h-60 overflow-y-auto z-50">
          {error ? (
            <div className="px-4 py-2 text-sm text-gray-500">{error}</div>
          ) : loading ? (
            <div className="px-4 py-2 text-sm text-gray-500">Searching...</div>
          ) : (
            results.map((city) => (
              <button
                key={city.id}
                onClick={() => {
                  onCityAdd(city);
                  setQuery('');
                  setResults([]);
                }}
                className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-50"
              >
                <div>
                  <div className="font-medium">{city.name}</div>
                  <div className="text-sm text-gray-500">{city.country}</div>
                </div>
                <Plus className="w-5 h-5 text-blue-500" />
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CitySearch;
 
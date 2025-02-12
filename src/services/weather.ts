// Using Open-Meteo API which is free and requires no API key
const WEATHER_BASE_URL = 'https://api.open-meteo.com/v1';
const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com/v1';

export async function getWeather(lat: number, lon: number, units: 'metric' | 'imperial') {
  try {
    // Open-Meteo always returns metric by default, we'll convert if needed
    const response = await fetch(
      `${WEATHER_BASE_URL}/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code`
    );
    
    if (!response.ok) {
      throw new Error('Weather data fetch failed');
    }
    
    const data = await response.json();
    const current = data.current;
    
    // Convert temperatures if imperial units requested
    const tempMultiplier = units === 'imperial' ? 9/5 : 1;
    const tempOffset = units === 'imperial' ? 32 : 0;
    const speedMultiplier = units === 'imperial' ? 2.237 : 1; // Convert m/s to mph if imperial
    
    // Map weather codes to descriptions
    const weatherDescriptions: { [key: number]: string } = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Depositing rime fog',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Slight rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Slight snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      77: 'Snow grains',
      80: 'Slight rain showers',
      81: 'Moderate rain showers',
      82: 'Violent rain showers',
      85: 'Slight snow showers',
      86: 'Heavy snow showers',
      95: 'Thunderstorm',
      96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail',
    };
    
    return {
      temp: current.temperature_2m * tempMultiplier + tempOffset,
      feels_like: current.apparent_temperature * tempMultiplier + tempOffset,
      humidity: current.relative_humidity_2m,
      wind_speed: current.wind_speed_10m * speedMultiplier,
      description: weatherDescriptions[current.weather_code] || 'Unknown',
      // Map weather codes to icon names that match common weather icon sets
      icon: getWeatherIcon(current.weather_code)
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
}

export async function searchCities(query: string) {
  if (!query.trim()) return [];

  try {
    const encodedQuery = encodeURIComponent(query.trim());
    const response = await fetch(
      `${GEOCODING_BASE_URL}/search?name=${encodedQuery}&count=5&language=en&format=json`
    );

    if (!response.ok) {
      throw new Error('City search failed');
    }

    const data = await response.json();
    
    if (!data.results || !Array.isArray(data.results)) {
      return [];
    }

    return data.results.map((city: any) => ({
      id: `${city.latitude}-${city.longitude}`,
      name: city.name,
      country: city.country_code,
      lat: city.latitude,
      lon: city.longitude,
      units: 'metric' as const,
      timezone: city.timezone
    }));
  } catch (error) {
    console.error('Error searching cities:', error);
    return [];
  }
}

// Helper function to map weather codes to icon names
function getWeatherIcon(code: number): string {
  // Map weather codes to common icon names (you can adjust these based on your icon set)
  if (code === 0) return '01d'; // clear sky
  if (code === 1) return '02d'; // mainly clear
  if (code === 2) return '03d'; // partly cloudy
  if (code === 3) return '04d'; // overcast
  if ([45, 48].includes(code)) return '50d'; // foggy
  if ([51, 53, 55, 61, 63, 65].includes(code)) return '10d'; // rain
  if ([71, 73, 75, 77].includes(code)) return '13d'; // snow
  if ([80, 81, 82].includes(code)) return '09d'; // rain showers
  if ([85, 86].includes(code)) return '13d'; // snow showers
  if ([95, 96, 99].includes(code)) return '11d'; // thunderstorm
  return '03d'; // default to partly cloudy
}

// Types for better TypeScript support
interface City {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  units: 'metric' | 'imperial';
  timezone: string;
}

interface WeatherData {
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  description: string;
  icon: string;
}
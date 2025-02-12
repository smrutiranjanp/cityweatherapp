export  interface City {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  units: 'metric' | 'imperial';
  timezone: string;
}

export interface Weather {
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  description: string;
  icon: string;
}

export interface Forecast {
  dt: number;
  temp: number;
  icon: string;
}
 
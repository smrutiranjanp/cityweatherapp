import  { create } from 'zustand';
import { City } from '../types/weather';

interface WeatherStore {
  cities: City[];
  addCity: (city: City) => void;
  removeCity: (id: string) => void;
  updateCityUnits: (id: string, units: 'metric' | 'imperial') => void;
}

export const useWeatherStore = create<WeatherStore>((set) => ({
  cities: [],
  addCity: (city) => set((state) => ({ cities: [...state.cities, city] })),
  removeCity: (id) => set((state) => ({ cities: state.cities.filter((city) => city.id !== id) })),
  updateCityUnits: (id, units) =>
    set((state) => ({
      cities: state.cities.map((city) =>
        city.id === id ? { ...city, units } : city
      ),
    })),
}));
 
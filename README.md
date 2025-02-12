# City Weather Application

## Overview
A modern weather application that enables users to search for cities worldwide and view their current weather conditions. The app combines seamless city search functionality with detailed weather information to provide a comprehensive weather checking experience.

## ✨ Key Features

### 🔍 Smart City Search
- Real-time city search suggestions
- Global coverage for cities worldwide
- Intelligent name matching and suggestions

### 🌤️ Weather Information
- **Current Temperature**: Precise temperature readings
- **Feels Like**: Perceived temperature accounting for humidity and wind
- **Humidity Levels**: Current air moisture content
- **Wind Speed**: Current wind conditions
- **Weather Description**: Detailed weather condition descriptions with matching icons

### 🛠️ Technical Features
- **Unit System Support**: 
  - Metric (Celsius, m/s)
  - Imperial (Fahrenheit, mph)
- **Real-time Updates**: Latest weather data from reliable services
- **Error Handling**: Robust error management and user feedback

## 🔧 Technical Implementation

### API Integration
```typescript
// Weather data fetching using Open-Meteo API
const WEATHER_BASE_URL = 'https://api.open-meteo.com/v1';
const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com/v1';
```

### Key Components
- **TypeScript** for enhanced type safety
- **Open-Meteo API** integration:
  - Geocoding service for city search
  - Weather service for meteorological data
- **Unit Conversion Utilities** for temperature and wind speed
- **Weather Condition Mapping** for accurate descriptions

### Data Flow
1. User inputs city name
2. App queries geocoding API for city suggestions
3. Selected city coordinates are used to fetch weather data
4. Data is processed and displayed with appropriate units

## 💻 Usage

### City Search
```typescript
// Example city search
const cities = await searchCities("London");
```

### Weather Data
```typescript
// Example weather fetch
const weather = await getWeather(51.5074, -0.1278, 'metric');
```

## 🎯 Benefits
- **User-Friendly**: Intuitive interface for weather checking
- **Global Coverage**: Weather information available worldwide
- **Reliable Data**: Uses trusted weather service APIs
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🔄 Data Updates
- Weather data is fetched in real-time
- City search results are current and accurate
- Automatic unit conversion based on user preference

## 📱 Device Support
- **Desktop**: Full-featured interface
- **Mobile**: Responsive design
- **Tablet**: Optimized layout

## ⚙️ Technical Requirements
- Modern web browser
- JavaScript enabled
- Internet connection for real-time data

## 🚀 Future Enhancements
- Weather forecasts for upcoming days
- Historical weather data
- Weather alerts and notifications
- Favorite cities list
- Custom themes and layouts

## 🔐 Security
- No API keys required
- Secure HTTPS connections
- Data validation and sanitization

---

*This application provides a reliable and user-friendly interface for checking weather conditions anywhere in the world, making it perfect for travel planning, daily weather checks, or any situation requiring accurate weather information.*

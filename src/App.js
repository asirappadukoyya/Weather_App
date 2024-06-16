import React, { useState, useEffect } from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import './App.css';
import LocationInput from './LocationInput';
import WeatherDisplay from './WeatherDisplay';
import { ThemeProvider, useTheme } from './ThemeContext';
import ToggleButton from 'react-toggle-button';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (location.trim() !== '') {
        try {
          setLoading(true);
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${location}&appid=5047252b5848a10d79c6750f83690233`
          );
          if (!response.ok) {
            throw new Error('Weather data not found!');
          }
          const data = await response.json();
          setLoading(false);
          setWeatherData(data);
          setHasSearched(true);
        } catch (error) {
          setLoading(false);
          console.error('Error fetching weather data:', error);
          setWeatherData(null);
          setHasSearched(true);
        }
      }
    };

    fetchData();
  }, [location]);

  const fetchWeatherData = async (location) => {
    setLocation(location);
  };

  const { theme, toggleTheme } = useTheme();

  return (
    <div className={`App ${theme === 'dark' ? 'dark-mode' : 'light-mode'}`}>
      <div className="toggle-container">
        <div>
          <ToggleButton
            value={theme === 'dark'}
            onToggle={toggleTheme}
            inactiveLabel="Light"
            activeLabel="Dark"
          />
        </div>
      </div>
      <header className={`App-header`}>
        <h1 className={theme === 'dark' ? 'header-dark' : 'header-light'}>Weather App</h1>
        <LocationInput fetchWeatherData={fetchWeatherData} />
        {isLoading ? (
          <ClipLoader
            size={60}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          weatherData ? (
            <WeatherDisplay weatherData={weatherData} />
          ) : (
            hasSearched && <p>Enter a valid city name</p>
          )
        )}
      </header>
    </div>
  );
};

const AppWithProviders = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default AppWithProviders;

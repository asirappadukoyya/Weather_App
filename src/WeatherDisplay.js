import React from 'react';
import './display.css'
import { 
  WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog,
  WiNightClear, WiNightCloudy, WiNightThunderstorm 
} from 'react-icons/wi';
import { useTheme } from './ThemeContext';

const lightModeIcons = {
  Clear: <WiDaySunny size={180} />,
  Clouds: <WiCloud size={180} />,
  Rain: <WiRain size={180} />,
  Snow: <WiSnow size={180} />,
  Thunderstorm: <WiThunderstorm size={180} />,
  Mist: <WiFog size={180} />,
  Smoke: <WiFog size={180} />,
  Haze: <WiFog size={180} />,
  Dust: <WiFog size={180} />,
  Fog: <WiFog size={180} />,
  Sand: <WiFog size={180} />,
  Ash: <WiFog size={180} />,
  Squall: <WiFog size={180} />,
  Tornado: <WiFog size={180} />
};

const darkModeIcons = {
  Clear: <WiNightClear size={180} />,
  Clouds: <WiNightCloudy size={180} />,
  Rain: <WiRain size={180} />,
  Snow: <WiSnow size={180} />,
  Thunderstorm: <WiNightThunderstorm size={180} />,
  Mist: <WiFog size={180} />,
  Smoke: <WiFog size={180} />,
  Haze: <WiFog size={180} />,
  Dust: <WiFog size={180} />,
  Fog: <WiFog size={180} />,
  Sand: <WiFog size={180} />,
  Ash: <WiFog size={180} />,
  Squall: <WiFog size={180} />,
  Tornado: <WiFog size={180} />
};

const WeatherDisplay = ({ weatherData }) => {
  const { theme } = useTheme();
  const { name, main, sys, weather } = weatherData;
  const weatherDescription = weather[0].main;
  const icons = theme === 'light' ? lightModeIcons : darkModeIcons;

  return (
    <div className={theme==='light'?"weather-display-light":"weather-display-dark"}>
      <h2>{name}, {sys.country}</h2>
      <div className = 'container'>
      <p className = "weather">{new Date().toLocaleTimeString()}</p>
      <p>{new Date().toLocaleDateString()}</p>
      </div>
      <div className="weather-icon">
        {icons[weatherDescription]|| <WiCloud/>}
            <p className = 'temp'>{main.temp}°C</p>
      </div>
      <div className = 'cont1'>
      <p>Temperature: {main.temp}°C</p>
      <p>Weather: {weather[0].description}</p>
      </div>
      <div className = 'cont1'>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
      </div>
    </div>
  );
};

export default WeatherDisplay;

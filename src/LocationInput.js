import React, { useState } from 'react';

import './location.css'

const LocationInput = ({ fetchWeatherData }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.trim() !== '') {
      fetchWeatherData(location);
    }
    setLocation('')
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city name or zip code"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className='box'
      />
      <button  className = 'box'type="submit">Get Weather</button>
    </form>
  );
};

export default LocationInput;

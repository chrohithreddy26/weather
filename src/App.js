// WeatherDisplay.js

import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS file

const WeatherDisplay = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false); // Added loaded state
  const [weatherImage, setWeatherImage] = useState('');

  const API_KEY = 'M7AH6MQ4ZEF3FNXYP9BKPHQXR';
  const API_ENDPOINT = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

  const handleLocationChange = (newLocation) => {
    const sanitizedLocation = newLocation.trim();

    if (isValidLocation(sanitizedLocation)) {
      setLocation(sanitizedLocation);
    } else {
      alert('Invalid location: Please enter a valid location.');
    }
  };

  const isValidLocation = (location) => {
    return true; // Implement your validation logic here
  };

  const fetchWeatherData = async () => {
    if (!location) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `${API_ENDPOINT}/${location}?unitGroup=metric&key=${API_KEY}&contentType=json`
      );

      const imageUrl = getImageUrl(response.data.currentConditions.temp);
      setWeatherImage(imageUrl);

      setWeatherData(response.data);
      setLoading(false);
      setLoaded(true); // Set loaded to trigger transitions
    } catch (error) {
      console.error('no location', error);

      if (error.response && error.response.status === 400) {
        alert('Location not found. Please enter a valid location.');
      }

      setLoading(false);
    }
  };

  const getImageUrl = (temperature) => {
    if (temperature < 10) {
      return 'https://images.app.goo.gl/2gnp5hozbGZFbcF1A';
    } else if (temperature >= 10 && temperature < 25) {
      return 'https://images.app.goo.gl/2gnp5hozbGZFbcF1A';
    } else {
      return 'https://images.app.goo.gl/2gnp5hozbGZFbcF1A';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className={`weather-container ${loaded ? 'loaded' : ''}`}>
      <h1>WeatherDisplay</h1>  
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => handleLocationChange(e.target.value)}
        />
        <button type="button" onClick={() => setLocation('')}>Clear</button><br/>
        <button id="submit" type="submit">Search</button>
        
      </form>
      {loading && <p className="loading">Loading...</p>}
      {weatherData && (
        <div className="weather-info">
          <h2>Current Weather in {weatherData.resolvedAddress}</h2>
          <p>Temperature: {weatherData.currentConditions.temp}°C</p>
          <p>Humidity: {weatherData.currentConditions.humidity}%</p>
          <p>Wind Speed: {weatherData.currentConditions.windspeed} m/s</p>
        </div>
      )}
      {weatherImage && (
        <div className="weather-image">
          <img src={weatherImage} alt="Weather" />
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const WeatherDisplay = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = 'a4e9be227692494494b130046240602';
  const API_ENDPOINT = 'http://api.weatherapi.com/v1/current.json';

  const handleLocationChange = (newLocation) => {
    const sanitizedLocation = newLocation.trim();
    if (isValidLocation(sanitizedLocation)) {
      setLocation(sanitizedLocation);
    } else {
      alert('Invalid location: Please enter a valid location.');
    }
  };

  const isValidLocation = (location) => {
    return true;
  };

  const fetchWeatherData = async () => {
    if (!location) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`${API_ENDPOINT}?key=${API_KEY}&q=${location}&aqi=no`);
      setWeatherData(response.data);
      setLoading(false);
    } catch (error) {
      handleFetchError(error);
    }
  };

  const handleFetchError = (error) => {
    setLoading(false);

    if (error.response && error.response.status === 400) {
      alert('Location not found. Please enter a valid location.');
    } else {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  const resetForm = () => {
    setLocation('');
    setWeatherData(null);
  };

  const renderWeatherDetails = () => {
    if (!weatherData) {
      return null;
    }

    return (
      <div className="weather-info">
        <h2>{`Weather in ${weatherData.location.name}, ${weatherData.location.country}`}</h2>
        <p>Temperature: {weatherData.current.temp_c || 'N/A'}°C</p>
        <p>Humidity: {weatherData.current.humidity || 'N/A'}%</p>
        <p>Wind Speed: {weatherData.current.wind_kph || 'N/A'} km/h</p>
        <p>Cloud Speed: {weatherData.current.cloud || 'N/A'} km/h</p>
        <p>Pressure Speed: {weatherData.current.pressure_in  || 'N/A'} inches</p>
            </div>
    );
  };

  return (
    <div className="weather-container">
      <div className="intro-section">
        <h1> Weather Dashboard!</h1>
        <p>Know your location's weather</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <div className="input-container">
            <input
              type="text"
              id="location"
              placeholder="Enter location"
              value={location}
              onChange={(e) => handleLocationChange(e.target.value)}
            />
            {location && (
              <span className="clear-input" onClick={resetForm}>
                X
              </span>
            )}
          </div>
        </div>

        <button type="submit">Get Weather</button>
      </form>

      {loading && <b className="loading">Loading...</b>}

      {renderWeatherDetails()}
    </div>
  );
};

export default WeatherDisplay;



import React, { useState, useEffect } from 'react';
import Loader from 'react-loaders';

const apiBase = process.env.NODE_ENV === 'development' ? 'http://192.168.1.3:3001/api' : '/api';

// Private.

const WeatherIcon = (icon, description) => (
  <div class="weather-icon">
    <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} />
  </div>
);

// Public.

const Weather = ({ refresh = 30000 }) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [render, setRender] = useState(false);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    fetch(`${apiBase}/weather`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setWeatherData(result);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        }
      );

    setTimeout(() => {
      setRender(!render);
    }, refresh * 1000);
  }, [refresh, render]);

  if (error) {
    return <div>Error {error.message}</div>;
  } else if (!isLoaded) {
    return <Loader type="ball-grid-pulse" />;
  } else {
    return <div>Weather data received.</div>;
  }
};

export default Weather;

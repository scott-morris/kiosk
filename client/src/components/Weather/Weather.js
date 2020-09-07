import React, { useState, useEffect } from 'react';
import Loader from 'react-loaders';
import WeatherComponents from './WeatherComponents';

const apiBase = process.env.NODE_ENV === 'development' ? 'http://192.168.1.3:3001/api' : '/api';

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
          setWeatherData(result);
          setIsLoaded(true);
        },
        (err) => {
          setError(err);
          setIsLoaded(true);
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
    return (
      <div>
        <WeatherComponents.CurrentWeather weather={weatherData.current} />
        <WeatherComponents.WeekOverview dailyData={weatherData.daily} />
        <WeatherComponents.HourlyOverview hourlyData={weatherData.hourly} />
      </div>
    );
  }
};

export default Weather;

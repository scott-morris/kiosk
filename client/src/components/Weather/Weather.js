// Libraries.

import React, { useState, useEffect } from 'react';

// Dependencies.

import apiBase from '../../data/api-base';

// Components.

import CurrentWeather from './CurrentWeather';
import HourlyOverview from './HourlyOverview';
import Loading from '../Loading';
import WeekOverview from './WeekOverview';

// Public.

const Weather = ({ refresh = 30000 }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [render, setRender] = useState(false);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    fetch(`${apiBase}/weather`)
      .then((res) => res.json())
      .then(
        (result) => {
          setWeatherData(result);
          setIsLoading(false);
        },
        (err) => {
          setError(err);
          setIsLoading(false);
        }
      );

    setTimeout(() => {
      setRender(!render);
    }, refresh * 1000);
  }, [refresh, render]);

  return (
    <Loading error={error} isLoading={isLoading}>
      <CurrentWeather weather={weatherData.current} />
      <WeekOverview dailyData={weatherData.daily} />
      <HourlyOverview hourlyData={weatherData.hourly} />
    </Loading>
  );
};

export default Weather;

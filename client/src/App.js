// Base Libraries.

import React, { useEffect, useState } from 'react';

// Dependencies.

import apiBase from './data/api-base';
import getPrecipitationTime from './data/get-precipitation-time';

// View Management.

import Switcher from './components/Switcher';

// Views.

import MonthlyCalendar from './panels/MonthlyCalendar';
import Weather from './panels/Weather';

// Styles.

import './App.scss';

// Private.

const DATA_REFRESH = 60 * 5 * 1000;

const parseWeatherData = (data) => ({
  ...data,
  precipitationTime: getPrecipitationTime(data),
});

// Public.

const App = () => {
  const [weather, setWeather] = useState({
    data: {},
    error: null,
    loading: true,
  });

  const [calendar, setCalendar] = useState({
    data: {},
    error: null,
    loading: true,
  });

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(`${apiBase}/events`)
      .then((res) => res.json())
      .then(
        (data) => {
          setCalendar({
            ...calendar,
            data,
            loading: false,
          });
        },
        (error) => {
          setCalendar({
            ...calendar,
            loading: false,
            error,
          });
        }
      );

    fetch(`${apiBase}/weather`)
      .then((res) => res.json())
      .then(
        (result) => {
          setWeather({
            ...weather,
            data: parseWeatherData(result),
            loading: false,
          });
        },
        (error) => {
          setWeather({
            ...weather,
            loading: false,
            error,
          });
        }
      );

    setTimeout(() => {
      setRefresh(!refresh);
    }, DATA_REFRESH);
  }, [refresh]);

  return (
    <Switcher className="App container" seconds={10}>
      <Weather data={weather.data} error={weather.error} isLoading={weather.loading} />
      <MonthlyCalendar data={calendar.data} error={calendar.error} isLoading={calendar.loading} />
    </Switcher>
  );
};

export default App;

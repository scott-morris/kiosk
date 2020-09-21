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

const WEATHER_RELOAD = 60 * 5;
const CALENDAR_RELOAD = 60 * 1;

const parseWeatherData = (data) => ({
  ...data,
  precipitationTime: getPrecipitationTime(data),
});

// Public.

const App = () => {
  const [weatherData, setWeatherData] = useState({});
  const [calendarData, setCalendarData] = useState({});
  const [status, setStatus] = useState({
    loadingWeather: true,
    loadingCalendar: true,
    weatherCounter: -1,
    calendarCounter: -1,
    weatherError: null,
    calendarError: null,
  });
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const calendarCounter =
      status.calendarCounter + 1 >= CALENDAR_RELOAD ? 0 : status.calendarCounter + 1;
    const weatherCounter =
      status.weatherCounter + 1 >= WEATHER_RELOAD ? 0 : status.weatherCounter + 1;

    setStatus({
      ...status,
      calendarCounter,
      weatherCounter,
    });

    if (calendarCounter === 0) {
      fetch(`${apiBase}/events`)
        .then((res) => res.json())
        .then(
          (result) => {
            setStatus({
              ...status,
              loadingCalendar: false,
            });
            setCalendarData(result);
          },
          (err) => {
            setStatus({
              ...status,
              loadingCalendar: false,
              calendarError: err,
            });
          }
        );
    }

    if (weatherCounter === 0) {
      fetch(`${apiBase}/weather`)
        .then((res) => res.json())
        .then(
          (result) => {
            setStatus({
              ...status,
              loadingWeather: false,
            });
            setWeatherData(parseWeatherData(result));
          },
          (err) => {
            setStatus({
              ...status,
              loadingWeather: false,
              weatherError: err,
            });
          }
        );
    }

    setTimeout(() => {
      setRefresh(!refresh);
    }, 1000);
  }, [refresh]);

  return (
    <Switcher className="App container" seconds={10}>
      <Weather data={weatherData} error={status.weatherError} isLoading={status.loadingWeather} />
      <MonthlyCalendar
        data={calendarData}
        error={status.calendarError}
        isLoading={status.loadingCalendar}
      />
    </Switcher>
  );
};

export default App;

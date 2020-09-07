// Libraries.

import React, { useState, useEffect } from 'react';

// Dependencies.

import apiBase from '../../data/api-base';

// Components.

import Col from 'react-bootstrap/Col';
import CurrentWeather from './CurrentWeather';
import DateTime from '../DateTime';
import HourlyOverview from './HourlyOverview';
import Loading from '../Loading';
import Row from 'react-bootstrap/Row';
import WeekOverview from './WeekOverview';

// Public.

const Weather = ({ refresh = 300 }) => {
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
      <Row>
        <Col>
          <CurrentWeather weather={weatherData.current} />
        </Col>
        <Col>
          <DateTime />
        </Col>
      </Row>
      <WeekOverview dailyData={weatherData.daily} />
      <Row>
        <HourlyOverview hourlyData={weatherData.hourly} />
      </Row>
    </Loading>
  );
};

export default Weather;

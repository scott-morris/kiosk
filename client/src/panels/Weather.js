// Libraries.

import React, { useState, useEffect } from 'react';

// Dependencies.

import apiBase from '../data/api-base';
import getClassNames from '../data/get-class-names';
import getPrecipitationTime from '../data/get-precipitation-time';

// Components.

import Col from 'react-bootstrap/Col';
import CurrentWeather from '../components/Weather/CurrentWeather';
import DateTime from '../components/DateTime';
import HourlyOverview from '../components/Weather/HourlyOverview';
import Loading from '../components/Loading';
import Row from 'react-bootstrap/Row';
import WeekOverview from '../components/Weather/WeekOverview';

// Styles.

import './Weather.scss';

// Private.

const parseWeatherData = (data) => ({
  ...data,
  precipitationTime: getPrecipitationTime(data),
});

// Public.

const Weather = ({ refresh = 300, className = '' }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [render, setRender] = useState(false);
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    fetch(`${apiBase}/weather`)
      .then((res) => res.json())
      .then(
        (result) => {
          setWeatherData(parseWeatherData(result));
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
      <div className={getClassNames('wc', className)}>
        <Row>
          <Col>
            <CurrentWeather
              data={weatherData.current}
              precipitationTime={weatherData.precipitationTime}
            />
          </Col>
          <Col>
            <DateTime />
          </Col>
        </Row>
        <WeekOverview data={weatherData.daily} />
        <Row>
          <HourlyOverview data={weatherData.hourly} />
        </Row>
      </div>
    </Loading>
  );
};

export default Weather;

// Libraries.

import React from 'react';

// Dependencies.

import getClassNames from '../data/get-class-names';

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

// Public.

const Weather = ({ data, isLoading, error, className = '' }) => (
  <Loading error={error} isLoading={isLoading}>
    <div className={getClassNames('wc', className)}>
      <Row>
        <Col>
          <CurrentWeather data={data.current} precipitationTime={data.precipitationTime} />
        </Col>
        <Col>
          <DateTime />
        </Col>
      </Row>
      <WeekOverview data={data.daily} />
      <Row>
        <HourlyOverview data={data.hourly} />
      </Row>
    </div>
  </Loading>
);

export default Weather;

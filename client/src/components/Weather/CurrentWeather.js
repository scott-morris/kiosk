// Libraries.

import React from 'react';

// Components.

import Icon from './Icon';
import Temperature from './Temperature';

// Styles.

import './CurrentWeather.scss';

// Public.

const CurrentWeather = ({ weather, className = '', currentClass = '' }) => {
  return (
    <div className={['wc-current', className, currentClass].join(' ')}>
      <Icon weather={weather.weather} />
      <Temperature className="wc-current-temp" temp={weather.temp} />
      <Temperature className="wc-current-feels-like" temp={weather.feels_like} />
    </div>
  );
};

export default CurrentWeather;

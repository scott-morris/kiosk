// Libraries.

import React from 'react';

// Components.

import Icon from './Icon';
import Temperature from './Temperature';

// Styles.

import './Summary.scss';

// Public.

const Summary = ({ weather, className = '', summaryClass = '' }) => (
  <div className={['wc-summary', className, summaryClass].join(' ')}>
    <Icon weather={weather.weather} />
    <Temperature className="wc-temp" temp={weather.temp} />
    <Temperature className="wc-feels-like" temp={weather.feels_like} />
  </div>
);

export default Summary;

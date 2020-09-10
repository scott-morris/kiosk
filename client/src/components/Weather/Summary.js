// Libraries.

import React from 'react';

// Dependencies.

import getClassNames from '../../data/get-class-names';

// Components.

import Icon from './Icon';
import Temperature from './Temperature';

// Styles.

import './Summary.scss';

// Public.

const Summary = ({ weather, className = '', summaryClass = '' }) => (
  <div className={getClassNames('wc-summary', className, summaryClass)}>
    <Icon weather={weather.weather} />
    <Temperature className="wc-temp" temp={weather.temp} />
    <Temperature className="wc-feels-like" temp={weather.feels_like} />
  </div>
);

export default Summary;

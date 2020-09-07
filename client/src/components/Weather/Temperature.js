import React from 'react';
import './Temperature.scss';

// Private.

const RoundToOneDecimal = (num) => Math.round(num * 10) / 10;

// Public.

const Temperature = ({ temp, temperatureClass = '' }) => (
  <div className={`wc-temp ${temperatureClass}`}>{RoundToOneDecimal(temp)}</div>
);

export default Temperature;

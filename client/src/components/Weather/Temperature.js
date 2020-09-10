// Libraries.

import React from 'react';

// Dependencies.

import getClassNames from '../../data/get-class-names';

// Styles.

import './Temperature.scss';

// Private.

const RoundToOneDecimal = (num) => Math.round(num * 10) / 10;

// Public.

const Temperature = ({ temp, className = '', temperatureClass = '' }) => (
  <div className={getClassNames('wc-temp', className, temperatureClass)}>
    {RoundToOneDecimal(temp)}
  </div>
);

export default Temperature;

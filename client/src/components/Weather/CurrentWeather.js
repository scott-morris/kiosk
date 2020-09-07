// Libraries.

import React from 'react';

// Public.

const CurrentWeather = ({ weather, currentClass = '' }) => {
  return <div className={`wc-current ${currentClass}`}></div>;
};

export default CurrentWeather;

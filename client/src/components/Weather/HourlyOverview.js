// Libraries.

import React from 'react';

// Public.

const HourlyOverview = ({ hourlyData, className = '', hourlyClass = '' }) => {
  return <div className={['wc-hourly', className, hourlyClass].join(' ')}></div>;
};

export default HourlyOverview;

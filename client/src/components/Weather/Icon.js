// Libraries.

import React from 'react';

// Public.

const Icon = ({ weather, iconClass = '' }) => (
  <div className={`wc-icon ${iconClass}`}>
    {weather.map(({ icon, description }, index) => (
      <img
        key={`wc-icon${index}`}
        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
      />
    ))}
  </div>
);

export default Icon;

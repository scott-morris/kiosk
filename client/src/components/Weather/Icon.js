// Libraries.

import React, { useEffect, useState } from 'react';

// Dependencies.

import getClassNames from '../../data/get-class-names';

// Public.

const Icon = ({ weather, className = '', iconClass = '' }) => {
  const [index, setIndex] = useState(0);
  const [entry, setEntry] = useState({});

  useEffect(() => {
    setEntry(weather[index]);

    setTimeout(() => {
      const newIndex = index + 1 < weather.length ? index + 1 : 0;

      setIndex(newIndex);
    }, 2000);
  }, [index, weather, className, iconClass]);

  return (
    <div className={getClassNames('wc-icon', className, iconClass)}>
      <img src={`http://openweathermap.org/img/wn/${entry.icon}@2x.png`} alt={entry.description} />
    </div>
  );
};

export default Icon;

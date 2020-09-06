import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './WeatherComponents.scss';

// Private.

const RoundToOneDecimal = (num) => Math.round(num * 10) / 10;

// Public.

const Temperature = ({ temp, TemperatureClass = '' }) => (
  <div className={`wc-temp ${TemperatureClass}`}>{RoundToOneDecimal(temp)}</div>
);

const Icon = ({ weather, IconClass = '' }) => (
  <div className={`wc-icon ${IconClass}`}>
    {weather &&
      weather.length &&
      weather.map(({ icon, description }, index) => (
        <img
          key={`wc-icon${index}`}
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
        />
      ))}
  </div>
);

const DayOverview = ({ dayInfo }) => {
  const thisDate = moment(dayInfo.dt * 1000);
  const dayOfWeek = thisDate.format('ddd');
  const humanReadableDate = thisDate.calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'M-D',
    sameElse: 'M-D',
  });

  return (
    <div className="wc-daily">
      <div className="wc-dow">{dayOfWeek}</div>
      <div className="wc-hrdate">{humanReadableDate}</div>
      <Icon weather={dayInfo.weather} />
      <Temperature TemperatureClass="wc-hightemp" temp={dayInfo.temp.max} />
      <Temperature TemperatureClass="wc-lowtemp" temp={dayInfo.temp.min} />
    </div>
  );
};

const WeekOverview = ({ daysArray }) => {
  return (
    <div className="wc-week">
      {daysArray.map((dayInfo, index) => (
        <DayOverview key={`weekday-${index}`} dayInfo={dayInfo} />
      ))}
    </div>
  );
};

export default {
  WeekOverview,
  DayOverview,
  Icon,
};

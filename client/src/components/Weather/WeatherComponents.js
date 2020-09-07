import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './WeatherComponents.scss';

// Private.

const RoundToOneDecimal = (num) => Math.round(num * 10) / 10;

// Public.

const Temperature = ({ temp, temperatureClass = '' }) => (
  <div className={`wc-temp ${temperatureClass}`}>{RoundToOneDecimal(temp)}</div>
);

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

const DayOverview = ({ dayInfo, dailyClass = '' }) => {
  const thisDate = moment(dayInfo.dt * 1000);
  const dayOfWeek = thisDate.format('ddd');
  const humanReadableDate = thisDate.calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'M-D',
    sameElse: 'M-D',
  });

  return (
    <div className={`wc-daily ${dailyClass}`}>
      <div className="wc-dow">{dayOfWeek}</div>
      <div className="wc-hrdate">{humanReadableDate}</div>
      <Icon weather={dayInfo.weather} />
      <Temperature temperatureClass="wc-hightemp" temp={dayInfo.temp.max} />
      <Temperature temperatureClass="wc-lowtemp" temp={dayInfo.temp.min} />
    </div>
  );
};

const CurrentWeather = ({ weather, currentClass = '' }) => {
  return <div className={`wc-current ${currentClass}`}></div>;
};

const WeekOverview = ({ dailyData, weeklyClass = '' }) => {
  return (
    <div className={`wc-week ${weeklyClass}`}>
      {dailyData.map((dayInfo, index) => (
        <DayOverview key={`weekday-${index}`} dayInfo={dayInfo} />
      ))}
    </div>
  );
};

const HourlyOverview = ({ hourlyData, HourlyClass = '' }) => {
  return <div className={`wc-hourly ${HourlyClass}`}></div>;
};

export default {
  CurrentWeather,
  WeekOverview,
  HourlyOverview,
  DayOverview,
  Icon,
};

// Libraries.

import React from 'react';
import moment from 'moment';

// Components.

import Icon from './Icon';
import Temperature from './Temperature';

// Styles.

import './DayOverview.scss';

// Public.

const DayOverview = ({ dayInfo, className = '', dailyClass = '' }) => {
  const thisDate = moment(dayInfo.dt * 1000);
  const dayOfWeek = thisDate.format('ddd');
  const humanReadableDate = thisDate.calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'M-D',
    sameElse: 'M-D',
  });
  const chanceOfPrecip = Math.round(dayInfo.pop * 100);

  return (
    <div className={['wc-daily', className, dailyClass].join(' ')}>
      <div className="wc-dow">{dayOfWeek}</div>
      <div className="wc-hrdate">{humanReadableDate}</div>
      <Icon weather={dayInfo.weather} />
      <Temperature temperatureClass="wc-hightemp" temp={dayInfo.temp.max} />
      <Temperature temperatureClass="wc-lowtemp" temp={dayInfo.temp.min} />
      <div className="wc-chanceOfPrecip">{chanceOfPrecip}%</div>
    </div>
  );
};

export default DayOverview;

// Libraries.

import React from 'react';

// Components.

import DayOverview from './DayOverview';

// Styles.

import './WeekOverview.scss';

// Public.

const WeekOverview = ({ dailyData, weeklyClass = '' }) => {
  return (
    <div className={`wc-week ${weeklyClass}`}>
      {dailyData.map((dayInfo, index) => (
        <DayOverview key={`weekday-${index}`} dayInfo={dayInfo} />
      ))}
    </div>
  );
};

export default WeekOverview;

import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './DateTime.scss';

// Public.

const DateTime = ({ refresh = 1 }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    setTimeout(() => {
      setCurrentTime(new Date());
    }, refresh * 1000);
  });

  return (
    <div className="dt-container">
      <div className="dt-time">{moment(currentTime).format('h:mm A')}</div>
      <div className="dt-date">{moment(currentTime).format('dddd, MMMM D, YYYY')}</div>
    </div>
  );
};

export default DateTime;

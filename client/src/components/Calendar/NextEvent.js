// Libraries.

import React, { useEffect, useState } from 'react';
import moment from 'moment';

// Dependencies.

import getClassNames from '../../data/get-class-names';
import getNextEvent from '../../data/get-next-event';

// Styles.

import './NextEvent.scss';

// Public.

const NextEvent = ({ events, className, refresh = 1 }) => {
  const [timeFromNow, setTimeFromNow] = useState(null);
  const [render, setRender] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setRender(!render);
    }, refresh * 1000);
  }, [render, refresh, events]);

  return <div className={getClassNames('ne', className)}>{timeFromNow}</div>;
};

export default NextEvent;

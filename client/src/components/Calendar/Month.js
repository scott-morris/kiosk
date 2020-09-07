// Libraries.

import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import Loading from '../Loading';
import moment from 'moment';

// Dependencies.

import apiBase from '../../data/api-base';

// Styles.

import './Calendar.scss';

// Private.

const COLORS = ['green', 'blue', 'red', 'orange'];
const localizer = momentLocalizer(moment);

const eventStyleGetter = (event) => ({
  style: {
    backgroundColor: COLORS[event.organizerId],
  },
});

// Public.

const CalendarMonth = ({ refresh = 60 }) => {
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [render, setRender] = useState(false);

  useEffect(() => {
    fetch(`${apiBase}/icloud/events`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoading(false);
          setEvents(result);
        },
        (err) => {
          setIsLoading(false);
          setError(err);
        }
      );

    setTimeout(() => {
      setRender(!render);
    }, refresh * 1000);
  }, [refresh, render]);

  return (
    <Loading error={error} isLoading={isLoading}>
      <Calendar
        localizer={localizer}
        events={events}
        allDayAccessor="allDay"
        startAccessor="localStartDate"
        endAccessor="localEndDate"
        style={{ height: '700px' }}
        eventPropGetter={eventStyleGetter}
      />
    </Loading>
  );
};

export default CalendarMonth;

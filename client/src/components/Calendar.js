import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import './Calendar.scss';

const localizer = momentLocalizer(moment);
const apiBase = process.env.NODE_ENV === 'development' ? 'http://192.168.1.3:3001/api' : '/api';

// Private.

const COLORS = ['green', 'blue', 'red', 'orange'];

const eventStyleGetter = (event, start, end, isSelected) => {
  const style = {
    backgroundColor: COLORS[event.organizerId],
  };

  return { style };
};

// Public.

const MyCalendar = ({ refresh = 60 }) => {
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [render, setRender] = useState(false);

  useEffect(() => {
    fetch(`${apiBase}/icloud/events`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setEvents(result);
        },
        (err) => {
          setIsLoaded(true);
          setError(err);
        }
      );

    setTimeout(() => {
      setRender(!render);
    }, refresh * 1000);
  }, [refresh, render]);

  if (error) {
    return <div>Error {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading..</div>;
  } else {
    return (
      <div>
        <Calendar
          localizer={localizer}
          events={events}
          allDayAccessor="allDay"
          startAccessor="localStartDate"
          endAccessor="localEndDate"
          style={{ height: 500 }}
          eventPropGetter={eventStyleGetter}
        />
      </div>
    );
  }
};

export default MyCalendar;

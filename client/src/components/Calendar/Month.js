// Libraries.

import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

// Styles.

import './Month.scss';

// Private.

const localizer = momentLocalizer(moment);

// Public.

const CalendarMonth = ({ events, eventStyleGetter }) => (
  <Calendar
    localizer={localizer}
    events={events}
    allDayAccessor="allDay"
    startAccessor="startTime"
    endAccessor="endTime"
    style={{ height: '600px' }}
    eventPropGetter={eventStyleGetter}
  />
);

export default CalendarMonth;

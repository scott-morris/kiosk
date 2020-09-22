// Libraries.

import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

// Private.

const localizer = momentLocalizer(moment);

// Public.

const CalendarMonth = ({ events, eventStyleGetter }) => (
  <Calendar
    localizer={localizer}
    events={events}
    style={{ height: '600px' }}
    eventPropGetter={eventStyleGetter}
  />
);

export default CalendarMonth;

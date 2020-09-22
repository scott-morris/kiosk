// Libraries.

import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

// Private.

const localizer = momentLocalizer(moment);

// Public.

const CalendarWeek = ({ events, eventStyleGetter }) => (
  <Calendar
    localizer={localizer}
    events={events}
    style={{ height: '600px' }}
    view="week"
    eventPropGetter={eventStyleGetter}
  />
);

export default CalendarWeek;

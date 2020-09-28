// Libraries.

import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

// Style.

import './Week.scss';

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
    toolbar={false}
    min={new Date('01/01/2000 08:00 AM')}
  />
);

export default CalendarWeek;

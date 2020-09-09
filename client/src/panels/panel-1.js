import React from 'react';

// Components.

import Calendar from '../components/Calendar/Month';
import DateTime from '../components/DateTime';

export default ({ className }) => (
  <div className={className}>
    <Calendar />
    <DateTime />
  </div>
);

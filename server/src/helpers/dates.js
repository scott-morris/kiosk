// Libraries.

const moment = require('moment');

// Public.

const beginningOfLastMonth = () => {
  return moment().subtract(1, 'month').startOf('month');
};

const endOfNextMonth = () => {
  return moment().add(1, 'month').endOf('month');
};

/**
 * Determine whether the given date string contains a time. Assumes that midnight is no date.
 * @param {String} dateString date string
 */
const containsTime = (dateString) => {
  const dt = moment(dateString);
  return dt.hours() + dt.minutes() > 0;
};

module.exports = {
  beginningOfLastMonth,
  endOfNextMonth,
  containsTime,
};

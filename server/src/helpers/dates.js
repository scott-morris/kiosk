// Libraries.

const moment = require('moment');

// Public.

const beginningOfLastMonth = ({ format = 'YYYY-MM-DD' }) => {
  return moment().subtract(1, 'month').startOf('month').format(format);
};

const endOfNextMonth = ({ format = 'YYYY-MM-DD' }) => {
  return moment().add(1, 'month').endOf('month').format(format);
};

module.exports = {
  beginningOfLastMonth,
  endOfNextMonth,
};

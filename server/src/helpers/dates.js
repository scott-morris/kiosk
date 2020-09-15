// Libraries.

const moment = require('moment');

// Public.

const beginningOfLastMonth = () => {
  return moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
};

const endOfNextMonth = () => {
  return moment().add(1, 'month').endOf('month').format('YYYY-MM-DD');
};

module.exports = {
  beginningOfLastMonth,
  endOfNextMonth,
};

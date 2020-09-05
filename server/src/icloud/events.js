// Libraries.

const moment = require('moment');

// Private.

const beginningOfLastMonth = () =>
  moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
const endOfNextMonth = () => moment().add(1, 'month').endOf('month').format('YYYY-MM-DD');

// Public.

const middleware = (iCloudSession, options) => async (req, res, next) => {
  const startDate = req.query.startDate || beginningOfLastMonth();
  const endDate = req.query.endDate || endOfNextMonth();
  const events = await iCloudSession.Calendar.getEvents(startDate, endDate);
  res.json(events);
};

module.exports = middleware;

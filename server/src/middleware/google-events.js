// Dependencies.

const { beginningOfLastMonth, endOfNextMonth } = require('../helpers/dates');
const { getUniqueEvents } = require('../icloud/getEvents');

// Public.

const middleware = ({ iCloudSessions, ...settings }) => async (req, res, next) => {
  const startDate = req.query.startDate || beginningOfLastMonth();
  const endDate = req.query.endDate || endOfNextMonth();

  const events = await getUniqueEvents(iCloudSessions, startDate, endDate);

  res.json(events);
};

module.exports = {
  path: '/api/google/events',
  middleware,
};

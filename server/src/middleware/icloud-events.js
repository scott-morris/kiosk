// Dependencies.

const { beginningOfLastMonth, endOfNextMonth } = require('../helpers/dates');
const { getAllEvents } = require('../icloud/get-events');
const { standardize } = require('../helpers/process-events');

// Public.

const middleware = ({ iCloudSessions, ...settings }) => async (req, res, next) => {
  const startDate = req.query.startDate || beginningOfLastMonth();
  const endDate = req.query.endDate || endOfNextMonth();

  const rawData = await getAllEvents(iCloudSessions, startDate, endDate);
  const events = standardize(rawData);

  res.json(events);
};

module.exports = {
  path: '/api/icloud/events',
  middleware,
};

// Dependencies.

const { beginningOfLastMonth, endOfNextMonth } = require('../helpers/dates');
const { getAllEvents } = require('../icloud/get-events');
const { standardize } = require('../helpers/process-events');

// Public.

const middleware = ({ iCloudSessions, ...settings }) => async (req, res, next) => {
  const start = req.query.startDate || beginningOfLastMonth();
  const end = req.query.endDate || endOfNextMonth();

  const rawData = await getAllEvents({ iCloudSessions, start, end }, settings);
  const events = standardize(rawData);

  res.json(events);
};

module.exports = {
  path: '/api/icloud/events',
  middleware,
};

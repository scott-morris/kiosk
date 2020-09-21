// Dependencies.

const { beginningOfLastMonth, endOfNextMonth } = require('../helpers/dates');
const getGoogleEvents = require('../google/get-events');
const getICloudEvents = require('../icloud/get-events');
const processEvents = require('../helpers/process-events');

// Public.

const middleware = ({ googleSessions, iCloudSessions, ...settings }) => async (req, res, next) => {
  const start = req.query.startDate || beginningOfLastMonth();
  const end = req.query.endDate || endOfNextMonth();

  Promise.all([
    getGoogleEvents.getAllEvents({ googleSessions, start, end }, settings),
    getICloudEvents.getAllEvents({ iCloudSessions, start, end }, settings),
  ]).then(([googleEvents, iCloudEvents]) => {
    // const googleEvents = processEvents.googleEvents(rawGoogleEvents);
    // const iCloudEvents = processEvents.iCloudEvents(rawICloudEvents);
    const events = [...googleEvents, ...iCloudEvents];

    res.json(events);
  });
};

module.exports = {
  path: '/api/events',
  middleware,
};

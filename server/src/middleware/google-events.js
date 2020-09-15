// Dependencies.

const { beginningOfLastMonth, endOfNextMonth } = require('../helpers/dates');
const { getAllEvents } = require('../google/get-events');

// Public.

const middleware = ({ googleSessions, ...settings }) => async (req, res, next) => {
  const timeMin = req.query.startDate || beginningOfLastMonth({ format: 'YYYY-MM-DDTHH:mm:ssZ' });
  const timeMax = req.query.endDate || endOfNextMonth({ format: 'YYYY-MM-DDTHH:mm:ssZ' });

  getAllEvents({ googleSessions, timeMin, timeMax }, settings)
    .then((events) => res.json(events))
    .catch((err) => {
      res.status(err.code);
      res.send(`<h1>${err.message}</h1><hr /><pre>${JSON.stringify(err, null, 2)}</pre>`);
    });
};

module.exports = {
  path: '/api/google/events',
  middleware,
};

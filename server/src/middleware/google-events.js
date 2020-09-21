// Dependencies.

const { beginningOfLastMonth, endOfNextMonth } = require('../helpers/dates');
const { getAllEvents } = require('../google/get-events');

// Public.

const middleware = ({ googleSessions, ...settings }) => async (req, res, next) => {
  const start = req.query.startDate || beginningOfLastMonth();
  const end = req.query.endDate || endOfNextMonth();

  getAllEvents({ googleSessions, start, end }, settings)
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

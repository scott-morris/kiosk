// Dependencies.

const { getAllCalendars } = require('../google/get-calendars');

// Public.

const middleware = ({ googleSessions, ...settings }) => async (req, res, next) => {
  const events = await getAllCalendars(googleSessions, settings);

  res.json(events);
};

module.exports = {
  path: '/api/google/calendars',
  middleware,
};

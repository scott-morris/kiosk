// Public.

const middleware = (iCloudSession, options) => async (req, res, next) => {
  const startDate = req.query.startDate || '2020-08-01';
  const endDate = req.query.endDate || '2020-08-31';
  const events = await iCloudSession.Calendar.getEvents(startDate, endDate);
  res.json(events);
};

module.exports = middleware;

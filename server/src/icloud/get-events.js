// Dependencies.

const { standardize, iCloudEvents } = require('../helpers/process-events');

// Public.

const getAllEvents = (iCloudSessions, startDate, endDate) => {
  const rawData = iCloudSessions.map((session) => session.Calendar.getEvents(startDate, endDate));

  return Promise.all(rawData)
    .then((results) => results.flat())
    .then(iCloudEvents)
    .then(standardize);
};

const getEvents = (session, startDate, endDate) =>
  session.Calendar.getEvents(startDate, endDate).then(iCloudEvents).then(standardize);

module.exports = {
  getAllEvents,
  getEvents,
};

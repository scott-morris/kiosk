// Libraries.

const moment = require('moment');

// Dependencies.

const { standardize, iCloudEvents } = require('../helpers/process-events');

// Public.

const getAllEvents = ({ iCloudSessions, start, end }, settings) => {
  const startDate = moment(start).format('YYYY-MM-DD');
  const endDate = moment(end).format('YYYY-MM-DD');
  const rawData = iCloudSessions.map((session) => session.Calendar.getEvents(startDate, endDate));

  return Promise.all(rawData)
    .then((results) => results.flat())
    .then(iCloudEvents)
    .then(standardize);
};

const getEvents = ({ session, start, end }, settings) =>
  session.Calendar.getEvents(startDate, endDate).then(iCloudEvents).then(standardize);

module.exports = {
  getAllEvents,
  getEvents,
};

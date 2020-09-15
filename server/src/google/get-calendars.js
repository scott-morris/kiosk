// Libraries.

const { google } = require('googleapis');

// Public.

const getCalendars = ({ user, auth }, settings) => {
  const calendar = google.calendar({ version: 'v3', auth });
  return calendar.calendarList.list().then(({ data, status }) => {
    if (status !== 200) {
      return console.error(`Invalid response code ${status}`);
    }

    return data.items.map((item) => ({ ...item, user }));
  });
};

const getAllCalendars = (googleSessions, settings) => {
  const userCalendars = googleSessions.map((session) => getCalendars(session, settings));

  return Promise.all(userCalendars).then((...calendars) => calendars.flat());
};

module.exports = {
  getAllCalendars,
  getCalendars,
};

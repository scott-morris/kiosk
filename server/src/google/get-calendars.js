// Libraries.

const { google } = require('googleapis');

// Public.

const getCalendars = ({ user, auth }) => {
  const calendar = google.calendar({ version: 'v3', auth });
  calendar.calendarList.list().then(({ data, status }) => {
    if (status !== 200) {
      return console.error(`Invalid response code ${status}`);
    }

    console.log(`Found ${data.items.length} Google calendars for ${user}:`);
    data.items.forEach((item) => {
      console.log(`- ${item.summaryOverride || item.summary}`);
    });
  });
};

module.exports = getCalendars;

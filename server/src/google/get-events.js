// Libraries.

const { google } = require('googleapis');
const moment = require('moment');

// Dependencies.

const { standardize, googleEvents } = require('../helpers/process-events');

// Private.

const calendarDefaults = {
  calendarId: 'primary',
  orderBy: 'startTime',
  singleEvents: true,
};

// Public.

const getEvents = ({ session, start, end }, settings) => {
  const calendar = google.calendar({ version: 'v3', auth: session.auth });
  const timeMin = moment(start).format('YYYY-MM-DDTHH:mm:ssZ');
  const timeMax = moment(end).format('YYYY-MM-DDTHH:mm:ssZ');

  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        timeMin,
        timeMax,
        ...calendarDefaults,
      },
      (err, res) => {
        if (err) {
          console.log(`The API returned an error for ${session.user}: ${err}`);
          reject(err);
        }

        const rawData = res.data.items;
        const events = standardize(googleEvents(rawData));
        resolve(events);
      }
    );
  });
};

const getAllEvents = ({ googleSessions, start, end }, settings) => {
  const userEvents = googleSessions.map((session) => getEvents({ session, start, end }, settings));

  return Promise.all(userEvents).then((events) => events.flat());
};

module.exports = {
  getAllEvents,
  getEvents,
};

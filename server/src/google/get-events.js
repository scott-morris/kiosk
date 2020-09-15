// Libraries.

const { google } = require('googleapis');

// Private.

const calendarDefaults = {
  calendarId: 'primary',
  orderBy: 'startTime',
  singleEvents: true,
};

// Public.

const getEvents = ({ session, timeMin, timeMax }, settings) => {
  const calendar = google.calendar({ version: 'v3', auth: session.auth });

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

        const events = res.data.items;
        resolve(events);
      }
    );
  });
};

const getAllEvents = ({ googleSessions, timeMin, timeMax }, settings) => {
  const userEvents = googleSessions.map((session) =>
    getEvents({ session, timeMin, timeMax }, settings)
  );

  return Promise.all(userEvents).then((...events) => events.flat());
};

module.exports = {
  getAllEvents,
  getEvents,
};

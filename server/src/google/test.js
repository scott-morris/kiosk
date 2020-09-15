const login = require('./login');
const getEvents = require('./get-events');
const getCalendars = require('./get-calendars');
const { googleSettings } = require('../../../.secrets.json');

googleSettings.forEach((googleInfo) => {
  login(googleInfo).then((auth) => {
    getEvents({ auth });
    getCalendars({ user: googleInfo.user, auth });
  });
});

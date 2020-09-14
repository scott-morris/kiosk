const login = require('./login');
const getEvents = require('./events');
const getCalendars = require('./calendars');
const secrets = require('../../../.secrets.json');

login(secrets.googleSettings[0]).then((auth) => {
  getEvents(auth);
  getCalendars(auth);
});

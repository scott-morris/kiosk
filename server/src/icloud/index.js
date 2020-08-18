// Libraries.

const login = require('./login');

// Public.

const middleware = async ({ session, username, password } = {}, options) => {
  // This creates your iCloud instance
  const myCloud = await login(session);

  return {
    collections: async (req, res, next) => {
      const collections = await myCloud.Calendar.getCollections();
      res.json(collections);
    },
    events: async (req, res, next) => {
      const startDate = '2020-08-01';
      const endDate = '2020-08-31';
      const events = myCloud.Calendar.getEvents(startDate, endDate);
      res.json(events);
    },
  };
};

module.exports = middleware;

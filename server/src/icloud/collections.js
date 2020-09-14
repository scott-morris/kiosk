// Public.

const middleware = (iCloudSessions, options) => (req, res, next) => {
  const collections = iCloudSessions.map((session) => session.Calendar.getCollections());

  Promise.all(collections).then((...results) => res.json(results.flat()));
};

module.exports = middleware;

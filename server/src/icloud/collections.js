// Public.

const middleware = (iCloudSession, options) => async (req, res, next) => {
  const collections = await iCloudSession.Calendar.getCollections();
  res.json(collections);
};

module.exports = middleware;

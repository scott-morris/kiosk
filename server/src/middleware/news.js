// Libraries.

const googleNewsAPI = require('google-news-json');

// Public.

const middleware = (settings) => async (req, res) => {
  const news = await googleNewsAPI.getNews(googleNewsAPI.TOP_NEWS, null, 'en-US');

  res.json(news);
};

module.exports = {
  path: '/api/news',
  middleware,
};

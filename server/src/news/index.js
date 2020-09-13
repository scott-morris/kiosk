// Libraries.

const googleNewsAPI = require('google-news-json');

// Public.

const middleware = (settings, options) => async (req, res) => {
  const news = await googleNewsAPI.getNews(googleNewsAPI.TOP_NEWS, null, 'en-US');

  res.json(news);
};

module.exports = middleware;

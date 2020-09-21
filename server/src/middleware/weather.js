// Libraries.

const https = require('https');

// Private.

const getWeatherApi = (lat, lon, appid) =>
  new Promise((resolve, reject) => {
    const api = new URL('/data/2.5/onecall', 'https://api.openweathermap.org/');
    const params = new URLSearchParams({
      lat,
      lon,
      appid,
      units: 'imperial',
    });
    api.search = params;

    const req = https.get(api.href, (res) => {
      let data = '';

      if (process.env.VERBOSE) {
        console.log(`openweather api statusCode: ${res.statusCode}`);
      }

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve(JSON.parse(data));
      });
    });

    req.on('error', (e) => {
      reject(e);
    });
  });

// Public.

const middleware = ({ weatherSettings, ...settings }) => async (req, res) => {
  const lat = req.query.lat || weatherSettings.lat;
  const lon = req.query.lng || req.query.lon || weatherSettings.lon;

  const weather = await getWeatherApi(lat, lon, weatherSettings.openWeatherAPIkey);

  res.json(weather);
};

module.exports = {
  path: '/api/weather',
  middleware,
};

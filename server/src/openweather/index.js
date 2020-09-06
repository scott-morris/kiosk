// Libraries.

const https = require('https');
const url = require('url');

// Private.

const getWeatherApi = (lat, lon, appid) =>
  new Promise((resolve, reject) => {
    const api = new URL('/data/2.5/onecall', 'https://api.openweathermap.org/');
    const params = new URLSearchParams({
      lat,
      lon,
      appid,
      units: 'imperial',
      exclude: 'minutely',
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

const middleware = ({ openWeatherAPIkey }) => async (req, res) => {
  const lat = req.query.lat || '40.0117764';
  const lon = req.query.lng || req.query.lon || '-82.7670737';

  const weather = await getWeatherApi(lat, lon, openWeatherAPIkey);

  res.json(weather);
};

module.exports = middleware;

// Libraries.

const https = require('https');

// Private.

const getWeatherApi = (lat, lon, openWeatherAPIkey) =>
  new Promise((resolve, reject) => {
    const req = https.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${openWeatherAPIkey}`,
      (res) => {
        let data = '';

        console.log(`openweather api statusCode: ${res.statusCode}`);
        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          resolve(JSON.parse(data));
        });
      }
    );

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

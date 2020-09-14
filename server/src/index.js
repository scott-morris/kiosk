#!/usr/bin/env node

// Libraries.

const cors = require('cors');
const express = require('express');
const path = require('path');

// Dependencies.

const iCloudLogin = require('./icloud/login');
const secrets = require('../../.secrets.json');

// Middleware

const iCloudCollections = require('./icloud/collections');
const iCloudEvents = require('./icloud/events');
// const googleEvents = require('./google/events');
const openWeather = require('./openweather');
const news = require('./news');

// Local.

const app = express();
const { iCloudSettings, googleSettings, weatherSettings, ...settings } = secrets;
const port = 3001;
const servingFolder = path.resolve(__dirname, '../client/build');

// Private.

// Public.

(async () => {
  const [iCloudSessions, googleSessions] = await loginAll(iCloudSettings, googleSettings, settings);

  app.use(cors());
  app.use(express.static(servingFolder));

  app.get('/api/icloud/collections', iCloudCollections(iCloudSessions, settings));
  app.get('/api/icloud/events', iCloudEvents(iCloudSessions, settings));
  // app.get('/api/google/events', googleEvents(googleSessions, settings));
  app.get('/api/weather', openWeather(weatherSettings, settings));
  app.get('/api/news', news(settings));

  app.listen(port, () => {
    console.log(`APIs serving at http://192.168.1.3:${port}`);
  });
})();

#!/usr/bin/env node

// Libraries.

const cors = require('cors');
const express = require('express');
const path = require('path');

// Dependencies.

const login = require('./src/icloud/login');
const secrets = require('../.secrets.json');

// Middleware

const iCloudCollections = require('./src/icloud/collections');
const iCloudEvents = require('./src/icloud/events');

// Local.

const app = express();
const { iCloudSettings, ...settings } = secrets;
const port = 3001;
const servingFolder = path.resolve(__dirname, '../client/build');

// Public.

(async () => {
  const iCloudSession = await login(iCloudSettings, settings);

  app.use(cors());
  app.use(express.static(servingFolder));

  app.get('/api/icloud/collections', iCloudCollections(iCloudSession, settings));
  app.get('/api/icloud/events', iCloudEvents(iCloudSession, settings));

  app.listen(port, () => {
    console.log(`Example app serving ${servingFolder} at http://192.168.1.3:${port}`);
  });
})();

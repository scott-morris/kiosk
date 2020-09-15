#!/usr/bin/env node

// Libraries.

const cors = require('cors');
const express = require('express');
const glob = require('glob');
const path = require('path');

// Dependencies.

const iCloudLogin = require('./icloud/login');
const secrets = require('../../.secrets.json');

// Local.

const app = express();
const port = 3001;
const servingFolder = path.resolve(__dirname, '../client/build');

// Public.

(async () => {
  const [iCloudSessions, googleSessions] = await loginAll(iCloudSettings, googleSettings, settings);
  const settings = { iCloudSessions, googleSessions, ...secrets };

  app.use(cors());
  app.use(express.static(servingFolder));

  glob.sync(`${path.join(__dirname, 'middleware')}/*.js`).forEach((route) => {
    app.get(route.path, settings);
  });

  app.listen(port, () => {
    console.log(`APIs serving at http://192.168.1.3:${port}`);
  });
})();

// Libraries.

// Dependencies.

const iCloudLogin = require('./icloud/login');
const googleLogin = require('./google/login');

// Private.

const loginAlliCloud = (iCloudSettings, settings) => {
  const sessions = iCloudSettings.map((iCloudInfo) => iCloudLogin(iCloudInfo, settings));

  return Promise.all(sessions);
};

const loginAllGoogle = (googleSettings, settings) => {
  const sessions = googleSettings.map((googleInfo) => googleLogin(googleInfo, settings));

  return Promise.all(sessions);
};

// Public.

const loginAll = ({ iCloudSettings, googleSettings, ...settings }) => {
  return Promise.all([
    loginAlliCloud(iCloudSettings, settings),
    loginAllGoogle(googleSettings, settings),
  ]);
};

module.exports = loginAll;

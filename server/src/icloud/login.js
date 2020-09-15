// Libraries.

const iCloud = require('apple-icloud');
const prompt = require('prompt');

// Private.

const MSG_EXPIRED =
  'Given session does not exist or is expired. Try to use contained credentials from session to re-login...';
const MSG_INVALID =
  'The contained credentials are not correct or the given session does not exist/is broken.';

/**
 * Handles the requirement of two-factor-authentication
 * @param {Object} myCloud
 * @param {String} username
 */
const readyHandlerTwoFactor = async (myCloud, username) => {
  if (myCloud.twoFactorAuthenticationIsRequired) {
    prompt.get(['Security Code'], function (err, input) {
      if (err) return console.error(err);
      const code = input['Security Code'];
      myCloud.securityCode = code;
    });
    return false;
  } else {
    console.log(`${username} is logged into iCloud successfully!`);

    return true;
  }
};

// Public.

module.exports = ({ session, username, password }) =>
  new Promise(function (resolve, reject) {
    prompt.start();

    const myCloud = new iCloud(session);

    myCloud.on('ready', async function () {
      // Returns
      const isAutheticated = await readyHandlerTwoFactor(myCloud, username);
      if (isAutheticated) {
        resolve(myCloud);
      }
    });

    myCloud.on('err', function (err) {
      if (err.errorCode == 6) {
        console.error(MSG_EXPIRED);
        reject(MSG_EXPIRED);
      }
      // Error code 7: Invalid credentials or borken account
      if (err.errorCode == 7) {
        console.error(MSG_INVALID);
        reject(MSG_INVALID);

        // Try to get new credentials
        const newCloud = new iCloud(session, username, password);

        newCloud.on('ready', async function () {
          const isAutheticated = await readyHandlerTwoFactor(newCloud);
          if (isAutheticated) {
            resolve(newCloud);
          }
        });

        newCloud.on('sessionUpdate', function () {
          newCloud.saveSession();
        });
      }
    });
  });

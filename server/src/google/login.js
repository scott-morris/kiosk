// Libraries.

const { google } = require('googleapis');
const fs = require('fs');
const readline = require('readline');

// Private.

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 */
const getAccessToken = (oAuth2Client, { session }) =>
  new Promise((resolve) => {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(session, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', session);
        });
        resolve(oAuth2Client);
      });
    });
  });

// Public.

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 */
module.exports = ({ user, session, credentials }) =>
  new Promise((resolve) => {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // Check if we have previously stored a token.
    fs.readFile(session, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, { session, credentials });
      oAuth2Client.setCredentials(JSON.parse(token));
      console.log(`${user} is logged into Google successfully!`);
      resolve(oAuth2Client);
    });
  });

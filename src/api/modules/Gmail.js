import moment from 'moment'
import fs from 'fs'
import readline from 'readline'
import google from 'googleapis'
import googleAuth from 'google-auth-library'

import config from 'config'
import {Api} from '../../helper'

var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
    process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs-quickstart.json';

let gmail = new Api()

gmail.id = 'gmail'

gmail.get = () => {
  const p = new Promise((resolve, reject) => {
    gmail.authorize(config.gmail)
      .then((oauth2Client) => {
        gmail.listLabels(oauth2Client)
          .then((results) => {
            resolve(results)
          },
          (msg) => {
            reject(msg)
          })
      },
      (result) => {
        reject(result)
      })
  })
  .catch((err) => {
    console.log('gmail error', err)
  })

  return p
}

gmail.parse = (obj) => {
  var date = moment()
  var json = {
    results: obj,
    updatedAt: {
      timestamp: date.format('x'),
      date: date.format('MMMM Do YYYY, h:mm:ss a')
    }
  }
  
  return json
}

gmail.authorize = (credentials) => {
  const p = new Promise((resolve, reject) => {
    var clientSecret = credentials.installed.client_secret
    var clientId = credentials.installed.client_id
    var redirectUrl = credentials.installed.redirect_uris[0]
    var auth = new googleAuth()
    var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl)

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, function(err, token) {
      if (err) {
        gmail.getNewToken(oauth2Client, (oauth2Client) => {
          resolve(oauth2Client)
        });
      } else {
        oauth2Client.credentials = JSON.parse(token)
        resolve(oauth2Client)
        // callback(oauth2Client)
      }
    })
  })
  .catch((err) => {
    console.log('gmail authorize', err)
  })

  return p
}

gmail.getNewToken = (oauth2Client) => {
  const p = new Promise((resolve, reject) => {
    var authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question('Enter the code from that page here: ', function(code) {
      rl.close();
      oauth2Client.getToken(code, function(err, token) {
        if (err) {
          console.log('Error while trying to retrieve access token', err);
          return;
        }
        oauth2Client.credentials = token;
        gmail.storeToken(token);
        resolve(oauth2Client);
      });
    });
  })
  .catch((err) => {
    console.log('gmail getNewToken', err)
  })

  return p
}

gmail.storeToken = (token) => {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code != 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
}

gmail.getMessage = (auth, message, gm, i) => {
  const p = new Promise((resolve, reject) => {
      gm.users.messages.get({
        id: message.id,
        auth: auth,
        userId: 'me',
      }, (err, response) => {
        var item = {}
        Array.prototype.forEach.call(response.payload.headers, (header) => {
          if (header.name === 'Subject') {
            item[header.name.toLowerCase()] = header.value
          }else if (header.name === 'From') {
            item[header.name.toLowerCase()] = header.value.replace(/<.*?>/, '')
          }
        })
        item.snippet = response.snippet
        resolve(item)
      })
      i++
    })

  return p
}

gmail.listLabels = (auth) => {
  const p = new Promise((resolve, reject) => {
    var gm = google.gmail('v1');
    var promises = []
    var results = []
    gm.users.messages.list({
      auth: auth,
      userId: 'me',
    }, (err, response) => {
      if (err) {
        reject('The API returned an error: ' + err);
        return;
      }

      var messages = response.messages;

      if (messages.length == 0) {
        reject('No messages found.');
      } else {
        var i = 0
        Array.prototype.forEach.call(messages, (message) => {
          var promiseMessage = gmail.getMessage(auth, message, gm, i)
            
            promiseMessage.then((item) => {
              results.push(item)
            })
          promises.push(promiseMessage)
        })
          
      }
      Promise.all(promises)
        .then(() => {
          resolve(results)
        })
    });
  })
  .catch((err) => {
    console.log('gmail listLabels', err)
  })

  return p
}

export default gmail
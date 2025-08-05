const express = require('express');
const ping_pong = express.Router();
const fetch = require('node-fetch');
const cron = require('node-cron');

const mainServer = 'https://servermonitoringsystembyng.onrender.com';

ping_pong.get('/ping', (req, res) => {
  console.log('Pong Pong Server 2');
  res.send('Pong from Server 2');
});

const pingServers = () => {
  fetch(`${mainServer}/ping`)
    .then((res) => {
      if (res.ok) {
        console.log(`Main server is responding:`, res.status);
      } else {
        console.log(`Main server responded with error:`, res.status);
        retryAfterDelay();
      }
    })
    .catch((err) => {
      console.error(`Main server is not responding:`, err.message);
      retryAfterDelay();
    });
};

const retryAfterDelay = () => {
  console.log('Retrying in 30 seconds...');
  setTimeout(pingServers, 30 * 1000);
};

// Schedule every 5 minutes
cron.schedule('*/5 * * * *', () => {
  console.log('Scheduled ping started');
  pingServers();
});

module.exports = ping_pong;

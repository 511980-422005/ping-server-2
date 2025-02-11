const ping_pong = require('express').Router();
const fetch = require('node-fetch');
let isPing = false;
ping_pong.get('/ping', async (req, res) => {
  if (isPing == true) {
    isPing = false;
    setTimeout(() => {
      callback();
    }, 5 * 60 * 1000);
  }
  console.log('Pong Pong Server 2');
  res.send('Pong from Server 2');
});

(async () => {
  await fetch('https://server.markethealers.com/ping')
    .then((res) => {
      if (res.ok) {
        console.log('Server 1 is responding:', res.status);
        isPing = true;
      } else {
        console.log('Server 1 responded with an error:', res.status);
        callback();
      }
    })
    .catch((err) => {
      console.error('Server 1 is not responding:', err.message);
      callback();
    });
})();

function callback() {
  fetch('https://server.markethealers.com/ping')
    .then((res) => {
      if (res.ok) {
        console.log('Server 1 is responding:', res.status);
        isPing = true;
      } else {
        console.log('Server 1 responded with an error:', res.status);
        setTimeout(() => {
          callback();
        }, 5 * 60 * 1000);
      }
    })
    .catch((err) => {
      console.error('Server 1 is not responding:', err.message);
      setTimeout(() => {
        callback();
      }, 5 * 60 * 1000);
    });
}

module.exports = ping_pong;

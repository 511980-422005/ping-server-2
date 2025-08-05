const ping_pong = require('express').Router();
const fetch = require('node-fetch');
let isPing = false;

const mainServer = 'https://servermonitoringsystembyng.onrender.com';
const otherServers = [  
  'https://servermonitoringsystembyng.onrender.com'
];

ping_pong.get('/ping', async (req, res) => {
  if (isPing) {
    isPing = false;
    setTimeout(() => {
      pingServers();
    }, 5 * 60 * 1000);
  }
  console.log('Pong Pong Server 2');
  res.send('Pong from Server 2');
});

const pingServers = () => {
  fetch(`${mainServer}/ping`)
    .then((res) => {
      if (res.ok) {
        console.log(`Main server is responding:`, res.status);
        isPing = true;
      } else {
        console.log(`Main server responded with an error:`, res.status);
        setTimeout(pingServers, 5 * 60 * 1000);
      }
    })
    .catch((err) => {
      console.error(`Main server is not responding:`, err.message);
      setTimeout(pingServers, 5 * 60 * 1000);
    });
  for (const server of otherServers) {
    fetch(`${server}/ping`).catch(() => {});
  }
};

(async () => {
  pingServers();
})();

module.exports = ping_pong;

const express = require('express');
const app = express();
const ping_pong = require('./ping_pong');
app.use(ping_pong);
const PORT = process.env.PORT || 3000;


app.post('/test', (req, res) => {
  const start = Date.now();
  let x = 0;
  // Simulate CPU load (non-blocking loop)
  for (let i = 0; i < 1e7; i++) {
    x += Math.sqrt(i);
  }
  const latency = Date.now() - start;
  res.json({ message: 'Heavy task done', latency });
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} successfully`);
});

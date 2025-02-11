const express = require('express');
const app = express();
const ping_pong = require('./ping_pong');
app.use(ping_pong);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} successfully`);
});

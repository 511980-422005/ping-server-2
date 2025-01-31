 
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const connectToDB = require('./src/config/database'); 
const signup = require('./src/router/signup'); 
const blog = require('./src/router/blog');
const app = express();

const ping_pong = require('./src/router/ping_pong')
app.use(ping_pong);
const allowedOrigins = [
  'http://localhost:3000',
  'https://blog-app-home.vercel.app',
  'https://blog-app-auth-client.vercel.app',
];
const contact = require('./src/router/contact');
app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'), false);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 60,
    message: 'Too many requests, please try again later.',
  })
);
app.use(express.json());
app.use(cookieParser()); 
app.use(contact);
app.use(signup);
app.use(blog);

app.use((req, res) => {
  res.status(404).json({ error: '143 Page not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

connectToDB()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT} successfully`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
  });

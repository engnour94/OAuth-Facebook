
// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFoundHandler = require('./error-handlers/404.js');
const authRoutes = require('./auth-server/src/auth/routes.js');
const v1Routes = require('./api-server/src/routes/v1.js');
const v2Routes =require('./api-server/src/routes/v2.js');
const logger = require('./api-server/src/middleware/logger.js');
const oauth = require('./auth-server/src/auth/middleware/oauth.js');
const path = require('path');

// Prepare the express app
const app = express();


// App Level MW
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));

// Routes
app.use(authRoutes);
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);


// app.get('/', (req, res) => {
//   res.send('Welcome to Home Page');
// });
app.get('/bad', (req, res) => {
  throw new Error();
});

app.use(express.json());

app.use(logger);

app.use('/api/v1', v1Routes);


app.get('/oauth', oauth, (req, res) => {
  res.json({ token: req.token, user: req.user });
});

// Catchalls
app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};




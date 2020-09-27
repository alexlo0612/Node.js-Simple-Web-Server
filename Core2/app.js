// Dependencies
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const compression = require('compression');

// Global Variable
const PORT = 3000 || process.env.PORT;

//Initialize the App
const app = express();

//Compression Module
app.use(compression({ level: 9, }));

//Disable etag and x-powered-by to prevent header grabbing
app.set('etag', false);
app.set('x-powered-by', false);

app.all('*', (req, res, next) => {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  //No cache
  res.setHeader('Cache-Control', 'no-cache');

  next();
});


// BodyParser Middleware
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '5mb',
}));

app.use(bodyParser.json({
  limit: '5mb',
  extended: true,
}));

//Set up View Engine & its Path
app.use(express.static(path.join(__dirname, 'css')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Load Routes
const Main = require('./routes/main');

// Use Routes
app.use('/', Main);

//Server Starts
app.listen(PORT, () => {
  console.log(`Server is Listening on Port ${PORT} in ${process.env.NODE_ENV} Mode`);
});

'use strict';

// DECLARE APP MODULES AND DEPENDENCIES
const bodyParser = require('body-parser');
const express = require('express');
var nmap = require('libnmap');

// INSTANTIATE EXPRESS APP
const app = express();

// APP VARIABLES
const PORT = process.env.PORT || 3000;

// SET VIEW ENGINE
app.set('view engine', 'jade');

// SERVE CLIENT-SIDE STATIC CONTENT
app.use(express.static('public'));

// EXPRESS MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: false }));

// ROUTES
app.get('/', (req, res) => {
  res.status(200).send('index.html');
});

app.post('/scan/host', (req, res) => {
  // DEFINE LIBNMAP SCAN OPTIONS
  const opts = {
    flags: [
    ],
    range: [
      '127.0.0.1'
    ],
    timeout: 100 // sets --host-timeout flag in seconds
  };

  console.log(opts);

  nmap.scan(opts, (err, report) => {
    if (err) throw err;

    res.status(200).send(report);
  });
});

app.get('/discover', (req, res) => {
  nmap.discover(function(err, report) {
  if (err) throw new Error(err);

  res.status(200).render('discover');
  });
});

// START SERVER LISTENING
app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});

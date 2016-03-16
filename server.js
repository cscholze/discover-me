'use strict';

// DECLARE APP MODULES AND DEPENDENCIES
const bodyParser = require('body-parser');
const express = require('express');
//const dbSetup = require('./db/dbSetup');
const pg = require('pg').native;
const nmap = require('libnmap');
const os = require('os');

// INSTANTIATE EXPRESS APP
const app = express();

// APP VARIABLES
const DATABASE_URL = process.env.DATABASE_URL || 'postgres:///toferdev';
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
  console.log(req.body);

  // DEFINE LIBNMAP SCAN OPTIONS
  const opts = {
    flags: [
      req.body.scanType
    ],
    json: true,
    range: [
      '127.0.0.1'
    ],
    timeout: 100 // sets --host-timeout flag in seconds
  };

  nmap.scan(opts, (err, report) => {
    if (err) throw new Error(err);

    res.status(200).send(report);
  });
});


app.post('/scan/discover', (req, res) => {
  const localNetworkRange = getLocalNetworkRange();

  nmap.discover( (err, report) => {
    if (err) throw new Error(err);

    res.status(200).send(report);
  });
});

/*
// CONNECT TO DB
pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connect to postgres! Getting schemas...');

  client.query(dbSetup.initDB);

});
*/

// START SERVER LISTENING
app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});


// FUNCTIONS
const getLocalNetworkRange = function() {
  var range = []
    , adapter = ''
    , netmask = ''
    , adapters = os.networkInterfaces();

  for (const iface in adapters) {
    adapters[iface].forEach( (adapter) => {
      if(!adapter.internal) {
        if (!adapter.netmask)
          return false;
        if (adapter.netmask) {
          if (adapter.family==='IPv4') {
            netmask = adapter.netmask;
            range.push(adapter.address+'/'+netmask);
          }
        }
      }
    });
  }
  return range;
};

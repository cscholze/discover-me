'use strict';

// DECLARE APP MODULES AND DEPENDENCIES
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const pg = require('pg').native;
const nmap = require('libnmap');
const os = require('os');
const db = require('./models/');


// SYNC DATABASE (DROPS TABLES CURRENTLY FOR DEVELOPMENT)
db.sequelize.sync({force: true});


// INSTANTIATE EXPRESS APP
const app = express();


// APP VARIABLES
const PORT = process.env.PORT || 3000;


// SET VIEW ENGINE
app.set('view engine', 'jade');


// SERVE CLIENT-SIDE STATIC CONTENT
app.use(express.static('public'));


// EXPRESS MIDDLEWARE
app.use(bodyParser.json());


// ROUTES
app.get('/', (req, res) => {
  res.status(200).send('index.html');
});

// DISCOVER NETWORK NEIGHBORS
app.get('/scan/discover', (req, res) => {

  nmap.discover( (err, report) => {
    if (err) throw new Error(err);

    let hostIPs = [];

    for ( const ipRange in report) {
      if (report[ipRange].hasOwnProperty('host')) {
        report[ipRange].host.forEach( (host) => {
          hostIPs.push(host.address[0].item.addr);

          // SAVE HOSTS TO DB
          db.host.findOrCreate({
            where: {
              ipAddress: host.address[0].item.addr
            }
          })
          .spread((temp, created) => {
            // ACCESS CREATED ITEM
          });
        });
      };
    }

    res.status(200).send(hostIPs);
  });
});

// GET: HOST SCAN
app.get('/scan/host/:hostToScan', (req, res) => {
  const opts = {
      range: [ req.params.hostToScan ]
    };

  nmap.scan(opts, function(err, report) {
    if (err) throw new Error(err);

    // DEBUGGING - REMOVE FOR PRODUCTION
    // fs.writeFile('./db/hostScanRes.txt', JSON.stringify(report));

    res.status(200).send(report);
  });
});


// POST: SAVE SCAN TO DB
app.post('/scan/save', (req, res) => {
  const scanData = (req.body);
  console.log(req.body);


  res.status(200).send(scanData);
});


// START SERVER LISTENING
app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});

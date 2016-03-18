'use strict';

// DECLARE APP MODULES AND DEPENDENCIES
const bodyParser = require('body-parser');
const express = require('express');
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
app.use(bodyParser.urlencoded({ extended: false }));


// ROUTES
app.get('/', (req, res) => {
  res.status(200).send('index.html');
});


app.post('/scan/discover', (req, res) => {

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
            console.log(created);
          });

          /* SORT IP ADDRESSES
          hostIPs.sort( (a,b) => {
            a = a.match(/[0-9]{1,3}$/g);
            b = b.match(/[0-9]{1,3}$/g);
            return a-b;
          });
         */
        });
      };
    }

    res.status(200).send(hostIPs);
  });
});


// START SERVER LISTENING
app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});

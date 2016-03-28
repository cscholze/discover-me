'use strict';

// DECLARE APP MODULES AND DEPENDENCIES
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const pg = require('pg').native;
const nmap = require('libnmap');
const os = require('os');
const db = require('./models/');


// SYNC DATABASE ({force: true} to drop tables)
db.sequelize.sync({force: false});

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

  // create date/time to name scan
  const scanName = new Date();
  // save scan to scan table
  db.scan.create({
    name: scanName
  }).then( (savedScan) => {
    const savedScanId = savedScan.dataValues.id;
  // save hosts to host table, attach scanid
    for (const host in scanData) {
      db.host.create({
        scanId: savedScanId,
        ipAddress: host,
        scanStatus: scanData[host].scanStatus
      }).then( (savedHost) => {
        const savedHostId = savedHost.dataValues.id;
  // save ports to port table, attach scanid
        scanData[host].ports.forEach( (port) => {
          db.openPort.create({
            portNumber: port.portid,
            protocol: port.protocol,
            service: port.serviceName,
            hostId: savedHostId
          }).then( (savedPort) => {
          });
        });
      });
    }
  res.status(200).send(`Saved scan ${savedScanId}`);
  });
});

// GET SCANS FROM DATABASE
app.get('/scans/load', (req, res) => {
  db.scan.findAll({

    include: [
      {
        model: db.host,
        scanId: db.Sequelize.col('scan.id'),
        include: [
          {
            model: db.openPort,
            hostId: db.Sequelize.col('host.id')
          }
        ]
      },
    ]
  })
  .then( (scans) => {
    res.status(200).send(scans);
  });
});

// Delete scan from DB
app.delete('/scan/delete', (req, res) => {
  const scanToDelete = req.body.scanNameToDelete;
  db.scan.destroy({
    where: {name: scanToDelete}
  })
  .then( (deletedScan) => {
    res.status(200).send(`DELETED ${deletedScan}`);
  });
});


// START SERVER LISTENING
app.listen(PORT, () => {
  console.log(`Server listening on PORT: ${PORT}`);
});

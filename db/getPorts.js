'use strict';

const fs = require('fs');
const scannedHost = '10.0.0.96';

fs.readFile('./db/hostScanRes.txt', (err, data) => {
  if (err) throw err;

  // if results[scannedHost].host[0] !have a ports object, no results;
  const results = JSON.parse(data);
  console.log(results);
  const ports = results[scannedHost].host[0].ports[0].port;
  for (const port in ports) {
    console.log("HOST_IP: ", scannedHost);
    console.log("PORT_ID:   ", ports[port].item.portid);
    console.log("PROTOCOL:  ", ports[port].item.protocol);
    console.log("SERVICE:   ", ports[port].service[0].item.name);
  }
});


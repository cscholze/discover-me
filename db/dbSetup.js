'use strict';

const fs = require('fs');

fs.readFile('test_discovery_results.json', 'utf8', (err, report) => {
  if (err) throw err;

  let hostIPs = [];

  report = JSON.parse(report);

    for ( const range in report) {
      if (report[range].hasOwnProperty('host')) {
        report[range].host.forEach( (host) => {
          hostIPs.push(host.address[0].item.addr);
          console.log(hostIPs);
          hostIPs = hostIPs.sort( (a,b) => {
            a = a.match(/[0-9]{1,3}$/g);
            b = b.match(/[0-9]{1,3}$/g);
            console.log(`a: ${a}, b: ${b}`);
            return a-b;
          });
        });
      };
    }
    console.log(hostIPs);
});

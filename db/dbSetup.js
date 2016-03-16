'use strict';

module.exports = {
  initDB: `
    CREATE SCHEMA IF NOT EXISTS discoverme;
    CREATE TABLE IF NOT EXISTS discoverme.HostScan (
      scanID      integer,
      userID      integer,
      PRIMARY KEY(scanID, userID)
    );
    CREATE TABLE IF NOT EXISTS discoverme.User (
      userID      integer PRIMARY KEY,
      firstName   varchar(20),
      lastName    varchar(20),
      email       varchar(30)
    );`
}

'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var db        = {};

const DATABASE_URL = 'postgres://wmzvpwhbstnvec:aFQKYpe4mfgC7FC-yUDNojqN-p@ec2-54-227-246-11.compute-1.amazonaws.com:5432/d4h9a8phut1gmd';

var sequelize = new Sequelize(DATABASE_URL, {
                               dialect: 'postgres',
                               dialectOptions: {
                                 ssl: true
                               }
                             });

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js');

const Campuses = db.define('campuses', {
  name : {
    type: Sequelize.STRING,
    allowNull: false,
    isUnique: true
  }
})

module.exports = Campuses;
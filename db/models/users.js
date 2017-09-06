'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')
const Campuses =  require('./campuses');


const Users = db.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    isUnique: true,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  }
})


module.exports = Users;

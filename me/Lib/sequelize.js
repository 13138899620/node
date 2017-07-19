//<reference path="./typings/index.d.ts" />

const Sequelize=require('sequelize')

var sequelize = new Sequelize('M2', 'sa', 'asp.net', {
  host: '10.12.75.161',
  dialect: 'mssql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});

module.exports=sequelize
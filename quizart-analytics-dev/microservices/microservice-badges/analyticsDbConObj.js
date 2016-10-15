var mongoose = require('mongoose');
var analyticsDbConObj = mongoose.createConnection('mongodb://localhost/analyticsDB');
module.exports = analyticsDbConObj;

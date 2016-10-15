var mongoose = require('mongoose');

var userLogin = mongoose.model('userLogin', { userId: String, loginTime: Date},'userLogin');

module.exports = userLogin;
var router = require('express').Router();
var controller = require('./friendslist.controller');

router.get('/:uid',controller.getfriendslist);

exports = module.exports = router;

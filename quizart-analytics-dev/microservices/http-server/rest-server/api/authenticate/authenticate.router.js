var router = require('express').Router();
var controller = require('./authenticate.controller');

router.post('/',controller.createToken);
router.post('/:userid/badge',controller.createBadge);

exports = module.exports = router;

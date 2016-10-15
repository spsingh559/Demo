var router = require('express').Router();
var controller = require('./leavegroup.controller');


router.post('/',controller.leavegroup);
router.put('/changename',controller.changename);

exports = module.exports = router;

var context = require('../../context');
var mesh = context.mesh;

var controller = {};

controller.getfriendslist = function(req, res) {
  var uid = req.param("uid");
  mesh.act('role:chat,cmd:getFriendList', {uid:req.param("uid")}, function(err, response) {
    if(err) { console.log('===== ERR: ', err, ' ====='); return res.status(500).send(); }
    if(response.response !== 'success') { return res.status(403).send(); }
    return res.status(201).json({data:response.friends});
  });
};


exports = module.exports = controller;

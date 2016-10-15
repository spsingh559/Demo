var context = require('../../context');
var mesh = context.mesh;

var controller = {};

controller.createToken = function(req, res) {
  mesh.act('role:jwt,cmd:generate', req.body, function(err, response) {
    console.log("===============inside authenticate controller========");
    if(err) { console.log('===== ERR: ', err, ' ====='); return res.status(500).send(); }
    if(response.response !== 'success') { return res.status(403).send(); }

    return res.status(201).json({token: response.token});
  });
};

controller.createBadge = function(req, res) {
  var userId=req.params.userid;
  mesh.act('role:badges,cmd:login',{userId:userId},function(err, response){
    console.log("===============inside authenticate controller========");

    console.log(response.badge);
    return res.status(201).json({badge: response.badge});
  });
};




exports = module.exports = controller;

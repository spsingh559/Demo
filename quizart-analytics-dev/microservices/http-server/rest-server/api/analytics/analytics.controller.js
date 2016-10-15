var controller = {};

var context = require('../../context');
var mesh = context.mesh;


controller.create = function(req, res) {
    const newpost = req.body;
    // console.log("============================req.body==================",req.body);
    // console.log("======================newpost===============================",newpost);
    mesh.act('role:analytics,cmd:create',newpost,function(err, response) {
      if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
      if(response.response !== 'success') { return res.status(404).send(); }
      return res.status(201).json(response.entity);
  });
};

controller.favTopics = function(req,res){
  console.log("inside favouritetopics"); 
  var userid=req.params.userid;
  console.log(userid); 
	mesh.act('role:analytics,cmd:favouritetopics',{userid:userid},function(err,response){
    console.log("inside act");
		  if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
   		   if(response.response !== 'success') { return res.status(404).send(); }
    		  return res.status(200).json(response.result);
  });
};

controller.favtopicsFilter = function(req,res){
  console.log("inside favtopicsFilter"); 
  mesh.act('role:analytics,cmd:favtopicsfilter',function(err,response){
    console.log("inside act");
      if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
         if(response.response !== 'success') { return res.status(404).send(); }
          return res.status(200).json(response.result);
  });
};

controller.winlossFilter = function(req,res){
  console.log("inside winlossFilter"); 
  mesh.act('role:analytics,cmd:winlossfilter',function(err,response){
    console.log("inside winloss");
      if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
         if(response.response !== 'success') { return res.status(404).send(); }
          return res.status(200).json(response.result);
  });
};

controller.winLoss = function(req,res){
  console.log("inside winloss"); 
  var userid=req.params.userid;
  console.log(userid); 
  mesh.act('role:analytics,cmd:winloss',{userid:userid},function(err,response){
    console.log("inside act");
      if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
         if(response.response !== 'success') { return res.status(404).send(); }
          return res.status(200).json(response.result);
  });
};


controller.leaderboardFilter = function(req,res){
  // console.log("inside winloss"); 
  // var userid=req.params.userid;
  // console.log(userid); 
  mesh.act('role:analytics,cmd:leaderboardfilter',function(err,response){
    console.log("inside act");
      if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
         if(response.response !== 'success') { return res.status(404).send(); }
          return res.status(200).json(response.result);
  });
};


controller.leaderboard = function(req,res){
  var topicid=req.params.topicid;
  // console.log("inside winloss"); 
  // var userid=req.params.userid;
  // console.log(userid); 
  mesh.act('role:analytics,cmd:leaderboard',{topicid:topicid},function(err,response){
    console.log("inside act");
      if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
         if(response.response !== 'success') { return res.status(404).send(); }
          return res.status(200).json(response.result);
  });
};


controller.gamesplayed = function(req,res){
  // var topicid=req.params.topicid;
  // console.log("inside winloss"); 
  var userid=req.params.userid;
  // console.log(userid); 
  mesh.act('role:analytics,cmd:gamesplayed',{userid:userid},function(err,response){
    console.log("inside act");
      if(err) { console.error('===== ERR: ', err, ' ====='); return res.status(500).send(); }
         if(response.response !== 'success') { return res.status(404).send(); }
          return res.status(200).json(response.result);
  });
};

exports = module.exports = controller;

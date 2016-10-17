var seneca = require('seneca');
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var request = require('request');

const PlayerMiddleware = require('./player-middleware/index');


var cloudinary = require('cloudinary');
var formidable = require('express-formidable');
var secret = process.env.AUTH_SECRET || "the matrix";
var googlecredentials = require('./secrets/googlecredentials');
var oauth2Client = new OAuth2(googlecredentials.CLIENT_ID, googlecredentials.CLIENT_SECRET, googlecredentials.REDIRECT_URL);
var redirectHost = process.env.REDIRECT_HOST || "localhost";
var port = process.env.PORT || '8001';
var redirectPort = process.env.REDIRECT_PORT || port;
// var redirectPort = 8001;
// var redirectHost = "192.168.99.101";
var name = process.env.NAME || "default";
var mesh = seneca({log: 'test'});
mesh.use('mesh',{auto:true});
var context = require('./context');

var cloudinary = require('cloudinary');
var formidable = require('express-formidable');

var chatMiddlewarePlugin  = require('./chatmiddlewareplugin');
var notificationMiddlewarePlugin=require('./notificationMiddlewarePlugin');

context.mesh = mesh;
var twitterStream = require('./api/timeline/TwitterStream');

context.authorizeMiddleware = function(req, res, next) {
  mesh.act('role:jwt,cmd:verify', {token: req.get('JWT')}, function(err, response) {
    if(err) { return res.status(500).json(err); }
    if(response.response !== 'success') { return res.status(404).send(); }
    req.claims = response.claims;
    next();
  });
};

/*var schedular = require('./schedular');
schedular();*/

var env = process.env.NODE_ENV || 'dev';

app.use(express.static(__dirname + '/../common-ui'));

if(env.trim() === 'dev') {
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, jwt");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
    // console.log("inside server checking env",env);
    next();
  });
};

app.use(require('body-parser').json());
app.set('secret',secret);
app.use('/api/v1', require('./router'));

var chat = io.of('/chat');

app.post('/api/generateuuid/uuid',function(req,res){
  const redis=require('redis');
  const publisher=redis.createClient(6379,'172.23.238.253');
  const subscriber=redis.createClient(6379,'172.23.238.253');
  subscriber.subscribe(req.body.message.content);
  publisher.publish('ChatService2',JSON.stringify(req.body));
  subscriber.on('message',function(channel,message){
    var message1=JSON.parse(message);
    res.send({response:'success',result:message1});
  });

});


app.use(formidable.parse());
app.post('/api/uploadfile',function(req,res){
console.log('-------------- abc from express floow---------------',req.body);
console.log('-------------- abc from express floow---------------',req.body.file.path);

cloudinary.config({
cloud_name: 'quizrt-social',
api_key: '866928426995948',
api_secret: 'a0_PX4nmJqak_k3lc29Ges5dcNw'
});

cloudinary.uploader.upload(req.body.file.path, function(result) {
console.log(result);
});
});


var tweets =io.of('/tweets');
app.post('/api/authenticate/google',function(req,res,next){
  console.log("Inside Express, inside google login call=======");

  // generate a url that asks permissions for Google+ and Google Calendar scopes
  var scopes = [
    googlecredentials.SCOPE[0],
    googlecredentials.SCOPE[1]
  ];

  var url = oauth2Client.generateAuthUrl({
    access_type: 'online', // 'online' (default) or 'offline' (gets refresh_token)
    scope: scopes,
    approval_prompt: "force" // If you only need one scope you can pass it as string
  });
  res.send({ redirect: url });
  // next();
});

app.get('/api/auth/success/google',function(req,res){
  // console.log("Inside google page===========");
  var code = req.query.code;
  // console.log("Inside Express, code to get Token is=============",code);
  oauth2Client.getToken(code, function(err, tokens) {
    // Now tokens contains an access_token and an optional refresh_token. Save them.
    // console.log("Inside Express , after getting token=======",tokens);
    // console.log("Inside Express , after getting token=======",JSON.stringify(tokens));
    if(!err) {
      oauth2Client.setCredentials(tokens);
    }
    if(err){
      console.log(err);
    }

    var access_token = tokens['access_token'];
    var user_profile = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='+access_token;
      request({
        url: user_profile,
        json: true
      }, function (error, response, body) {
        if (!error) {
          // console.log("Inside the Express after getting the user profile the body is ======",body);
          var tokendata = {
            user : body.email
          }
          // console.log("Inside Express, the user profile token data========,",tokendata);
          mesh.act('role:jwt,cmd:generateGoogleToken',{data:tokendata},function(err,tokenresponse){
            if(err) { return res.status(500).json(err); }
            if(tokenresponse.response==='success'){
              var userObj = {
                username: tokendata.user,
                useravatar :body.picture,
                name : body.given_name,
                age : null,
                country : 'NA',
                totalGames : 0,
                liketopics: '',
                following: 0,
                followers: 0,
                category: 'Beginner'
              };
                mesh.act('role:profile,cmd:create',userObj,function(err,response){
                    if(err) { return res.status(500).json(err); }
                    if(response.response !== 'success') { res.redirect('http://'+redirectHost+':'+redirectPort+'/#/authsuccess/'+tokenresponse.token); }
                    res.redirect('http://'+redirectHost+':'+redirectPort+'/#/authsuccess/'+tokenresponse.token);
                });
            }
          });
      } else {
        res.redirect('/login');
          console.log(error);
      }
    })
  });

});

  tweets.on('connection',function(socket){
  console.log("===conected to tweet socket");
   twitterStream(socket);
});


  chat.on('connection',function(socket){
    console.log("Inside Express, Socket Connected");
    var chatmiddleware = new chatMiddlewarePlugin(socket);
  });


app.get('/topics',function(req,res) {
  console.log('form express-alltopics');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  mesh.act('role:allTopics,action:retrive',function(err,result){
    if (err) return console.error(err)
  console.log('-----------------'+result+'------------------------')
  res.send(result)
  })
  console.log('send');
});
app.get('/api/favouritetopics/user/:userId',function(req,res) {

  result= [{"paras@gmail.com":[
                {  y: 4181563, legendText:"Sherlock", indexLabel: "Sherlock" },
                {  y: 2175498, legendText:"Movies", indexLabel: "Movies" },
                {  y: 3125844, legendText:"Logos",exploded: true, indexLabel: "Logos" },
                {  y: 1176121, legendText:"Sports" , indexLabel: "Sports"},
                {  y: 1727161, legendText:"Cricket", indexLabel: "Cricket" },
                {  y: 4303364, legendText:"General Knowledge" , indexLabel: "General Knowledge"},
                {  y: 1717786, legendText:"Animals" , indexLabel: "Animals"}
            ]},
            {"paras@gmial.com":[
                {  y: 4181564, legendText:"Sherlock", indexLabel: "Sherlock" },
                {  y: 2175498, legendText:"Movies", indexLabel: "Movies" },
                {  y: 3125844, legendText:"Logos",exploded: true, indexLabel: "Logos" },
                {  y: 1176121, legendText:"Sports" , indexLabel: "Sports"},
                {  y: 1727161, legendText:"Cricket", indexLabel: "Cricket" },
                {  y: 4303364, legendText:"General Knowledge" , indexLabel: "General Knowledge"},
                {  y: 1717786, legendText:"Animals" , indexLabel: "Animals"}
            ]}]
  res.send(result[0][req.params.userId])
});


app.get('/topics/myfav',function(req,res) {
 mesh.act('role:myFav,action:retrive',{user:req.params.uid},function(err,result){
 if (err) return console.error(err)
console.log('------------yahi to hai result-----'+result+'------------------------')
res.send(result);
 })
 console.log('agrt dfglca;lkg');
 })

app.get('/api/v1/analytics/user/favTopics',function(req,res) {
  mesh.act('role:analytics,cmd:favouritetopics',function(err,result){
   if (err) return console.error(err)
    console.log('------------testing the result-----'+result+'------------------------')
    res.send(result);
     })
     console.log('agrt dfglca;lkg');
 })

app.get('/api/v1/analytics/user/filter',function(req,res) {
  mesh.act('role:analytics,cmd:favouritetopics',function(err,result){
   if (err) return console.error(err)
    console.log('------------testing the result-----'+result+'------------------------')
    res.send(result);
     })
     console.log('agrt dfglca;lkg');
 })
 app.get('/tournamentSection',function(req,res) {
   console.log('form express-tournamentSection');
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   mesh.act('role:randTournaments,action:retrive',function(err,result){
     if (err) return console.error(err)
   console.log('-----------------'+result+'------------------------')
   res.send(result)
   })
   console.log('send');
 });

 app.get('/tournaments',function(req,res) {
   console.log('form express-alltopics');
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   mesh.act('role:allTournaments,action:retrive',function(err,result){
     if (err) return console.error(err)
   console.log('-----------------'+result+'------------------------')
   res.send(result)
   })
   console.log('send');
 });

// ------------------------------ CREATE LOBBY---/

app.post('/createLobby', function(req, res) {
  console.log('----------------CREATE LOBBY----------------'); 
  var respnse;

  mesh.act('role:lobby,action:create',function(err,result){
    if(err)
    {
      console.log('----Error in Connecting with Microservice----');
      console.log(err);
      res.send('error');
    }
    else
    {
      console.log('-----Established connection with Microservice-----');
      console.log(result.gameId);
      respnse = result.gameId;
      console.log('--------------------------------------------------');
      res.send(respnse);
    }
  });
});

// ----------------------------------------------/

app.post('/api/check',function(req,res){
 console.log('-------------- abc from express floow---------------');
 console.log(req.body.incre+'   0----------------------');
 console.log(req.body.id+'    ---------------------');
 var test = {
   id:req.body.id,
   incre:req.body.incre,
   username:req.body.uName
 }

 var username = req.body.uName;

 mesh.act('role:topic,action:like',{data:test},function(err,result){

   if(err) console.log(err+'---------------------------------------done liked---------');

   console.log(result+'yaha thak hai>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
   if(!req.body.incre) {
     mesh.act('role:topic,action:delete',{data:test},function(err,result2){

       if(err) console.log(err+' ========================');

       res.send(result)
     })
   }
 })
});


app.use(function(req, res) {
  return res.status(404).send();
});



app.use(formidable.parse());
app.post('/api/check',function(req,res){
  console.log('-------------- abc from express floow---------------',req.body);
  //console.log('-------------- abc from express floow---------------',req.body.file);
  console.log('-------------- abc from express floow---------------',req.body.file.path);
  //console.log(req.body.incre+'   0----------------------');
  //console.log(req.body.id+'    ---------------------');

  cloudinary.config({
   cloud_name: 'quizrt-social',
   api_key: '866928426995948',
   api_secret: 'a0_PX4nmJqak_k3lc29Ges5dcNw'
  });
  var url = '';
  cloudinary.uploader.upload(req.body.file.path, function(result) {
    url = result.url;
   console.log(result.url);
  });
  return url;
});

var middleWareCount =0;



io.on('connection',function(socket){
  // TODO: Create Middleware Plugin for user.
  // console.log("socket Connected");
   socket.emit('connection', {status:true});



  var playerMiddleware;
  var playerId;
  // var NotificationMiddleware;



  socket.on('authenticate', function(jwt) {
    console.log('Retrieved JWT: ', jwt);
    mesh.act('role:jwt,cmd:verify', {token: jwt}, function(err, response) {
      if(err) { return res.status(500).json(err); }
      if(response.response !== 'success') { return socket.emit('authentication','failed'); }
      console.log('Subject: ',response.claims.sub);
      playerId = response.claims.sub;
      console.log("player id is"+playerId);
     
      createPlayerMiddlewareIfNotAlreadyCreated();

    });
  });
  var notificationPlayerId=1002;
  // var msg='This is notification from'+notificationPlayerId;
  var notificationMiddleware = new notificationMiddlewarePlugin(notificationPlayerId,socket); 

  // function NotificationMiddleware(){
  //   notification = new notification(playerId,socket);
  // };

  function createPlayerMiddlewareIfNotAlreadyCreated() {
    if(!playerMiddleware) {
      console.log('Creating Player Middleware');
      playerMiddleware = new PlayerMiddleware(playerId, socket);

      socket.on('disconnect', function() {
        console.log('DISCONNECTING SOCKET!');
        playerMiddleware.close();
      });

      socket.on('playGame', function(msg) {
        console.log('User ' + playerId + ' wants to play a game in topic ' + msg.topicId);
        playerMiddleware.queue(msg.topicId);
      });

      socket.on('respond', function(optionIndex) {
        playerMiddleware.respond(optionIndex);
      });

      playerMiddleware.ready(function() {
        socket.emit('authentication','success');
      });
    }
  }

  // Create Lobby Socket Connections ---------------------------------
  socket.on('lobbyPlayerAdd', function(pdata) {
    console.log('-----------Added ' + pdata.data.id + '------------');
    var playerId=1002;
    const chatClient = seneca();
    // var msg={msgs: 'Hello'};
    var msg={
      id: 0,
      NotificationId: 1,
      NotificationOwnerId: 1002,
      NotificationTargetId: 2000,
      // "NotificationOwnerPic": "./image/notificationOwnerPic.jpg",
      NotificationTitle: "Friend Request",
      NotificationSubTitle: "has send Friend request",
      DateAndTime: "9/16/2016T10:32:40",
      isNotificationActive: "true",
      NotificationStatus: false,
      notificationStatustext: "You have Accepted",
      notificationResultStatus: true
    };
    // console.log(notificationData);
    chatClient.use('redis-transport');
    chatClient.client({
      type: 'redis',
      pin: 'role:notification,playerId:'+playerId+',cmd:*',
      host: '172.23.238.251'
    });

    chatClient.act('role:notification,playerId:'+playerId+',cmd:send',{msg: msg}, function(err, response) {
      if(err){
        return console.error(err);
      }else{
      console.log(response.response);
      socket.emit('connection', {status:true});

    }
    });
    // Redis Connection Here
  });

  socket.on('lobbyPlayerDelete', function(pdata) {
    console.log('-----------Removed ' + pdata.name + '------------');
  });

  // -----------------------------------------------------------------
})

exports = module.exports = server;

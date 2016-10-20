var app = require('express')();
var express=require('express');
var http=require('http').Server(app);
var swig=require('swig');
var io = require('socket.io')(http);

app.use(express.static(__dirname +'/views'));
io.on('connection', function (socket) {
  // socket.emit('server event', { foo: 'bar' });
  // socket.on('client event', function (data) {
  //   socket.broadcast.emit('update label', data);
  // });
  socket.emit("new",{newmsg:"got new notification"});
  socket.on('message',function(data){
  	// console.log("click is working");
  	console.log(data.msg);
  	socket.broadcast.emit('message',data);
  });
});

http.listen(8080,function(){
	console.log('Express server is running');
})
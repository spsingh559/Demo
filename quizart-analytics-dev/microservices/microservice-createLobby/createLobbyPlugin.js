module.exports = function(){
  
  this.add('role:lobby,action:create', function(msg, respond) {
    console.log("======REDIS=========");
    console.log(msg);
    var d = new Date();
    // var lobbyId = '' + d.getYear() + d.getMonth() + d.getDate() + d.getHours() + d.getMinutes() + d.getMilliseconds();
    console.log('++++++Date Id = ' + Number(d));
    var resp = Number(d) + '';
    return respond(null, {gameId: resp});
  });
}
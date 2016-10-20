module.exports = function(){
	
	var lobby = [], allPlayers = [];


	this.add('role:lobby,action:createLobby', function(msg, respond) {
		console.log('-----------Inside Lobby MicroService---------');
		// console.log(msg);
		var d = new Date();
		console.log('User Id : ' + msg.data);
		console.log('Game Id generated : ' + Number(d));
		var resp = Number(d) + '';
		var lobbyDetails = {
			lobbyId: Number(d),
			playerCount: 1,
			topic: '',
			lobbyAdmin: msg.data
		};
		lobby.push(lobbyDetails);
		console.log(lobby);
		console.log('---------------------------------------------');
		return respond(null, {gameId: resp});
	});

	this.add('role:lobby,action:getPlayers', function(msg, respond) {
		console.log('-----------Inside Lobby MicroService---------');
		console.log('Get Player Details for lobby ' + msg.data);

		var players = [];

		lobby.map(function (row, i){
			if (msg.data == row.lobbyId)
			{
				players.push({
					'name': row.lobbyAdmin,
					'status': 'active',
					'user': 'admin'
				});
				// Logic for other players
			}
		});
		allPlayers.map(function (row, i){
			if (msg.data == row.lobbyId)
			{
				players.push({
					'name': row.name,
					'status': row.status,
					'user': row.user
				});
			}
		});

		console.log('---------------------------------------------');
		return respond(null, {players: players});
	});

	this.add('role:lobby,action:addPlayer', function(msg, respond) {
		console.log('-----------Inside Lobby MicroService---------');
		console.log('Add Player triggered for ' + msg.data.player);
		var players = {
			'lobbyId': msg.data.lobby,
			'name': msg.data.player,
			'status': 'waiting for player',
			'user': 'player'
		};
		allPlayers.push(players);
		console.log(allPlayers);
		console.log('---------------------------------------------');
		return respond(null, {response: 'Add Player Success'});
	});

	this.add('role:lobby,action:remPlayer', function(msg, respond) {
		console.log('-----------Inside Lobby MicroService---------');
		console.log('Remove Player triggered for ' + msg.data.player);

		var indexToDelete = -1;
		allPlayers.map(function (row, i){
			if(row.lobbyId == msg.data.lobby)
			{
				if(row.name == msg.data.player)
				{
					indexToDelete = i;
					return;
				}
			}
		});

		console.log('Index to Delete = ' + indexToDelete);
		console.log('User Deleted : ' + allPlayers[indexToDelete].name);
		allPlayers.splice(indexToDelete, 1);

		return respond(null, {response: 'Remove Player Success'});
	});

	this.add('role:lobby,action:getLobbyTopic', function(msg, respond) {
		console.log('-----------Inside Lobby MicroService---------');
		console.log('Get Topic Details for lobby ' + msg.data);
		var resp;
		lobby.map(function (row, i){
			if (msg.data == row.lobbyId)
			{
				console.log('Topic is ' + row.topic);
				resp = row.topic;
			}
		});
		

		console.log('---------------------------------------------');
		return respond(null, {topic: resp});
	});
}
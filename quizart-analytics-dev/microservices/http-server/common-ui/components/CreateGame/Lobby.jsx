// Main container which contain player details and Start/Exit buttons

import React from 'react';
import base64 from 'base-64';
import restUrl from '../../restUrl';

// Custom Components
import PlayerList from './PlayerList.jsx';

var username = (JSON.parse(base64.decode(localStorage.token.split('.')[1])).sub);

var me;

var players = [];

var Lobby = React.createClass({
	getInitialState: function() {
		me = this;
		return ({
            playr: [],
        });
	},
	componentWillMount: function()
	{
		this.getPlayers();
		this.context.socket.on('updatePlayer', function(data) {
			me.getPlayers();
		 console.log('-------------- COMMAND TO UPDATE PLAYER RECEIVED --------------');
	    });
	},
	getPlayers: function ()
	{
		var url = window.location.href;
		var startPos = url.lastIndexOf('/lobby/') + 7;
	    var lobbyId = url.substr(startPos, 13);
		$.ajax({
	      url: restUrl + '/getLobbyPlayers/' + lobbyId,
	        type: 'GET',
	        success: function(data){
	        	console.log('Player Details :');
	        	console.log(data);
	        	this.setState({
					playr: data
				});
				players = data;
	        }.bind(this),
	        error:function(err){
	          console.log(err);
	          console.log('(Component: Lobby): Error in fetching Player Details');
	        }
	    });
	},
	addPlayerHandler: function(newname) {
		players.push({'name': newname, 'status': 'waiting for player','user': 'player'});

		var url = window.location.href;
		var startPos = url.lastIndexOf('/lobby/') + 7;
	    var lobbyId = url.substr(startPos, 13);

		var addPlayerDetails = {
			player: newname,
			lobby: lobbyId
		};
		// Ajax Post operation here
		this.context.socket.emit('lobbyPlayerAdd', {data: addPlayerDetails});
		this.setState({
            playr: players
        });
	},
	delPlayerHandler: function(index) {
		var delName = players[index].name;

		var url = window.location.href;
		var startPos = url.lastIndexOf('/lobby/') + 7;
	    var lobbyId = url.substr(startPos, 13);

		var removePlayerDetails = {
			player: delName,
			lobby: lobbyId
		};

		this.context.socket.emit('lobbyPlayerDelete', {data: removePlayerDetails});

		players.splice(index, 1);
		this.setState({
            playr: players
        });
	},
	render: function() {
	    return (
        	<div style={{width: '100%',display: 'block'}}>
        		<div style={{overflow: 'hidden'}}>
		            <PlayerList
		            	players={this.state.playr}
		            	addPlayerHandle={this.addPlayerHandler}
		            	delPlayerHandle={this.delPlayerHandler}
		            	heightDiff={this.props.heightDiff}
		            	// addRemovePlayerSocket={addRemovePlayerSocket}
		            	device={this.props.device}
		            />
		        </div>
	        </div>
		);
    }
});

// addRemovePlayerSocket.on('add new player', function (data) {
// 	me.addPlayerHandler(data);
// });

// addRemovePlayerSocket.on('delete player', function (data) {
// 	me.delPlayerHandler(data);
// });

Lobby.contextTypes = {
    socket: React.PropTypes.object.isRequired
};

export default Lobby;
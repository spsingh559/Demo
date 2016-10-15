// Main container which contain player details and Start/Exit buttons
// Passing Height Difference to set window height

import React from 'react';

// Custom Components
import PlayerList from './PlayerList.jsx';

var players = [
	{'name': 'this user','status': 'active','user': 'admin'},	
];

var me;

var Lobby = React.createClass({
	getInitialState: function() {
		me = this;
		return ({
            playr: [],
        });
	},
	getPlayers: function ()
	{
		var arrayEq = true;
		// AJAX Get Operation
		// Inside success
		if (players.length !== this.state.playr.length)
		{	arrayEq = false;}
		else
		{
			for(var i = 0; i < this.state.playr.length; i++)
			{
				if(players[i].status !== this.state.playr[i].status)
					arrayEq = false;
			}
		}

		if (arrayEq == false)
		{
			this.setState({
				playr: players
			});
		}
	},
	componentWillMount: function()
	{
		this.getPlayers();
	},
	addPlayerHandler: function(newname) {
		players.push({'name': newname, 'status': 'waiting for player','user': 'player'});

		// Ajax Post operation here
		var playerId={id:1001};


		this.context.socket.emit('lobbyPlayerAdd', {data: playerId});
		this.setState({
            playr: players
        });
	},
	delPlayerHandler: function(index) {
		var delName = players[index].name;
		players.splice(index, 1);
		this.context.socket.emit('lobbyPlayerDelete', {name: delName});
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
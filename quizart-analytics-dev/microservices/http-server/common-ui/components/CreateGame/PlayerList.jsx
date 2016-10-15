// Component for adding and managing players
// Passing Height Difference to set window height

import React from 'react';

// Material components
import List from 'material-ui/List/List';

// Custom components
import AddPlayer from './PlayerList-AddPlayer.jsx';
import ShowPlayerList from './PlayerList-ShowPlayerList.jsx';

var PlayerList = React.createClass({
	addPlayer: function(newname) {
		this.props.addPlayerHandle(newname);
		// this.props.addRemovePlayerSocket.emit('new player', newname);
	},
	delPlayer: function(index) {
		this.del = this.props.players[index].name;
		this.props.delPlayerHandle(index);
		// this.props.addRemovePlayerSocket.emit('remove player', index);
	},
	componentWillMount: function() {
		this.del = '';
	},
	componentDidUpdate: function() {
		this.del = '';
	},

    render: function() {
    	var pointThis = this;
    	return (
        	<div style={{float: 'left',padding: '5px',width: '100%', marginTop: '0px'}}>
	        	<AddPlayer
	        		add={pointThis.addPlayer}
	        		players={this.props.players}
	        		del={this.del}
	        		device={this.props.device}
	        	/>	        	
	        	<div>
	        		<ShowPlayerList
	        			delete={pointThis.delPlayer}
	        			players={this.props.players}
	        			heightDiff={this.props.heightDiff}
	        			device={this.props.device}
					/>
	            </div>
	        </div>
        );
    }
});

export default PlayerList;
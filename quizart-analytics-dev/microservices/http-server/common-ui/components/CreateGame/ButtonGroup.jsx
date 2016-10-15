// Start game and Exit Game Buttons

import React from 'react';

// Material Components
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

// Component
var ButtonGroup = React.createClass({
    getInitialState: function() {
        return {
            open: false
        };
    },
    handleOpen: function() {
        this.setState({open: true});
    },
    handleClose: function() {
        this.setState({open: false});
    },
    render: function() {
        const actions = [
            <FlatButton
                label="Ok"
                primary={true}
                onTouchTap={this.handleClose}
            />
        ];
        return (
        	<div>
        		<div style={{margin: '10px'}}>
            		<RaisedButton label="Start Game" primary={true} fullWidth={true} onTouchTap={this.handleOpen} />
            	</div>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    Message to be given!
                </Dialog>
            	<div style={{margin: '10px'}}>
            		<RaisedButton label="Exit Game" fullWidth={true} />
            	</div>
        	</div>
        	
        );
    }
});

export default ButtonGroup;
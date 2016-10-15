import React from 'react';

// Custom Component
import Topic from '../Topic.jsx';
import Lobby from '../Lobby.jsx';
import ChatComponent from '../ChatComponent.jsx';
import ButtonGroup from '../ButtonGroup.jsx';

// Body Component
var DesktopBodyContent = React.createClass({
	getButtonMessage(message) {
		this.message = message;
		console.log(this.message);
	},
  	render() {
	    return (
	    	<div style={{backgroundColor: 'lightgrey', overflow: 'auto'}}>
			    <div style={{width: '80%', margin: 'auto', backgroundColor: 'white', overflow: 'auto', paddingBottom: '20px'}}>
			    	<div
			    		className='col-xs-12 col-sm-12 col-md-12 col-lg-12'
			    		style={{textAlign: 'center',
			    				minHeight: '50px',
			    				marginBottom: '40px'
			    			}}>
			    		<h3>Create game</h3>
			    	</div>
			    	<div className='row col-xs-12 col-sm-12 col-md-12 col-lg-12'>
				    	<div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
				    		<span style={{fontStyle: 'italic'}}>Game Lobby :</span>
				    		<Lobby heightDiff={70} device='desktop' checkMessage={this.getButtonMessage}/>
				    	</div>
				    	<div className='col-xs-6 col-sm-6 col-md-6 col-lg-6'>
				    		<div className='col-xs-12' style={{marginBottom: '20px'}}>
				    			<span style={{fontStyle: 'italic'}}>Quiz topic :</span>
				    			<Topic device='desktop' />
				    		</div>
				    		<div className='col-xs-12'>
				    			<ChatComponent heightDiff={0} />
				    		</div>
				    	</div>
				    </div>
				    <div className='col-xs-12' style={{textAlign: 'center', minHeight: '50px'}}>
			    		<ButtonGroup />
			    	</div>
				</div>
			</div>
	    );
  	}
});

export default DesktopBodyContent;
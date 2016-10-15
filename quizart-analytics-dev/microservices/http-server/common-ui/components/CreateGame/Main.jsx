// Entry Component - contains entire containers

import React from 'react';
import ReactDOM from 'react-dom';

// Plugin for Touch tap
// import injectTapEventPlugin from 'react-tap-event-plugin';
// injectTapEventPlugin();

// Theme
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Material Component
import AppBar from 'material-ui/AppBar';

// Custom Components
import BodyContent from './BodyContent.jsx';
import DesktopBodyContent from './Desktop/DesktopBodyContent.jsx';

var screenWidthLimiter = 767;
// Main Component
var CreateGame = React.createClass({
	getInitialState() {
		return {
	        heightDiff: 0,
	        windowWidth: window.innerWidth
	    };
	},
	alterPageHeight() {
		var node = ReactDOM.findDOMNode(this);
		var hf = window.innerHeight - node.scrollHeight;
		if (hf != 0)
		{
			this.setState({
				heightDiff: hf
			});
		}
	},
	handleResize: function(e) {
		this.setState({windowWidth: window.innerWidth});
	},

	componentDidMount: function() {
		window.addEventListener('resize', this.handleResize);
		if (window.innerWidth <= screenWidthLimiter)
		{
			this.alterPageHeight();
		}
	},

	componentWillUnmount: function() {
		window.removeEventListener('resize', this.handleResize);
	},
  	render() {
  		console.log(window.innerWidth);
  		if (window.innerWidth > screenWidthLimiter)
  		{
  			return (
			    <div style={{paddingTop: '64px', backgroundColor: 'white'}}>
			    	<DesktopBodyContent />	
				</div>
		    );
  		}
  		else
  		{
		    return (
			    <div style={{paddingTop: '64px', backgroundColor: 'white'}}>
			    	<BodyContent heightDiff={this.state.heightDiff}/>	
				</div>
		    );
		}
  	}
});

export default CreateGame;

// ReactDOM.render(
// 	<MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
// 		<CreateGame />
// 	</MuiThemeProvider>,
// 	document.getElementById('content')
// );
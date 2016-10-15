// Passing Height Difference to set window height
// Contains Select/Show Topic and Tab Contents (Player List & Chat)

import React from 'react';

// Custom Component
import TabContent from './TabContent.jsx';
import Topic from './Topic.jsx';

// Body Component
var BodyContent = React.createClass({
  	render() {
	    return (
		    <div>		    	
		    	<Topic  device='mobile'/>
		    	<TabContent heightDiff={this.props.heightDiff}/>	
			</div>
	    );
  	}
});

export default BodyContent;
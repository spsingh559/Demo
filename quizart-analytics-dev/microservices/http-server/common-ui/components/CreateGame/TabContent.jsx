// Contains tabs and swipable views for displaying player details and chat details
// Passing Height Difference to set window height

import React from 'react';

// Theme components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// Material Components
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ChatIcon from 'material-ui/svg-icons/action/speaker-notes';
import PlayerIcon from 'material-ui/svg-icons/action/face';
// Custom Components
import Lobby from './Lobby.jsx';
import ButtonGroup from './ButtonGroup.jsx';
import ChatComponent from './ChatComponent.jsx';

// Custom theme for Tabs
const muiTheme = getMuiTheme({
    palette: {
        alternateTextColor: 'lightgrey'
    }
});

var TabContent = React.createClass({

getInitialState: function() {
    return {
        slideIndex: 0
    };
},

handleChange: function(value) {
    this.setState({
        slideIndex: value
    });
},

togglePage: function() {
    if ( this.state.slideIndex == 0)
    {
        this.setState({slideIndex: 1});
    }
    else
    {
        this.setState({slideIndex: 0});
    }
},

render: function() {
    return (
        <div>
            <Divider />
            <div style={{width: '100%', overflow: 'auto'}}>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <Tabs
                        onChange={this.handleChange}
                        value={this.state.slideIndex}
                        inkBarStyle={{background: 'rgb(0, 188, 212)'}}
                        style={{width: '100%', marginTop: '2px', float: 'right'}}
                        >
                            <Tab
                                icon={<PlayerIcon />}
                                value={0} 
                                style={{backgroundColor: 'white',
                                    border: 'none'}} 
                            />
                            <Tab
                                icon={<ChatIcon />}
                                value={1}
                                style={{backgroundColor: 'white',
                                    border: 'none'}}

                            />
                    </Tabs>
                </MuiThemeProvider>
            </div>
            <SwipeableViews
                index={this.state.slideIndex}
                onChangeIndex={this.handleChange}
                >
                    <div style={{overflow: 'hidden'}}>
                        <Lobby heightDiff={0} device='mobile'/>
                        <div style={{width: '100%',display: 'block'}}>
                            <Divider />
                            <ButtonGroup />
                        </div>
                        
                    </div>
                    <div style={{padding: 0, overflow: 'hidden'}}> 
                        <ChatComponent heightDiff={0} />
                    </div>
            </SwipeableViews>
        </div>
    );
    }
});

export default TabContent;
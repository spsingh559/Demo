import {Tabs, Tab} from 'material-ui/Tabs';
import React from 'react';
import Divider from 'material-ui/Divider';
// From https://github.com/oliviertassinari/react-swipeable-views
import SwipeableViews from 'react-swipeable-views';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    textAlign: "center",
    padding: 15,
    height:70
  },
  date:{
    paddingTop:10,
  }
};

var SwipeTabs = React.createClass({

getInitialState: function(){
  return ({slideIndex:0});
},

handleChange: function(value){
  this.setState({slideIndex:value});
},
render: function(){

  //return <small>This is the Swipe Tabs component.</small>
return (

  <div>
    <Tabs
      onChange={this.handleChange}
      value={this.state.slideIndex}
    >
      <Tab label="Description" value={0} />
      <Tab label="Rules" value={1} />
      <Tab label="Prizes" value={2} />
    </Tabs>
    <SwipeableViews
      index={this.state.slideIndex}
      onChangeIndex={this.handleChange}
    >
        <div style={styles.slide}>
          {this.props.tournament.description}
        </div>

      <div style={styles.slide}>
        <strong> This is Tournament Instruction </strong>
      </div>
      <div style={styles.slide}>
        <strong> $1000 </strong>
      </div>
    </SwipeableViews>
  </div>
);
}
});
module.exports = SwipeTabs;

import {Tabs, Tab} from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import React from 'react';
import SwipeableViews from 'react-swipeable-views';

const styles = {
 headline: {
   fontSize: 24,
   paddingTop: 16,
   marginBottom: 12,
   fontWeight: 400,
 },
 slide: {
   textAlign: 'center',
   padding: 10,
   height:100
 },
};

var SwipeTabs = React.createClass({

getInitialState: function(){
 return ({slideIndex:0});
},

handleChange: function(value){
 this.setState({slideIndex:value});
},
// currentLevel: function(retrievedTournament) {
//   var levels = retrievedTournament.levels;
//   var currentLevel = -1;
//   for(var i=0;i<levels.length;i++) {
//     if(levels[i].active=='yes') {
//       currentLevel = i;
//       break;
//     }
//   }
//   if(currentLevel==-1) {
//     currentLevel = levels.length-1;
//   }
//   return currentLevel;
// },
render: function(){
 //var currentLevel = this.currentLevel(this.props.tournament);
return (
 <div>
   <Tabs
     onChange={this.handleChange}
     value={this.state.slideIndex}
   >
     <Tab icon={<FontIcon className="muidocs-icon-description"></FontIcon>} label="Description" value={0} />
     <Tab icon={<FontIcon className="muidocs-icon-playlist_add_check"></FontIcon>} label="Instructions" value={1} />
     <Tab icon={<FontIcon className="muidocs-icon-attach_money"></FontIcon>} label="Prizes" value={2} />
   </Tabs>
   <SwipeableViews
     index={this.state.slideIndex}
     onChangeIndex={this.handleChange} >
       <div style={styles.slide}>
         {this.props.tournament.description+"\n"} 
         </div>

     <div style={styles.slide}>
      {this.props.tournament.instructions}
     </div>
     
     <div style={styles.slide}>
     <center>
      1st Place : {this.props.tournament.prizes[0].position1}<br />
      2nd Place : {this.props.tournament.prizes[1].position2}<br />
      3rd Place : {this.props.tournament.prizes[2].position3}
      </center>
     </div>
   </SwipeableViews>
 </div>
);
}
});
module.exports = SwipeTabs;
import React from 'react';
import TournamentsSubCard from './TournamentsSubCard';

const container={
 paddingLeft:15,
 paddingRight:15,
 paddingBottom: 0,
 marginBottom: 0
}


var TournamentsSubContainer = React.createClass({

 render: function(){
   var allTheSubTopics = this.props.tournaments.map(function(tournament){
     return (
       <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 ">
       <TournamentsSubCard tournament={tournament} key={tournament.title}/>
       </div>
     );
   })
   return(
     <div className="container-fluid" style={container}>
     <div className="row">
     {allTheSubTopics}
     </div>
     </div>
   );
 }

});


module.exports = TournamentsSubContainer;
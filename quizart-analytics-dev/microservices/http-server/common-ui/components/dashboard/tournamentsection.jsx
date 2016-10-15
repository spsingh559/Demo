import React from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TournamentsSubContainer from '../SubTournaments/TournamentsSubContainer';
import restUrl from '../../restUrl';

var baseurl='/';

const style = {
  marginLeft:0,
  marginTop:20,
  marginBottom:20,
  marginRight:0,
};

const stylebtn={
  float:'none',
  width:'100%',
  paddingBottom: 20
}

const cardHeader={
  textAlign:'left',
};

const tour_header={
  textAlign:'center',
  paddingTop:20,
  marginBottom: 0
}

var TournamentSection = React.createClass({

  getInitialState:function(){
      return{tournamentData:[{"_id":"Lord-Of-Series","title":"Lord Of Series","endDate":{"$date":"2016-02-28T18:30:00.000Z"},"startDate":{"$date":"2016-02-23T18:30:00.000Z"},"description":"Tournament for the persons who think they know all about English TV Series","matches":3,"playersPerMatch":3,"tournamentFollowers":100,"registration":{"endDate":{"$date":"2016-02-23T18:30:00.000Z"},"startDate":{"$date":"2016-02-22T18:30:00.000Z"}},"imageUrl":"https://quizup-questions.imgix.net/topic-icons/game-of-thrones-2014-10-30T15:00:25.551Z?fm=png\u0026q=50\u0026h=128\u0026w=128","__v":0,"topics":[{"levelId":"Lord-Of-Series_1","topicId":"Game-of-Thrones","games":[]},{"levelId":"Lord-Of-Series_2","topicId":"Lord-of-the-Rings","games":[]},{"levelId":"Lord-Of-Series_3","topicId":"Sherlock","games":[]}],"totalGamesPlayed":0,"leaderBoard":[]},{"_id":"Lord-Of-Series","title":"Lord Of Series","endDate":{"$date":"2016-02-28T18:30:00.000Z"},"startDate":{"$date":"2016-02-23T18:30:00.000Z"},"description":"Tournament for the persons who think they know all about English TV Series","matches":3,"playersPerMatch":3,"tournamentFollowers":100,"registration":{"endDate":{"$date":"2016-02-23T18:30:00.000Z"},"startDate":{"$date":"2016-02-22T18:30:00.000Z"}},"imageUrl":"https://quizup-questions.imgix.net/topic-icons/game-of-thrones-2014-10-30T15:00:25.551Z?fm=png\u0026q=50\u0026h=128\u0026w=128","__v":0,"topics":[{"levelId":"Lord-Of-Series_1","topicId":"Game-of-Thrones","games":[]},{"levelId":"Lord-Of-Series_2","topicId":"Lord-of-the-Rings","games":[]},{"levelId":"Lord-Of-Series_3","topicId":"Sherlock","games":[]}],"totalGamesPlayed":0,"leaderBoard":[]}]}
  },

  contextTypes :{
    router : React.PropTypes.object
  },

  handleTournaments : function(){
    event.preventDefault();
    this.context.router.push('/tournament');
  },

  componentDidMount:function(){
    // $.ajax({
    //   url: restUrl+'/tournamentSection',
    //   dataType:'json',
    //   success: function(data){
    //     console.log('got success---------------------');
    //     console.log(JSON.stringify(data));
    //     this.setState({tournamentData:data})
    //     console.log('------------------------'+data+'----------------------');
    //   }.bind(this),
    //   error:function(err){
    //     console.log(err);
    //     console.log('error');
    //   }
    // })
  },

  render: function () {
    return (
      <div>
        <Paper style={style} zDepth={2} >
          <h1 style={tour_header}>Tournaments</h1>
            <TournamentsSubContainer tournaments={this.state.tournamentData}/>
            <FlatButton label="See More" style={stylebtn}
              onTouchTap={this.handleTournaments.bind(this)}/>
        </Paper>
      </div>
    );
  }
});

export default TournamentSection;

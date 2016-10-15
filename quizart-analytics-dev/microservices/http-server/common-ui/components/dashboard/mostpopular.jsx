import React from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import SubTopicContainer0 from '../SubTopics0/SubTopicContainer0';

var baseurl='/';

const style = {
  marginLeft:0,
  marginTop:20,
  marginBottom:20,
  marginRight:0,
};

const tour_header={
  margin:20,
  textAlign:'center',
  paddingTop:20,
}

const stylebtn={
  float:'none',
  width:'100%',
};

const cardHeader={
  textAlign:'left',
};

// const style = {
//   margin: 20,
//   textAlign: 'center',
// };
//
// const stylebtn={
//   float:'right',
// };

const card={
  textAlign:'left',
  fontSize: 20,
  marginLeft:20,
  width:'80%',
};

var topicsData =[
  {
    _id:'Cricket-World-Cup',
    topicName: "Cricket World Cup",
    topicDescription: "Let's play quiz",
    topicIcon: 'http://res.cloudinary.com/quizrt-social/image/upload/v1468998004/movie_uyfbt8.png',
    category: "Cricket"
  },
  {
  _id:'Bollywood-Movies',
  topicName: "Bollywood Movies",
  topicDescription: "Let's play quiz",
  topicIcon: 'http://res.cloudinary.com/quizrt-social/image/upload/v1468997804/wolrd_cup_aarqtf.png',
  category: "Movies"
},
{
  _id:'Cartoons',
  topicName: "Cartoons",
  topicDescription: "Let's play quiz",
  topicIcon: 'http://res.cloudinary.com/quizrt-social/image/upload/v1468997864/cm_dy_ikhtrz.png',
  category: "Entertainment"
}
];

var MostPopularSection = React.createClass({


contextTypes :{
  router : React.PropTypes.object
},

handleTopics : function(){
  event.preventDefault();
  this.context.router.push('/topics');
},

  render: function () {
    return (
      <div>
        <Paper style={style} zDepth={2} >
          <Card>
          <h1 style={tour_header}>Most Popular topics</h1>

          <SubTopicContainer0 {...this.props} topics ={topicsData}   />
            <FlatButton label="See More" style={stylebtn}
              onTouchTap={this.handleTopics.bind(this)}/>
          </Card>
        </Paper>
      </div>
    );
  }
});

export default MostPopularSection;

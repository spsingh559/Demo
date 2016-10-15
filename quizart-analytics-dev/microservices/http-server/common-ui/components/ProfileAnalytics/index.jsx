import React from 'react';
import MainAppBar from '../../components/MainAppBar';
import Dashboard from '../../components/dashboard';
import NavBar from '../../components/NavBar';
// import TabsMobile from '../../components/Tabs';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import MediaQuery from 'react-responsive';
import ChatDrawer from '../../components/Chat/ChatDrawer';
import SubTopicContainer from '../../components/SubTopics/SubTopicContainer';
import restUrl from '../../restUrl';
import TabsMobile from '../../components/Tabs';
import {red500,blue50,cyan900,teal200} from 'material-ui/styles/colors';

const tdstyle={
padding:"10px"
};
var baseurl='/';

export default class ProfileAnalytics extends React.Component {

  constructor(props){
    super(props);
    this.state={ data:null,  details: [
    {
      "userId": 0,
      "gamesplayed": 868,
      "quizartRating": "Thunder Bird"
    },{
      "userId": 1,
      "gamesplayed": 170,
      "quizartRating": "Thunder Bird"
    },{
      "userId": 2,
      "gamesplayed": 242,
      "quizartRating": "Thunder Bird"
    },{
      "userId": 3,
      "gamesplayed": 408,
      "quizartRating": "Thunder Bird"
    },{
      "userId": 4,
      "gamesplayed": 430,
      "quizartRating": "Thunder Bird"
    },{
      "userId": 5,
      "gamesplayed": 708,
      "quizartRating": "Thunder Bird"
    },{
      "userId": 6,
      "gamesplayed": 899,
      "quizartRating": "Thunder Bird"
    },{
      "userId": 7,
      "gamesplayed": 465,
      "quizartRating": "Thunder Bird"
    },{
      "userId": 8,
      "gamesplayed": 961,
      "quizartRating": "Thunder Bird"
    },{
      "userId": 9,
      "gamesplayed": 525,
      "quizartRating": "Thunder Bird"
    },{
      "userId": 10,
      "gamesplayed": 771,
      "quizartRating": "Thunder Bird"
    },{
      "userId": 11,
      "gamesplayed": 370,
      "quizartRating": "Thunder Bird"
    },{
      "userId": 12,
      "gamesplayed": 259,
      "quizartRating": "Thunder Bird"
    },{
      "userId": 13,
      "gamesplayed": 509,
      "quizartRating": "Thunder Bird"
    },{
      "userId": 14,
      "gamesplayed": 235,
      "quizartRating": "Thunder Bird"
    },{
      "userId": 15,
      "gamesplayed": 484,
      "quizartRating": "Thunder Bird"
    },{
      "userId": 16,
      "gamesplayed": 396,
      "quizartRating": "Thunder Bird"
    },{
      "userId": 17,
      "gamesplayed": 402,
      "quizartRating": "Thunder Bird"
    },{
      "userId": 18,
      "gamesplayed": 504,
      "quizartRating": "Thunder Bird"
    },{
      "userId": 19,
      "gamesplayed": 368,
      "quizartRating": "Thunder Bird"
    }], interests:[{"img":"http://lorempixel.com/100/100/animals/",
                    "img1":"http://lorempixel.com/100/100/city/",
                    "img2":"http://lorempixel.com/100/100/sports/"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"},
                {"img":"https://thesocietypages.org/cyborgology/files/2012/05/FSQ-Mayor-Badge2.jpeg"}
                ]}};
      componentDidMount() {
      $.ajax(
      {
      url: restUrl + '/api/v1/analytics/user/'+this.props.userid+'/gamesplayed',
      type: 'GET',
      dataType:'JSON',
      success:function(dataArr)
      {
        console.log(dataArr);
        this.setState({data: dataArr});
        console.log(this.state.data);
      }.bind(this),
      error:function(err)
      {
        console.error('err');
      }.bind(this)
      })
      };

  render() {
        // var Analytics = this.state.details.map(function (details) {
        //  return (
        //                 <Avatar src={details.img} size={50} style={{marginRight:"10px"}}/>
        //             );
        // })   

  return (
               <Card zDepth={3}>
                    <CardTitle title="Statistics" titleColor={cyan900}/>
                   <CardText>
                   <center>
                       <table>
                             <h4>
                                <tr><td style={tdstyle}>Games Played</td>
                                    <td style={tdstyle}>:</td>
                                    <td style={tdstyle}>{this.state.data}</td>
                                </tr>
                                <tr><td style={tdstyle}>Quizart Rating</td>
                                    <td style={tdstyle}>:</td>
                                    <td style={tdstyle}>{this.state.details[5].quizartRating}</td>
                                </tr>
                              </h4>
                        </table>
                        <CardTitle title="Top Interests" titleColor={cyan900}/>
                         <div className="row">
                            <div className="col-lg-4">
                              <img src={this.state.interests[0].img}/>
                              <h4>Animals</h4>
                            </div>
                            <div className="col-lg-4">
                              <img src={this.state.interests[0].img1}/>
                              <h4>City</h4>
                            </div>
                            <div className="col-lg-4">
                              <img src={this.state.interests[0].img2}/>
                              <h4>Sports</h4>
                            </div>
                            </div>
                    </center>
                    </CardText>
                </Card>
            );
  }
};
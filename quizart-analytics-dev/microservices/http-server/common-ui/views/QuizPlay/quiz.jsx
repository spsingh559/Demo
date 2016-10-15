var React = require('react');
var Slider = require('react-slick');
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import List from 'material-ui/List/List';
import {PropTypes} from 'react';
import ListItem from 'material-ui/List/ListItem';
import Avatar from 'material-ui/Avatar';
import FileFolder from 'material-ui/svg-icons/file/folder';
import ProgressBar from './progressBar';
import Timer from './timer';
import CircularProgress from 'material-ui/CircularProgress';
import cookie from 'react-cookie';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {GridList, GridTile} from 'material-ui/GridList';
import base64 from 'base-64';
import restUrl from '../../restUrl';
import Leaderboard from './Leaderboard';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

const optionStyle = {
  margin:12,
  width:'100%'
}

import {
blue300,
cyan500,
blue600,
green600,
indigo900,
orange200,
orange600,
deepOrange500,
pink400,
grey100,
purple500,
} from 'material-ui/styles/colors';

const styles = {
  waiting: {
    "text-align": "center",
    "margin":"auto",
  }
}

const lead= {
  float: 'right',
  position: 'fixed'
}

export default class QuizPlay extends React.Component{
  constructor() {
    super();
    this.state = { open: false,waiting: true, response: -1, no: 0 , gameComplete: false}
  }

  static get contextTypes(){
    return {
      router: PropTypes.object.isRequired,
      socket: PropTypes.object.isRequired
    }
  }

  handleResponse(optionIndex) {
    if(this.state.response >= 0) { return; }
    console.log('Responding with option: ' + optionIndex);
    this.context.socket.emit('respond',optionIndex);
    this.setState({response: optionIndex});
  }

  handleClose = () => {
    this.setState({open: false});
  };

  componentDidMount() {
    this.context.socket.on('authentication',(msg) => {
      this.context.socket.emit('playGame',{topicId: 'T1'});
    });
    this.context.socket.on('queued', (msg) => {
      console.log('Queued');
      this.setState({waiting: true});
    });
    this.context.socket.on('gameId', (gameId) => {
      localStorage.gameId = gameId;
    });
    this.context.socket.on('nextQuestion', (msg) => {
      console.log('Question Received: ', msg);
      this.setState({waiting: false, question: msg.question, imageUrl: msg.image, options: msg.options, response: -1, correctResponse: -1, no: this.state.no+1});
    });
    this.context.socket.on('gameComplete', (leaderboard) => {

      this.setState({gameComplete: true});

      //this.context.router.push('/endgame');
      //alert('Game Completed');
    });
    this.context.socket.on('response',(response) => {
      this.setState({correctResponse: response.correctResponse});
    });
    this.context.socket.on('leaderboard',(response) => {
      console.log('Leaderboard received');
      this.setState({leaderboard: response.leaderboard});
    });
    this.context.socket.emit('authenticate',localStorage.token);
  }



  render() {
    const username = JSON.parse(base64.decode(localStorage.token.split('.')[1])).sub;

    console.log('Leaderboard: ', this.state.leaderboard);

    var obj=this.state.leaderboard;
    var str="";
    var max=-100,temp;
    for (var prop in obj)
    {
        //str=str+"     "+prop+" : "+obj[prop]+"";

        temp=obj[prop];

        if(max<temp)
        {
          max=temp;
          str=prop;
        }

    }

    const waitingComponent = (
      <div style={styles.waiting}>
        <h2>Waiting for opponents</h2>
        <CircularProgress />
      </div>
    );

    const questionComponent = this.state.question ? (
      <div style={{textAlign: 'center'}}>
        <Timer seconds={10} style={{color: indigo900}}/>
        <h3>Question : {this.state.no}</h3>
        <h2>{this.state.question}</h2>
        <div><img src={this.state.imageUrl}/></div>

        <div style={lead}>
          <Leaderboard leaderboard={this.state.leaderboard}/>
        </div>
        <GridList cellHeight={100} cols={2} style={{position: 'absolute',bottom: 0, width: '100%'}}>
          {this.state.options.map((option, index) => {
            var backgroundColor = '#FFF';
            if(index === this.state.response) { backgroundColor = orange600 }
            if(index === this.state.correctResponse) { backgroundColor = green600 }
            const style = {
              height: '100%',
              padding: '30px 0',
              cursor: 'pointer',
              backgroundColor: backgroundColor
            }
            return (
              <GridTile>
                <Paper style={style} onTouchTap={this.handleResponse.bind(this,index)}>{option}</Paper>
              </GridTile>
            );
          })}
        </GridList>
      </div>
    ) : null;

    const leaderboardComponent= (
        <div>
          {str}
        </div>
      );

    return (
      <div>
      {this.state.gameComplete ? leaderboardComponent : null}
        {this.state.waiting ? waitingComponent : questionComponent}

        <Dialog
          modal={false}
          open={this.state.gameComplete}
          onRequestClose={this.handleClose}
        >
          <center><h1>{str}</h1><br/><h3> is the winner</h3></center>
        </Dialog>

      </div>
    );
  }
}

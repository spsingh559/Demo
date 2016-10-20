import CreateGame from '../../components/CreateGame/Main.jsx';
import MainAppBar from '../../components/MainAppBar';
import React from 'react';
import restUrl from '../../restUrl';
import base64 from 'base-64';

var gameId;




export default class CreateGameApp extends React.Component {
    constructor() {
    super();
  };

  static get contextTypes() {
    console.log('')
    return {
     
     socket:React.PropTypes.object.isRequired
    }
  };

 componentWillMount() {
    var username = (JSON.parse(base64.decode(localStorage.token.split('.')[1])).sub);
    
    var url = window.location.href;
    var startPos = url.lastIndexOf('/lobby/') + 7;
    var lobbyId = url.substr(startPos, 13);

    console.log("current user name0 = "+username);
    console.log('current url='+window.location.href + ' ' + lobbyId);   
    var dataTopass={
      username:username,
      lobbyId:lobbyId
    };

    this.context.socket.emit('subscribeLobby', {data: dataTopass});
  };
        // Subscribe user here

  render() {
    return (
      <div>
        <MainAppBar />
        <CreateGame />     
      </div>
    );
  }
}


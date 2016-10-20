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
     router: React.PropTypes.object.isRequired,
     socket:React.PropTypes.object.isRequired
    }
  };

  componentWillMount() {
    var username = (JSON.parse(base64.decode(localStorage.token.split('.')[1])).sub);
    var dataToPass={
      uName :username
    }
    var me = this;
    $.ajax({
      url: restUrl + '/createLobby/' + username,
        type: 'GET',
        success: function(data){
          gameId=data;
          console.log('Create game successful');
          console.log('Data from MS: ' + data);
          console.log('Redirect to /lobby2');
          me.context.router.push('/lobby/'+data);
        }.bind(this),
        error:function(err){
          console.log(err);
          console.log('Create Game error2');
        }
    });
  };

  render() {
    return (
      <div>
        <MainAppBar/>
        <div style={{textAlign: 'center', paddingTop: '200px'}}>
          Loading Lobby.. Please Wait!
        </div>
      </div>
    );
  }
}

import CreateGame from '../../components/CreateGame/Main.jsx';
import MainAppBar from '../../components/MainAppBar';
import React from 'react';
import restUrl from '../../restUrl'


export default class CreateGameApp extends React.Component {
  constructor() {
    super();
    this.state={
      loadPage: false
    }
  };

  componentWillMount() {
    console.log('Create Game Component Loaded');
    // var data = {id: 11111};
    $.ajax({
      url: restUrl + '/createLobby',
        dataType:'json',
        type: 'POST',
        // data: data,
        success: function(data){
          // console.log('Create game successful');
          console.log('Data from MS: ' + data);
          this.setState({loadPage: true});
        }.bind(this),
        error:function(err){
          console.log(err);
          console.log('Create Game error');
        }
    });
  };

  render() {
    if(this.state.loadPage)
    {
      return (
        <div>
          <MainAppBar/>
          <CreateGame />     
        </div>
      );
    }
    else
    {
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
}

import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {Link} from 'react-router';
import restUrl from '../../restUrl';
import base64 from 'base-64';


const styles = {
  width:'100%',
  marginTop : 50
}

export default class LoginForm extends React.Component {
  constructor() {
    super();
    this.state = {
      loginForm: {
        username: {value: '', pristine: true, error: 'Username is required'},
        password: {value: '', pristine: true, error: 'Password is required'},
        attemptedLogin: false
      },
      openFailDialog: false
    };
  }

  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    }
  }

  handleUsernameChange(e) {
    var loginForm = this.state.loginForm;
    loginForm.username.value = e.target.value;
    if(loginForm.username.value.trim() !== '') { loginForm.username.pristine = false; }
    if(loginForm.username.value.trim() === '') { loginForm.username.error = 'Username is required' } else { delete loginForm.username.error }
    this.setState({loginForm: loginForm});
  }

  handlePasswordChange(e) {
    var loginForm = this.state.loginForm;
    loginForm.password.value = e.target.value;
    loginForm.password.pristine = false;
    if(loginForm.password.value === '') {loginForm.password.error = 'Password is required'} else { delete loginForm.password.error }
    this.setState({loginForm: loginForm});
  }

  handleLogin(event) {
    event.preventDefault();
    var loginForm = this.state.loginForm;
    loginForm.attemptedLogin = true;

    var data = {username:loginForm.username.value,password:loginForm.password.value};

    if(!loginForm.username.error && !loginForm.password.error) {
      var request = $.ajax({
        url: restUrl + '/api/v1/authenticate',
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
      });
      request.done(function(data) {
        localStorage.token = data.token;
        var username = (JSON.parse(base64.decode(localStorage.token.split('.')[1])).sub);
        // console.log("==========Inside Loginform checking token====,",username);
        //console.log(data);
        this.context.router.push('/');
          var badge=$.ajax({
          url: restUrl + '/api/v1/authenticate/'+this.state.loginForm.username.value+'/badge',
          type: 'POST',
          data: JSON.stringify(data),
          contentType: 'application/json'
        });
        badge.done(function(data){
          var badgeStatus=JSON.stringify(data.badge);


          alert(JSON.stringify(data.badge+" awarded"));
        });
      }.bind(this));
      request.fail(function() {
        this.setState({openFailDialog: true});
      }.bind(this));
    }
  }

  closeFailDialog() {
    this.setState({openFailDialog: false});
  }

  googleLogin(){
    $.ajax({
      type: 'POST',
      url : restUrl + 'api/authenticate/google',
      contentType : 'application/json',
      success : (function(data){
        if(data.redirect){
          window.location.href = data.redirect;
        }
      }).bind(this)
    })
  }

  render() {
    const actions = [
      <FlatButton
        label="Retry"
        primary={true}
        onTouchTap={this.closeFailDialog.bind(this)}
      />
    ];

    return (

      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleLogin.bind(this)}>
          <TextField
            floatingLabelText="Username"
            fullWidth={true}
            value={this.state.loginForm.username.value}
            onChange={this.handleUsernameChange.bind(this)}
            errorText={!this.state.loginForm.attemptedLogin && this.state.loginForm.username.pristine ? '' : this.state.loginForm.username.error}
            errorStyle={{textAlign: 'left'}} />
          <TextField type="password"
            floatingLabelText="Password"
            fullWidth={true}
            value={this.state.loginForm.password.value}
            onChange={this.handlePasswordChange.bind(this)}
            errorText={!this.state.loginForm.attemptedLogin && this.state.loginForm.password.pristine ? '' : this.state.loginForm.password.error}
            errorStyle={{textAlign: 'left'}} />
          <RaisedButton
            type="submit"
            label="Login"
            primary={true}
            style={{width: '100%', marginTop: '25px'}} />
          <RaisedButton label = "Login With Google" secondary = {true} style = {{width: '100%', marginTop: '25px'}} onClick={this.googleLogin.bind(this) }/>
          <Link to ='/SignUP'>
            <RaisedButton label = "Sign Up" secondary = {true} style = {styles}/><br/><br/>
          </Link>
        </form>



        <Dialog
          open={this.state.openFailDialog}
          actions={actions}
          onRequestClose={this.closeFailDialog.bind(this)}>
          The Username and Password entered do not match with any of our records. Please try again.
        </Dialog>
      </div>
    );
  }
}

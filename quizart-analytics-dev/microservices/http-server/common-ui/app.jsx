import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Router, Route, Link, hashHistory} from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import LoginView from './views/LoginView'; //Login Form of Sagar
import DashboardView from './views/DashboardView';
import ChangePasswordView from './views/MyAccount/ChangePasswordView';
import Topics from './views/allTopics/allTopics';
import Tournaments from './views/allTournaments/alltournaments';
import EachTopicsPage from './views/EachTopicsPage';
import Quiz from './views/QuizPlay';
import SignUP from './views/SignUp';
import AuthSuccess from './views/AuthSuccess';
import TwitterAuthSuccess from './views/TwitterAuthSuccess';
import LeaderBoard from './views/LeaderBoard';
import TournamentLeaderBoard from './views/TournamentLeaderBoard';
import ContextComponent from './context';
import CreateTournament from './views/CreateTournament';
import TournamentsContainer from './views/TournamentsContainer';
import ProfilePage from './views/ProfilePage';
import TournamentPage from './views/TournamentPage';
import EndGameLeaderboard from './views/EndGameLeaderBoard';
import CreateLobby from './views/createLobby';
import Lobby from './views/lobby';

const verifyLogin = function(nextState, replace) {
  if(!localStorage.token) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    });
  };
};

const handleLoginEnter = function(nextState, replace) {
  if(localStorage.token) {
    replace({
      pathname: '/'
    });
  }
};

const clearLogin = function(nextState, replace) {
  delete localStorage.token;
  delete localStorage.authToken;
};

ReactDOM.render(
  <ContextComponent>
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <Router history={hashHistory}>
      <Route path="/login" component={LoginView} onEnter={handleLoginEnter} />
      <Route path="/" component={DashboardView} onEnter={verifyLogin} />
      <Route path="/SignUP" component={SignUP}/>
      <Route path="/topics" component={Topics} onEnter={verifyLogin} />
      <Route path="/tournaments" component={Tournaments} onEnter={verifyLogin} />
      <Route path="/authsuccess/:token" component={AuthSuccess} />
      <Route path="/twitterauthsuccess/:token" component={TwitterAuthSuccess} />
      <Route name="quiz" path="/quiz" component={Quiz} />
      <Route path="/ProfilePage/:username" component={ProfilePage}/>
      <Route path="/eachTopic/:id" component={EachTopicsPage} onEnter={verifyLogin} />
      <Route name="leaderboard" path="/board/:id/:isTournament" component={LeaderBoard} />
      <Route name="tournamentboard" path="/tournamentboard/:id" component={TournamentLeaderBoard} />
      <Route path="my-account/change-password" component={ChangePasswordView} onEnter={verifyLogin} />
      <Route path="/create" component={CreateTournament} onEnter={verifyLogin}/>
      <Route path="/createLobby" component={CreateLobby}/>
      <Route path="/lobby/:lid" component={Lobby}/>
      <Route path="/tournament" component={TournamentsContainer} onEnter={verifyLogin}/>
      <Route name="tournamentpage" path="/tournamentpage/:id" component={TournamentPage} />
      <Route name="endgame" path="/endgame" component={EndGameLeaderboard} />
    </Router>
  </MuiThemeProvider>
  </ContextComponent>
, document.getElementById('root'));

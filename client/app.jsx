import React from 'react';
import AppContext from './lib/app-context';
import Home from './pages/home';
import AuthPage from './pages/auth-page';
import parseRoute from './lib/parse-route.js';
import Header from './components/header';
import TeamList from './components/team-list';
import Players from './components/players';
import SinglePlayer from './components/single-player';
import jwtDecode from 'jwt-decode';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.state = {
      user: null,
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      const route = parseRoute(window.location.hash);
      this.setState({ route });
    });
    const token = window.localStorage.getItem('fifa-jwt');
    const user = token ? jwtDecode(token) : null;
    this.setState({ user });
  }

  handleSignIn(results) {
    const { user, token } = results;
    window.localStorage.setItem('fifa-jwt', token);
    this.setState({ user });
    window.location.hash = '';
  }

  handleSignOut() {
    window.localStorage.removeItem('fifa-jwt');
    this.setState({ user: null });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
    }
    if (route.path === 'auth-page') {
      return <AuthPage />;
    }
    if (route.path === 'teams') {
      return <TeamList />;
    }
    if (route.path === 'team') {
      const [, queryString] = window.location.hash.split('?');
      const queryParameters = new URLSearchParams(queryString);
      const teamId = queryParameters.get('teamId');
      const teamName = queryParameters.get('teamName');
      const teamLogo = queryParameters.get('teamLogo');
      return <Players teamId={teamId} teamName={teamName} teamLogo={teamLogo} />;
    }
    if (route.path === 'player') {
      const [, queryString] = window.location.hash.split('?');
      const queryParameters = new URLSearchParams(queryString);
      const teamId = queryParameters.get('teamId');
      const teamName = queryParameters.get('teamName');
      const teamLogo = queryParameters.get('teamLogo');
      const playerId = queryParameters.get('playerId');
      const season = queryParameters.get('season');
      return <SinglePlayer teamId={teamId} teamName={teamName} teamLogo={teamLogo} playerId={playerId} season={season} />;
    }
  }

  render() {
    const { user, route } = this.state;
    const handleSignIn = this.handleSignIn;
    const handleSignOut = this.handleSignOut;
    const context = { handleSignIn, handleSignOut, user, route };
    return (
      <AppContext.Provider value={context}>
        <Header />
        {this.renderPage()}
      </AppContext.Provider>
    );
  }
}

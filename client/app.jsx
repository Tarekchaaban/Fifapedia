import React from 'react';
import AppContext from './lib/app-context';
import Home from './pages/home';
import parseRoute from './lib/parse-route.js';
import Header from './components/header';
import TeamList from './components/team-list';
import Players from './components/players';
import SinglePlayer from './components/single-player';
export default class App extends React.Component {
  constructor(props) {
    super(props);
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
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <Home />;
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
    const context = { user, route };
    return (
      <AppContext.Provider value={context}>
        <Header />
        {this.renderPage()}
      </AppContext.Provider>
    );
  }
}

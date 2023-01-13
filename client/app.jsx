import React from 'react';
import Home from './pages/home';
import parseRoute from './lib/parse-route.js';
import Header from './components/header';
import TeamList from './components/team-list';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  render() {
    return (
      <>
        <Header />
        {this.renderPage()}
      </>
    );
  }
}

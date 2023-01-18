import React from 'react';
import TeamSearch from '../components/team-search';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class Home extends React.Component {

  render() {
    if (!this.context.user) return <Redirect to="sign-in" />;

    return (
      <TeamSearch />

    );
  }
}

Home.contextType = AppContext;

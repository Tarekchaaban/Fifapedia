import React from 'react';
import TeamSearch from './team-search';

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.createMenu = this.createMenu.bind(this);
    this.createHeader = this.createHeader.bind(this);
    this.handleTeamSearchLink = this.handleTeamSearchLink.bind(this);
    this.handleTeamWatchlistLink = this.handleTeamWatchlistLink.bind(this);
    this.state = {
      isClicked: false,
      view: ''
    };
  }

  handleMenuClick(event) {
    if (this.state.isClicked === false) {
      this.setState({
        isClicked: true,
        view: ''
      });
    } else {
      this.setState({ isClicked: false });
    }
  }

  handleTeamSearchLink(event) {
    this.setState({
      view: 'team search',
      isClicked: false
    });
  }

  handleTeamWatchlistLink(event) {
    this.setState({
      view: 'watchlist',
      isClicked: false
    });
  }

  createMenu() {
    return (
      <div>
        <div className="overlay">
          <div className="row">
            <div className="col-30">
              <div className="blue-menu-header">
                <h2 className="menu-text">Menu</h2>
              </div>
              <p className="team-search-link" onClick={this.handleTeamSearchLink}>Search for Teams</p>
              <p className="team-watchlist-link">Team Watchlist</p>
            </div>
            <div className="col-70" onClick={this.handleMenuClick} />
          </div>
        </div>
      </div>
    );
  }

  createHeader() {
    return (
      <div className="blue-header row ai-center jc-space-between">
        <div className="col-75">
          <h1 className="header-logo" onClick={this.handleTeamSearchLink}>Fifapedia</h1>
          <img className="logo-pic" src="/images/soccer-goal.png" />
        </div>
        <div className="col-25 row jc-end margin-right">
          <button className="menu-button">
            <i className="fa-solid fa-bars" onClick={this.handleMenuClick} />
          </button>
        </div>
      </div>
    );
  }

  render() {
    const menu = this.createMenu();
    const header = this.createHeader();
    if (this.state.isClicked === false && this.state.view === '') {
      return (
        <div>
          {header}
        </div>
      );
    } else if (this.state.isClicked === true && this.state.view === '') {
      return (
        <div>
          {menu}
          {header}
        </div>
      );
    } else if (this.state.isClicked === false && this.state.view === 'team search') {
      return (
        <div>
          {header}
          <TeamSearch />
        </div>
      );
    }
  }
}

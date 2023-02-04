import React from 'react';
import AppContext from '../lib/app-context';
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.createMenu = this.createMenu.bind(this);
    this.createHeader = this.createHeader.bind(this);
    this.handleTeamSearchLink = this.handleTeamSearchLink.bind(this);
    this.handleTeamWatchlistLink = this.handleTeamWatchlistLink.bind(this);
    this.handleSignOutLink = this.handleSignOutLink.bind(this);
    this.goToSearch = this.goToSearch.bind(this);
    this.state = {
      isClicked: false
    };
  }

  handleMenuClick(event) {
    if (this.state.isClicked === false) {
      this.setState({
        isClicked: true
      });
    } else {
      this.setState({ isClicked: false });
    }
  }

  handleTeamSearchLink(event) {
    this.setState({
      isClicked: false
    });
  }

  handleTeamWatchlistLink(event) {
    this.setState({
      isClicked: false
    });
  }

  handleSignOutLink(event) {
    this.setState({
      isClicked: false
    });
  }

  goToSearch(event) {
    window.location.hash = '';
  }

  createMenu() {
    return (
      <div>
        <div className={`overlay ${this.state.isClicked ? 'visible' : 'hidden'}`}>
          <div className="row">
            <div className={`col-40 ${this.state.isClicked ? 'open' : ''}`}>
              <div className="blue-menu-header">
                <h2 className="menu-text" onClick={this.handleMenuClick}>Menu</h2>
              </div>
              <p><a href="#" className="team-search-link" onClick={this.handleTeamSearchLink}><i className="fa-solid fa-magnifying-glass-plus" /> Search Teams</a></p>
              <p><a href="#teams" className="team-watchlist-link" onClick={this.handleTeamWatchlistLink}><i className="fa-solid fa-list" /> Team List</a></p>
              <p className="team-search-link" onClick={this.context.handleSignOut}><a onClick={this.handleSignOutLink}><i className="fa-solid fa-right-from-bracket" /> Sign Out</a></p>
            </div>
            <div className="col-70" onClick={this.handleMenuClick} />
          </div>
        </div>
      </div>
    );
  }

  createHeader() {
    if (!this.context.user) {
      return (
        <div className="blue-header row ai-center jc-space-between">
          <div className="col-75">
            <h1 className="header-logo" onClick={this.goToSearch}>Fifapedia</h1>
            <img className="logo-pic" src="/images/soccer-goal.png" />
          </div>
        </div>
      );
    } else if (this.context.user) {
      return (
        <div className="blue-header row ai-center jc-space-between">
          <div className="col-75">
            <h1 className="header-logo"><a href="#">Fifapedia</a></h1>
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
  }

  render() {
    const menu = this.createMenu();
    const header = this.createHeader();
    return (
      <div>
        {menu}
        {header}
      </div>
    );
  }

}

Header.contextType = AppContext;

import React from 'react';

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
      isClicked: false
    });
  }

  handleTeamWatchlistLink(event) {
    this.setState({
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
                <h2 className="menu-text" onClick={this.handleMenuClick}>Menu</h2>
              </div>
              <p><a href="#" className="team-search-link" onClick={this.handleTeamSearchLink}>Search for Teams</a></p>
              <p><a href="#teams" className="team-watchlist-link" onClick={this.handleTeamWatchlistLink}>Team Watchlist</a></p>
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

  render() {
    const menu = this.createMenu();
    const header = this.createHeader();
    if (this.state.isClicked === false) {
      return (
        <div>
          {header}
        </div>
      );
    } else if (this.state.isClicked === true) {
      return (
        <div>
          {menu}
          {header}
        </div>
      );
    }
  }
}

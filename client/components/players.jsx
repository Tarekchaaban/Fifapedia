import React from 'react';
export default class Players extends React.Component {
  constructor(props) {
    super(props);
    this.createForm = this.createForm.bind(this);
    this.createSpinner = this.createSpinner.bind(this);
    this.createPlayerList = this.createPlayerList.bind(this);
    this.handleSeasonChange = this.handleSeasonChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goBackToTeamList = this.goBackToTeamList.bind(this);
    this.handlePlayerClick = this.handlePlayerClick.bind(this);
    this.state = {
      view: 'searching',
      players: [],
      season: null,
      currentPlayerId: 0,
      loaded: false
    };
  }

  handleSeasonChange(event) {
    this.setState({ season: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({
      loaded: false,
      view: 'searched'
    });
    fetch(`/api/players/${this.props.teamId}/${this.state.season}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          view: 'searched',
          players: data.response,
          loaded: true
        });
      })
      .catch(err => console.error('Fetch Failed!', err));
  }

  handlePlayerClick(event, playerId) {
    this.setState({
      currentPlayerId: playerId,
      view: 'single player'
    });
  }

  createSpinner() {
    if (this.state.loaded === false) {
      return (
        <div className="row jc-center">
          <div className="column-full row jc-center height-70 ai-center">
            <div className="lds-dual-ring" />
          </div>
        </div>
      );
    } else {
      return (
        <div />
      );
    }
  }

  createPlayerList() {
    return (
      <div>
        <h1 className="team-list-header">Players</h1>
        <ul className="list-group shadow-sm row wrapped">
          {
            this.state.players.map(player => {
              return (
                <li className="col-100-50" key={player.player.id} id={player.player.id} onClick={e => this.handlePlayerClick(e, player.player.id)}>
                  <div className="list-blue-background relative box-shadow" >
                    <div className="row jc-center">
                      <div className="column-one-sixth">
                        <img className="player-list-photo" src={player.player.photo} alt='player picture' />
                      </div>
                      <div className="column-two-thirds">
                        <p className="player-list-text">Name: <b>{player.player.name}</b></p>
                        <p className="player-list-text">Age: <b>{player.player.age}</b></p>
                        <p className="player-list-text">Country: <b>{player.player.nationality}</b></p>
                        <p className="player-list-text">Position: <b>{player.statistics[0].games.position}</b></p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }

  goBackToTeamList(event) {
    window.location.hash = '#teams';

  }

  createForm() {
    return (
      <form className="season-select-form" onSubmit={this.handleSubmit}>
        <div className="text-align-center">
          <h1 className="team-header">{this.props.teamName}</h1>
        </div>
        <div className="row wrapped jc-center">
          <div className="col-75">
            <div className="row jc-center">
              <div className="col-75 text-align-center team-blue-background as-center">
                <i className="fa-regular fa-circle-xmark xmark2" onClick={this.goBackToTeamList} />
                <img className="season-team-logo" src={this.props.teamLogo} />
              </div>
            </div>
          </div>
          <div className="col-75 text-align-center as-center">
            <select className="season-select-input" placeholder="Season Year" onChange={this.handleSeasonChange}>
              <option value="" selected disabled>Choose Season Year</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
              <option value="2016">2016</option>
              <option value="2015">2015</option>
              <option value="2014">2014</option>
              <option value="2013">2013</option>
              <option value="2012">2012</option>
              <option value="2011">2011</option>
              <option value="2010">2010</option>
              <option value="2009">2009</option>
              <option value="2008">2008</option>
              <option value="2007">2007</option>
              <option value="2006">2006</option>
              <option value="2005">2005</option>
              <option value="2004">2004</option>
              <option value="2003">2003</option>
            </select>
            <button type="submit" className="select-button">
              <i className="fa-solid fa-square-check" />
            </button>
          </div>
        </div>
      </form>
    );
  }

  render() {
    const playerlist = this.createPlayerList();
    const form = this.createForm();
    const spinner = this.createSpinner();
    if (this.state.view === 'searching') {
      return (
        <div>
          {form}
        </div>
      );
    } else if (this.state.view === 'searched' && this.state.loaded === false) {
      return (
        <div>
          {form}
          {spinner}
        </div>
      );
    } else if (this.state.view === 'searched' && this.state.loaded === true) {
      return (
        <div>
          {form}
          {playerlist}
        </div>
      );
    } else {
      window.location.hash = `#player?teamId=${this.props.teamId}&teamName=${this.props.teamName}&teamLogo=${this.props.teamLogo}&playerId=${this.state.currentPlayerId}&season=${this.state.season}`;

    }
  }
}

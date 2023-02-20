import React from 'react';

export default class SinglePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.goBackToTeam = this.goBackToTeam.bind(this);
    this.createSpinner = this.createSpinner.bind(this);
    this.state = {
      loaded: false,
      clickedPlayer: {}
    };
  }

  componentDidMount() {
    fetch(`/api/players/${this.props.playerId}/${this.props.teamId}/${this.props.season}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          clickedPlayer: data.response[0],
          loaded: true
        });
      })
      .catch(err => console.error('Fetch Failed!', err));
  }

  goBackToTeam(event) {
    window.location.hash = `#team?teamId=${this.props.teamId}&teamName=${this.props.teamName}&teamLogo=${this.props.teamLogo}&season=${this.props.season}`;
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

  render() {
    const spinner = this.createSpinner();
    if (this.state.loaded === false) {
      return (
        <div>
          {spinner}
        </div>
      );
    } else if (this.state.loaded === true) {
      return (
        <div>
          <h1 className="team-list-header">Stats: {this.props.season}</h1>
          <hr />
          <div className="row">
            <div className="col-100">
              <div className="row jc-center wrapped list-group box-shadow">
                <div className="col-60 player-card-blue-background row jc-center box-shadow2 border-radius">
                  <i className="fa-solid fa-rectangle-xmark xmark3" onClick={this.goBackToTeam} />
                  <img className="single-player-image" src={this.state.clickedPlayer.player.photo} />
                </div>
                <div className="col-60 player-card-blue-background box-shadow2 margin-bottom border-radius">
                  <div className="row jc-center wrapped">
                    <div className="col-75 white-outline text-align-center border-radius">
                      <h2 className="single-player-name">{this.state.clickedPlayer.player.name}</h2>
                    </div>
                    <div className="col-75 white-outline line-height border-radius">
                      <p className="player-stats">Position: <b>{this.state.clickedPlayer.statistics[0].games.position}</b></p>
                      <p className="player-stats">Age: <b>{this.state.clickedPlayer.player.age}</b></p>
                      <p className="player-stats">Nationality: <b>{this.state.clickedPlayer.player.nationality}</b></p>
                      <br />
                      <p className="player-stats">Games Played: <b>{this.state.clickedPlayer.statistics[0].games.appearences}</b></p>
                      <p className="player-stats">Passes: <b>{this.state.clickedPlayer.statistics[0].passes.total}</b></p>
                      <p className="player-stats">Pass Accuaracy: <b>{this.state.clickedPlayer.statistics[0].passes.accuracy}%</b></p>
                      <br />
                      <p className="player-stats">Goals(scored): <b>{this.state.clickedPlayer.statistics[0].goals.total}</b></p>
                      <p className="player-stats">Goals(assisted): <b>{this.state.clickedPlayer.statistics[0].goals.assists}</b></p>
                      <p className="player-stats">Goals(saved): <b>{this.state.clickedPlayer.statistics[0].goals.saves}</b></p>
                      <br />
                      <p className="player-stats">Fouls Committed: <b>{this.state.clickedPlayer.statistics[0].fouls.committed}</b></p>
                      <p className="player-stats">Yellow Cards: <b>{this.state.clickedPlayer.statistics[0].cards.yellow}</b></p>
                      <p className="player-stats">Red Cards: <b>{this.state.clickedPlayer.statistics[0].cards.red}</b></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
      );
    }
  }
}

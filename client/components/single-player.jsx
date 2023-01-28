import React from 'react';

export default class SinglePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.goBackToTeam = this.goBackToTeam.bind(this);
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

  render() {
    if (this.state.loaded === false) {
      return (
        <div>
          <h1 className="team-list-header">Stats</h1>
          <div className="row max-height">
            <div className="col-100">
              <div className="row jc-center wrapped">
                <div className="col-60 player-card-blue-background row jc-center">
                  <img className="single-player-image" src="" />
                </div>
                <div className="col-60 player-card-blue-background">
                  <div className="row jc-center wrapped">
                    <div className="col-75 white-outline text-align-center">
                      <h2 className="single-player-name">Player loading...</h2>
                    </div>
                    <div className="col-75 white-outline line-height">
                      <p className="player-stats">Position: loading...</p>
                      <p className="player-stats">Age: loading...</p>
                      <p className="player-stats">Country: loading...</p>
                      <br />
                      <p className="player-stats">Games Played: loading...</p>
                      <p className="player-stats">Passes: loading...</p>
                      <p className="player-stats">Pass Accuaracy: loading...</p>
                      <br />
                      <p className="player-stats">Goals(scored): loading...</p>
                      <p className="player-stats">Goals(assisted): loading...</p>
                      <p className="player-stats">Goals(saved): loading...</p>
                      <br />
                      <p className="player-stats">Fouls Committed: loading...</p>
                      <p className="player-stats">Yellow Cards: loading...</p>
                      <p className="player-stats">Red Cards: loading...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.loaded === true) {
      return (
        <div>
          <i className="fa-regular fa-circle-xmark xmark2" onClick={this.goBackToTeam} />
          <h1 className="team-list-header">Stats: {this.props.season}</h1>
          <div className="row max-height">
            <div className="col-100">
              <div className="row jc-center wrapped">
                <div className="col-60 player-card-blue-background row jc-center">
                  <img className="single-player-image" src={this.state.clickedPlayer.player.photo} />
                </div>
                <div className="col-60 player-card-blue-background">
                  <div className="row jc-center wrapped">
                    <div className="col-75 white-outline text-align-center">
                      <h2 className="single-player-name">{this.state.clickedPlayer.player.name}</h2>
                    </div>
                    <div className="col-75 white-outline line-height">
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
        </div>
      );
    }
  }
}

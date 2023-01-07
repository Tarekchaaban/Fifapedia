import React from 'react';

export default class SinglePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      clickedPlayer: {}
    };
  }

  componentDidMount() {
    fetch(`/api/players/${this.props.currentPlayerId}/${this.props.teamId}/${this.props.season}`, {
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
                      <p className="player-stats">Position: {this.state.clickedPlayer.statistics[0].games.position}</p>
                      <p className="player-stats">Age: {this.state.clickedPlayer.player.age}</p>
                      <p className="player-stats">Nationality: {this.state.clickedPlayer.player.nationality}</p>
                      <br />
                      <p className="player-stats">Games Played: {this.state.clickedPlayer.statistics[0].games.appearences}</p>
                      <p className="player-stats">Passes: {this.state.clickedPlayer.statistics[0].passes.total}</p>
                      <p className="player-stats">Pass Accuaracy: {this.state.clickedPlayer.statistics[0].passes.accuracy}%</p>
                      <br />
                      <p className="player-stats">Goals(scored): {this.state.clickedPlayer.statistics[0].goals.total}</p>
                      <p className="player-stats">Goals(assisted): {this.state.clickedPlayer.statistics[0].goals.assists}</p>
                      <p className="player-stats">Goals(saved): {this.state.clickedPlayer.statistics[0].goals.saves}</p>
                      <br />
                      <p className="player-stats">Fouls Committed: {this.state.clickedPlayer.statistics[0].fouls.committed}</p>
                      <p className="player-stats">Yellow Cards: {this.state.clickedPlayer.statistics[0].cards.yellow}</p>
                      <p className="player-stats">Red Cards: {this.state.clickedPlayer.statistics[0].cards.red}</p>
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

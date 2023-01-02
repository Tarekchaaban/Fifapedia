import React from 'react';

export default class TeamSearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTeamSearchChange = this.handleTeamSearchChange.bind(this);
    this.state = {
      teamsearch: '',
      view: '',
      response: []
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`/api/teamsearch/${this.state.teamsearch}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ response: data });
        this.setState({ view: 'team search' });
      })
      .catch(err => console.error('Fetch Failed!', err));
  }

  handleTeamSearchChange(event) {
    this.setState({ teamsearch: event.target.value });
  }

  render() {
    if (this.state.view === '') {
      return (
        <div className="gray-background">
          <form className="team-search-form" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-100 row height-70 ai-center jc-center relative">
                <input name="teamsearch" value={this.state.teamsearch} type="text" className="team-search-bar" id="team-search-input" placeholder="Search for team (e.g. 'Real Madrid')" onChange={this.handleTeamSearchChange} required />
                <button type="submit" className="team-search-button">
                  <i className="fa-solid fa-magnifying-glass" />
                </button>
              </div>
            </div>
            <div className="row height-30">
              <div className="col-100 row fifa-logo jc-center">
                <img src="/images/fifa-logo.jpg" className="fifa-logo-pic" />
              </div>
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <div className="gray-background">
          <div className="row jc-center wrapped">
            <div className="col-100-40">
              <img className="team-image" src={this.state.response.response[0].team.logo} alt="pic of team logo" />
              <p className="team-info text-align-center">{this.state.response.response[0].team.name} ({this.state.response.response[0].team.code}) | {this.state.response.response[0].team.country} | Est.{this.state.response.response[0].team.founded}</p>
            </div>
            <div className="col-100-40">
              <img className="stadium-image" src={this.state.response.response[0].venue.image} alt="pic of stadium" />
              <p className="team-info text-align-center">{this.state.response.response[0].venue.name} | {this.state.response.response[0].venue.city} | Capacity: {this.state.response.response[0].venue.capacity}</p>
            </div>
          </div>
        </div>
      );
    }
  }
}

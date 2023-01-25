import React from 'react';
import AppContext from '../lib/app-context';
export default class TeamSearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTeamSearchChange = this.handleTeamSearchChange.bind(this);
    this.handleTeamAdd = this.handleTeamAdd.bind(this);
    this.handleTeamDelete = this.handleTeamDelete.bind(this);
    this.handleSearchBack = this.handleSearchBack.bind(this);
    this.state = {
      teamsearch: '',
      view: '',
      currentTeam: {},
      currentUser: 1,
      teamlist: []
    };
  }

  componentDidMount() {
    const req = {
      method: 'GET',
      headers: {
        'x-access-token': localStorage.getItem('fifa-jwt')
      },
      user: this.context.user
    };
    fetch('/api/teams/', req)
      .then(response => response.json())
      .then(data => this.setState({ teamlist: data }))
      .catch(err => console.error('Fetch Failed!', err));
  }

  handleTeamDelete() {
    const req = {
      method: 'GET',
      headers: {
        'x-access-token': localStorage.getItem('fifa-jwt')
      },
      user: this.context.user
    };
    fetch('/api/teams', req)
      .then(response => response.json())
      .then(data => this.setState({ teamlist: data }))
      .catch(err => console.error('Fetch Failed!', err));
  }

  handleTeamAdd(event) {
    const copy = this.state.teamlist.slice();
    fetch('/api/teams', {
      method: 'POST',
      body: JSON.stringify({ currentTeam: this.state.currentTeam, currentUser: this.context.user.userId }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          teamlist: data.concat(copy),
          view: 'team list'
        });
      })
      .catch(err => console.error('Post Failed!', err));
    window.location.hash = '#teams';
  }

  handleSearchBack(event) {
    this.setState({ view: '' });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch(`/api/teamsearch/${this.state.teamsearch}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        if (data.results === 0) {
          window.location.hash = 'not-found';
        } else {
          this.setState({ view: 'team search' });
          this.setState({ currentTeam: data.response[0] });
        }
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
                <input autoFocus name="teamsearch" value={this.state.teamsearch} type="text" className="team-search-bar" id="team-search-input" placeholder="Search for team (e.g. 'Real Madrid')" onChange={this.handleTeamSearchChange} required />
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
    } else if (this.state.view === 'team search') {
      return (
        <div className="gray-background">
          <div className="row jc-center wrapped ai-center">
            <div className="col-100-40">
              <img className="team-image" src={this.state.currentTeam.team.logo} alt="pic of team logo" />
              <p className="team-info text-align-center">{this.state.currentTeam.team.name} ({this.state.currentTeam.team.code}) | {this.state.currentTeam.team.country} | Est.{this.state.currentTeam.team.founded}</p>
            </div>
            <div className="col-100-40">
              <img className="stadium-image" src={this.state.currentTeam.venue.image} alt="pic of stadium" />
              <p className="team-info text-align-center">{this.state.currentTeam.venue.name} | {this.state.currentTeam.venue.city} | Capacity: {this.state.currentTeam.venue.capacity}</p>
            </div>
            <div className="col-100-20 text-align-center">
              &nbsp;
              <button className="add-team padding input-error-message" onClick={this.handleSearchBack}>
                Go Back
              </button>
              &nbsp;
              <button className="add-team green" onClick={this.handleTeamAdd}>
                Add Team
              </button>
            </div>
          </div>
        </div>
      );
    }
  }
}

TeamSearch.contextType = AppContext;

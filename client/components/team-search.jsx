import React from 'react';
import AppContext from '../lib/app-context';
import debounce from 'lodash/debounce';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

export default class TeamSearch extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTeamSearchChange = debounce(this.handleTeamSearchChange.bind(this), 300);
    this.handleTeamAdd = this.handleTeamAdd.bind(this);
    this.handleTeamDelete = this.handleTeamDelete.bind(this);
    this.handleSearchBack = this.handleSearchBack.bind(this);
    this.createSpinner = this.createSpinner.bind(this);
    this.state = {
      teamsearch: '',
      view: '',
      currentTeam: {},
      currentUser: 1,
      teamlist: [],
      fetchingData: true,
      options: []
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
    this.setState({
      view: '',
      teamsearch: '',
      fetchingData: true
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ view: 'team search' });
    fetch(`/api/teamsearch/${this.state.teamsearch}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        if (data.results === 0) {
          window.location.hash = 'not-found';
        } else {
          this.setState({ currentTeam: data.response[0] });
          this.setState({ fetchingData: false });
        }
      })
      .catch(err => console.error('Fetch Failed!', err));
  }

  handleTeamSearchChange(inputValue) {
    this.setState({ teamsearch: inputValue });
    fetch(`/api/teamsearch/${inputValue}`, {
      method: 'GET',
      headers: {
        'x-access-token': localStorage.getItem('fifa-jwt')
      },
      user: this.context.user
    })
      .then(response => response.json())
      .then(data => {
        const teams = data.response.map(team => team.team.name);
        this.setState({ options: teams });
      })
      .catch(err => console.error('Fetch Failed!', err));
  }

  createSpinner() {
    if (this.state.fetchingData === true) {
      return (
        <div className="row jc-center">
          <div className="column-full row jc-center height-70 ai-center">
            <div className="lds-dual-ring" />
          </div>
        </div>
      );
    } else {
      return (
        <div/>
      );
    }
  }

  render() {
    const spinner = this.createSpinner();
    if (this.state.view === '') {
      return (
        <div className="gray-background">
          <form className="team-search-form" onSubmit={this.handleSubmit}>
            <div className="row jc-center">
              <div className="col-100 row height-70 ai-center jc-center">
                <Typeahead autoFocus inputProps={{ style: { color: '#015291' } }} options={this.state.options} maxResults={8} minLength={3} name="teamsearch" type="text" className="team-search-bar relative" id="team-search-input" placeholder="Search for team..." onInputChange={this.handleTeamSearchChange} required>
                  <button type="submit" className="team-search-button">
                    <i className="fa-solid fa-magnifying-glass" />
                  </button>
                </Typeahead>
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
    } else if (this.state.view === 'team search' && this.state.fetchingData === true) {
      return (
        <div className="gray-background">
          {spinner}
        </div>
      );
    } else if (this.state.view === 'team search' && this.state.fetchingData === false) {
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

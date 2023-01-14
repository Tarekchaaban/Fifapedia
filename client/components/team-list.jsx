import React from 'react';

export default class TeamList extends React.Component {
  constructor(props) {
    super(props);
    this.handleXClick = this.handleXClick.bind(this);
    this.createModal = this.createModal.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
    this.handleTeamDelete = this.handleTeamDelete.bind(this);
    this.handleTeamClick = this.handleTeamClick.bind(this);
    this.createTeamList = this.createTeamList.bind(this);
    this.state = {
      isDeleting: false,
      currentEntryId: 0,
      view: 'team list',
      currentTeamId: 0,
      currentTeamLogo: '',
      currentTeamName: '',
      teamlist: []
    };
  }

  componentDidMount() {
    fetch('/api/teams')
      .then(response => response.json())
      .then(data => this.setState({ teamlist: data }))
      .catch(err => console.error('Fetch Failed!', err));
  }

  handleTeamDelete() {
    fetch('/api/teams')
      .then(response => response.json())
      .then(data => this.setState({ teamlist: data }))
      .catch(err => console.error('Fetch Failed!', err));
  }

  handleXClick(event, entryId) {
    this.setState({
      isDeleting: true,
      currentEntryId: entryId
    });

  }

  handleCancelClick(event) {
    this.setState({ isDeleting: false });
  }

  handleConfirmClick(event) {
    fetch(`/api/teams/${this.state.currentEntryId}`, {
      method: 'DELETE'
    })
      .then(response => response)
      .then(data => {
        this.handleTeamDelete();
        this.setState({ isDeleting: false });
      })
      .catch(err => console.error('Delete failed!', err));

  }

  handleTeamClick(event, teamId, teamName, teamLogo) {
    this.setState({
      view: 'Players',
      currentTeamId: teamId,
      currentTeamName: teamName,
      currentTeamLogo: teamLogo
    });
  }

  createModal() {
    return (
      <div>
        <div className="overlay" />
        <div className="modal">
          <div className="row">
            <div className="column-full">
              <h2 className="modal-text-format">Are you sure you want to delete this team?</h2>
            </div>
          </div>
          <div className="row jc-center ai-center">
            <div className="column-full">
              <div className="row">
                <div className="col-50 text-align-center">
                  <button className="no-button" onClick={this.handleCancelClick}>Cancel</button>
                </div>
                <div className="col-50 text-align-center">
                  <button className="yes-button" onClick={this.handleConfirmClick}>Confirm</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  createTeamList() {
    return (
      <div>
        <h1 className="team-list-header">Teams</h1>
        <ul className="list-group shadow-sm row wrapped">
          {
            this.state.teamlist.map(team => {
              return (
                <li className="col-100-50" key={team.entryId} id={team.teamId}>
                  <div className="list-blue-background relative">
                    <button className="x-mark-button">
                      <i className="fa-solid fa-xmark" onClick={e => this.handleXClick(e, team.entryId)} />
                    </button>
                    <div className="row jc-center" onClick={e => this.handleTeamClick(e, team.teamId, team.teamName, team.crestUrl)}>
                      <div className="column-one-sixth">
                        <img className="team-list-logo" src={team.crestUrl} alt='team logo' />
                      </div>
                      <div className="column-two-thirds">
                        <p className="team-list-name">{team.teamName}</p>
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

  render() {
    const teamlist = this.createTeamList();
    const modal = this.createModal();
    if (this.state.view === 'team list' && this.state.isDeleting === false) {
      return (
        <div>
          {teamlist}
        </div>
      );
    } else if (this.state.view === 'team list' && this.state.isDeleting === true) {
      return (
        <div>
          {modal}
          {teamlist}
        </div>
      );
    } else {
      window.location.hash = `#team?teamName=${this.state.currentTeamName}?teamId=${this.state.currentTeamId}?teamLogo=${this.state.currentTeamLogo}`;
    }
  }
}

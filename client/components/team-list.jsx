import React from 'react';

export default class TeamList extends React.Component {
  constructor(props) {
    super(props);
    this.handleXClick = this.handleXClick.bind(this);
    this.createModal = this.createModal.bind(this);
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleConfirmClick = this.handleConfirmClick.bind(this);
    this.state = {
      isDeleting: false,
      currentEntryId: 0
    };
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
        this.props.handleTeamDelete();
        this.setState({ isDeleting: false });
      })
      .catch(err => console.error('Delete failed!', err));

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

  render() {
    const modal = this.createModal();
    if (this.props.view === 'team list' && this.state.isDeleting === false) {
      return (
        <div>
          <h1 className="team-list-header">Teams</h1>
          <ul className="list-group shadow-sm row wrapped">
            {
            this.props.teamlist.map(team => {
              return (
                <li className="col-100-50" key={team.entryId} id={team.teamId}>
                  <div className="list-blue-background relative">
                    <button className="x-mark-button">
                      <i className="fa-solid fa-xmark" onClick={e => this.handleXClick(e, team.entryId)} />
                    </button>
                    <div className="row jc-center">
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
    } else if (this.props.view === 'team list' && this.state.isDeleting === true) {
      return (
        <div>
          {modal}
          <h1 className="team-list-header">Teams</h1>
          <ul className="list-group shadow-sm row wrapped">
            {
              this.props.teamlist.map(team => {
                return (
                  <li className="col-100-50" key={team.entryId} id={team.teamId}>
                    <div className="list-blue-background relative">
                      <button className="x-mark-button">
                        <i className="fa-solid fa-xmark" onClick={e => this.handleXClick(e, team.entryId)} />
                      </button>
                      <div className="row jc-center">
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
  }
}

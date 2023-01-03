import React from 'react';

export default class TeamList extends React.Component {

  render() {
    if (this.props.view === 'team list') {
      return (
        <div>
          <h1 className="team-list-header">Teams</h1>
          <ul className="list-group shadow-sm row wrapped">
            {
            this.props.teamlist.map(team => {
              return (
                <li className="col-100-50" key={team.teamId}>
                  <div className="list-blue-background">
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

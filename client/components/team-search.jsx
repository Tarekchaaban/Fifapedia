import React from 'react';

export default function TeamSearch(props) {
  return (
    <div className="gray-background">
      <form className="team-search-form">
        <div className="row">
          <div className="col-100 row height-70 ai-center jc-center relative">
            <input type="text" className="team-search-bar" id="team-search-input" placeholder="Search for team (e.g. 'Real Madrid')" required />
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
}

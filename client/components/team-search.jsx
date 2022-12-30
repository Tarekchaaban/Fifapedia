import React from 'react';

export default function TeamSearch(props) {
  return (
    <div className="gray-background">
      <div className="row">
        <div className="col-100 row height-70 ai-center jc-center relative">
          <input type="text" className="team-search-bar" id="team-search-input" placeholder="Search for team..." required />
          <i className="fa-solid fa-magnifying-glass" />
        </div>
      </div>
    </div>
  );
}

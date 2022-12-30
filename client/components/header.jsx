import React from 'react';

export default function Header(props) {
  return (
    <div className="blue-header row ai-center jc-space-between">
      <div className="col-75">
        <h1 className="header-logo">Fifapedia</h1>
        <img className="logo-pic" src="/images/soccer-goal.png"/>
      </div>
      <div className="col-25 row jc-end margin-right">
        <i className="fa-solid fa-bars"/>
      </div>
    </div>
  );
}

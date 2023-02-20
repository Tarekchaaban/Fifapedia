import React from 'react';

export default function NotFound(props) {
  return (
    <div className="row jc-center wrapped height-70 ai-center">
      <div className="col-60">
        <h1 className="not-found-text text-align-center"><i className="fa-solid fa-circle-exclamation" /> Oops... We couldn&apos;t find the team you were looking for! <i className="fa-regular fa-face-frown" /></h1>
      </div>
      <div className="col-60 not-found-return text-align-center">

        <a className="not-found-return" href=''> Return to team search</a>

      </div>
    </div>
  );
}

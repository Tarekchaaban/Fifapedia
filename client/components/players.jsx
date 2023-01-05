import React from 'react';

export default class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'searching'
    };
  }

  render() {
    return (
      <div>
        <form className="season-select-form">
          <div className="text-align-center">
            <h1 className="team-header">Liverpool</h1>
          </div>
          <div className="row wrapped jc-center">
            <div className="col-75">
              <div className="row jc-center">
                <div className="col-50 text-align-center team-blue-background">
                  <img className="season-team-logo" src="/images/soccer-goal.png" />
                </div>
              </div>
            </div>
            <div className="col-75 text-align-center as-center">
              <select className="season-select-input" placeholder="Season Year">
                <option value="" selected disabled>Choose Season Year</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option>
                <option value="2003">2003</option>
                <option value="2002">2002</option>
                <option value="2001">2001</option>
                <option value="2000">2000</option>
                <option value="1999">1999</option>
              </select>
              <button type="submit" className="select-button">
                <i className="fa-solid fa-square-check" />
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

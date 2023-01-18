import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class AuthPage extends React.Component {
  constructor(props) {
    super(props);
    this.createHeader = this.createHeader.bind(this);
    this.createForm = this.createForm.bind(this);
    this.createFooter = this.createFooter.bind(this);
    this.state = {
      username: '',
      password: '',
      hasAccount: false
    };
  }

  createHeader() {
    if (this.state.hasAccount === false) {
      return (
        <>
          <h1 className="auth-header">Sign Up</h1>
          <p className="auth-statement">Please fill in your details to create your account</p>
        </>
      );
    } else {
      return (
        <>
          <h1 className="auth-header">Sign In</h1>
          <p className="auth-statement">Please fill in your details to log into your account</p>
        </>
      );
    }
  }

  createForm() {
    const footer = this.createFooter();
    return (
      <form id="auth-form">
        <label className="auth-label" id="username">Username<br/>
          <input className="auth-input" type="text" placeholder="Please enter username..." value={this.state.username} required />
        </label><br/>
        <label className="auth-label" id="password">Password<br/>
          <input className="auth-input" type="password" placeholder="Please enter password..." value={this.state.password} required />
        </label><br/>
        {footer}
      </form>
    );
  }

  createFooter() {
    if (this.state.hasAccount === false) {
      return (
        <>
          <button className="auth-button" type="submit">Sign Up</button>
          <p className="auth-question">Already have an account? <span className="blue">Sign In</span></p>
        </>
      );
    } else {
      return (
        <>
          <button className="auth-button" type="submit">Sign in</button>
          <p className="auth-question">Dont have an account? <span className="blue">Sign Up</span></p>
        </>
      );
    }
  }

  render() {
    const header = this.createHeader();
    const form = this.createForm();
    if (this.context.user) return <Redirect to="" />;

    return (
      <div className="row jc-center">
        <div className="column-full">
          <div className="row jc-center">
            <div className="col-full">
              {header}
              {form}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AuthPage.contextType = AppContext;

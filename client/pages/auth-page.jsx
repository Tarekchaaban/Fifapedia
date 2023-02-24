import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class AuthPage extends React.Component {
  constructor(props) {
    super(props);
    this.createHeader = this.createHeader.bind(this);
    this.createForm = this.createForm.bind(this);
    this.createFooter = this.createFooter.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.switchToSignIn = this.switchToSignIn.bind(this);
    this.switchToSignUp = this.switchToSignUp.bind(this);
    this.showErrorMessage = this.showErrorMessage.bind(this);
    this.demoAccountAutoFill = this.demoAccountAutoFill.bind(this);
    this.state = {
      username: '',
      password: '',
      action: 'sign-in',
      error: null
    };
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const headers = {
      'Content-Type': 'application/json'
    };
    fetch(`/api/auth/${this.state.action}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(result => {
        const { error } = result;
        if (result.error) {
          this.setState({
            error,
            username: '',
            password: ''
          });
        }
        if (this.state.action === 'sign-up' & !error) {
          this.setState({
            username: '',
            password: '',
            action: 'sign-in'
          });
        } else if (this.state.action === 'sign-in' & !error) {
          this.context.handleSignIn(result);
          this.setState({ username: '', password: '' });
        }
      });
  }

  switchToSignIn() {
    if (this.state.action === 'sign-up') {
      this.setState({
        action: 'sign-in',
        username: '',
        password: '',
        error: null
      });
    }
  }

  switchToSignUp() {
    if (this.state.action === 'sign-in') {
      this.setState({
        action: 'sign-up',
        username: '',
        password: '',
        error: null
      });
    }
  }

  demoAccountAutoFill(event) {
    this.setState({
      action: 'sign-in',
      username: 'demo',
      password: 'password123',
      error: null
    });
  }

  createHeader() {
    if (this.state.action === 'sign-up') {
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
      <form id="auth-form" onSubmit={this.handleSubmit}>
        <label className="auth-label" id="username">Username<br/>
          <input className="auth-input" type="text" placeholder="Please enter username..." value={this.state.username} onChange={this.handleUsernameChange} required />
        </label><br/>
        <label className="auth-label" id="password">Password<br/>
          <input className="auth-input" type="password" placeholder="Please enter password..." value={this.state.password} onChange={this.handlePasswordChange} required />
        </label><br/>
        {footer}
      </form>
    );
  }

  createFooter() {
    if (this.state.action === 'sign-up') {
      return (
        <>
          <button className="auth-button" type="submit">Sign Up</button>
          <button onClick={this.demoAccountAutoFill} className="auth-button"><b>Demo Account Auto-Fill</b></button>
          <p className="auth-question">Already have an account? <span onClick={this.switchToSignIn} className="blue">Sign In</span></p>
        </>
      );
    } else {
      return (
        <>
          <button className="auth-button" type="submit">Sign in</button>
          <p className="auth-question">Dont have an account? <span onClick={this.switchToSignUp} className="blue">Sign Up</span></p>
        </>
      );
    }
  }

  showErrorMessage() {
    const { error } = this.state;
    if (error) {
      return <p className='input-error-message'><i className="fa-solid fa-circle-exclamation" /> {error}.</p>;
    } else {
      <>
      </>;
    }
  }

  render() {
    const error = this.showErrorMessage();
    const header = this.createHeader();
    const form = this.createForm();
    if (this.context.user) return <Redirect to="" />;

    return (
      <div className="row jc-center">
        <div className="column-full">
          <div className="row jc-center">
            <div>
              {header}
              {error}
              {form}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AuthPage.contextType = AppContext;

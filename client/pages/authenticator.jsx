import React from 'react';

const MIN_PASS_LEN = 6;

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onInputChange(e.target.id, e.target.value);
  }

  render() {
    const inputType = (this.props.field === 'password')
      ? 'password'
      : 'text';
    return (
      <>
        <label htmlFor={this.props.field}>{this.props.text}</label>
        <input
          type={inputType}
          name={this.props.field}
          id={this.props.field}
          value={this.props.inputValue}
          onChange={this.handleChange} />
      </>
    );
  }

}

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      userLocation: '',
      username: '',
      password: '',
      avatar: '',
      isValid: false,
      errorMsg: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.renderSignUpInputs = this.renderSignUpInputs.bind(this);
  }

  onInputChange(field, value) {
    this.setState({ [field]: value });

  }

  handleSubmit(e) {
    e.preventDefault();

    const { firstName, lastName, userLocation, username, password, avatar } = this.state;
    const userInfo = { firstName, lastName, userLocation, username, password, avatar };
    if (!this.props.registered) {
      if (this.state.password.length === 0) {
        this.setState({ errorMsg: 'A password is required.' });
      } else if (this.state.password.length < MIN_PASS_LEN) {
        this.setState({
          isValid: false,
          errorMsg: 'Your password must be at least 6 characters.'
        });
      } else {
        fetch('/api/auth/sign-up', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userInfo)
        })
          .then(res => res.json())
          .then(this.props.onSignUp())
          .catch(err => console.error(err));
      }
    } else {
      fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
      })
        .then(res => res.json(username, password))
        .then(this.props.onSignIn())
        .catch(err => console.error(err));
    }
  }

  renderSignUpInputs() {
    return (
      <>
        <Input
          field="firstName"
          text="First Name"
          inputValue={this.state.firstName}
          onInputChange={this.onInputChange}/>
        <Input
          field="lastName"
          text="Last Name"
          inputValue={this.state.lastName}
          onInputChange={this.onInputChange}/>
        <Input
          field="userLocation"
          text="Location"
          inputValue={this.state.userLocation}
          onInputChange={this.onInputChange}/>
      </>
    );
  }

  render() {
    const signUpInputs = (this.props.registered)
      ? <></>
      : this.renderSignUpInputs();
    const btnText = (this.props.registered)
      ? 'Sign In'
      : 'Sign Up';
    return (
      <form
        className="auth-form"
        onSubmit={this.handleSubmit}>
        {signUpInputs}
        <Input
          field="username"
          text="Username"
          inputValue={this.state.username}
          onInputChange={this.onInputChange}/>
        <Input
          field="password"
          text="Password (6 or more characters)"
          inputValue={this.state.password}
          onInputChange={this.onInputChange}/>
        <span
          className="color-red">
          {this.state.errorMsg}
        </span>
        <button type="submit">{btnText}</button>
      </form>
    );
  }
}

export default function Authenticator(props) {
  return (
    <div className="auth-page flex-center">
      <h1>Reel&apos;n</h1>
      <AuthForm
        registered={props.registered}
        onSignUp={props.onSignUp}
        onSignIn={props.onSignIn} />
    </div>
  );
}

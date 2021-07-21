import React from 'react';

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onInputChange(e.target.id, e.target.value);
  }

  render() {
    return (
      <>
        <label htmlFor={this.props.field}>{this.props.text}</label>
        <input
          type="text"
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
      password: ''
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
      ? this.renderSignUpInputs()
      : <></>;
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
          text="Password"
          inputValue={this.state.password}
          onInputChange={this.onInputChange}/>

        <button type="submit">Sign Up</button>
      </form>
    );
  }
}

export default function Authenticator(props) {
  return (
    <div className="auth-page flex-center">
      <h1>Reel&apos;n</h1>
      <AuthForm registered={props.registered}/>
    </div>
  );
}

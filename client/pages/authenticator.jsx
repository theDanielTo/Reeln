import React from 'react';
import { storeToken } from '../lib';

const MIN_PASS_LEN = 6;

function Input(props) {
  const handleChange = e => {
    props.onInputChange(e.target.id, e.target.value);
  };
  return (
    <>
      <label htmlFor={props.field}>{props.text}</label>
      <input
        type={props.type}
        name={props.field}
        id={props.field}
        value={props.inputValue}
        onChange={handleChange} />
    </>
  );
}

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      firstName: '',
      lastName: '',
      email: '',
      city: '',
      state: '',
      username: '',
      password: '',
      errorMsg: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.handleSelectState = this.handleSelectState.bind(this);
    this.renderSignUpInputs = this.renderSignUpInputs.bind(this);
  }

  onInputChange(field, value) {
    this.setState({ [field]: value });
  }

  handleSelectState(e) {
    this.setState({ state: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();

    const { firstName, lastName, email, city, state, username, password } = this.state;
    const userInfo = {
      firstName,
      lastName,
      email,
      city,
      state,
      username,
      password
    };
    if (!this.props.registered) {
      if (this.state.password.length === 0) {
        this.setState({ errorMsg: 'A password is required.' });
      } else if (this.state.password.length < MIN_PASS_LEN) {
        this.setState({
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
          .then(obj => {
            this.setState({ errorMsg: '' });
            this.props.onAuthSubmit(obj);
          })
          .catch(err => console.error('fetch err:', err));
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
        .then(obj => {
          storeToken(obj.token);
          this.props.onAuthSubmit(obj);
        })
        .catch(err => console.error(err));
    }
  }

  renderSignUpInputs() {
    return (
      <>
        <Input
          field="firstName"
          text="First Name"
          type="text"
          inputValue={this.state.firstName}
          onInputChange={this.onInputChange}/>
        <Input
          field="lastName"
          text="Last Name"
          type="text"
          inputValue={this.state.lastName}
          onInputChange={this.onInputChange}/>
        <Input
          field="email"
          text="Email"
          type="text"
          inputValue={this.state.email}
          onInputChange={this.onInputChange}/>
        <Input
          field="city"
          text="City"
          type="text"
          inputValue={this.state.userLocation}
          onInputChange={this.onInputChange} />
        <label htmlFor="state">State</label>
        <select name="state" id="state"
          onChange={this.handleSelectState}>
          <option value="">--Select--</option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="DC">District Of Columbia</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
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
          type="text"
          inputValue={this.state.username}
          onInputChange={this.onInputChange}/>
        <Input
          field="password"
          text="Password (6 or more characters)"
          type="password"
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
        onAuthSubmit={props.onAuthSubmit} />
    </div>
  );
}

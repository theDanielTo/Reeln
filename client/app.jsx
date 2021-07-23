import React from 'react';
import Splash from './pages/splash';
import Authenticator from './pages/authenticator';
import Header from './components/header';
import NavBar from './components/nav-bar';
import Home from './pages/home';
import Tournaments from './pages/tournaments';
import { parseRoute } from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      route: parseRoute(window.location.hash),
      loading: true,
      registered: true,
      authorized: true,
      page: 'home'
    };
    this.handleAuthSubmit = this.handleAuthSubmit.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
  }

  componentDidUpdate() {
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 2000);
    // const localToken = window.localStorage.getItem('X-Access-Token');
    // if (localToken === this.state.token) {
    //   this.setState({ registered: true, authorized: true });
    // }
    window.addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  handleAuthSubmit(token) {
    const localToken = window.localStorage.getItem('token-local-storage');
    this.setState({ token: localToken });
    if (localToken === token) {
      this.setState({ registered: true, authorized: true });
    } if (!this.state.registered) {
      this.setState({ registered: true });
    } else {
      this.setState({ authorized: true });
    }
  }

  handleNavClick(page) {
    this.setState({ page: page });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return (
      <>
        <Home />
        <NavBar onNavClick={this.handleNavClick} page={this.state.page}/>
      </>
      );
    }
    if (route.path === 'tournaments') {
      return (
        <>
          <Tournaments />;
          <NavBar onNavClick={this.handleNavClick} page={this.state.page} />
        </>
      );
    }
  }

  render() {
    // console.log('token:', this.state.token);
    if (this.state.loading) return <Splash />;
    if (!this.state.authorized) {
      return (
        <Authenticator
          registered={this.state.registered}
          onAuthSubmit={this.handleAuthSubmit} />
      );
    }
    return (
        <>
          <Header title="Reel'n"/>
          {this.renderPage()}
        </>
    );
  }

}

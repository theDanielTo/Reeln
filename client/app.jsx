import React from 'react';
import Splash from './pages/splash';
import Authenticator from './pages/authenticator';
import AppDrawer from './components/app-drawer';
import Header from './components/header';
import NavBar from './components/nav-bar';
import Home from './pages/home';
import Tournaments from './pages/tournaments';
import Tourney from './pages/tourney';
import { parseRoute } from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      loading: false,
      registered: true,
      signedIn: false,
      user: {}
    };
    this.handleAuthSubmit = this.handleAuthSubmit.bind(this);
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 2000);
    // const localToken = window.localStorage.getItem('X-Access-Token');
    // if (localToken) {
    //   this.setState({ registered: true, authorized: true });
    // }
    window.addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  handleAuthSubmit(payload) {
    // const localToken = window.localStorage.getItem('token-local-storage');
    // if (localToken === payload.token) {
    //   this.setState({ registered: true, signedIn: true });
    // }
    if (!this.state.registered) {
      this.setState({ registered: true });
    } else {
      this.setState({ signedIn: true, user: payload.user });
    }
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return (
        <div className="page">
          <Home />
        </div>
      );
    }
    if (route.path === 'tournaments') {
      const tourneyId = route.params.get('tourneyId');
      if (tourneyId) {
        return (
          <div className="page">
            <Tourney user={this.state.user} tourneyId={tourneyId} />
          </div>
        );
      }
      return (
        <div className="page">
          <Tournaments user={this.state.user} />;
        </div>
      );
    }
  }

  render() {
    // const localToken = window.localStorage.getItem('X-Access-Token');
    if (this.state.loading) return <Splash />;
    if (!this.state.signedIn) {
      return (
        <Authenticator
          registered={this.state.registered}
          onAuthSubmit={this.handleAuthSubmit} />
      );
    }
    return (
      <>
        <AppDrawer user={this.state.user}/>
        <Header title="Reel'n" />
        <div className="container">
          {this.renderPage()}
        </div>
        <NavBar onNavClick={this.handleNavClick}/>
      </>
    );
  }

}

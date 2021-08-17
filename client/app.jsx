import React from 'react';
import Splash from './pages/splash';
import Authenticator from './pages/authenticator';
import Home from './pages/home';
import Tournaments from './pages/tournaments';
import Tourney from './pages/tourney';
import LogCatch from './pages/log-catch';
import AppDrawer from './components/app-drawer';
import Header from './components/header';
import NavBar from './components/nav-bar';
import { parseRoute, storeToken, decodeToken } from './lib';
import AppContext from './lib/app-context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      loading: true,
      isAuthorizing: true,
      user: null,
      token: '',
      tourneys: [],
      numParticipants: [],
      socket: null
    };
    this.handleAuthSubmit = this.handleAuthSubmit.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
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
    window.addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
    const token = window.localStorage.getItem('X-Access-Token');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, token, isAuthorizing: false });

    fetch('/api/tourneys/counts', {
      headers: {
        'x-access-token': token
      }
    })
      .then(res => res.json())
      .then(results => {
        this.setState({ numParticipants: results });
      });

    fetch('/api/tourneys/current', {
      headers: {
        'x-access-token': token
      }
    })
      .then(res => res.json())
      .then(tourneys => {
        this.setState({ tourneys });
      });
  }

  handleAuthSubmit(result) {
    const { user, token } = result;
    storeToken(token);
    this.setState({ user });
    window.location.reload(false);
  }

  handleSignOut() {
    window.localStorage.removeItem('X-Access-Token');
    this.setState({ user: null });
  }

  renderPage(tourneys, numParticipants) {
    const { route } = this.state;
    if (route.path === '') {
      return (
        <div className="page">
          <Home />
        </div>
      );
    }
    if (route.path === 'sign-in' || route.path === 'sign-up') {
      return (
        <Authenticator onAuthSubmit={this.handleAuthSubmit} />
      );
    }
    if (route.path === 'tournaments') {
      const tourneyId = route.params.get('tourneyId');
      if (tourneyId) {
        return (
          <div className="page">
            <Tourney tourneyId={tourneyId} />
          </div>
        );
      }
      return (
        <div className="page">
          <Tournaments tourneys={tourneys} numParticipants={numParticipants} />
        </div>
      );
    }
    if (route.path === 'logcatch') {
      return (
        <div className="page">
          <LogCatch />
        </div>
      );
    }
  }

  render() {
    if (this.state.loading) return <Splash />;
    if (this.state.isAuthorizing) return null;

    const { user, route, tourneys, numParticipants } = this.state;
    const { handleAuthSubmit, handleSignOut } = this;
    const contextValue = { user, route, handleAuthSubmit, handleSignOut };

    const nav = (route.path === 'sign-in' || route.path === 'sign-up')
      ? null
      : <NavBar onNavClick={this.handleNavClick} />;

    return (
      <AppContext.Provider value={contextValue}>
        <AppDrawer user={this.state.user}/>
        <Header title="Reel'n" />
        <div className="container">
          {this.renderPage(tourneys, numParticipants)}
        </div>
        {nav}
      </AppContext.Provider>
    );
  }
}

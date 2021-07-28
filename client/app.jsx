import React from 'react';
import Splash from './pages/splash';
import Authenticator from './pages/authenticator';
import AppDrawer from './components/app-drawer';
import Header from './components/header';
import NavBar from './components/nav-bar';
import Home from './pages/home';
import Tournaments from './pages/tournaments';
import Tourney from './pages/tourney';
import { parseRoute, storeToken, decodeToken } from './lib';
import AppContext from './lib/app-context';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      loading: false,
      isAuthorizing: true,
      user: null
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
    this.setState({ user, isAuthorizing: false });
  }

  handleAuthSubmit(result) {
    const { user, token } = result;
    storeToken(token);
    this.setState({ user });
  }

  handleSignOut() {
    window.localStorage.removeItem('X-Access-Token');
    this.setState({ user: null });
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
    if (this.state.loading) return <Splash />;
    if (this.state.isAuthorizing) return null;

    const { user, route } = this.state;
    const { handleSignOut } = this;
    const contextValue = { user, route, handleSignOut };

    return (
      <AppContext.Provider value={contextValue}>
        <AppDrawer user={this.state.user}/>
        <Header title="Reel'n" />
        <div className="container">
          {this.renderPage()}
        </div>
        <NavBar onNavClick={this.handleNavClick}/>
      </AppContext.Provider>
    );
  }

}

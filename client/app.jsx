import React from 'react';
import Splash from './pages/splash';
import Authenticator from './pages/authenticator';
import AppDrawer from './components/app-drawer';
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
      loading: false,
      registered: true,
      authorized: true
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
      return (
        <div className="page">
          <Tournaments />;
        </div>
      );
    }
  }

  render() {
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
        <AppDrawer />
        <Header title="Reel'n" />
        <div className="container">
          {this.renderPage()}
        </div>
        <NavBar onNavClick={this.handleNavClick}/>
      </>
    );
  }

}

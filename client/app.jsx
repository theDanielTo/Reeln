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
      route: parseRoute(window.location.hash),
      loading: false,
      registered: true,
      authorized: true,
      page: 'home'
    };
    this.handleAuthSubmit = this.handleAuthSubmit.bind(this);
    this.handleNavClick = this.handleNavClick.bind(this);
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
  }

  handleAuthSubmit() {
    if (!this.state.registered) {
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

import React from 'react';
import Splash from './pages/splash';
import Authenticator from './pages/authenticator';
import Header from './components/header';
import Home from './pages/home';
// import Tournaments from './pages/tournaments';
// import { parseRoute } from './lib';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // route: parseRoute(window.location.hash),
      loading: false,
      registered: true,
      authorized: true
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false
      });
    }, 1500);
  }

  renderPage() {
    // const { route } = this.state;
    // if (route.path === '') {
    return <Home />;
    // }
    // if (route.path === 'tournaments') {
    //   // const productId = route.params.get('productId');
    //   return <Tournaments />;
    // }
  }

  render() {
    if (this.state.loading) return <Splash />;
    if (!this.state.authorized) {
      return (
        <Authenticator
          registered={this.state.registered} />
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

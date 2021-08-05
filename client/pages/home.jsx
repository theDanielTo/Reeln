import React from 'react';
import SubHeader from '../components/sub-header';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';

export default class Home extends React.Component {
  render() {
    if (!this.context.user) return <Redirect to="sign-in" />;
    const { firstName, lastName } = this.context.user;
    return (
      <div className="home-page">
        <div className="hero-banner flex-center">
          <img src="images/hero-banner.jpg" alt="Hero Banner" />
          <i className="fab fa-resolving" />
        </div>

        <SubHeader text={'Welcome ' + firstName + ' ' + lastName + '!'} />
        {/* GET API FOR WEATHER CONDITIONS HERE */}

        <h2>Featured Video</h2>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/lFF0QyNNNZ8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </div>
    );
  }

}

Home.contextType = AppContext;

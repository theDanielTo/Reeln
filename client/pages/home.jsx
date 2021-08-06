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

        <div className="home-section">
          <h2 className="home-section-header">About Reel&apos;n</h2>
          <p>
            While you&apos;re on or near water, bring some competition with you anywhere! Reel&apos;n is a fishing tournament app for anyone who loves fishing and anyone who wants to see how the fare against other anglers. Create or join tournaments in seconds for anyone to join, or for your friends only.
          </p>
          <p className="text-center">
            HOW TO USE REEL&apos;N
          </p>
          <NewlineText
            text={
              '1. Click the \'TOURNEYS\' tab to view lists of tournaments.\n' +
              '2. On the \'TOURNEYS\' page, you can see all past, current, and open (public) tournaments.\n' +
              '3. Click the \'Create Tournament\' button to create your own tournament.\n' +
              '4. Fill out the form according to the input prompts.\n' +
              '\n'
            } />
          <p className="text-italicized">If you wish to join an open tournament, click on one of the tournament cards to see all of the details about that tournament.</p>
        </div>

        <div className="home-section">
          <h2 className="home-section-header">Featured Video</h2>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/lFF0QyNNNZ8" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      </div>
    );
  }
}

Home.contextType = AppContext;

function NewlineText(props) {
  const text = props.text;
  // eslint-disable-next-line react/jsx-key
  return text.split('\n').map(str => <p>{str}</p>);
}

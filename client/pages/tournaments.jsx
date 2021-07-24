import React from 'react';
import { parseRoute } from '../lib';
import TourneySlider from '../components/tourney-slider';
import SubHeader from '../components/sub-header';
import Card from '../components/card';
import TourneyForm from './tourney-form';
import ReelnBanner from '../components/reeln-banner';

export default class Tournaments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash),
      tournaments: []
    };
    this.renderCards = this.renderCards.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  renderCards() {
    return (
      <>
        <div className="cards-container">
          {/* {
            this.state.tournaments.map(tournament => (
              <Card key="1"/>
            ))
          } */}
          <Card src="./images/hero-banner.jpg" />
        </div>
      </>
    );
  }

  handleCreateClick() {
    window.addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  handleFormSubmit(details) {
    fetch('/api/tourney/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(details)
    })
      .then(res => res.json())
      .then(obj => {
        this.setState({ tournaments: [...this.state.tournaments, obj] });
      })
      .catch(err => console.error(err));
  }

  renderPage() {
    const { route } = this.state;
    if (route.params.has('create')) {
      return (
        <>
          <ReelnBanner />
          <TourneyForm onFormSubmit={this.handleFormSubmit} />
        </>
      );
    }
    if (route.path === 'tournaments') {
      return (
        <>
          <TourneySlider />
          <SubHeader text="Open Tournaments" />
          {this.renderCards()}
          <CreateTourneyBtn onCreateClick={this.handleCreateClick} />
        </>
      );
    }
  }

  render() {
    return (
      <div className="tournaments-page">
        {this.renderPage()}
      </div>
    );
  }
}

function CreateTourneyBtn(props) {
  return (
    <div className="t-btn-container flex-center">
      <a href="#tournaments?create=tourney"
        className="create-tourney-btn border-none link-no-deco"
        onClick={props.onCreateClick}>
        Create Tournament
      </a>
    </div>
  );
}

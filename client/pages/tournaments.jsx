import React from 'react';
import { parseRoute, getToken } from '../lib';
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
      tourneys: [],
      numParticipants: []
    };
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/api/tourneys', {
      headers: {
        'x-access-token': getToken()
      }
    })
      .then(res => res.json())
      .then(tourneys => this.setState({ tourneys }));

    window.addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
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
        'Content-Type': 'application/json',
        'x-access-token': getToken()
      },
      body: JSON.stringify(details)
    })
      .then(res => res.json())
      .then(result => {
        this.setState({ tournaments: [...this.state.tourneys, result] });
        fetch(`/api/tourneys/join/${parseInt(result.tourneyId)}`, {
          method: 'POST',
          headers: {
            'x-access-token': getToken()
          }
        })
          .then(res => res.json());
      })
      .catch(err => console.error(err));
  }

  renderPage() {
    const { route } = this.state;
    if (route.params.has('create')) {
      return (
        <>
          <ReelnBanner />
          <TourneyForm user={this.props.user} onFormSubmit={this.handleFormSubmit} />
        </>
      );
    }
    if (route.path === 'tournaments') {
      return (
        <>
          <TourneySlider />
          <SubHeader text="Open Tournaments" />
          <Cards
            tourneys={this.state.tourneys}
            numParticipants={this.state.numParticipants} />
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

function Cards(props) {
  return (
    <div className="cards-container">
      {
        props.tourneys.map(tourney => {
          if (!tourney.closed) {
            return (
              <Card key={tourney.tourneyId}
                id={tourney.tourneyId}
                tourney={tourney}
                src="./images/hero-banner.jpg" />
            );
          } else {
            return <></>;
          }
        })
      }
    </div>
  );
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

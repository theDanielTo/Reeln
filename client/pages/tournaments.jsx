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
      slider: 'slider-current',
      headerText: 'Current Tournaments',
      tourneys: [],
      numParticipants: []
    };
    this.handleSliderClick = this.handleSliderClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderPage = this.renderPage.bind(this);
  }

  componentDidMount() {
    fetch('/api/tourneys/counts', {
      headers: {
        'x-access-token': getToken()
      }
    })
      .then(res => res.json())
      .then(results => {
        this.setState({ numParticipants: results });
      });

    fetch('/api/tourneys/current', {
      headers: {
        'x-access-token': getToken()
      }
    })
      .then(res => res.json())
      .then(tourneys => {
        this.setState({ tourneys });
      });

    window.addEventListener('hashchange', event => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  handleSliderClick(e) {
    const filter = e.target.id.split('-')[1];
    fetch(`/api/tourneys/${filter}`, {
      headers: {
        'x-access-token': getToken()
      }
    })
      .then(res => res.json())
      .then(tourneys => {
        if (filter === 'past') {
          this.setState({
            slider: 'slider-past',
            headerText: 'Past Tournaments'
          });
        } else if (filter === 'current') {
          this.setState({
            slider: 'slider-current',
            headerText: 'Current Tournaments'
          });
        } else {
          this.setState({
            slider: 'slider-open',
            headerText: 'Open Tournaments'
          });
        }
        this.setState({ tourneys });
      });
  }

  handleFormSubmit(formData) {
    fetch('/api/tourney/create', {
      method: 'POST',
      headers: {
        'x-access-token': getToken()
      },
      body: formData
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

  renderPage(route, tournaments, numParticipants) {
    if (route.params.has('createtourney')) {
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
          <TourneySlider sliderSelected={this.state.slider} onSliderClick={this.handleSliderClick}/>
          <SubHeader text={this.state.headerText} />
          <div className="cards-container">
            {
              tournaments.map(tourney => {
                if (!tourney.closed) {
                  const found = numParticipants.find(data => {
                    return parseInt(data.tourneyId) === tourney.tourneyId;
                  });
                  const line3 = tourney.maxParticipants
                    ? <>{found.numParticipants} / {tourney.maxParticipants} participants</>
                    : <>Placed 1/{found.numParticipants}</>;
                  return (
                    <Card key={'card-' + tourney.tourneyId}
                      url={`#tournaments?tourneyId=${tourney.tourneyId}`}
                      line1={tourney.tourneyName}
                      line2={tourney.startDate + ' - ' + tourney.endDate}
                      line3={line3}
                      src={'./images/' + tourney.tourneyImg} />
                  );
                } else {
                  return null;
                }
              })
            }
          </div>
          <div className="t-btn-container flex-center">
            <a href="#tournaments?createtourney"
              className="create-tourney-btn border-none link-no-deco">
              Create Tournament
            </a>
          </div>
        </>
      );
    }
  }

  render() {
    const { route, tourneys, numParticipants } = this.state;
    return (
      <div className="tournaments-page">
        {this.renderPage(route, tourneys, numParticipants)}
      </div>
    );
  }
}

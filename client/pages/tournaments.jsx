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
      slider: 'slider-open',
      headerText: 'Open Tournaments',
      tourneys: []
    };
    this.handleSliderClick = this.handleSliderClick.bind(this);
    this.renderPage = this.renderPage.bind(this);
  }

  componentDidMount() {
    fetch('/api/tourneys/open', {
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

  renderPage(tournaments) {
    const { route } = this.state;
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
                console.log(tourney);
                if (!tourney.closed) {
                  const line3 = tourney.maxParticipants
                    ? <>{tourney.numParticipants} / {tourney.maxParticipants} participants</>
                    : <>Placed {tourney.standing}/{tourney.numParticipants}</>;
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
    return (
      <div className="tournaments-page">
        {this.renderPage(this.state.tourneys)}
      </div>
    );
  }
}

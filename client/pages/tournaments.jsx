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
      tourneys: [],
      numParticipants: []
    };
    this.handleSliderClick = this.handleSliderClick.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
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

  renderPage(tournaments) {
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
          <TourneySlider sliderSelected={this.state.slider} onSliderClick={this.handleSliderClick}/>
          <SubHeader text={this.state.headerText} />
          <div className="cards-container">
            {
              tournaments.map(tourney => {
                if (!tourney.closed) {
                  return (
                    <Card key={'card-' + tourney.tourneyId}
                      id={tourney.tourneyId}
                      tourney={tourney}
                      src="./images/hero-banner.jpg" />
                  );
                } else {
                  return null;
                }
              })
            }
          </div>
          <div className="t-btn-container flex-center">
            <a href="#tournaments?create=tourney"
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

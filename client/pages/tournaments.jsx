import React from 'react';
import TourneySlider from '../components/tourney-slider';
import SubHeader from '../components/sub-header';
import Card from '../components/card';

export default class Tournaments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tournaments: []
    };
    this.renderCards = this.renderCards.bind(this);
  }

  // componentDidMount() {
  //   fetch('/api/tournaments')
  //     .then(res => res.json())
  //     .then(tournaments => this.setState({ tournaments }));
  // }

  renderCards() {
    return (
      <div className="cards-container">
        {/* {
          this.state.tournaments.map(tournament => (
            <Card key="1"/>
          ))
        } */}
        <Card src="https://cdn.arstechnica.net/wp-content/uploads/2020/02/Screen-Shot-2020-02-21-at-11.22.14-AM-800x526.png" />
      </div>
    );
  }

  render() {
    return (
      <div className="tournaments-page">
        <TourneySlider />
        <SubHeader text="Open Tournaments" />
        {this.renderCards()}
        <CreateTourneyBtn />
      </div>
    );
  }
}

function CreateTourneyBtn(props) {
  return (
    <div className="t-btn-container flex-center">
      <button className="create-tourney-btn border-none">
        Create Tournament
      </button>
    </div>
  );
}

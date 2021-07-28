import React from 'react';
import { getToken } from '../lib';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      participants: 0
    };
  }

  componentDidMount() {
    fetch('/api/count', {
      headers: {
        'x-access-token': getToken()
      }
    })
      .then(res => res.json())
      .then(results => {
        this.setState({
          participants: results.find(res => {
            return res.tId === this.props.id;
          }).numParticipants
        });
      });
  }

  render() {
    const {
      tourneyId, tourneyName,
      startDate, endDate,
      maxParticipants, standing
    } = this.props.tourney;
    const bottomTxt = maxParticipants
      ? <>{this.state.participants} / {maxParticipants} participants</>
      : <>Placed {standing}/{this.state.participants}</>;
    return (
      <a
        className="card link-no-deco"
        href={`#tournaments?tourneyId=${tourneyId}`}>
        <img className="card-img" src={this.props.src} alt="Photo of fish" />
        <div className="card-details">
          <p className="card-text card-text-title">{tourneyName}</p>
          <p className="card-text">{startDate + ' - ' + endDate}</p>
          <p className="card-text">{bottomTxt}</p>
        </div>
      </a>
    );
  }
}

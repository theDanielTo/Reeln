import React from 'react';

export default function Card(props) {
  return (
    <div className="card">
      <img className="card-img" src={props.src} alt="Photo of fish" />
      <div className="card-details">
        <p className="card-text card-text-title">{props.tourney.tourneyName}</p>
        <p className="card-text">{props.tourney.startDate + ' - ' + props.tourney.endDate}</p>
        <p className="card-text">10 participants</p>
      </div>
    </div>
  );
}

import React from 'react';

export default function Card(props) {
  const {
    tourneyId, tourneyName,
    startDate, endDate,
    maxParticipants
  } = props.tourney;
  return (
    <a
      className="card link-no-deco"
      href={`#tournaments?tourneyId=${tourneyId}`}>
      <img className="card-img" src={props.src} alt="Photo of fish" />
      <div className="card-details">
        <p className="card-text card-text-title">{tourneyName}</p>
        <p className="card-text">{startDate + ' - ' + endDate}</p>
        <p className="card-text">0 / {maxParticipants} participants</p>
      </div>
    </a>
  );
}

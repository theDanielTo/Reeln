import React from 'react';

export default function ScoreCard(props) {
  return (
    <div className="score-card">
      <img src={props.src} alt="Avatar" />
      <div className="score-card-middle">
        <div className="score-card-name">
          {props.firstName} {props.lastName}
        </div>
        <span>{props.score}</span>
      </div>
      <div className="standings">{props.standing}</div>
    </div>
  );
}

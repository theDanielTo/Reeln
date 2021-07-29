import React from 'react';

export default function ScoreCard(props) {
  return (
    <div className="score-card">
      <div className="left-col">
        <img src={'./images/' + props.src} alt="Avatar" />
      </div>
      <div className="middle-col">
        <span className="score-card-name">
          {props.firstName} {props.lastName}
        </span>
        <span className="score-card-score">{props.score}</span>
      </div>
      <div className="right-col">
        <span className="score-card-place">#{props.place}</span>
      </div>
    </div>
  );
}

import React from 'react';

export default function TourneySlider(props) {
  return (
    <div className="t-slider flex-center">
      <div className="slider-well">
        <button className="slider-btn slider-selected"
          >
          Past</button>
        <button className="slider-btn"
          >
          Current</button>
      </div>
    </div>
  );
}

import React from 'react';

const sliders = [
  {
    id: 'slider-past',
    text: 'Past'
  },
  {
    id: 'slider-current',
    text: 'Current'
  },
  {
    id: 'slider-open',
    text: 'Open'
  }
];

export default function TourneySlider(props) {
  return (
    <div className="t-slider flex-center">
      <div className="slider-well">
        {
          sliders.map(slider => {
            const selected = (props.sliderSelected === slider.id)
              ? ' slider-selected'
              : '';
            return (
              <Slider
                key={slider.id}
                id={slider.id}
                text={slider.text}
                onClick={props.onSliderClick}
                selected={selected} />
            );
          })
        }
      </div>
    </div>
  );
}

function Slider(props) {
  return (
    <button className={'slider-btn' + props.selected}
      id={props.id}
      onClick={props.onClick}>
      {props.text}</button>
  );
}

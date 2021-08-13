import React from 'react';

export default function Card(props) {
  const { url, id, onCardClick, src, line1, line2, line3 } = props;
  return (
    <div className="card"
      onClick={onCardClick}
      id={id} >
      <a href={url} className="link-no-deco">
        <img className="card-img" src={src} alt="Photo of fish" />
        <div className="card-details">
          <p className="card-text card-text-title">{line1}</p>
          <p className="card-text">{line2}</p>
          <p className="card-text">{line3}</p>
        </div>
      </a>
    </div>
  );
}

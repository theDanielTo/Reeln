import React from 'react';

export default function CatchDetailed(props) {
  const { src, line1, line2, line3 } = props;
  return (
    <div className="catch-detailed-bg">
      <div className="catch-detailed-modal">
        <img className="catch-detailed-img" src={src} alt="Photo of fish" />
        <p className="catch-detailed-text">{line1}</p>
        <p className="catch-detailed-text">{line2}</p>
        <p className="catch-detailed-text">{line3}</p>
      </div>
    </div>
  );
}

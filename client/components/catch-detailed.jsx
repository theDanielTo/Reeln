import React from 'react';

export default function CatchDetailed(props) {
  const { hidden, onBgClick } = props;
  const { photo, firstName, lastName, dateCaught, weight } = props.catchDetailed;
  return (
    <div className="catch-detailed-bg"
      hidden={hidden}
      onClick={onBgClick}>
      <div className="catch-detailed-modal">
        <button onClick={onBgClick}>close</button>
        <img className="catch-detailed-img" src={'./images/' + photo} alt="Photo of fish" />
        <p className="catch-detailed-text">{firstName + ' ' + lastName}</p>
        <p className="catch-detailed-text">{'Caught on: ' + dateCaught}</p>
        <p className="catch-detailed-text">{'Weight: ' + weight + ' pounds'}</p>
      </div>
    </div>
  );
}

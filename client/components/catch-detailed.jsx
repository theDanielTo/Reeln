import React from 'react';

export default function CatchDetailed(props) {
  const { hidden, onBgClick } = props;
  const { firstName, lastName, dateCaught, length, photo } = props.catchDetailed;
  const modalVis = (hidden)
    ? 'hidden'
    : '';
  return (
    <div className={'modal-bg flex-center ' + modalVis}
      onClick={onBgClick}>
      <div className="catch-detailed-modal">
        <i className="far fa-window-close"
          onClick={onBgClick} />
        <div className="catch-detailed-text">
          <p>{'Caught by: ' + firstName + ' ' + lastName}</p>
          <p>{'On ' + dateCaught}</p>
          <p>{'Length: ' + length + ' inches'}</p>
        </div>
        <img className="catch-detailed-img" src={'./images/' + photo} alt="Photo of fish" />
      </div>
    </div>
  );
}

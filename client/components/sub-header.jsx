import React from 'react';

export default function SubHeader(props) {
  return (
    <div className="sub-header flex-center">
      <div className="triangle top-triangle"></div>
      <div className="triangle bottom-triangle"></div>
      <span>{props.text}</span>
    </div>
  );
}

import React from 'react';

export default function Header(props) {
  return (
    <header className="main-header">
      <div className="header-item">
      </div>

      <div className="header-item">
        <div className="header-title">{props.title}</div>
      </div>

      <div className="header-item">
        <span className="header-cancel hidden">Cancel</span>
      </div>
    </header>
  );
}

import React from 'react';

export default function Header(props) {
  return (
    <nav className="main-nav">
      <div className="nav-icon">
        <i className="fas fa-home"></i>
        <span>HOME</span>
      </div>
      <div className="nav-icon">
        <i className="fas fa-trophy"></i>
        <span>TOURNIES</span>
      </div>
      <div className="nav-icon">
        <i className="fas fa-book-medical"></i>
        <span>LOG CATCH</span>
      </div>
      <div className="nav-icon">
        <i className="fas fa-user-circle"></i>
        <span>PROFILE</span>
      </div>
      <div className="nav-icon">
        <i className="fas fa-sliders-h"></i>
        <span>SETTINGS</span>
      </div>
    </nav>
  );
}

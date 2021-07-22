import React from 'react';
import NavBar from '../components/nav-bar';

export default function Home(props) {
  return (
    <>
      <div className="hero-banner flex-center">
        <img src="../server/public/images/hero-banner.jpg" alt="Hero Banner" />
        <i className="fab fa-resolving" />
      </div>
      <NavBar />
    </>
  );
}

import React from 'react';
import "./styles.css";
import Footer from "../../components/Footer";
import { NavLink } from "react-router-dom";
function Home() {
  return (
    <div className="home-wrapper">
      <video
        src="backgroundVideo.MP4"
        className="background-video"
        autoPlay
        loop
        muted
      ></video>
      <nav className="home-nav">
        <img src="logo.svg" alt="" className="home-logo" />
        <ul>
          <li>
            <NavLink to={"/login"} className="home-nav-li home-login-button">
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="home-body-container">
        <div className="home-center-section">
          <h1 className="home-slogan">Play the notes, Master the music!</h1>
          <button className="try-it-button">Learn More</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

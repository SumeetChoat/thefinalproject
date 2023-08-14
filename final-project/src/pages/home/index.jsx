import React from 'react';
import "./styles.css";
import Footer from "../../components/Footer";
import { NavLink } from "react-router-dom";
function Home() {
  return (
    <div className="home-wrapper">
      <video
        src="homeBackground.mp4"
        className="background-video"
        autoPlay
        loop
        muted
      ></video>
      <nav className="home-nav">
        <h1>LOGO</h1>
        <ul>
          <li>
            <NavLink to={"/about"}>About Us</NavLink>
          </li>
          <li>
            <NavLink to={"/register"}>Register</NavLink>
          </li>
          <li>
            <NavLink to={"/login"}>Login</NavLink>
          </li>
        </ul>
      </nav>
      <div className="home-body-container">
        <button className="try-it-button">Learn More</button>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

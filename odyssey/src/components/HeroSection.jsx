import React from "react";
import { Button } from "./Button";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="video-container">
      <video src="/videos/video3.mp4" autoPlay loop muted />
      <h1>Odyssey</h1>
      <p>Get ready to embark on an epic odyssey</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          Create an Account<i class="fa-solid fa-plus"></i>
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
        >
          Sign in <i class="fa-solid fa-user"></i>
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;

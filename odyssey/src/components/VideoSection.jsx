import React, { useState } from "react";
import { Button } from "./Button";
import "./VideoSection.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../config/config'

const VideoSection = () => {

  const [authorized, setAuthorized] = useState(false)

  const loginGoogle =  async (e) => {

    signInWithPopup(auth, new GoogleAuthProvider())
    .then((userCred) => {
      if(userCred) {
        setAuthorized(true);
      }
      console.log(userCred);
    })
  }

  return (
    <div className="video-container">
      <video src="/videos/video3.mp4" autoPlay loop muted />
      <h1>Odyssey</h1>
      <p>Get ready to embark on an epic odyssey</p>
      <p>with our trip planner</p>
      <div className="hero-btns">
        {authorized ? (
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
          Explore <i className="fa-solid fa-globe"></i>
          </Button>
        ) : (
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
            onClick={loginGoogle}
          >
          Get Started <i className="fa-solid fa-user"></i>
          </Button>
        )}
      </div>
    </div>
  );
};

export default VideoSection;
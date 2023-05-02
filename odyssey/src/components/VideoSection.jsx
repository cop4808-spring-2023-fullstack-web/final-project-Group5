import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import "./VideoSection.css";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../config/config";
import { Link } from "react-router-dom";
import axios from "axios";

const VideoSection = () => {
  const [authorized, setAuthorized] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [token, setToken] = useState("");
  const [user, setUser] = useState(auth.currentUser)
  window.localStorage.setItem("user", auth.currentUser);

  useEffect(() => {
    setUser(auth.currentUser);

    auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        setAuthorized(true);
        window.localStorage.setItem("auth", "true");
        userCred.getIdToken().then((token) => {
          setToken(token);
          window.localStorage.setItem("token", token);
        });
      } else {
        setAuthorized(false);
        setToken("");
        window.localStorage.removeItem("auth");
        window.localStorage.removeItem("token");
      }
    });
  }, []);

  const loginGoogle = async (e) => {
    signInWithPopup(auth, new GoogleAuthProvider()).then((userCred) => {
      if (userCred) {
        setAuthorized(true);
        window.localStorage.setItem("auth", "true");
      }
      axios.post(`http://localhost:8000/user/${window.localStorage.get("user")}`)
      .then(res => {
        setUser(window.localStorage.get("user"))
      })
      .then(() => {})
    });
  };

  const logout = async () => {
    signOut(auth).then(() => {
      setAuthorized(false);
      setToken("");
      window.localStorage.removeItem("auth");
      window.localStorage.removeItem("token");
    });
  };

  return (
    <div className="video-container">
      <video src="/videos/video3.mp4" autoPlay loop muted />
      <h1>Odyssey</h1>
      <p>Get ready to embark on an epic odyssey</p>
      <p>with our trip planner</p>
      <div className="hero-btns">
        {authorized ? (
          <>
            <Button
              className="btns"
              buttonStyle="btn--outline"
              buttonSize="btn--large"
            >
              <Link
                to="/explore"
                state={{ authToken: token }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Explore <i className="fa-solid fa-globe"></i>
              </Link>
            </Button>
            <Button
              className="btns"
              buttonStyle="btn--outline"
              buttonSize="btn--large"
              onClick={logout}
            >
              Logout <i className="fa-solid fa-sign-out"></i>
            </Button>
          </>
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

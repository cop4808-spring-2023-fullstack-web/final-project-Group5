import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { Button } from "./Button.jsx";

function Navbar() {
  const [Click, setClick] = useState(false);

  const handleClick = () => setClick(!Click);

  const closeMobileMenu = () => setClick(false);

  const [button, setButton] = useState(true);

  const handleButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    handleButton();
  }, []);

  window.addEventListener("resize", handleButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Odyssey<i class="fa-solid fa-map-location-dot"></i>
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={Click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          <ul className={Click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Explore
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
                Itinerary
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/projects"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                My Trips
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Profile
              </Link>
            </li>
          </ul>
          {button && (
            <Button buttonStyle="btn--outline">
              Profile <i class="fa-solid fa-user"></i>
            </Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;

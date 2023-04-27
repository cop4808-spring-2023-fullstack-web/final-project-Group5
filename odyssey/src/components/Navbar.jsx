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
      <nav className="navbar1">
        <div className="navbar-container1">
          <Link to="/" className="navbar-logo1" onClick={closeMobileMenu}>
            Odyssey<i className="fa-solid fa-map-location-dot"></i>
          </Link>
          <div className="menu-icon1" onClick={handleClick}>
            <i className={Click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
          <ul className={Click ? "nav-menu1 active" : "nav-menu1"}>
            <li className="nav-item1">
              <Link to="/explore" className="nav-links1" onClick={closeMobileMenu}>
                Explore
              </Link>
            </li>
            <li className="nav-item1">
              <Link to="/itinerary" className="nav-links1" onClick={closeMobileMenu}>
                Itinerary
              </Link>
            </li>
            <li className="nav-item1">
              <Link
                to="/trips"
                className="nav-links1"
                onClick={closeMobileMenu}
              >
                My Trips
              </Link>
            </li>
            <li className="nav-item1">
              <Link
                to="/favorites"
                className="nav-links1"
                onClick={closeMobileMenu}
              >
                Favorites
              </Link>
            </li>
            <li className="nav-item1">
              <Link
                to="/"
                className="nav-links-mobile1"
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

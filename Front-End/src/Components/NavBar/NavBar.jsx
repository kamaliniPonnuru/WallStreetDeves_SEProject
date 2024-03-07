import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxHamburgerMenu } from "react-icons/rx";
import { PiHamburgerFill } from "react-icons/pi";
import navbarItems from "./NavBarList";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <span>Alumni Portal</span>
          </NavLink>


          <ul className={click ? "nav-menu active" : "nav-menu"}>
          {navbarItems.map((item, index) => (
          <li className="nav-item" key={index}>
            <NavLink  
            exact
            to={item.link}
            activeClassName="active"
            className="nav-links"
            onClick={handleClick}
            >
            {item.title}
           </NavLink>
           </li>
         ))}
         </ul>

          <div className="nav-icon" onClick={handleClick}>

            {click ? (
              <span className="icon">
                <RxHamburgerMenu />{" "}
              </span>
            ) : (
              <span className="icon">
                <GiHamburgerMenu />
              </span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
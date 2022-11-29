import React from 'react';
import {NavLink} from "react-router-dom";

const SideBar = ({allowedSidebar}) => {
  return (<section className={"section-top-bar"}>
      <nav className={"section-top-bar-container-nav"}>
        <ul className={"section-top-bar-container-nav-list"}>
          {allowedSidebar.map((item, index) => {
            return (
              <li className={"section-top-bar-container-nav-list-item"} key={index}>
                <NavLink to={item.path} activeClassName={"active"}>
                  <img src={item.img} alt={item.title}/>
                </NavLink>
              </li>
            )
          } )}
        </ul>
      </nav>
  </section>);
};

export default SideBar;

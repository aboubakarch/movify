import React from "react";
import { Link } from "react-router-dom";

import { appRoutes } from "routes";

import "assets/styles/header.scss";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <div className="top-bar">
          <div className="top-bar__container">
            <div className="container__logo">
              <h3>
                <span>Mov</span>
                <span>ify</span>
              </h3>
            </div>
            <div className="container__menu">
              <Link className="menu__item" to={appRoutes.home}>
                <h5>Home</h5>
              </Link>
              <Link className="menu__item" to={appRoutes.stats}>
                <h5>Stats</h5>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
};

export default Layout;

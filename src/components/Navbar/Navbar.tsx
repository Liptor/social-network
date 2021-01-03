import React from "react";
import "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import SiteBarContainer from "./SiteBar/SiteBarContainer";
import { AppStateType } from "../../redux/redux-store";

type NavbarType = {
  store: AppStateType;
};

const Navbar: React.FC<NavbarType> = ({ sidebar }) => {
  return (
    <div className="btn-group-vertical">
      <button type="button" className="btn btn-link">
        <NavLink to="/profile">Profile</NavLink>
      </button>
      <button type="button" className="btn btn-link">
        <NavLink to="/dialogs" type="button">
          Message
        </NavLink>
      </button>
      <button type="button" className="btn btn-link">
        <NavLink to="/users" type="button">
          Users
        </NavLink>
      </button>
      <button type="button" className="btn btn-link">
        <NavLink to="/news" type="button">
          News
        </NavLink>
      </button>
      <button type="button" className="btn btn-link">
        <NavLink to="/music" type="button">
          Music
        </NavLink>
      </button>
      <button type="button" className="btn btn-link">
        <NavLink to="/settings" type="button">
          Settings
        </NavLink>
      </button>
      <SiteBarContainer sidebar={sidebar} />
    </div>
  );
};

export default Navbar;

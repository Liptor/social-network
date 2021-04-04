import {NavLink} from "react-router-dom";
import React from "react";
import SiteBar from "./SiteBar/SiteBar";
import {DialogsDataType} from "../../redux/type/type";

type NavbarType = {
    friend: Array<DialogsDataType>
}

const Navbar: React.FC<NavbarType> = ({friend}) => {
    return (
        <div className="btn-group-vertical">
            <button type="button" className="btn btn-link">
                <NavLink to="/profile">Profile</NavLink>
            </button>
            <button type="button" className="btn btn-link">
                <NavLink to="/dialogs" type="button">
                    Message
                </NavLink></button>
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
            <SiteBar friend={friend}/>
        </div>
    )
}

export default Navbar

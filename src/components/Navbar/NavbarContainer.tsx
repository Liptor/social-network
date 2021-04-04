import React from "react";
import "./Navbar.module.css";
import {DialogsDataType} from "../../redux/type/type";
import {AppStateType} from "../../redux/redux-store";
import {getFriendsToSidebar} from "./navbar-selector";
import {compose} from "redux";
import {connect} from "react-redux";
import Navbar from "./Navbar";

export type NavbarContType = {
    friend: Array<DialogsDataType>
}

const NavbarContainer: React.FC<NavbarContType> = (props) => {
    return (
        <Navbar friend={props.friend}/>
    )
}

let mapStateToProps = (state: AppStateType) => {
    return {
        friend: getFriendsToSidebar(state)
    }
}

export default compose(
    connect(mapStateToProps)
)(NavbarContainer)

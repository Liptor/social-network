import React from "react";
import s from "./Header.module.css";
import {NavLink} from "react-router-dom";
import image from './../../assets/Images/header/logo.png'

const Header = (props) => {
    return (
        <header className={s.header}>
            <img src={image}/>
            <div className={s.loginBlock}>
                <div className={s.loginImage}>
                    <img src={props.loginImage}/>
                </div>
                {props.isAuth
                    ? <div>{props.login} - <button onClick={props.logout}>Log Out</button></div>
                    : <NavLink to={"/login"}>Login</NavLink>}
            </div>
        </header>
    );
};

export default Header;

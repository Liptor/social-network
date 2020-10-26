import React from "react";
import s from "./Friend.module.css";
import { NavLink } from "react-router-dom";
import siteBarPhoto from "../../../../assets/Images/siteBar/avaSiteBar.jpg";

const Friend = (props) => {
  let path = "/dialogs/" + props.id;

  return (
    <div className={s.friendItem}>
      <img src={siteBarPhoto}></img>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
};

export default Friend;

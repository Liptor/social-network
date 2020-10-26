import React from "react";
import s from "./DialogItem.module.css";
import { NavLink } from "react-router-dom";
import image from "../../../assets/Images/dialogs/avaForMess.jpg";

const DialogItem = (props) => {
  let path = "/dialogs/" + props.id;

  return (
    <div className={s.dialog + " " + s.active}>
      <img src={image} />
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
};

export default DialogItem;

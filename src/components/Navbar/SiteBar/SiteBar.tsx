import React from "react";
import s from "./SiteBar.module.css";
import Friend from "./Friend/Friend";
import {DialogsDataType} from "../../../redux/type/type";

type SiteBarType = {
    friend: Array<DialogsDataType>
}

const SiteBar: React.FC<SiteBarType> = ({friend}) => {
  let friendItem = friend.map((friendItem: DialogsDataType) => (
    <Friend key={friendItem.id} name={friendItem.name} id={friendItem.id} />
  ));

  return (
    <div className={s.siteBar}>
      <div className={s.listOfFriends}>Friends</div>
      <div className={s.friends}>{friendItem}</div>
    </div>
  );
};

export default SiteBar;

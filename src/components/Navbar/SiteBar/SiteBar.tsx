import React from "react"
import s from "./SiteBar.module.css"
import Friend from "./Friend/Friend"
import { DialogsDataType } from "../../../redux/type/type";

type PropsType = {
  friend: DialogsDataType[]
}

const SiteBar: React.FC<PropsType> = (friend: any) => {
  let friendItem = friend.map((friendItem: any) => (
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

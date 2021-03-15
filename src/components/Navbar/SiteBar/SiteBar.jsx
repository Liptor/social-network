import React from "react";
import s from "./SiteBar.module.css";
import Friend from "./Friend/Friend";

const SiteBar = (friend) => {
  let friendItem = friend.map((friendItem) => (
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

import React from "react";
import s from "./SiteBar.module.css";
import Friend from "./Friend/Friend";

type SiteBarType = {
  sitebar: Array<any>;
};

const SiteBar: React.FC<SiteBarType> = ({ sitebar }) => {

  let friendItem = sitebar.friend.map((friendItem: any) => (
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

import React from "react";
import style from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import { ProfileType } from "../../redux/type/type";

type PropsType = {
  profile: ProfileType;
  status: string;
  updateStatus: () => void;
  owner: boolean;
  savePhoto: () => void;
};

const Profile: React.FC<PropsType> = (props) => {
  return (
    <div className={style.profile}>
      <ProfileInfo
        isOwner={props.owner}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        savePhoto={props.savePhoto}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;

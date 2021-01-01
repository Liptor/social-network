import React from "react";
import style from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer"
import { ProfileType } from "../../redux/type/type"

type PropsType = {
  profile: ProfileType;
  status: string;
  updateStatus: () => void;
  owner: string;
  savePhoto: () => void;
};

const Profile: React.FC<PropsType> = ({
  owner,
  profile,
  status,
  updateStatus,
  savePhoto,
}) => {
  return (
    <div className={style.profile}>
      <ProfileInfo
        isOwner={owner}
        profile={profile}
        status={status}
        updateStatus={updateStatus}
        savePhoto={savePhoto}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;

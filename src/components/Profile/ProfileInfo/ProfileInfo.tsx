/* /* eslint-disable jsx-a11y/alt-text */
import React, { MouseEvent } from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/Images/avat-01-512.webp";
import { ProfileType } from "../../../redux/type/type";
import { ContactsType } from "../../../redux/profile-reducer";

type ProfileInfoType = {
  profile: typeof ProfileType;
  status: string;
  updateStatus: () => void;
  isOwner: boolean;
  savePhoto: () => void;
  e: MouseEvent<HTMLButtonElement>;
  contacts: ContactsType
};

const ProfileInfo: React.FC<ProfileInfoType> = ({
  profile,
  isOwner,
  savePhoto,
}) => {
  if (!profile) {
    return <Preloader />;
  }

  const mainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  return (
    <div className={s.descriptionBlock}>
      <div>
        <img src={profile.photos.large || userPhoto} className={s.mainPhoto} />
        {isOwner && <input type={"file"} onChange={mainPhotoSelected} />}
      </div>
      <div>
        <ProfileData profile={profile} />
      </div>
    </div>
  );
};

const ProfileData: React.FC<ProfileInfoType> = ({
  profile,
  status,
  updateStatus,
}) => {
  return (
    <div>
      <div className={s.lookingForJob}>
        <b>Looking for a job</b>: {profile.lookingForAJob ? "yes" : "no"}
      </div>
      <div className={s.aboutProfile}>
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
      <div className={s.socialNetworks}>
        <b>Contacts:</b>
        <div className={s.contact}>
          {Object.keys(profile.contacts).map((key) => {
            return (
              <Contact
                key={key}
                contactTitle={key}
                contactValue={profile.contacts[key]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

type ContactType = {
  contactTitle: string;
  contactValue: string;
};

const Contact: React.FC<ContactType> = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <b>{contactTitle}:</b> {contactValue}
    </div>
  );
};

export default ProfileInfo;

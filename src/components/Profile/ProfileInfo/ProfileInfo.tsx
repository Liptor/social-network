import React from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import userPhoto from "../../../assets/Images/avat-01-512.webp";
import { ProfileType } from "../../../redux/type/type";
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

type ProfileInfoType = {
  profile: ProfileType;
  status: string;
  updateStatus: (status: string) => void;
  isOwner: string;
  savePhoto: (e: any) => void;
};

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

const ProfileInfo: React.FC<ProfileInfoType> = ({
  profile,
  isOwner,
  savePhoto,
  ...props
}) => {
  if (!profile) {
    return <Preloader />;
  }

  const mainPhotoSelected = (e: HTMLInputEvent): void => {
    if (e.target.files!.length) {
      savePhoto(e.target.files![0]);
    }
  };

  return (
    <div className={s.descriptionBlock}>
      <div>
        <img
          alt={`profileImage`}
          src={profile.photos.large || userPhoto}
          className={s.mainPhoto}
        />
        {isOwner && <input type={"file"} onChange={() => mainPhotoSelected} />}
      </div>
      <div>
        <ProfileData
          profile={profile}
          isOwner={isOwner}
          savePhoto={savePhoto}
          {...props}
        />
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
          {Object.keys(profile.contacts).map((key: any) => {
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
  contactValue: any;
};

const Contact: React.FC<ContactType> = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <b>{contactTitle}:</b> {contactValue}
    </div>
  );
};

export default ProfileInfo;

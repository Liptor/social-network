import React, { useState } from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getUserProfile,
  getStatus,
  updateStatus,
  savePhoto,
} from "../../redux/profile-reducer";
import { ProfileType } from "../../redux/type/type";
import { withRouter, RouteComponentProps } from "react-router-dom";  
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";

type RouterProps = {
  userId: string;
};

interface PropsType extends RouteComponentProps<RouterProps> {
  owner: string;
  getUserProfile: (userId: string) => void;
  getStatus: (userId: string) => void;
  profile: ProfileType;
  history: any;
  authorizedUserId: string;
  status: string;
  updateStatus: () => void;
  savePhoto: () => void;
}

const ProfileContainer: React.FC<PropsType> = (props) => {
  const [userId, setUserId] = useState("");

  const refreshData = () => {
    if (!userId) {
    setUserId(props.match.params.userId)
  }
    if (userId) {
      setUserId(props.authorizedUserId);
      if (!userId) {
        props.history.push("/login");
      }
    }
    props.getUserProfile(userId);
    props.getStatus(userId);
  }
  
  if (props.match.params.userId !== userId) {
        refreshData();
  }

  return (
    <Profile
      owner={props.match.params.userId}
      profile={props.profile}
      status={props.status}
      updateStatus={props.updateStatus}
      savePhoto={props.savePhoto}
    />
  );
};

let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});

export default compose(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
  }),
  withRouter
  //withAuthRedirect
)(ProfileContainer);

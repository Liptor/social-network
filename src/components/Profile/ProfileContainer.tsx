import React, { useEffect, useState, useCallback } from "react";
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

type RouterProps = {
  userId: string;
};

interface PropsType extends RouteComponentProps<RouterProps> {
  owner: number;
  getUserProfile: (userId: string) => void;
  getStatus: (userId: string) => void;
  profile: ProfileType;
  history: any;
  authorizedUserId: string;
}

const ProfileContainer: React.FC<PropsType> = (props) => {
  const [userId, setUserId] = useState("");

  const refreshData = useCallback(() => {
    setUserId(props.match.params.userId);
    if (!userId) {
      setUserId(props.authorizedUserId);
      if (!userId) {
        props.history.push("/login");
      }
    }
    props.getUserProfile(userId);
    props.getStatus(userId);
  }, [props, userId]);

  useEffect(() => {
    refreshData();
    if (props.match.params.userId != userId) {
      refreshData();
    }
  }, [props.match.params.userId, userId, refreshData]);

  return (
    <Profile
      owner={!props.match.params.userId}
      profile={props.profile}
      status={props.status}
      updateStatus={props.updateStatus}
      savePhoto={props.savePhoto}
      {...props}
    />
  );
};

let mapStateToProps = (state: any) => ({
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

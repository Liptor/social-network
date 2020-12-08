import React, { Component } from "react";
import Profile from "./Profile.tsx";
import { connect } from "react-redux";
import {
  getUserProfile,
  getStatus,
  updateStatus,
  savePhoto,
  ProfileType,
} from "../../redux/profile-reducer";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

interface PropsType {
  owner: number;
  getUserProfile: () => void;
  getStatus: () => void;
  profile: typeof ProfileType;
  history: any;
  userId: number;
};

class ProfileContainer extends Component<PropsType> {
  refreshData() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
      if (!userId) {
        this.props.history.push("/login");
      }
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }

  componentDidMount() {
    this.refreshData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.userId != prevProps.match.params.userId) {
      this.refreshData();
    }
  }

  render() {
    return (
      <Profile
        {...this.props}
        owner={!this.props.match.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
      />
    );
  }
}

let mapStateToProps = (state) => ({
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

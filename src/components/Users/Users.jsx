import React from "react";
import styles from "./users.module.css";
import userPhoto from "./../../assets/Images/avat-01-512.webp";
import { NavLink } from "react-router-dom";
import Paginator from "./Paginator/Paginator";

const Users = (props) => {
  let unfollowButton = (user) => (
    <button
      disabled={props.followingInProgress.some((id) => id === user.id)}
      onClick={() => {
        props.unfollow(user.id);
      }}
    >
      Unfollow
    </button>
  );

  let followButton = (user) => (
    <button
      disabled={props.followingInProgress.some((id) => id === user.id)}
      onClick={() => {
        props.follow(user.id);
      }}
    >
      Follow
    </button>
  );

  return (
    <div>
      <>
        <Paginator
          totalUsersCount={props.totalUsersCount}
          pageSize={props.pageSize}
          currentPage={props.currentPage}
          onPageChanged={props.onPageChanged}
        />
      </>
      <div className={styles.userSection}>
        {props.users.map((user) => (
          <div key={user.id}>
            <span>
              <div>
                <NavLink to={"./profile/" + user.id}>
                  <img
                    src={
                      user.photos.small != null ? user.photos.small : userPhoto
                    }
                    className={styles.userPhoto}
                  />
                </NavLink>
              </div>
              <div>
                {user.follow ? unfollowButton(user) : followButton(user)}
              </div>
            </span>
            <span>
              <span>
                <div>{user.name}</div>
                <div>{user.status}</div>
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;

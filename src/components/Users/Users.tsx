import React from "react";
import styles from "./users.module.css";
import userPhoto from "./../../assets/Images/avat-01-512.webp";
import { NavLink } from "react-router-dom";
import Paginator from "./Paginator/Paginator";
import { UsersType } from "../../redux/type/type";

type PropsType = {
  totalUsersCount: number,
  pageSize: number,
  currentPage: number,
  user: number,
  onPageChanged: (pageNumber: number) => void,
  users: Array<UsersType>,
  followingInProgress: Array<number>,
  follow: (number: number) => void,
  unfollow: (number: number) => void
}

const Users: React.FC<PropsType> = ({ currentPage, totalUsersCount, pageSize,
  onPageChanged, users, follow, unfollow, followingInProgress, ...props }) => {

  let unfollowButton = (user: number) => (
    <button
      disabled={followingInProgress.some((id: number) => id === user.id)}
      onClick={() => {
        unfollow(user.id);
      }}
    >
      Unfollow
    </button>
  );

  let followButton = (user: number) => (
    <button
      disabled={followingInProgress.some((id: number) => id === user.id)}
      onClick={() => {
        follow(user.id);
      }}
    >
      Follow
    </button>
  );

  return (
    <div>
      <>
        <Paginator
          totalUsersCount={totalUsersCount}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChanged={onPageChanged}
        />
      </>
      <div className={styles.userSection}>
        {users.map((user) => (
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
                {user.followed ? unfollowButton(user) : followButton(user)}
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

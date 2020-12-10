import React, { Attributes, ImgHTMLAttributes } from "react";
import styles from "./users.module.css";
import userPhoto from "./../../assets/Images/avat-01-512.webp";
import { NavLink } from "react-router-dom";
import Paginator from "./Paginator/Paginator";
import { UsersType } from "../../redux/type/type";

type PropsType = {
  totalUsersCount: number;
  photos: string | null;
  pageSize: number;
  currentPage: number;
  user: number;
  users: Array<UsersType>;
  onPageChanged: (pageNumber: number) => void;
  followingInProgress: Array<number>;
  follow: (number: number) => void;
  unfollow: (number: number) => void;
  id: number;
  name: string;
  status: string;
  key: Attributes;
}

const Users: React.FC<PropsType> = ({
  currentPage,
  totalUsersCount,
  pageSize,
  onPageChanged,
  users,
  follow,
  unfollow,
  followingInProgress,
  ...props
}) => {
  let unfollowButton = (user: number) => (
    <button
      disabled={followingInProgress.some((id: number) => id === user)}
      onClick={() => {
        unfollow(user);
      }}
    >
      Unfollow
    </button>
  );

  let followButton = (user: number) => (
    <button
      disabled={followingInProgress.some((id: number) => id === user)}
      onClick={() => {
        follow(user);
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
          <div key={user}>
            <span>
              <div>
                <NavLink to={"./profile/" + user}>
                  <img
                    alt="profilePhoto"
                    src={
                      !user.photos.small != null ? user.photos.small : userPhoto
                    }
                    className={styles.userPhoto}
                  />
                </NavLink>
              </div>
              <div>
                {user.follow ? unfollowButton(user.id) : followButton(user.id)}
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

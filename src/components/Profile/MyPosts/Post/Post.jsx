import React, { useState } from "react";
import s from "./Post.module.css";
import profileImage from "../../../../assets/Images/profile/avatar.jpg";

const Post = ({ message }) => {
  let [like, setLike] = useState(0);
  let [postLiked, setPostLiked] = useState(false);

  const likePost = () => {
    setLike(like + 1);
    setPostLiked(!postLiked);

    if (postLiked) {
      setLike(like - 1);
    }
  };

  return (
    <div className={s.item}>
      <img src={profileImage} />
      {message}
      <div>
        <button onClick={likePost} type="button" class="btn btn-primary btn-sm">
          Like
        </button>
        {like}
      </div>
    </div>
  );
};

export default Post;

import React, { useState } from "react";
import s from "./Post.module.css";
import profileImage from "../../../../assets/Images/profile/avatar.jpg";

const Post = ({ message }: { message: string }) => {
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
      <img alt={`profileImage`} src={profileImage} />
      {message}
      <div>
        <button onClick={likePost} type="button" className="btn btn-primary btn-sm">
          Like
        </button>
        {like}
      </div>
    </div>
  );
};

export default Post;

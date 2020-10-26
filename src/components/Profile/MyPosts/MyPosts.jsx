import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import PostForm from "./MyPostsForm";

const MyPosts = (props) => {
  let postsElemenst = props.postsData.map((p) => (
    <Post key={p.id} message={p.message} />
  ));

  return (
    <div className={s.postsBlock}>
      <h3>My Posts</h3>
      <div className={s.myPosts}>
        <PostForm addPost={props.addPost} />
        <div className={s.posts}>{postsElemenst}</div>
      </div>
    </div>
  );
};

export default MyPosts;

import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import PostForm from "./MyPostsForm";
import { MyPostsContainerType } from "./MyPostsContainer";

type MyPostsType = MyPostsContainerType & {
  addPost: (newPostText: string) => void;
};

const MyPosts: React.FC<MyPostsType> = ({
  postsData,
  newPostText,
  addPost,
}) => {
  let postsElements = postsData.map((p: any) => (
    <Post key={p.id} message={p.message} />
  ));

  return (
    <div className={s.postsBlock}>
      <h3>My Posts</h3>
      <div className={s.myPosts}>
        <PostForm addPost={addPost} newPostText={newPostText} />
        <div className={s.posts}>{postsElements}</div>
      </div>
    </div>
  );
};

export default MyPosts;

import { addPost } from "../../../redux/profile-reducer";
import { connect } from "react-redux";
import MyPosts from "./MyPosts";
import { PostsDataType } from "../../../redux/profile-reducer";

export type MyPostsContainerType = {
  postsData: Array<PostsDataType>;
  newPostText: string;
};

let mapStateToProps = (state: any): MyPostsContainerType => ({
  postsData: state.profilePage.postsData,
  newPostText: state.profilePage.newPostText
})

const MyPostsContainer = connect(mapStateToProps, { addPost })(MyPosts);

export default MyPostsContainer;

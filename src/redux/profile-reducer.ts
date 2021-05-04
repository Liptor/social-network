import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {profileAPI, ResultCodesEnum} from "../api/api";
import { PhotosType, ProfileType, RootState } from "./type/type";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SET_PHOTO = "SET_PHOTO";

export type PostsDataType = {
  id: number
  message: string
}

export type ContactsType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}

let initialState = {
  postsData: [
    { id: 1, message: "Hi, how are you?" },
    { id: 2, message: "It's my first post" },
  ] as Array<PostsDataType>,
  profile: null as ProfileType | null,
  status: "",
  newPostText: ''
};

export type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 3,
        message: action.newPostText,
      };
      return {
        ...state,
        postsData: [...state.postsData, newPost],
        newPostText: "",
      };
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case SET_PHOTO: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      };
    }
    default:
      return state;
  }
};

type AddPostType = { type: typeof ADD_POST, newPostText: string }
export const addPost = (newPostText: string): AddPostType => ({
  type: ADD_POST,
  newPostText,
});
type SetUserProfileType = {type: typeof SET_USER_PROFILE, profile: ProfileType}
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({
  type: SET_USER_PROFILE,
  profile,
});
type SetStatusType = {type: typeof SET_STATUS, status: string }
export const setStatus = (status: string): SetStatusType => ({ type: SET_STATUS, status });
type SetPhotoSuccessType = {type: typeof SET_PHOTO, photos: PhotosType }
export const setPhotoSuccess = (photos: PhotosType): SetPhotoSuccessType => ({ type: SET_PHOTO, photos });
// export const deletePost = (status) =>
//     ({ type: SET_STATUS, status });

type ThunkType = ThunkAction<void, RootState, unknown, Action<string>>

export const getUserProfile = (userId: number): ThunkType => async dispatch => {
    await profileAPI.getProfile(userId).then((response) => {
      dispatch(setUserProfile(response.data));
    })
}

export const getStatus = (userID: number): ThunkType => async dispatch => {
    await profileAPI.getStatus(userID).then((response) => {
      dispatch(setStatus(response.data))
    })
}

export const updateStatus = (status: string): ThunkType => async dispatch => {
    await profileAPI.updateStatus(status).then((response: any) => {
      if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(setStatus(status));
      }
    })
}


export const savePhoto = (file: any): ThunkType => async dispatch => {
  let response = await profileAPI.savePhoto(file);

  if (response.data.resultCode === ResultCodesEnum.Success) {
    dispatch(setPhotoSuccess(response.data.data.photos));
  }
}

export default profileReducer;

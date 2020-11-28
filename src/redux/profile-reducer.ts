import { profileAPI } from "../api/api";
import { PhotosType } from "./type/type";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_STATUS = "SET_STATUS";
const SET_PHOTO = "SET_PHOTO";

type PostsDataType = {
  id: number
  message: string
}

type ContactsType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}

type ProfileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: ContactsType
  photos: PhotosType
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

export const getUserProfile = (userId: number) => {
  return (dispatch: any) => {
    profileAPI.getProfile(userId).then((response) => {
      dispatch(setUserProfile(response.data));
    });
  };
};

export const getStatus = (userID: number) => {
  return (dispatch: any) => {
    profileAPI.getStatus(userID).then((response) => {
      dispatch(setStatus(response.data));
    });
  };
};

export const updateStatus = (status: string) => {
  return (dispatch: any) => {
    profileAPI.updateStatus(status).then((response: any) => {
      if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
      }
    });
  };
};

export const savePhoto = (file: any) => async (dispatch: any) => {
  let response = await profileAPI.savePhoto(file);

  if (response.data.resultCode === 0) {
    dispatch(setPhotoSuccess(response.data.data.photos));
  }
};

export default profileReducer;

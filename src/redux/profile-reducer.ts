import {profileAPI, ResultCodesEnum} from "../api/api"
import { PhotosType, ProfileType } from "./type/type"
import {BaseThunkType, InferActionsType} from "./redux-store"


let initialState = {
  postsData: [
    { id: 1, message: "Hi, how are you?" },
    { id: 2, message: "It's my first post" },
  ] as Array<PostsDataType>,
  profile: null as ProfileType | null,
  status: "",
  newPostText: ''
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'SN/PROFILE/ADD_POST': {
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
    case "SN/PROFILE/SET_USER_PROFILE": {
      return {
        ...state,
        profile: action.profile,
      }
    }
    case "SN/PROFILE/SET_STATUS": {
      return {
        ...state,
        status: action.status,
      }
    }
    case "SN/PROFILE/SET_PHOTO": {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      }
    }
    default:
      return state;
  }
}

export const actions = {
  addPost: (newPostText: string) => ({ type: 'SN/PROFILE/ADD_POST', newPostText } as const),
  setUserProfile: (profile: ProfileType) => ({ type: "SN/PROFILE/SET_USER_PROFILE", profile } as const),
  setStatus: (status: string) => ({ type: "SN/PROFILE/SET_STATUS", status } as const),
  setPhotoSuccess: (photos: PhotosType) => ({ type: "SN/PROFILE/SET_PHOTO", photos } as const)
}

export const getUserProfile = (userId: number): ThunkType => async dispatch => {
    await profileAPI.getProfile(userId).then((response) => {
      dispatch(actions.setUserProfile(response.data));
    })
}

export const getStatus = (userID: number): ThunkType => async dispatch => {
    await profileAPI.getStatus(userID).then((response) => {
      dispatch(actions.setStatus(response.data))
    })
}

export const updateStatus = (status: string): ThunkType => async dispatch => {
    await profileAPI.updateStatus(status).then((response: any) => {
      if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setStatus(status));
      }
    })
}

export const savePhoto = (file: File): ThunkType => async dispatch => {
  let response = await profileAPI.savePhoto(file);

  if (response.data.resultCode === ResultCodesEnum.Success) {
    dispatch(actions.setPhotoSuccess(response.data.data.photos));
  }
}

export default profileReducer


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

type ActionsType = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsType>
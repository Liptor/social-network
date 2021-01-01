import {ContactsType} from '../profile-reducer'

export type ProfileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: Array<ContactsType>
  photos: PhotosType
}

export type PhotosType = {
  small: string | null
  large: string | null
}
export type UsersType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}
export type DialogsDataType = {
  id: number
  name: string
}

export type RootState = {
  isOn: boolean
} 

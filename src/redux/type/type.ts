import {ContactsType} from '../profile-reducer'

export type ProfileType = {
    data: {
        userId: number
        lookingForAJob: boolean
        lookingForAJobDescription: string
        fullName: string
        contacts: ContactsType
        photos: {
            small: string
            large: string
        }
    }
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

export type MessagesType = {
    id: number
    message: string
}

export type RootState = {
  isOn: boolean
} 

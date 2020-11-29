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

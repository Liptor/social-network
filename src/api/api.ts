import axios from 'axios'
import {ContactsType} from "../redux/profile-reducer";

const instance = axios.create({
    withCredentials: true,
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {
        "API-KEY": '0ab2877e-0fcc-4a65-8814-54abb221740f'
    }
});

// if (!instance.userID) {
//     instance.userID = 2;
// }

type UserType = {
    id: number
    name: string
    status: string
    photos: {
        small: string
        large: string
    }
    followed: boolean
}

type GetUserType = {
    items: Array<UserType>
    totalCount: number
    error: string
}

type ResponseType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: {}
}

export const userAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetUserType>(`users?page=${currentPage}&count=${pageSize}`)
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`);
    },
    unfollow(userId: number) {
        return instance.delete<ResponseType>(`unfollow/${userId}`);
    }
}

type GetProfileType = {
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

type PhotoType = {
    data: {
        photos: {
            small: string
            large: string
        }
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}


export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<GetProfileType>(`profile/` + userId);
    },
    getStatus(userId: number) {
        return instance.get<any>(`profile/status/` + userId);
    },
    putStatus(status: string) {
        return instance.put<ResponseType>(`profile/status/`, { status: status });
    },
    savePhoto(photoFile: File) {
        const formData = new FormData()
        formData.append('image', photoFile)
        return instance.put<PhotoType>(`profile/photo`, formData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        })
    },
    updateStatus(status: string) {
        return instance.put<ResponseType>(`profile/status`, status)
    }
}

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

type MeResponseType = {
    data: { 
        id: number, 
        email: string, 
        login: string 
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

type LoginMeResponseType = {
    data: { 
        userId: number, 
    }
    resultCode: ResultCodesEnum
    messages: Array<string>
}

export const authAPI = {
    me() {
        return instance.get<MeResponseType>(`auth/me`).then(res => res.data);
    },
    login(email: string, password: string, rememberMe = false) {
        return instance.post<LoginMeResponseType>('auth/login', { email, password, rememberMe }).then(res => res.data);
    },
    logout() {
        return instance.delete('auth/login');
    }
}

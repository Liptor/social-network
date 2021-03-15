import axios from 'axios'

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

export const userAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    follow(userId: number) {
        return instance.post(`follow/${userId}`);
    },
    unfollow(userId: number) {
        return instance.delete(`unfollow/${userId}`);
    }
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get(`profile/` + userId);
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId);
    },
    putStatus(status: string) {
        return instance.put(`profile/status/`, { status: status });
    },
    savePhoto(photoFile: string) {
        const formData = new FormData();
        formData.append('image', photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        });
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, status)
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

import {authAPI, ResultCodesEnum} from "../api/api";
import {makeAutoObservable} from "mobx";

class AuthState {
    initialState = {
        userID: 0,
        email: '',
        login: '',
        isAuth: false
    }

    constructor() {
        makeAutoObservable(this)
    }

    async getAuthUserData() {
        let meData = await authAPI.me()
        if (meData.resultCode === ResultCodesEnum.Success) {
            let {id, email, login} = meData.data
            this.initialState = {userID: id, email, login, isAuth: true}
        }
    }
}

export default new AuthState()
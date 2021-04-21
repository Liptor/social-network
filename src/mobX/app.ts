import {makeAutoObservable} from "mobx";
import AuthState from './auth'

class AppState {
    initialized = false

    constructor() {
        makeAutoObservable(this)
    }

    initializeApp() {
        let promise = AuthState.getAuthUserData()

        Promise.all([promise])
            .then(() => {
                this.initialized = true
            });
    }
}

export default new AppState()
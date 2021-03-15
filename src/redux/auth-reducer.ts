import { authAPI, ResultCodesEnum } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    userID: null,
    email: null,
    login: null,
    isAuth: false
};

const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
};

type AuthUserDataType = {
    type: typeof SET_USER_DATA,
    payload: {userId: string | null, email: string | null, login: string | null, isAuth: boolean}
}
export const setAuthUserData = (userId: number, email: string | null, login: string | null, isAuth: boolean): AuthUserDataType => ({
    type: SET_USER_DATA, payload: { userId, email, login, isAuth }
});

export const getAuthUserData = () => async (dispatch: any) => {
    let meData = await authAPI.me()

    if (meData.resultCode ===  ResultCodesEnum.Success) {
        let { id, email, login } = meData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    let loginData = await authAPI.login(email, password, rememberMe)

    if (loginData.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        let message = loginData.messages.length > 0 ?
            loginData.messages[0] : 'Some error'
        dispatch(stopSubmit('login', { email: message }))
    }
}

export const logout = () => {
    return (dispatch: any) => {
        authAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false));
                }
            });
    }
}

export default authReducer;
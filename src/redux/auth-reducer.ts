import { authAPI, ResultCodesEnum } from "../api/api"
import {FormAction, stopSubmit} from "redux-form"
import {BaseThunkType, InferActionsType} from "./redux-store"

let initialState = {
    userID: null,
    email: null,
    login: null,
    isAuth: false
}

const authReducer = (state = initialState, action: ActionsTypes) => {
    switch (action.type) {
        case 'SN/APP/SET_USER_DATA':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}

export const actions = {
    setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'SN/APP/SET_USER_DATA', payload: { userId, email, login, isAuth }
    } as const)
}

export const getAuthUserData = (): ThunkType => async dispatch => {
    let meData = await authAPI.me()

    if (meData.resultCode ===  ResultCodesEnum.Success) {
        let { id, email, login } = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean): ThunkType => async (dispatch: any) => {
    let loginData = await authAPI.login(email, password, rememberMe)

    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else {
        let message = loginData.messages.length > 0 ?
            loginData.messages[0] : 'Some error'
        dispatch(stopSubmit('login', { email: message } ))
    }
}

export const logout = (): ThunkType => async dispatch => {
    await authAPI.logout().then(response => {
        if (response.data.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setAuthUserData(null, null, null, false))
        }
    })
}

export default authReducer

type ActionsTypes = InferActionsType<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>

import { getAuthUserData } from "./auth-reducer"
import { RootState } from "./type/type"
import { ThunkAction } from 'redux-thunk'
import { Action } from "redux"
import { BaseThunkType, InferActionsType } from "./redux-store"

let initialState = {
    initialized: false
}

const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'SN/APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true,
            }
        default:
            return state;
    }
}

const actions = {
    initializedSuccess: () => ({ type: 'SN/APP/INITIALIZED_SUCCESS' })
}

export const initializeApp = (): ThunkAction<void, RootState, unknown, Action<string>> => {
    return (dispatch: any) => {
        let promise = dispatch(getAuthUserData());

        Promise.all([promise])
            .then(() => {
                dispatch(actions.initializedSuccess());
            });
    }
}

export default appReducer

export type InitialStateType = typeof initialState
type ActionTypes = InferActionsType<typeof actions>
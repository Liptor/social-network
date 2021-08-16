import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authAPI, ResultCodesEnum } from "../../api/api";
import { InferActionsType } from "./store";

interface IAuthSlice {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

const initialState: IAuthSlice = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

export const actions = {
    setAuthUserData: ({ userId, email, login, isAuth }: typeof initialState) => ({ payload: { userId, email, login, isAuth } })
}

type ActionsTypes = InferActionsType<typeof actions>

const getAuthUserData = createAsyncThunk('app/auth', async () => {
    let meData = await authAPI.me()

    if (await meData.resultCode === ResultCodesEnum.Success) {
        return await meData.data;
        // setAuthUserData(id, email, login, true)
    }
})

const login = createAsyncThunk('app/auth/login', async (email: string, password: string, rememberMe: boolean) => {
    return await authAPI.login(email, password, rememberMe)
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUserData: (state, action: ActionsTypes) => {
            state = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAuthUserData.fulfilled, (state,action) => {
            // @ts-ignore
            let {id, email, login, isAuth} = action.payload
            
            state = {userId: id, email, login, isAuth}
        })
        builder.addCase(login, (state, action) => {
            if (action.resultCode === ResultCodesEnum.Success) {
               getAuthUserData()
            } else {
                let message = loginData.messages.length > 0 ?
                    loginData.messages[0] : 'Some error'
                dispatch(stopSubmit('login', { email: message } ))
            }
        })
    }
})



export const { setAuthUserData } = authSlice.actions
export default authSlice.reducer

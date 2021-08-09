import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUserData: (state, action: ActionsTypes) => {
            state = action.payload
        }
    }
})

// const getAuthUserData = createAsyncThunk('app/auth',
//     if (await authAPI.me().resultCode ===  ResultCodesEnum.Success) {
//         let { id, email, login } = await authAPI.me().data;
//         dispatch(actions.setAuthUserData(id, email, login, true));
// })

const { setAuthUserData } = authSlice.actions

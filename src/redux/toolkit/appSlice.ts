import { createSlice } from '@reduxjs/toolkit'

interface IApp {
    initialized: boolean
}

const initialState: IApp = {
    initialized: false
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        initialize: (state) => {
            state.initialized = true
        }
    }
})

export const { initialize } = appSlice.actions
export default appSlice.reducer


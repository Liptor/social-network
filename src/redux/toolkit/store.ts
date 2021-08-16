import { useDispatch } from 'react-redux';
import appSlice from './appSlice';
import authSlice from './authSlice'
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: {
        app: appSlice,
        auth: authSlice
    }
})

type PropertiesType<T> = T extends {[key: string]: infer U} ? U : never

export type InferActionsType<T extends {[key: string]: (...args: any[]) => any} > = ReturnType<PropertiesType<T>>

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 
export const useAppDispatch = () => useDispatch<AppDispatch>()
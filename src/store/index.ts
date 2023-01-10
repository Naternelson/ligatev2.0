import {  configureStore, createReducer } from "@reduxjs/toolkit";
import { EqualityFn, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: createReducer({},() => {})
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch  
export const useAppDispatch = ():AppDispatch => {
    return useDispatch() 
}
export function useAppSelector<T>(cb: (state: RootState)=>T, equalityFn?: EqualityFn<T>){
    return useSelector<RootState, T>(cb, equalityFn)
}
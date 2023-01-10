import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { Outlet, Navigate, useLocation, NavigateProps } from "react-router-dom"
import { actions } from "../../global"

export enum AuthState {
    AUTH = "authenticated",
    DENIED = "denied",
    LOADING = 'loading'
}

/** 
 * Container Element to Handle Actions 
 * 
 * Element watches out for state changes to firebase auth condition
 * If condition is passed, the user is allowed to see AuthLayoutRender
 * If condition is denied, the user is redirected. Information about where they were trying to access is sent as a location state
 * */
export const AuthenticatedLayout = () => {
    const [authState, setAuthState] = useState<AuthState>(AuthState.LOADING)
    const location = useLocation() 
    useEffect(() => {
        return onAuthStateChanged(getAuth(), (user) => {
            setAuthState(user ? AuthState.AUTH : AuthState.DENIED) 
        })
    }, [])
    const navigateProps:NavigateProps = {
        to: actions.onAuthFailed.redirect, 
        replace: true, 
        state: {
            location: location, 
            message: actions.onAuthFailed.message 
        }
    }
    if(!actions.onAuthFailed.protect) return <AuthLayoutRender/>
    return (
        authState === AuthState.AUTH ? <AuthLayoutRender/> 
        : authState === AuthState.DENIED ? <Navigate {...navigateProps}/> 
        : null
    )  
}

/** Render Element to show to user */
const AuthLayoutRender = () => {
    return (
        <div>
            Authenticated Layout
            <Outlet/>
        </div>
    )
}

import { Action } from 'redux'

export interface IAuthState {
    user: any
}

export enum AuthActionTypes {
    SET_USER = 'SET_USER',
    USER_LOGOUT = "USER_LOGOUT"
} 

export interface ISetUser extends Action {
    type: AuthActionTypes.SET_USER
    payload: { user: any }
}

export interface IUserLogout extends Action {
    type: AuthActionTypes.USER_LOGOUT
}

export type AuthActions = 
    | ISetUser 
    | IUserLogout
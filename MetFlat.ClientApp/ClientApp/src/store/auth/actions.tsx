import { ActionCreator } from 'redux'
import { AuthActionTypes, ISetUser, IUserLogout } from "./types"

export const SetUser: ActionCreator<ISetUser> = (user: any) => ({
    type: AuthActionTypes.SET_USER,
    payload: { user }
})

export const UserLogOut: ActionCreator<IUserLogout> = () => ({
    type: AuthActionTypes.USER_LOGOUT,
})
import { Reducer } from 'redux'
import { AuthActions, AuthActionTypes, IAuthState } from "./types"

export const initialState: IAuthState = {
    user: {},
}

const authReducer: Reducer<IAuthState> = (state: IAuthState = initialState, action) => {
    switch((action as AuthActions).type) {
        case AuthActionTypes.SET_USER:
            return { ...state, user: action.payload.user }
        default:
            return state
    }
}

export default authReducer
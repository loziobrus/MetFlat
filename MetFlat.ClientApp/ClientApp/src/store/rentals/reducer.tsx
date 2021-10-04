import { Reducer } from 'redux'
import { 
    RentalActionTypes, 
    IRentalState, 
    RentalActions,
} from "./types"

export const initialState: IRentalState = {
    rentals: [],
    pendingOwner: [],
    pendingTenant: []
}

const rentalReducer: Reducer<IRentalState> = (state: IRentalState = initialState, action) => {
    switch((action as RentalActions).type) {
        case RentalActionTypes.SET_RENTALS:
            return { ...state, rentals: action.payload.rentals } 
        case RentalActionTypes.SET_PENDING_BY_OWNER:
            return { ...state, pendingOwner: action.payload.pendingOwner }
        case RentalActionTypes.SET_PENDING_BY_TENANT:
            return { ...state, pendingTenant: action.payload.pendingTenant }
        case RentalActionTypes.REMOVE_PENDING_BY_OWNER: {
            const pendingOwner = state.pendingOwner.filter(r => r.id !== action.payload.pendingOwnerId)
            return { ...state, pendingOwner }
        }
        case RentalActionTypes.REMOVE_PENDING_BY_TENANT: {
            const pendingTenant = state.pendingTenant.filter(r => r.id !== action.payload.pendingTenantId)
            return { ...state, pendingTenant }
        }
        case RentalActionTypes.ADD_RENTAL:
            return { ...state, rentals: [...state.rentals, action.payload.rental] }
        default:
            return state
    }
}

export default rentalReducer
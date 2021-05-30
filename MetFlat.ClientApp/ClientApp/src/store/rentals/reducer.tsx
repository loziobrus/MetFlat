import { Reducer } from 'redux'
import { 
    RentalActionTypes, 
    IRentalState, 
    RentalActions,
} from "./types"

export const initialState: IRentalState = {
    rentals: []
}

const rentalReducer: Reducer<IRentalState> = (state: IRentalState = initialState, action) => {
    switch((action as RentalActions).type) {
        case RentalActionTypes.SET_RENTALS:
            return { ...state, rentals: action.payload.rentals } 
        case RentalActionTypes.ADD_RENTAL:
            return { ...state, rentals: [...state.rentals, action.payload.rental] }
        default:
            return state
    }
}

export default rentalReducer
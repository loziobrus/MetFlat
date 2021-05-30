import { ActionCreator } from 'redux'
import { 
    RentalActionTypes,
    IAddRental,
    ISetRentals,
} from "./types"

export const SetRentals: ActionCreator<ISetRentals> = (rentals: any[]) => ({
    type: RentalActionTypes.SET_RENTALS,
    payload: { rentals }
})

export const AddRental: ActionCreator<IAddRental> = (rental: any) => ({
    type: RentalActionTypes.ADD_RENTAL,
    payload: { rental }
})
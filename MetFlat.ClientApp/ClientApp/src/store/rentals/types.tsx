import { Action } from 'redux'

export interface IRentalState {
    rentals: any[],
}

export enum RentalActionTypes {
    SET_RENTALS = 'SET_RENTALS',
    ADD_RENTAL = 'ADD_RENTAL',
} 

export interface ISetRentals extends Action {
    type: RentalActionTypes.SET_RENTALS
    payload: { rentals: any[] }
}

export interface IAddRental extends Action {
    type: RentalActionTypes.ADD_RENTAL
    payload: { rental: any }
}

export type RentalActions = 
    | ISetRentals 
    | IAddRental
import { Action } from 'redux'

export interface IRentalState {
    rentals: any[],
    pendingTenant: any[],
    pendingOwner: any[]
}

export enum RentalActionTypes {
    SET_RENTALS = 'SET_RENTALS',
    SET_PENDING_BY_OWNER = 'SET_PENDING_BY_OWNER',
    SET_PENDING_BY_TENANT = 'SET_PENDING_BY_TENANT',
    REMOVE_PENDING_BY_OWNER = 'REMOVE_PENDING_BY_OWNER',
    REMOVE_PENDING_BY_TENANT = 'REMOVE_PENDING_BY_TENANT',
    ADD_RENTAL = 'ADD_RENTAL',
} 

export interface ISetRentals extends Action {
    type: RentalActionTypes.SET_RENTALS
    payload: { rentals: any[] }
}

export interface ISetPendingOwnerRentals extends Action {
    type: RentalActionTypes.SET_PENDING_BY_OWNER
    payload: { pendingOwner: any[] }
}

export interface ISetPendingTenantRentals extends Action {
    type: RentalActionTypes.SET_PENDING_BY_TENANT
    payload: { pendingTenant: any[] }
}

export interface IRemovePendingTenantRentals extends Action {
    type: RentalActionTypes.REMOVE_PENDING_BY_TENANT
    payload: { pendingTenantId: number }
}

export interface IRemovePendingOwnerRentals extends Action {
    type: RentalActionTypes.REMOVE_PENDING_BY_OWNER
    payload: { pendingOwnerId: number }
}

export interface IAddRental extends Action {
    type: RentalActionTypes.ADD_RENTAL
    payload: { rental: any }
}

export type RentalActions = 
    | ISetRentals 
    | IAddRental
    | ISetPendingOwnerRentals
    | ISetPendingTenantRentals
    | IRemovePendingOwnerRentals
    | IRemovePendingTenantRentals
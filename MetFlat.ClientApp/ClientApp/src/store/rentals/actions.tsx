import { ActionCreator } from 'redux'
import { 
    RentalActionTypes,
    IAddRental,
    ISetRentals,
    ISetPendingTenantRentals,
    ISetPendingOwnerRentals,
    IRemovePendingOwnerRentals,
    IRemovePendingTenantRentals
} from "./types"

export const SetRentals: ActionCreator<ISetRentals> = (rentals: any[]) => ({
    type: RentalActionTypes.SET_RENTALS,
    payload: { rentals }
})

export const SetPendingOwnerRentals: ActionCreator<ISetPendingOwnerRentals> = (pendingOwner: any[]) => ({
    type: RentalActionTypes.SET_PENDING_BY_OWNER,
    payload: { pendingOwner }
})

export const SetPendingTenantRentals: ActionCreator<ISetPendingTenantRentals> = (pendingTenant: any[]) => ({
    type: RentalActionTypes.SET_PENDING_BY_TENANT,
    payload: { pendingTenant }
})

export const RemovePendingTenantRental: ActionCreator<IRemovePendingTenantRentals> = (pendingTenantId: number) => ({
    type: RentalActionTypes.REMOVE_PENDING_BY_TENANT,
    payload: { pendingTenantId }
})

export const RemovePendingOwnerRental: ActionCreator<IRemovePendingOwnerRentals> = (pendingOwnerId: number) => ({
    type: RentalActionTypes.REMOVE_PENDING_BY_OWNER,
    payload: { pendingOwnerId }
})

export const AddRental: ActionCreator<IAddRental> = (rental: any) => ({
    type: RentalActionTypes.ADD_RENTAL,
    payload: { rental }
})
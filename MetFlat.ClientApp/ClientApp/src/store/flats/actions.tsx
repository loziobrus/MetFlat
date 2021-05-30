import { ActionCreator } from 'redux'
import { 
    FlatActionTypes,
    IAddFlat,
    IDeleteFlat,
    IEditFlat,
    ISetFlats,
    ISetFlat,
    ISetFlatOwner
} from "./types"

export const SetFlats: ActionCreator<ISetFlats> = (flats: any[]) => ({
    type: FlatActionTypes.SET_FLATS,
    payload: { flats }
})

export const SetFlat: ActionCreator<ISetFlat> = (flat: any) => ({
    type: FlatActionTypes.SET_FLAT,
    payload: { flat }
})

export const SetFlatOwner: ActionCreator<ISetFlatOwner> = (owner: any) => ({
    type: FlatActionTypes.SET_FLAT_OWNER,
    payload: { owner }
})

export const AddFlat: ActionCreator<IAddFlat> = (flat: any) => ({
    type: FlatActionTypes.ADD_FLAT,
    payload: { flat }
})

export const EditFlat: ActionCreator<IEditFlat> = (id: number, flat: any) => ({
    type: FlatActionTypes.EDIT_FLAT,
    payload: { id, flat }
})

export const DeleteFlat: ActionCreator<IDeleteFlat> = (id: number) => ({
    type: FlatActionTypes.DELETE_FLAT,
    payload: { id }
})
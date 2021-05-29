import { Reducer } from 'redux'
import { 
    FlatActionTypes, 
    IFlatState, 
    FlatActions,
} from "./types"

export const initialState: IFlatState = {
    flats: [],
    currentFlat: {}
}

const flatReducer: Reducer<IFlatState> = (state: IFlatState = initialState, action) => {
    switch((action as FlatActions).type) {
        case FlatActionTypes.SET_FLATS:
            return { ...state, flats: action.payload.flats }
        case FlatActionTypes.SET_FLAT:
            return { ...state, currentFlat: action.payload.flat }       
        case FlatActionTypes.ADD_FLAT:
            return { ...state, flats: [...state.flats, action.payload.flat] }
        case FlatActionTypes.EDIT_FLAT: {
            const { flat } = action.payload
            const index = state.flats.findIndex(c => c.id === flat.id)
            const flats = [
                ...state.flats.slice(0, index),
                flat,
                ...state.flats.slice(index + 1)
            ]
            return { ...state, flats }
        }
        case FlatActionTypes.DELETE_FLAT: {
            const flats = state.flats.filter(c => c.id !== action.payload.id)
            return { ...state, flats }
        }
        default:
            return state
    }
}

export default flatReducer
import { Action } from 'redux'

export interface IFlatState {
    flats: any[],
    currentFlat: any
}

export enum FlatActionTypes {
    SET_FLATS = 'SET_FLATS',
    SET_FLAT = 'SET_FLAT',
    ADD_FLAT = 'ADD_FLAT',
    EDIT_FLAT = 'EDIT_FLAT',
    DELETE_FLAT = 'DELETE_FLAT'
} 

export interface ISetFlats extends Action {
    type: FlatActionTypes.SET_FLATS
    payload: { flats: any[] }
}

export interface ISetFlat extends Action {
    type: FlatActionTypes.SET_FLAT
    payload: { flat: any }
}

export interface IAddFlat extends Action {
    type: FlatActionTypes.ADD_FLAT
    payload: { flat: any }
}

export interface IEditFlat extends Action {
    type: FlatActionTypes.EDIT_FLAT
    payload: { id: number, flat: any }
}

export interface IDeleteFlat extends Action {
    type: FlatActionTypes.DELETE_FLAT
    payload: { id: number }
}

export type FlatActions = 
    | ISetFlats 
    | ISetFlat
    | IAddFlat
    | IEditFlat
    | IDeleteFlat
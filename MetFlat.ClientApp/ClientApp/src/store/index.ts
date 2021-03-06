import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';
import { IFlatState } from './flats/types'
import { IAuthState } from './auth/types'
import { IRentalState } from './rentals/types'
import flatReducer from './flats/reducer'
import authReducer from './auth/reducer'
import rentalReducer from './rentals/reducer'


// The top-level state object
export interface ApplicationState {
    counter: Counter.CounterState | undefined;
    weatherForecasts: WeatherForecasts.WeatherForecastsState | undefined;
    flats: IFlatState | undefined;
    auth: IAuthState | undefined;
    rentals: IRentalState | undefined;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    flats: flatReducer,
    auth: authReducer,
    rentals: rentalReducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

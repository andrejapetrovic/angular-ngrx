import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { Driver } from '../models/driver.model';
import * as DriversActions from '../actions/drivers.actions';
import { Team } from '../models/team.model';
import { EntityState, createEntityAdapter, Update } from '@ngrx/entity';

function newDriver(id: number, name: string, country: string, points: number, team?: Team): Driver {
    return { id, name, country, points, team };
}

export const adapter = createEntityAdapter<Driver>();
export interface State extends EntityState<Driver> {}
export const initialState: State = adapter.getInitialState();

export function driversReducer(state = initialState, action) {
    switch (action.type) {

        case DriversActions.FETCH_SUCCESS:
            return adapter.addAll(action.drivers, state);

        case DriversActions.EDIT || DriversActions.ADD: 
            return adapter.updateOne({
                id: action.driver.id,
                changes: { loading: true }
            }, state);  

        case DriversActions.ADD_SUCCESS:
            return adapter.addOne(action.driver, state);
        
        case DriversActions.EDIT_SUCCESS: 
            return adapter.updateOne({
                id: action.driver.id,
                changes: { ...action.driver,  editable: false, loading: false }
            }, state);

        case DriversActions.TOGGLE_EDIT:
            return adapter.updateOne({
                id: action.driver.id,
                changes: { editable: !action.driver.editable }
            }, state);

        case DriversActions.DELETE:
            return adapter.updateOne({
                id: action.id,
                changes: { loading: true }
            }, state);

        case DriversActions.DELETE_SUCCESS:
            return adapter.removeOne(action.id, state);

        case DriversActions.DELETE_FAIL:
            return adapter.updateOne({
                id: action.id,
                changes: { loading: true }
            }, state);

        case DriversActions.RESET:
            return initialState;

        default:
            return state;
    }
}

export const getDriversState = createFeatureSelector<State>('drivers');
export const {
    selectIds,
    selectEntities,
    selectTotal,
    selectAll
} = adapter.getSelectors(getDriversState);
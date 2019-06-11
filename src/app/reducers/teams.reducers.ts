import { Action, createFeatureSelector } from '@ngrx/store';
import * as TeamsActions from '../actions/teams.actions';
import { Team } from '../models/team.model';
import { EntityState, createEntityAdapter, Update } from '@ngrx/entity';

export const adapter = createEntityAdapter<Team>();
export interface State extends EntityState<Team> {}
export const initialState: State = adapter.getInitialState();

export function teamsReducer(state = initialState, action) {
    switch (action.type) {

        case TeamsActions.FETCH_SUCCESS: 
            return adapter.addAll(action.teams, state);

        case TeamsActions.EDIT || TeamsActions.ADD: 
            return adapter.updateOne({
                id: action.team.id,
                changes: { loading: true }
            }, state);  

        case TeamsActions.ADD_SUCCESS:
            return adapter.addOne(action.team, state);
        
        case TeamsActions.EDIT_SUCCESS: 
            return adapter.updateOne({
                id: action.team.id,
                changes: { ...action.team,  editable: false, loading: false }
            }, state);

        case TeamsActions.TOGGLE_EDIT:
            return adapter.updateOne({
                id: action.team.id,
                changes: { editable: !action.team.editable }
            }, state);

        case TeamsActions.DELETE:
            return adapter.updateOne({
                id: action.id,
                changes: { loading: true }
            }, state);

        case TeamsActions.DELETE_SUCCESS:
            return adapter.removeOne(action.id, state);

        case TeamsActions.DELETE_FAIL:
            return adapter.updateOne({
                id: action.id,
                changes: { loading: true }
            }, state);

        case TeamsActions.ADD_DRIVER_SUCCESS:
            return adapter.updateOne({
                id: action.payload.team.id,
                changes: { drivers: [...action.payload.team.drivers, action.payload.driver ] }
            }, state);

        case TeamsActions.REMOVE_DRIVER_SUCCESS:
            return adapter.updateOne({
                id: action.payload.team.id,
                changes: { drivers: [...action.payload.team.drivers.filter(d => d.id !== action.payload.driver.id)] }
            }, state);

        case TeamsActions.RESET:
            return initialState;

        default:
            return state;
    }
}

export const getTeamsState = createFeatureSelector<State>('teams');
export const {
    selectIds,
    selectEntities,
    selectTotal,
    selectAll
} = adapter.getSelectors(getTeamsState);

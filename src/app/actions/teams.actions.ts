import { Action } from '@ngrx/store';
import { Team } from '../models/team.model';

export const FETCH = '[Tams] Fetch';
export const FETCH_SUCCESS = '[Teams] Fetch Success';

export const ADD = '[Teams] Add';
export const ADD_SUCCESS = '[Teams] Add Success';

export const EDIT = '[Teams] Edit';
export const EDIT_SUCCESS = '[Teams] Edit Success';

export const RESET = '[Teams] Reset';

export const DELETE = '[Teams] Delete';
export const DELETE_SUCCESS = '[Teams] Delete Succes';
export const DELETE_FAIL = '[Teams] Delete Fail';

export const TOGGLE_EDIT = '[Teams] Toggle Edit';

export const ADD_DRIVER =  '[Teams] Add Driver';
export const REMOVE_DRIVER = '[Teams] Remove Driver';
export const ADD_DRIVER_SUCCESS =  '[Teams] Add Driver';
export const REMOVE_DRIVER_SUCCESS = '[Teams] Remove Driver';

export class Fetch implements Action {
    readonly type = FETCH;
}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;
    constructor(public teams) {}
}

export class Add implements Action {
    readonly type = ADD;
    constructor(public team: Partial<Team>) {}
}

export class AddSuccess implements Action {
    readonly type = ADD_SUCCESS;
    constructor(public team: Partial<Team>) {}
}

export class Edit implements Action {
    readonly type = EDIT;
    constructor(public team: Partial<Team>) {}
}

export class EditSuccess implements Action {
    readonly type = EDIT_SUCCESS;
    constructor(public team: Partial<Team>) {}
}

export class Delete implements Action {
    readonly type = DELETE;
    constructor(public id: number) {}
}

export class DeleteSucces implements Action {
    readonly type = DELETE_SUCCESS;
    constructor(public id: number) {}
}

export class DeleteFail implements Action {
    readonly type = DELETE_FAIL;
    constructor(public id: number) {}
}

export class ToggleEdit implements Action {
    readonly type = TOGGLE_EDIT;
    constructor(public team: Partial<Team>) {}
}

export class Reset implements Action {
    readonly type = RESET;
}

export class AddDriver implements Action {
    readonly type = ADD_DRIVER;
    constructor(public payload: any) {}
}

export class RemoveDriver implements Action {
    readonly type = REMOVE_DRIVER;
    constructor(public payload: any) {}
}

export class AddDriverSuccess implements Action {
    readonly type = ADD_DRIVER_SUCCESS;
    constructor(public payload: any) {}
}

export class RemoveDriverSuccess implements Action {
    readonly type = REMOVE_DRIVER_SUCCESS;
    constructor(public payload: any) {}
}

export type All
    = Edit
    | Fetch
    | Add
    | ToggleEdit
    | Delete
    | DeleteSucces
    | DeleteFail
    | Reset;

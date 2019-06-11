import { Action } from '@ngrx/store';
import { Driver } from '../models/driver.model';

export const FETCH = '[Drivers] Fetch';
export const FETCH_SUCCESS = '[Drivers] Fetch Success';

export const ADD = '[Drivers] Add';
export const ADD_SUCCESS = '[Drivers] Add Success';

export const EDIT = '[Drivers] Edit';
export const EDIT_SUCCESS = '[Drivers] Edit Success';

export const RESET = '[Drivers] Reset';

export const DELETE = '[Drivers] Delete';
export const DELETE_SUCCESS = '[Drivers] Delete Succes';
export const DELETE_FAIL = '[Drivers] Delete Fail';

export const TOGGLE_EDIT = '[Drivers] Toggle Edit';

export class Fetch implements Action {
    readonly type = FETCH;
}

export class FetchSuccess implements Action {
    readonly type = FETCH_SUCCESS;
    constructor(public drivers) {}
}

export class Add implements Action {
    readonly type = ADD;
    constructor(public driver: Partial<Driver>) {}
}

export class AddSuccess implements Action {
    readonly type = ADD_SUCCESS;
    constructor(public driver: Partial<Driver>) {}
}

export class Edit implements Action {
    readonly type = EDIT;
    constructor(public driver: Partial<Driver>) {}
}

export class EditSuccess implements Action {
    readonly type = EDIT_SUCCESS;
    constructor(public driver: Partial<Driver>) {}
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
    constructor(public driver: Partial<Driver>) {}
}

export class Reset implements Action {
    readonly type = RESET;
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

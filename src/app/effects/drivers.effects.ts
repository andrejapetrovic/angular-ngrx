import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as driversActions from '../actions/drivers.actions';
import { tap, exhaustMap, mergeMap, concatMap, switchMap, map, delay, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { DriversService } from '../services/drivers.service';

@Injectable()
export class DriversEffects {

    @Effect()
    delete$ = this.actions.pipe(
        ofType<Action>(driversActions.DELETE),
        map((action: driversActions.Delete) => action.id),
        mergeMap(id => this.service.delete(id).pipe(
            map(() => new driversActions.DeleteSucces(id)),
            catchError(() => of(new driversActions.DeleteFail(id)))
        )),
    )

    @Effect()
    edit$ = this.actions.pipe(
        ofType<Action>(driversActions.EDIT),
        map((action: driversActions.Edit) => action.driver),
        mergeMap(driver => this.service.edit(driver.id, driver).pipe(
            map(() => new driversActions.EditSuccess(driver)),
            catchError(() => of(new driversActions.DeleteFail(driver.id)))
        )),
    )

    @Effect()
    add$ = this.actions.pipe(
        ofType<Action>(driversActions.ADD),
        map((action: driversActions.Add) => action.driver),
        mergeMap(driver => this.service.add(driver).pipe(
            tap(console.log),
            map((res) => new driversActions.AddSuccess({ ...driver, id: res.id })),
            catchError(() => of(new driversActions.DeleteFail(driver.id)))
        )),
    )

    @Effect()
    getData$ = this.service.get().pipe(
        tap(console.log),
        map(drivers => new driversActions.FetchSuccess(drivers))
    );

    @Effect()
    refresh$ = this.actions.pipe(
        ofType<Action>(driversActions.RESET),
        mergeMap(drivers => this.getData$)
    )

    constructor(
        private actions: Actions,
        private service: DriversService
        ) {}

}
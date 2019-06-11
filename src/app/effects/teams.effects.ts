import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import * as teamsActions from '../actions/teams.actions';
import * as driversActions from '../actions/drivers.actions';
import { tap, exhaustMap, mergeMap, concatMap, switchMap, map, delay, catchError } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { TeamsService } from '../services/teams.service';
import { Driver } from '../models/driver.model';

@Injectable()
export class TeamsEffects {

    @Effect()
    delete$ = this.actions.pipe(
        ofType<Action>(teamsActions.DELETE),
        map((action: teamsActions.Delete) => action.id),
        mergeMap(id => this.service.delete(id).pipe(
            map(() => new teamsActions.DeleteSucces(id)),
            catchError(() => of(new teamsActions.DeleteFail(id)))
        )),
    )

    @Effect()
    edit$ = this.actions.pipe(
        ofType<Action>(teamsActions.EDIT),
        map((action: teamsActions.Edit) => action.team),
        mergeMap(team => this.service.edit(team.id, team).pipe(
            map(() => new teamsActions.EditSuccess(team)),
            catchError(() => of(new teamsActions.DeleteFail(team.id)))
        )),
    )

    @Effect()
    add$ = this.actions.pipe(
        ofType<Action>(teamsActions.ADD),
        map((action: teamsActions.Add) => action.team),
        mergeMap(team => this.service.add(team).pipe(
            tap(console.log),
            map((res) => new teamsActions.AddSuccess({ ...team, id: res.id })),
            catchError(() => of(new teamsActions.DeleteFail(team.id)))
        )),
    )

    @Effect()
    getData$ = this.service.get().pipe(
        tap(console.log),
        map(teams => new teamsActions.FetchSuccess(teams))
    );


    @Effect()
    addDriver$ = this.actions.pipe(
        ofType<Action>(teamsActions.ADD_DRIVER),
        map((action: teamsActions.AddDriver) =>  action.payload),
        exhaustMap((payload: any) => this.service.addDriver(payload.team.id, payload.driver.id).pipe(
            map(() => new teamsActions.AddDriverSuccess(payload)),
            map(() => new driversActions.EditSuccess({ id: payload.driver.id, team: { ...payload.team, drivers: null} }) )
        )
    ));

    @Effect()
    removeDriver$ = this.actions.pipe(
        ofType<Action>(teamsActions.REMOVE_DRIVER),
        map((action: teamsActions.RemoveDriver) =>  action.payload),
        exhaustMap((payload: any) => this.service.removeDriver(payload.team.id, payload.driver.id).pipe(
            map(() => new teamsActions.RemoveDriverSuccess(payload)),
            map(() => new driversActions.EditSuccess({ id: payload.driver.id, team: null}))
        )

        ),
        tap(console.log)
    );

    @Effect()
    refresh$ = this.actions.pipe(
        ofType<Action>(teamsActions.RESET),
        mergeMap(teams => this.getData$)
    )

    constructor(
        private actions: Actions,
        private service: TeamsService
        ) {}

}
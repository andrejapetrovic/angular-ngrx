import { Component, OnInit, ElementRef } from '@angular/core';
import { from, Observable, of, Subject } from 'rxjs';
import { map, switchMap, filter, toArray, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as teamsActions from '../actions/teams.actions';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Team } from '../models/team.model';
import * as fromteams from '../reducers/teams.reducers';
import * as fromDrivers from '../reducers/drivers.reducer';
import { Driver } from '../models/driver.model';

@Component({
  selector: 'app-teams',
  template: `
    <div style="text-align: center">
      <button mat-button (click)="refresh()">Refresh</button>
    </div>
    <table mat-table [dataSource]="teams$ | async" class="mat-elevation-z8" style="margin: auto; width: 60%">
    <!--- Note that these columns can be defined in any order.
          The actual rendered columns are set as a property on the row definition" -->
  
    <!-- Actions Column -->
    <ng-container matColumnDef="actions">
      <th mat-header-cell *matHeaderCellDef> Actions </th>
      <td mat-cell *matCellDef="let team">
        <div *ngIf="team.editable; else notEditable">
          <button [disabled]="team.loading" mat-button (click)="edit(team)" color="primary">Save</button>
          <button [disabled]="team.loading" mat-button (click)="cancel(team)" color="primary">Cancel</button>
        </div>
        <ng-template #notEditable>
          <button [disabled]="team.loading" mat-button (click)="remove(team)" color="primary">Delete</button>
          <button [disabled]="team.loading" mat-button (click)="toggleEditing(team)" color="primary">Edit</button>
        </ng-template>
        <mat-spinner *ngIf="team.loading" [diameter]="20"></mat-spinner>
      </td>
    </ng-container>

    <!-- Position Column -->
    <ng-container matColumnDef="position">
      <th mat-header-cell *matHeaderCellDef> Position </th>
      <td mat-cell *matCellDef="let team;index as i;"> {{ i + 1}} </td>
    </ng-container>
  
    <!-- Name Column -->
    <ng-container matColumnDef="name">
      <th mat-header-cell *matHeaderCellDef> Name </th>
      <td mat-cell *matCellDef="let team;"> 
        <input *ngIf="team.editable; else notEditable" placeholder="name" [disabled]="team.loading"
         value="{{ team.name }}" (input)="setUpdate($event, team, 'name')" autocomplete="off"
         (keyup.enter)="edit(team)">
        <ng-template #notEditable> {{ team.name }} </ng-template>
      </td>
    </ng-container>
  
    <!-- Country Column -->
    <ng-container matColumnDef="country">
      <th mat-header-cell *matHeaderCellDef> Country </th>
      <td mat-cell *matCellDef="let team">
        <input *ngIf="team.editable; else notEditable" placeholder="country" [disabled]="team.loading"
          value="{{ team.country }}" (input)="setUpdate($event, team, 'country')" autocomplete="off"
          (keyup.enter)="edit(team)">
        <ng-template #notEditable> {{ team.country }} </ng-template>
      </td>
    </ng-container>

        <!-- Country Column -->
    <ng-container matColumnDef="podiums">
      <th mat-header-cell *matHeaderCellDef> Podium finishes </th>
      <td mat-cell *matCellDef="let team">
        <input *ngIf="team.editable; else notEditable" placeholder="country" [disabled]="team.loading"
          value="{{ team.podiumFinishes }}" (input)="setUpdate($event, team, 'country')" autocomplete="off"
          (keyup.enter)="edit(team)">
        <ng-template #notEditable> {{ team.podiumFinishes }} </ng-template>
      </td>
    </ng-container>

        <!-- Country Column -->
    <ng-container matColumnDef="titles">
      <th mat-header-cell *matHeaderCellDef> Championship titles </th>
      <td mat-cell *matCellDef="let team">
        <input *ngIf="team.editable; else notEditable" placeholder="country" [disabled]="team.loading"
          value="{{ team.country }}" (input)="setUpdate($event, team, 'country')" autocomplete="off"
          (keyup.enter)="edit(team)">
        <ng-template #notEditable> {{ team.championshipTitles }} </ng-template>
      </td>
    </ng-container>
  
    <ng-container matColumnDef="drivers">
      <th mat-header-cell *matHeaderCellDef> Drivers </th>
      <td mat-cell *matCellDef="let team">
          <div *ngFor="let driver of team.drivers">
              <span style="min-width: 150px; float: left">{{ driver.name }}</span>
              <button (click)="removeDriver(team, driver)">-</button>
          </div>
          <div *ngIf="!team.drivers || team.drivers.length < 2">
          <form #driverForm="ngForm" (ngSubmit)="addDriver(team, driverForm.value.driver)">
            <span style="min-width: 150px; float: left">
            <select name="driver" ngModel>
            <option></option>
            <option *ngFor="let driver of teamlessDrivers$ | async"
                [value]="driver | json">
                {{driver.name}}
              </option> 
              </select>
              </span>
            <button type="submit">+</button>
           </form> 
          </div>
      </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row class="team-{{row.id}}" *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>

    <br>
    <div style="text-align: center">
    <form [formGroup]="teamsForm" (ngSubmit)="add()">
    <mat-form-field>
      <input matInput placeholder="name" formControlName="name" autocomplete="off">
    </mat-form-field>
    &nbsp;
    <mat-form-field>
      <input matInput placeholder="country" formControlName="country" autocomplete="off">
    </mat-form-field>
    &nbsp;
    <mat-form-field>
      <input matInput placeholder="titles" formControlName="championshipTitles" autocomplete="off">
    </mat-form-field>
    <mat-form-field>
      <input matInput placeholder="podium finishes" formControlName="podiumFinishes" autocomplete="off">
    </mat-form-field>
    <button mat-button color="primary" type="submit">Add new team</button>
    </form>
  </div>
  `,
  styles: []
})
export class TeamsComponent implements OnInit {

  teams$: Observable<Team[]>;
  teamlessDrivers$: Observable<Driver[]>;
  teamsForm: FormGroup;
  displayedColumns: string[] = ['actions', 'position', 'name', 'country', 'podiums', 'titles', 'drivers'];

  constructor(private store: Store<fromteams.State>, private fb: FormBuilder, private elRef: ElementRef) { }

  ngOnInit() {
    this.refresh();
    this.teams$ = this.store.select(fromteams.selectAll);
    this.teamlessDrivers$ = this.store.select(fromDrivers.selectAll)
      .pipe(
        map(driver => driver.filter(d => !d.team))
        );
    this.teamsForm = this.fb.group({
      name: 'Aki',
      country: 'srb',
      championshipTitles: '9001',
      podiumFinishes: '10000'
    });
  }

  toggleEditing(team: Team) {
    this.store.dispatch(new teamsActions.ToggleEdit({ id: team.id, editable: team.editable}));
  }

  edit(team) {
    const upd = Object.assign({}, team.update);
    delete team.update; 
    upd.id = team.id;
    this.store.dispatch(new teamsActions.Edit(upd));
  }
  
  add() {
    const team = this.teamsForm.value;
    team.drivers = [];
    this.store.dispatch(new teamsActions.Add(team));
  }

  remove(team: Team) {
    this.store.dispatch(new teamsActions.Delete(team.id));
  }

  cancel(team) {
    this.toggleEditing(team);
  }
  
  refresh() {
    this.store.dispatch(new teamsActions.Reset());
  }

  setUpdate($event, team, prop) {
    if (!team.update) {
      team.update = {};
    }

    team.update[prop] = $event.target.value;
  }

  addDriver(team, driver) {
    if(!driver) return;
    console.log(team);
    console.log(JSON.parse(driver));
    this.store.dispatch(new teamsActions.AddDriver({ team, driver: JSON.parse(driver)}));
  }

  removeDriver(team, driver) {
    console.log(team);
    console.log(driver);
    this.store.dispatch(new teamsActions.RemoveDriver({ team, driver }));
  }

}


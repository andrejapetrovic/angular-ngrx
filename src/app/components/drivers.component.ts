import { Component, OnInit, ElementRef } from '@angular/core';
import { from, Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as DriversActions from '../actions/drivers.actions';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Driver } from '../models/driver.model';
import * as fromDrivers from '../reducers/drivers.reducer';

@Component({
  selector: 'app-drivers',
  template: `
    <div style="text-align: center">
      <button mat-button (click)="refresh()">Refresh</button>
    </div>
    <table mat-table [dataSource]="drivers$ | async" class="mat-elevation-z8" style="margin: auto; width: 60%">
    <!--- Note that these columns can be defined in any order.
          The actual rendered columns are set as a property on the row definition" -->
  
    <!-- Actions Column -->
    <ng-container matColumnDef="actions">
      <th mat-header-cell *matHeaderCellDef> Actions </th>
      <td mat-cell *matCellDef="let driver">
        <div *ngIf="driver.editable; else notEditable">
          <button [disabled]="driver.loading" mat-button (click)="edit(driver)" color="primary">Save</button>
          <button [disabled]="driver.loading" mat-button (click)="cancel(driver)" color="primary">Cancel</button>
        </div>
        <ng-template #notEditable>
          <button [disabled]="driver.loading" mat-button (click)="remove(driver)" color="primary">Delete</button>
          <button [disabled]="driver.loading" mat-button (click)="toggleEditing(driver)" color="primary">Edit</button>
        </ng-template>
        <mat-spinner *ngIf="driver.loading" [diameter]="20"></mat-spinner>
      </td>
    </ng-container>

    <!-- Position Column -->
    <ng-container matColumnDef="position">
      <th mat-header-cell *matHeaderCellDef> Position </th>
      <td mat-cell *matCellDef="let driver;index as i;"> {{ i + 1}} </td>
    </ng-container>
  
    <!-- Name Column -->
    <ng-container matColumnDef="name">
      <th mat-header-cell *matHeaderCellDef> Name </th>
      <td mat-cell *matCellDef="let driver;"> 
        <input *ngIf="driver.editable; else notEditable" placeholder="name" [disabled]="driver.loading"
         value="{{ driver.name }}" (input)="setUpdate($event, driver, 'name')" autocomplete="off"
         (keyup.enter)="edit(driver)">
        <ng-template #notEditable> {{ driver.name }} </ng-template>
      </td>
    </ng-container>
  
    <!-- Country Column -->
    <ng-container matColumnDef="country">
      <th mat-header-cell *matHeaderCellDef> Country </th>
      <td mat-cell *matCellDef="let driver">
        <input *ngIf="driver.editable; else notEditable" placeholder="country" [disabled]="driver.loading"
          value="{{ driver.country }}" (input)="setUpdate($event, driver, 'country')" autocomplete="off"
          (keyup.enter)="edit(driver)">
        <ng-template #notEditable> {{ driver.country }} </ng-template>
      </td>
    </ng-container>

    <!-- Country Column -->
    <ng-container matColumnDef="points">
      <th mat-header-cell *matHeaderCellDef> Points </th>
      <td mat-cell *matCellDef="let driver">
        <input *ngIf="driver.editable; else notEditable" placeholder="points" [disabled]="driver.loading"
          value="{{ driver.points }}" (input)="setUpdate($event, driver, 'points')" autocomplete="off"
          (keyup.enter)="edit(driver)" >
        <ng-template #notEditable> {{ driver.points }} </ng-template>
      </td>
    </ng-container>

    <!-- Team Column -->
    <ng-container matColumnDef="team">
      <th mat-header-cell *matHeaderCellDef> Team </th>
      <td mat-cell *matCellDef="let driver">
        <span *ngIf="driver.team;else na">{{ driver.team.name }}</span> 
        <ng-template #na>N/A</ng-template>
      </td>
    </ng-container>
  
    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row class="driver-{{row.id}}" *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>

    <br>
    <div style="text-align: center">
    <form [formGroup]="driversForm" (ngSubmit)="add()">
    <mat-form-field>
      <input matInput placeholder="name" formControlName="name" autocomplete="off">
    </mat-form-field>
    &nbsp;
    <mat-form-field>
      <input matInput placeholder="country" formControlName="country" autocomplete="off">
    </mat-form-field>
    &nbsp;
    <mat-form-field>
      <input matInput placeholder="points" formControlName="points" autocomplete="off">
    </mat-form-field>
    <button mat-button color="primary" type="submit">Add new driver</button>
    </form>
  </div>
  `,
  styles: []
})
export class DriversComponent implements OnInit {

  drivers$: Observable<Driver[]>;
  driversForm: FormGroup;
  displayedColumns: string[] = ['actions', 'position', 'name', 'country', 'points', 'team'];

  constructor(private store: Store<fromDrivers.State>, private fb: FormBuilder, private elRef: ElementRef) { }

  ngOnInit() {
    this.refresh();
    this.drivers$ = this.store.select(fromDrivers.selectAll);
    this.driversForm = this.fb.group({
      name: 'New Driver',
      country: 'srb',
      points: '9001',
    });
  }

  toggleEditing(driver: Driver) {
    this.store.dispatch(new DriversActions.ToggleEdit({ id: driver.id, editable: driver.editable}));
  }

  edit(driver) {
    const upd = Object.assign({}, driver.update);
    delete driver.update; 
    upd.id = driver.id;
    this.store.dispatch(new DriversActions.Edit(upd));
  }
  
  add() {
    const driver = this.driversForm.value;
    this.store.dispatch(new DriversActions.Add(driver));
  }

  remove(driver: Driver) {
    this.store.dispatch(new DriversActions.Delete(driver.id));
  }

  cancel(driver) {
    this.toggleEditing(driver);
  }
  
  refresh() {
    this.store.dispatch(new DriversActions.Reset());
  }

  setUpdate($event, driver, prop) {
    if (!driver.update) {
      driver.update = {};
    }

    driver.update[prop] = $event.target.value;
  }

}


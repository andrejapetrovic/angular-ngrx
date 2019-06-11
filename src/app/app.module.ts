import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DriversComponent } from './components/drivers.component';
import { StoreModule } from '@ngrx/store';
import { driversReducer } from './reducers/drivers.reducer';
import { teamsReducer } from './reducers/teams.reducers';
import { TeamsComponent } from './components/teams.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { EditableCellPipe } from './pipes/editable-cell.pipe';
import { EffectsModule } from '@ngrx/effects';
import { DriversEffects } from './effects/drivers.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { TeamsEffects } from './effects/teams.effects';

@NgModule({
  declarations: [
    AppComponent,
    DriversComponent,
    TeamsComponent,
    EditableCellPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({
      drivers: driversReducer,
      teams: teamsReducer
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    MatChipsModule,
    MatTableModule,
    MatGridListModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    EffectsModule.forRoot([DriversEffects, TeamsEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

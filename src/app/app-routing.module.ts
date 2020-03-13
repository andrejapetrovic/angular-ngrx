import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamsComponent } from './components/teams.component';
import { DriversComponent } from './components/drivers.component';

const routes: Routes = [
  { path: '', redirectTo: '/a/teams', pathMatch: 'full'},
  { path: 'a/drivers', component: DriversComponent },
  { path: 'a/teams', component: TeamsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

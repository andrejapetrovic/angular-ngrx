import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private url = 'http://localhost:4000/'; 

  constructor(private http: HttpClient) { }

  public get() {
    return this.http.get(this.url + 'teams');
  }

  public add(team) {
    return this.http.post(this.url + 'team/add', team);
  }

  public edit(id, data) {
    return this.http.put(this.url + `team/update/${id}`, data);
  }

  public delete(id) {
    return this.http.delete(this.url + `team/delete/${id}`);
  }

  public addDriver(teamId, driverId) {
    return this.http.patch(this.url + `team/add-driver/${teamId}/${driverId}`, null);
  }

  public removeDriver(teamId, driverId) {
    return this.http.patch(this.url + `team/remove-driver/${teamId}/${driverId}`, null);
  }

}

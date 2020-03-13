import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DriversService {
  
  private url = '/'; 
  
  constructor(private http: HttpClient) { 
  }

  public get() {
    return this.http.get(this.url + 'drivers');
  }

  public add(driver) {
    return this.http.post(this.url + 'driver/add', driver);
  }

  public edit(id, data) {
    return this.http.put(this.url + `driver/update/${id}`, data);
  }

  public delete(id) {
    return this.http.delete(this.url + `driver/delete/${id}`);
  }
}

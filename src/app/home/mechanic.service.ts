import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mechanic } from './mechanic.model';

@Injectable({
  providedIn: 'root'
})
export class MechanicService {
  private apiUrl = 'YOUR_API_GATEWAY_ENDPOINT'; // Replace with your API Gateway endpoint

  constructor(private http: HttpClient) { }

  registerMechanic(mechanic: Mechanic): Observable<any> {
    return this.http.post(this.apiUrl + '/register', mechanic);
  }
}

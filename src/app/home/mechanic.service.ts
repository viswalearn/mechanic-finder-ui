import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Mechanic, GeoInput } from './mechanic.model';

@Injectable({
  providedIn: 'root'
})
export class MechanicService {
  private apiUrl = 'https://cwiwua2t1k.execute-api.ap-south-1.amazonaws.com/Prod'; // Replace with your API Gateway endpoint

  constructor(private http: HttpClient) { }

  registerMechanic(mechanic: Mechanic): Observable<any> {
    return this.http.post(this.apiUrl + '/mechanics', mechanic);
  }

  getMechanic(latitude: number, longitude: number): Observable<Mechanic[]> {
    let params = new HttpParams();
    params = params.append('Latitude', latitude);
    params = params.append('Longitude', longitude);
    console.log("Calling get mechanic endpoing with ");
    console.log(latitude);
    console.log(longitude);
    return this.http.get<Mechanic[]>(this.apiUrl + '/mechanics', {
      params: params
    });
    //return this.http.get<Mechanic>(this.apiUrl + '/mechanics?Latitude=${latitude}&Longitude=${longitude}');
  }
}

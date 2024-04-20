import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'YOUR_API_GATEWAY_ENDPOINT'; // Replace with your API Gateway endpoint

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl + '/register', user);
  }
}

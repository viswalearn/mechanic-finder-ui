import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://j3nb88z7rf.execute-api.ap-south-1.amazonaws.com/Prod'; // Replace with your API Gateway endpoint

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl + '/users', user);
  }
}

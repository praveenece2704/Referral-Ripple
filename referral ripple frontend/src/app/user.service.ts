import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:9000/api/users';

  constructor(private http: HttpClient) {}

  registerUser(userData: User) {
    console.log(userData);
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
}

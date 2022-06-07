import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Resp } from '../models/resp';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  //BehaviorSubject like session

  private logged = new BehaviorSubject<Boolean>(this.loggedIn());
  authStatus = this.logged.asObservable();
  changeStatus(value: boolean) {
    this.logged.next(value);
  }
  //BehaviorSubject like session
  loggedIn() {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    if (token != null && email != null) {
      console.log('loggedIn');
      return true;
    }
    return false;
  }

  apiUrl = 'https://smarthousebackend.herokuapp.com/user/';
  login(loguser: User) {
    return this.http.post<Resp>(
      'https://smarthousebackend.herokuapp.com/login',
      loguser
    );
  }
  register(newuser: User) {
    return this.http.post<User>(`${this.apiUrl}add`, newuser);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  //BehaviorSubject like session

  private logged = new BehaviorSubject<Boolean>(this.loggedIn());
  authStatus = this.logged.asObservable();
  changeStatus(value: boolean) {
    this.logged.next(value);
  }
  // getStatus() {
  //   return this.logged.value;
  // }

  ///////////////////////////////////
  set(data: any) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('email', data.email);
  }

  handle(data: any) {
    this.set(data);
  }

  getToken() {
    console.log('getToken Method  : ', localStorage.getItem('token'));
    return localStorage.getItem('token');
  }

  getEmail() {
    return localStorage.getItem('email');
  }

  remove() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

  decode(payload: any) {
    // console.log('payload : ', payload);
    return JSON.parse(atob(payload));
  }

  payload(token: any) {
    const payload = token.split('.')[1];
    // console.log('payload : ', payload);
    return this.decode(payload);
  }

  isValid() {
    const token = this.getToken();
    const email = this.getEmail();

    if (token) {
      const payload = this.payload(token);

      if (payload) {
        return email == payload.sub;
      }
    }

    return false;
  }

  getInfos() {
    const token = this.getToken();

    if (token) {
      const payload = this.payload(token);
      return payload ? payload : null;
    }

    return null;
  }

  loggedIn() {
    return this.isValid();
  }
}

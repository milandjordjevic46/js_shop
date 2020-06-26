import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../system-cloud/system-cloud.models';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
export abstract class UserInfoService {
  abstract getToken(): string;
  abstract setToken(token: string);
  abstract deleteToken(): void;
  abstract takeUserInfo(): Observable<User>;
  abstract getUserInfo(): string;
  abstract setUserInfo(UserInfo): void;
  abstract deleteUserInfo(): void;
}
@Injectable()
export class UserInfoServiceImpl implements UserInfoService {
  constructor(private http: HttpClient) {}

  takeUserInfo(): Observable<User> {
    return this.http.get<User>(environment.apiUrl + 'users/me');
  }

  getToken(): string {
    return localStorage.getItem('accessToken_js');
  }

  setToken(token): void {
    localStorage.setItem('accessToken_js', token);
  }

  deleteToken(): void {
    localStorage.removeItem('accessToken_js');
  }

  getUserInfo(): string {
    return localStorage.getItem('user_info_js');
  }

  setUserInfo(userInfo): void {
    localStorage.setItem('user_info_js', JSON.stringify(userInfo));
  }

  deleteUserInfo(): void {
    localStorage.removeItem('user_info_js');
  }
}

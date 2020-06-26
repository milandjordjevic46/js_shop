import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, AccessToken } from '../shared/system-cloud/system-cloud.models';
export abstract class AuthService {
  abstract login(email: string, password: string): Observable<AccessToken>;
}

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AccessToken> {
    return this.http.post<AccessToken>(environment.apiUrl + 'login', {
      email: email,
      password: password,
    });
  }


}
